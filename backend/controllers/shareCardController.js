const { Trip, Stop, City, Booking } = require('../models');

exports.generateShareCard = async (req, res, next) => {
  try {
    const { tripId } = req.params;

    const trip = await Trip.findByPk(tripId, {
      include: [
        { model: Stop, as: 'stops', include: [{ model: City, as: 'city' }] },
        { model: Booking, as: 'bookings' }
      ]
    });

    if (!trip) {
      return res.status(404).json({ success: false, error: 'Trip not found.' });
    }

    const citiesList = trip.stops.map(s => s.city ? s.city.name : '').filter(Boolean).join(' ➔ ');
    const totalCost = trip.bookings ? trip.bookings.reduce((acc, b) => acc + parseFloat(b.cost || 0), 0) : 0;
    const coverImage = trip.cover_photo_url || 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800';

    // Generate responsive SVG social media collage card template
    const cardSvg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600">
      <defs>
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#0F172A;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#1E293B;stop-opacity:1" />
        </linearGradient>
        <clipPath id="card-img">
          <rect x="40" y="100" width="720" height="300" rx="16" />
        </clipPath>
      </defs>

      <!-- Background -->
      <rect width="800" height="600" fill="url(#grad)" />

      <!-- Decorative Header Badge -->
      <rect x="40" y="30" width="160" height="36" rx="18" fill="#3B82F6" />
      <text x="120" y="53" font-family="Arial, sans-serif" font-size="14" font-weight="bold" fill="#FFFFFF" text-anchor="middle">GlobeTrotter</text>

      <!-- Main Trip Title -->
      <text x="40" y="85" font-family="Arial, sans-serif" font-size="28" font-weight="bold" fill="#F8FAFC">${trip.name}</text>

      <!-- Cover Photo / Collage Container -->
      <image href="${coverImage}" x="40" y="100" width="720" height="300" preserveAspectRatio="xMidYMid slice" clip-path="url(#card-img)" />

      <!-- Footer Info Overlay Card -->
      <rect x="40" y="420" width="720" height="140" rx="16" fill="#1E293B" stroke="#334155" stroke-width="2" />

      <!-- Route & Cities -->
      <text x="70" y="460" font-family="Arial, sans-serif" font-size="14" fill="#94A3B8">ROUTE &amp; DESTINATIONS</text>
      <text x="70" y="490" font-family="Arial, sans-serif" font-size="20" font-weight="bold" fill="#38BDF8">${citiesList || trip.name}</text>

      <!-- Travel Dates -->
      <text x="420" y="460" font-family="Arial, sans-serif" font-size="14" fill="#94A3B8">TRAVEL DATES</text>
      <text x="420" y="490" font-family="Arial, sans-serif" font-size="18" font-weight="bold" fill="#F8FAFC">${trip.start_date} to ${trip.end_date}</text>

      <!-- Cost Badge -->
      <rect x="620" y="445" width="120" height="60" rx="12" fill="#10B981" />
      <text x="680" y="470" font-family="Arial, sans-serif" font-size="12" fill="#FFFFFF" text-anchor="middle">ESTIMATED COST</text>
      <text x="680" y="493" font-family="Arial, sans-serif" font-size="20" font-weight="bold" fill="#FFFFFF" text-anchor="middle">₹${totalCost.toLocaleString('en-IN')}</text>

      <!-- Watermark -->
      <text x="40" y="580" font-family="Arial, sans-serif" font-size="12" fill="#64748B">Planned with GlobeTrotter India ✈️ • #GlobeTrotterTrips</text>
    </svg>
    `;

    const format = req.query.format;
    if (format === 'svg') {
      res.setHeader('Content-Type', 'image/svg+xml');
      return res.send(cardSvg);
    }

    res.json({
      success: true,
      data: {
        trip_id: trip.id,
        trip_name: trip.name,
        cities: citiesList,
        dates: `${trip.start_date} to ${trip.end_date}`,
        total_cost: `₹${totalCost}`,
        svg_card_code: cardSvg,
        card_preview_url: `/api/v1/share-card/trips/${trip.id}?format=svg`
      }
    });
  } catch (error) {
    next(error);
  }
};
