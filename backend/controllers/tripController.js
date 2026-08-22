const { Trip, TripMember, User, Stop, City, Activity, StopActivity, Booking, CostBreakdown } = require('../models');
const { Op } = require('sequelize');

// Restricted regions in India requiring Inner Line Permit (ILP) or Protected Area Permit (PAP)
const RESTRICTED_REGIONS = ['sikkim', 'ladakh', 'andaman', 'arunachal pradesh', 'nagaland', 'mizoram'];

function checkPermitRequirement(name, description) {
  const text = `${name} ${description || ''}`.toLowerCase();
  return RESTRICTED_REGIONS.some(region => text.includes(region));
}

exports.createTrip = async (req, res, next) => {
  try {
    const { name, start_date, end_date, description, cover_photo_url, visibility } = req.body;

    const permit_required = checkPermitRequirement(name, description);

    const trip = await Trip.create({
      owner_id: req.user.id,
      name,
      start_date,
      end_date,
      description,
      cover_photo_url,
      visibility: visibility || 'private',
      permit_required
    });

    // Automatically add owner to trip_members
    await TripMember.create({
      trip_id: trip.id,
      user_id: req.user.id,
      role: 'owner',
      status: 'accepted'
    });

    res.status(201).json({
      success: true,
      message: 'Trip created successfully',
      data: trip
    });
  } catch (error) {
    next(error);
  }
};

exports.getTrips = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { filter } = req.query; // 'upcoming', 'past30', 'all'

    // Find trip IDs where user is owner or member
    const memberRecords = await TripMember.findAll({
      where: { user_id: userId, status: 'accepted' },
      attributes: ['trip_id']
    });
    const tripIds = memberRecords.map(m => m.trip_id);

    let whereClause = {
      id: { [Op.in]: tripIds }
    };

    const today = new Date().toISOString().split('T')[0];

    if (filter === 'upcoming') {
      whereClause.end_date = { [Op.gte]: today };
    } else if (filter === 'past30') {
      const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
      whereClause.end_date = { [Op.between]: [thirtyDaysAgo, today] };
    }

    const trips = await Trip.findAll({
      where: whereClause,
      include: [
        { model: User, as: 'owner', attributes: ['id', 'name', 'email'] },
        { model: Stop, as: 'stops', include: [{ model: City, as: 'city' }] }
      ],
      order: [['start_date', 'ASC']]
    });

    res.json({
      success: true,
      data: trips
    });
  } catch (error) {
    next(error);
  }
};

exports.getTripById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const trip = await Trip.findByPk(id, {
      include: [
        { model: User, as: 'owner', attributes: ['id', 'name', 'email', 'phone', 'city'] },
        { 
          model: TripMember, 
          as: 'tripMembers',
          include: [{ model: User, as: 'user', attributes: ['id', 'name', 'email', 'phone'] }]
        },
        { 
          model: Stop, 
          as: 'stops',
          include: [
            { model: City, as: 'city' },
            { 
              model: StopActivity, 
              as: 'scheduledActivities',
              include: [{ model: Activity, as: 'activity' }]
            }
          ]
        },
        { model: Booking, as: 'bookings' },
        { model: CostBreakdown, as: 'costBreakdowns' }
      ],
      order: [
        [{ model: Stop, as: 'stops' }, 'order_index', 'ASC']
      ]
    });

    if (!trip) {
      return res.status(404).json({
        success: false,
        error: 'Trip not found.'
      });
    }

    // Verify user membership or public visibility
    const isMember = trip.tripMembers.some(m => m.user_id === req.user.id);
    if (!isMember && trip.visibility === 'private' && trip.owner_id !== req.user.id) {
      return res.status(403).json({
        success: false,
        error: 'Access denied to private trip.'
      });
    }

    res.json({
      success: true,
      data: trip
    });
  } catch (error) {
    next(error);
  }
};

exports.updateTrip = async (req, res, next) => {
  try {
    const { id } = req.params;
    const trip = await Trip.findByPk(id);

    if (!trip) {
      return res.status(404).json({ success: false, error: 'Trip not found.' });
    }

    if (trip.owner_id !== req.user.id) {
      return res.status(403).json({ success: false, error: 'Only the trip owner can edit trip details.' });
    }

    const { name, start_date, end_date, description, cover_photo_url, visibility } = req.body;
    
    if (name || description) {
      trip.permit_required = checkPermitRequirement(name || trip.name, description || trip.description);
    }

    if (name) trip.name = name;
    if (start_date) trip.start_date = start_date;
    if (end_date) trip.end_date = end_date;
    if (description !== undefined) trip.description = description;
    if (cover_photo_url !== undefined) trip.cover_photo_url = cover_photo_url;
    if (visibility) trip.visibility = visibility;

    await trip.save();

    res.json({
      success: true,
      message: 'Trip updated successfully',
      data: trip
    });
  } catch (error) {
    next(error);
  }
};

exports.deleteTrip = async (req, res, next) => {
  try {
    const { id } = req.params;
    const trip = await Trip.findByPk(id);

    if (!trip) {
      return res.status(404).json({ success: false, error: 'Trip not found.' });
    }

    if (trip.owner_id !== req.user.id) {
      return res.status(403).json({ success: false, error: 'Only the trip owner can delete this trip.' });
    }

    await trip.destroy();

    res.json({
      success: true,
      message: 'Trip deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

exports.addMember = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { email, role, document_type, document_number } = req.body;

    const trip = await Trip.findByPk(id);
    if (!trip) {
      return res.status(404).json({ success: false, error: 'Trip not found.' });
    }

    const targetUser = await User.findOne({ where: { email } });
    if (!targetUser) {
      return res.status(404).json({ success: false, error: `User with email ${email} not found.` });
    }

    const [member, created] = await TripMember.findOrCreate({
      where: { trip_id: id, user_id: targetUser.id },
      defaults: {
        role: role || 'editor',
        status: 'invited',
        document_type,
        document_number
      }
    });

    if (!created) {
      member.role = role || member.role;
      if (document_type) member.document_type = document_type;
      if (document_number) member.document_number = document_number;
      await member.save();
    }

    res.json({
      success: true,
      message: created ? 'Member invited to trip' : 'Member updated',
      data: member
    });
  } catch (error) {
    next(error);
  }
};
