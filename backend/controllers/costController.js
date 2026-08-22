const { CostBreakdown, Trip, Stop, StopActivity, Activity, Booking } = require('../models');

exports.getTripCostSummary = async (req, res, next) => {
  try {
    const { tripId } = req.params;

    const trip = await Trip.findByPk(tripId, {
      include: [
        { model: Booking, as: 'bookings' },
        { 
          model: Stop, 
          as: 'stops',
          include: [{ 
            model: StopActivity, 
            as: 'scheduledActivities',
            include: [{ model: Activity, as: 'activity' }]
          }]
        },
        { model: CostBreakdown, as: 'costBreakdowns' }
      ]
    });

    if (!trip) {
      return res.status(404).json({ success: false, error: 'Trip not found.' });
    }

    let transportCost = 0;
    let stayCost = 0;
    let activityCost = 0;
    let mealsCost = 0;

    // Calculate bookings cost
    if (trip.bookings) {
      trip.bookings.forEach(b => {
        const costVal = parseFloat(b.cost) || 0;
        if (['flight', 'train', 'bus', 'bike', 'car', 'cab'].includes(b.type)) {
          transportCost += costVal;
        } else if (b.type === 'hotel') {
          stayCost += costVal;
        }
      });
    }

    // Calculate scheduled activities cost
    if (trip.stops) {
      trip.stops.forEach(s => {
        if (s.scheduledActivities) {
          s.scheduledActivities.forEach(sa => {
            if (sa.activity) {
              activityCost += parseFloat(sa.activity.cost) || 0;
            }
          });
        }
      });
    }

    // Default estimate for meals (₹800/day per traveler)
    const start = new Date(trip.start_date);
    const end = new Date(trip.end_date);
    const totalDays = Math.max(1, Math.ceil((end - start) / (1000 * 60 * 60 * 24)) + 1);
    mealsCost = totalDays * 800;

    const totalCost = transportCost + stayCost + activityCost + mealsCost;

    const categoryBreakdown = [
      { category: 'transport', label: 'Transport (Flight/Train/Bus/Rental)', amount: transportCost, color: '#3B82F6' },
      { category: 'stay', label: 'Stay & Hotels', amount: stayCost, color: '#10B981' },
      { category: 'activity', label: 'Activities & Sightseeing', amount: activityCost, color: '#F59E0B' },
      { category: 'meals', label: 'Estimated Meals & Dining', amount: mealsCost, color: '#EF4444' }
    ];

    res.json({
      success: true,
      data: {
        currency: 'INR (₹)',
        total_cost: totalCost,
        total_days: totalDays,
        daily_average: Math.round(totalCost / totalDays),
        category_breakdown: categoryBreakdown
      }
    });
  } catch (error) {
    next(error);
  }
};

exports.addCustomCost = async (req, res, next) => {
  try {
    const { trip_id, category, amount, day_number } = req.body;

    const costItem = await CostBreakdown.create({
      trip_id,
      category,
      amount,
      day_number
    });

    res.status(201).json({
      success: true,
      message: 'Cost entry added',
      data: costItem
    });
  } catch (error) {
    next(error);
  }
};
