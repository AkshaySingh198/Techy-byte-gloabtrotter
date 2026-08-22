const { Trip, TripMember, Stop, City, Booking } = require('../models');
const { Op } = require('sequelize');

exports.getCalendarEvents = async (req, res, next) => {
  try {
    const userId = req.user.id;

    // Find trip IDs where user is member/owner
    const memberRecords = await TripMember.findAll({
      where: { user_id: userId, status: 'accepted' },
      attributes: ['trip_id']
    });
    const tripIds = memberRecords.map(m => m.trip_id);

    const today = new Date();
    const thirtyDaysAgo = new Date(today.getTime() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

    const trips = await Trip.findAll({
      where: {
        id: { [Op.in]: tripIds },
        end_date: { [Op.gte]: thirtyDaysAgo }
      },
      include: [
        { model: Stop, as: 'stops', include: [{ model: City, as: 'city' }] },
        { model: Booking, as: 'bookings' }
      ],
      order: [['start_date', 'ASC']]
    });

    const calendarEvents = trips.map(t => {
      const isPast = new Date(t.end_date) < today;
      let estimatedCost = 0;
      if (t.bookings) {
        estimatedCost = t.bookings.reduce((acc, b) => acc + (parseFloat(b.cost) || 0), 0);
      }

      return {
        id: t.id,
        title: t.name,
        start_date: t.start_date,
        end_date: t.end_date,
        status: isPast ? 'past_30_days' : 'upcoming',
        estimated_cost: estimatedCost,
        currency: '₹',
        permit_required: t.permit_required,
        stops: t.stops.map(s => s.city ? s.city.name : '')
      };
    });

    res.json({
      success: true,
      data: calendarEvents
    });
  } catch (error) {
    next(error);
  }
};
