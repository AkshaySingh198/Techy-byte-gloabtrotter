const { Stop, StopActivity, Activity, City, Trip, TripMember } = require('../models');

exports.addStop = async (req, res, next) => {
  try {
    const { trip_id, city_id, arrival_date, departure_date } = req.body;

    const trip = await Trip.findByPk(trip_id);
    if (!trip) {
      return res.status(404).json({ success: false, error: 'Trip not found.' });
    }

    // Determine current highest order_index
    const lastStop = await Stop.findOne({
      where: { trip_id },
      order: [['order_index', 'DESC']]
    });

    const order_index = lastStop ? lastStop.order_index + 1 : 0;

    const stop = await Stop.create({
      trip_id,
      city_id,
      order_index,
      arrival_date: arrival_date || trip.start_date,
      departure_date: departure_date || trip.end_date
    });

    const stopWithCity = await Stop.findByPk(stop.id, {
      include: [{ model: City, as: 'city' }]
    });

    res.status(201).json({
      success: true,
      message: 'City stop added to itinerary',
      data: stopWithCity
    });
  } catch (error) {
    next(error);
  }
};

exports.reorderStops = async (req, res, next) => {
  try {
    const { trip_id, stops } = req.body; // stops: [{ id: 1, order_index: 0 }, { id: 2, order_index: 1 }]

    for (const item of stops) {
      await Stop.update(
        { order_index: item.order_index },
        { where: { id: item.id, trip_id } }
      );
    }

    const updatedStops = await Stop.findAll({
      where: { trip_id },
      include: [{ model: City, as: 'city' }],
      order: [['order_index', 'ASC']]
    });

    res.json({
      success: true,
      message: 'Stops reordered successfully',
      data: updatedStops
    });
  } catch (error) {
    next(error);
  }
};

exports.deleteStop = async (req, res, next) => {
  try {
    const { id } = req.params;
    const stop = await Stop.findByPk(id);

    if (!stop) {
      return res.status(404).json({ success: false, error: 'Stop not found.' });
    }

    await stop.destroy();

    res.json({
      success: true,
      message: 'Stop deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

exports.assignActivity = async (req, res, next) => {
  try {
    const { stop_id, activity_id, scheduled_time, day_number } = req.body;

    const stop = await Stop.findByPk(stop_id);
    if (!stop) {
      return res.status(404).json({ success: false, error: 'Stop not found.' });
    }

    const activity = await Activity.findByPk(activity_id);
    if (!activity) {
      return res.status(404).json({ success: false, error: 'Activity not found.' });
    }

    const scheduled = await StopActivity.create({
      stop_id,
      activity_id,
      scheduled_time: scheduled_time || '10:00 AM',
      day_number: day_number || 1
    });

    const scheduledWithDetails = await StopActivity.findByPk(scheduled.id, {
      include: [{ model: Activity, as: 'activity' }]
    });

    res.status(201).json({
      success: true,
      message: 'Activity scheduled for stop',
      data: scheduledWithDetails
    });
  } catch (error) {
    next(error);
  }
};

exports.removeActivity = async (req, res, next) => {
  try {
    const { id } = req.params;
    const item = await StopActivity.findByPk(id);

    if (!item) {
      return res.status(404).json({ success: false, error: 'Scheduled activity not found.' });
    }

    await item.destroy();

    res.json({
      success: true,
      message: 'Scheduled activity removed'
    });
  } catch (error) {
    next(error);
  }
};

exports.getDayWiseItinerary = async (req, res, next) => {
  try {
    const { tripId } = req.params;

    const trip = await Trip.findByPk(tripId, {
      include: [
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
        }
      ],
      order: [[{ model: Stop, as: 'stops' }, 'order_index', 'ASC']]
    });

    if (!trip) {
      return res.status(404).json({ success: false, error: 'Trip not found.' });
    }

    // Calculate total days
    const start = new Date(trip.start_date);
    const end = new Date(trip.end_date);
    const totalDays = Math.max(1, Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1);

    const dayWise = [];

    for (let day = 1; day <= totalDays; day++) {
      const currentDayDate = new Date(start);
      currentDayDate.setDate(start.getDate() + (day - 1));
      const dateStr = currentDayDate.toISOString().split('T')[0];

      // Find active stops for this day
      const activeStops = trip.stops.filter(s => {
        if (!s.arrival_date || !s.departure_date) return true;
        return dateStr >= s.arrival_date && dateStr <= s.departure_date;
      });

      const dayActivities = [];
      activeStops.forEach(stop => {
        if (stop.scheduledActivities) {
          stop.scheduledActivities.forEach(sa => {
            if (sa.day_number === day || (!sa.day_number && activeStops.indexOf(stop) === 0)) {
              dayActivities.push({
                stop_activity_id: sa.id,
                time: sa.scheduled_time,
                city: stop.city ? stop.city.name : 'Unknown City',
                activity: sa.activity
              });
            }
          });
        }
      });

      dayWise.push({
        day_number: day,
        date: dateStr,
        stops: activeStops.map(s => ({ id: s.id, city: s.city ? s.city.name : '' })),
        activities: dayActivities
      });
    }

    res.json({
      success: true,
      data: {
        trip_id: trip.id,
        trip_name: trip.name,
        start_date: trip.start_date,
        end_date: trip.end_date,
        total_days: totalDays,
        permit_required: trip.permit_required,
        days: dayWise
      }
    });
  } catch (error) {
    next(error);
  }
};
