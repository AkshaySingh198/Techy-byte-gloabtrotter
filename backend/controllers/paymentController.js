const { Booking, Trip, TripMember } = require('../models');

// POST /api/v1/payments/checkout
exports.processPayment = async (req, res, next) => {
  try {
    const { tripId, tripName = 'Goa Coastal Expedition', amount, paymentMethod = 'UPI / Razorpay', upiId = 'user@upi' } = req.body;
    
    if (!amount) {
      return res.status(400).json({ success: false, error: 'amount is required.' });
    }

    const userId = req.user ? req.user.id || req.user.user_id : 1;
    const paymentId = `pay_gt_${Date.now()}_${Math.floor(Math.random() * 1000)}`;

    let trip = null;
    if (tripId && typeof tripId === 'number') {
      trip = await Trip.findByPk(tripId);
    }

    if (!trip) {
      // Insert new trip directly into MySQL database
      trip = await Trip.create({
        owner_id: userId,
        name: tripName,
        start_date: '2026-10-15',
        end_date: '2026-10-25',
        description: 'Paid travel package booked on GlobeTrotter',
        visibility: 'public',
        permit_required: false
      });

      // Add user to trip_members
      try {
        await TripMember.create({
          trip_id: trip.id,
          user_id: userId,
          role: 'owner',
          status: 'accepted'
        });
      } catch (e) {}
    }

    // Create booking / payment record
    const booking = await Booking.create({
      user_id: userId,
      trip_id: trip.id,
      booking_type: 'trip_package',
      provider: paymentMethod,
      details: { upiId, paymentId },
      amount: amount,
      booking_status: 'confirmed'
    });

    res.status(200).json({
      success: true,
      message: '🎉 Payment processed & trip confirmed successfully!',
      data: {
        paymentId,
        bookingId: booking.booking_id,
        tripId: trip.id,
        tripName: trip.name,
        amount,
        status: 'confirmed',
        timestamp: new Date().toISOString()
      }
    });
  } catch (error) {
    next(error);
  }
};
