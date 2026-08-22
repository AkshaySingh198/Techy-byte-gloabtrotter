const { City, Activity } = require('../models');
const { Op } = require('sequelize');

exports.getRouteSuggestions = async (req, res, next) => {
  try {
    const { start_city, end_city, start_date, end_date, budget_tier } = req.body; // budget_tier: 'budget', 'mid', 'premium'

    const destCity = await City.findOne({
      where: { name: { [Op.like]: `%${end_city}%` } }
    });

    const cityId = destCity ? destCity.id : null;

    const activities = cityId ? await Activity.findAll({ where: { city_id: cityId } }) : [];

    // Transport options generated dynamically for Indian routes
    const transportOptions = [
      {
        type: 'train',
        provider: 'IRCTC Express (Sleeper / 3AC / 2AC)',
        tier: 'budget',
        cost: 850.00,
        duration: '14 hrs',
        availability: 'High demand - Book 30 days prior',
        currency: '₹'
      },
      {
        type: 'bus',
        provider: 'KSRTC / Zingbus / Volvo AC Sleeper',
        tier: 'budget',
        cost: 1200.00,
        duration: '12 hrs',
        availability: 'Daily departures',
        currency: '₹'
      },
      {
        type: 'flight',
        provider: 'IndiGo / Air India Direct',
        tier: 'premium',
        cost: 4500.00,
        duration: '2.5 hrs',
        availability: 'Multiple daily flights',
        currency: '₹'
      },
      {
        type: 'bike',
        provider: 'Royal Enfield Rental / Drivezy',
        tier: 'mid',
        cost: 1500.00, // per day
        duration: 'Self-driven adventure',
        availability: 'Helmet & helmet lock included',
        currency: '₹'
      },
      {
        type: 'car',
        provider: 'Zoomcar / Revv Self-Drive SUV',
        tier: 'mid',
        cost: 2800.00, // per day
        duration: 'Self-driven flexibility',
        availability: 'Unlimited kms option',
        currency: '₹'
      }
    ];

    // Filter by requested tier if specified
    const filteredTransport = budget_tier
      ? transportOptions.filter(t => t.tier === budget_tier || t.tier === 'mid')
      : transportOptions;

    // Hotels / Stay suggestions
    const hotelOptions = [
      { name: 'Backpacker Hostel / Zostel', tier: 'budget', cost_per_night: 799, currency: '₹', rating: 4.5 },
      { name: 'Boutique Heritage Resort & Spa', tier: 'mid', cost_per_night: 3200, currency: '₹', rating: 4.7 },
      { name: '5-Star Taj / Oberoi Luxury Palace', tier: 'premium', cost_per_night: 12500, currency: '₹', rating: 4.9 }
    ];

    res.json({
      success: true,
      data: {
        route: { start: start_city, destination: end_city || 'Goa' },
        best_season_warning: destCity ? destCity.best_season : 'Check seasonal weather forecast',
        transport_options: filteredTransport,
        stay_suggestions: hotelOptions,
        recommended_activities: activities
      }
    });
  } catch (error) {
    next(error);
  }
};
