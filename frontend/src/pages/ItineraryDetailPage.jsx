import { useState } from 'react';

const TRIP_DETAILS_MAP = {
  'amalfi-coast': {
    id: 'amalfi-coast',
    title: 'Amalfi Coast Escape',
    status: 'Upcoming',
    subtitle: 'Positano, Italy · 8 Days',
    heroImage: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1600&q=80',
    dates: 'Oct 10 - Oct 17, 2026',
    cities: '3 Cities',
    totalBudget: '₹2,15,000',
    weather: '24°C',
    monthName: 'October 2026',
    year: 2026,
    monthIndex: 9, // Oct (0-indexed)
    startDayOffset: 4, // Thursday
    daysInMonth: 31,
    tripStartDay: 10,
    tripEndDay: 17,
    dayInfo: {
      number: 'Day 1 · Oct 10 · Positano',
      pace: 'Relaxed Pace',
      temp: '24°C Sunny',
    },
    activities: [
      {
        id: 1,
        time: '09:00 AM',
        cost: '₹45,000',
        type: 'flight',
        title: 'Emirates EK-512',
        description: 'BOM to FCO • Direct • 7h 45m',
        icon: 'flight',
        color: 'text-primary-container',
        image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=400&q=80',
      },
      {
        id: 2,
        time: '02:00 PM',
        cost: '₹1,20,000',
        type: 'hotel',
        title: 'Le Sirenuse Hotel',
        description: 'Check-in • Cliffside Ocean View Suite',
        icon: 'hotel',
        color: 'text-teal-600',
        hasMap: true,
        mapQuery: 'Le Sirenuse Hotel Positano Italy',
        mapUrl: 'https://www.google.com/maps/search/?api=1&query=Le+Sirenuse+Hotel+Positano+Italy',
        image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=400&q=80',
      },
      {
        id: 3,
        time: '07:00 PM',
        cost: '₹15,000',
        type: 'restaurant',
        title: 'La Sponda Restaurant',
        description: 'Michelin Star Sunset Dinner • Seafood Tasting Menu',
        icon: 'restaurant',
        color: 'text-primary-container',
        hasMap: true,
        mapQuery: 'La Sponda Restaurant Positano Italy',
        mapUrl: 'https://www.google.com/maps/search/?api=1&query=La+Sponda+Restaurant+Positano+Italy',
        tip: 'Lit by 400 candles every evening. Advance booking required.',
        image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=400&q=80',
      },
    ],
    itemizedBudget: {
      flights: [
        { label: 'Outbound Flight (BOM → FCO)', price: '₹22,500' },
        { label: 'Return Flight (FCO → BOM)', price: '₹22,500' },
      ],
      hotels: [
        { label: 'Le Sirenuse Ocean Suite (7 Nights × ₹17,142/night)', price: '₹1,20,000' },
      ],
      dining: [
        { label: 'La Sponda Michelin Dinner (2 Pax)', price: '₹15,000' },
        { label: 'Positano Beach Club Lunches', price: '₹10,000' },
      ],
      activities: [
        { label: 'Private Boat Charter to Capri Island', price: '₹20,000' },
        { label: 'Path of the Gods Guided Hike & Entry', price: '₹5,000' },
      ],
    },
    budgetBreakdown: [
      { category: 'Flights', amount: '₹45,000', color: 'bg-primary-container', percentage: 21 },
      { category: 'Hotels', amount: '₹1,20,000', color: 'bg-teal-600', percentage: 56 },
      { category: 'Activities & Dining', amount: '₹50,000', color: 'bg-yellow-500', percentage: 23 },
    ],
  },

  'maldives-retreat': {
    id: 'maldives-retreat',
    title: 'Maldives Retreat',
    status: 'Past',
    subtitle: 'Male, Maldives · 7 Days',
    heroImage: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=1600&q=80',
    dates: 'Jan 10 - Jan 17, 2025',
    cities: '2 Islands',
    totalBudget: '₹1,80,000',
    weather: '29°C',
    monthName: 'January 2025',
    year: 2025,
    monthIndex: 0,
    startDayOffset: 3, // Wednesday
    daysInMonth: 31,
    tripStartDay: 10,
    tripEndDay: 17,
    dayInfo: {
      number: 'Day 1 · Jan 10 · Male',
      pace: 'Leisure Pace',
      temp: '29°C Clear Skies',
    },
    activities: [
      {
        id: 1,
        time: '10:30 AM',
        cost: '₹28,000',
        type: 'flight',
        title: 'Maldivian Air Q2-701',
        description: 'BLR to MLE • Seaplane Transfer Included',
        icon: 'flight',
        color: 'text-primary-container',
        image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=400&q=80',
      },
      {
        id: 2,
        time: '01:30 PM',
        cost: '₹1,10,000',
        type: 'hotel',
        title: 'Soneva Fushi Villa',
        description: 'Check-in • Sunset Water Villa with Private Pool',
        icon: 'hotel',
        color: 'text-teal-600',
        hasMap: true,
        mapQuery: 'Soneva Fushi Maldives',
        mapUrl: 'https://www.google.com/maps/search/?api=1&query=Soneva+Fushi+Maldives',
        image: 'https://images.unsplash.com/photo-1573843981267-be1999ff37cd?auto=format&fit=crop&w=400&q=80',
      },
      {
        id: 3,
        time: '06:30 PM',
        cost: '₹18,000',
        type: 'restaurant',
        title: 'Subsix Underwater Dining',
        description: 'Deep Sea Gourmet Dinner • Champagne Toast',
        icon: 'restaurant',
        color: 'text-primary-container',
        hasMap: true,
        mapQuery: 'Subsix Underwater Restaurant Maldives',
        mapUrl: 'https://www.google.com/maps/search/?api=1&query=Subsix+Underwater+Restaurant+Maldives',
        tip: 'Located 6 meters below ocean level. Unique marine reef view.',
        image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=400&q=80',
      },
    ],
    itemizedBudget: {
      flights: [
        { label: 'Roundtrip Flight + Seaplane', price: '₹28,000' },
      ],
      hotels: [
        { label: 'Water Villa (7 Nights × ₹15,714/night)', price: '₹1,10,000' },
      ],
      dining: [
        { label: 'Subsix Underwater Dinner', price: '₹18,000' },
        { label: 'Resort Beach Buffet', price: '₹12,000' },
      ],
      activities: [
        { label: 'Coral Reef Snorkeling & Scuba Diving', price: '₹12,000' },
      ],
    },
    budgetBreakdown: [
      { category: 'Flights', amount: '₹28,000', color: 'bg-primary-container', percentage: 16 },
      { category: 'Hotels', amount: '₹1,10,000', color: 'bg-teal-600', percentage: 61 },
      { category: 'Activities & Dining', amount: '₹42,000', color: 'bg-yellow-500', percentage: 23 },
    ],
  },

  'peru-adventure': {
    id: 'peru-adventure',
    title: 'Peru Adventure',
    status: 'Drafts',
    subtitle: 'Cusco & Machu Picchu · 12 Days',
    heroImage: 'https://images.unsplash.com/photo-1526392060635-9d6019884377?auto=format&fit=crop&w=1600&q=80',
    dates: 'Nov 12 - Nov 24, 2026',
    cities: '4 Cities',
    totalBudget: '₹2,45,000',
    weather: '18°C',
    monthName: 'November 2026',
    year: 2026,
    monthIndex: 10,
    startDayOffset: 0, // Sunday
    daysInMonth: 30,
    tripStartDay: 12,
    tripEndDay: 24,
    dayInfo: {
      number: 'Day 1 · Nov 12 · Cusco',
      pace: 'Active Altitude Pace',
      temp: '18°C Sunny Altitude',
    },
    activities: [
      {
        id: 1,
        time: '06:00 AM',
        cost: '₹65,000',
        type: 'flight',
        title: 'LATAM Airlines LA-2401',
        description: 'DEL to CUZ via Lima • 2 Stops',
        icon: 'flight',
        color: 'text-primary-container',
        image: 'https://images.unsplash.com/photo-1506012787146-f92b2d7d6d96?auto=format&fit=crop&w=400&q=80',
      },
      {
        id: 2,
        time: '03:00 PM',
        cost: '₹95,000',
        type: 'hotel',
        title: 'Belmond Hotel Monasterio',
        description: 'Check-in • Oxygen-Enriched Heritage Suite',
        icon: 'hotel',
        color: 'text-teal-600',
        hasMap: true,
        mapQuery: 'Belmond Hotel Monasterio Cusco Peru',
        mapUrl: 'https://www.google.com/maps/search/?api=1&query=Belmond+Hotel+Monasterio+Cusco+Peru',
        image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=400&q=80',
      },
      {
        id: 3,
        time: '07:30 PM',
        cost: '₹12,000',
        type: 'restaurant',
        title: 'Cicciolina Cusco',
        description: 'Traditional Andean Fusion Dinner • Coca Leaf Tea',
        icon: 'restaurant',
        color: 'text-primary-container',
        hasMap: true,
        mapQuery: 'Cicciolina Restaurant Cusco Peru',
        mapUrl: 'https://www.google.com/maps/search/?api=1&query=Cicciolina+Restaurant+Cusco+Peru',
        tip: 'Rest and sip coca tea on Day 1 to adjust to Cusco altitude.',
        image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=400&q=80',
      },
    ],
    itemizedBudget: {
      flights: [
        { label: 'International Flights (DEL → CUZ)', price: '₹65,000' },
      ],
      hotels: [
        { label: 'Belmond Heritage Suite (12 Nights × ₹7,916/night)', price: '₹95,000' },
      ],
      dining: [
        { label: 'Cicciolina & Traditional Dining', price: '₹25,000' },
      ],
      activities: [
        { label: 'Machu Picchu Vistadome Train & Entry', price: '₹40,000' },
        { label: 'Sacred Valley Guided Day Tour', price: '₹20,000' },
      ],
    },
    budgetBreakdown: [
      { category: 'Flights', amount: '₹65,000', color: 'bg-primary-container', percentage: 27 },
      { category: 'Hotels', amount: '₹95,000', color: 'bg-teal-600', percentage: 39 },
      { category: 'Activities & Dining', amount: '₹85,000', color: 'bg-yellow-500', percentage: 34 },
    ],
  },
};

export default function ItineraryDetailPage({ trip, onBack }) {
  const [viewTab, setViewTab] = useState('timeline'); // 'timeline' | 'calendar'
  const [activeMapModal, setActiveMapModal] = useState(null);
  const [showFullBudgetModal, setShowFullBudgetModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [selectedCalendarDay, setSelectedCalendarDay] = useState(null);
  const [copyToast, setCopyToast] = useState(false);

  // Match trip details or fallback to Amalfi
  const tripKey = trip?.id && TRIP_DETAILS_MAP[trip.id] ? trip.id : 'amalfi-coast';
  const data = TRIP_DETAILS_MAP[tripKey];
  const tripStatus = trip?.status || data.status || 'Upcoming';

  const shareText = `Check out my itinerary for ${data.title} (${data.dates}) on GlobeTrotter! ✈️`;
  const shareUrl = `https://globetrotter.app/trips/${data.id}`;

  const handleShareClick = (platform) => {
    if (platform === 'whatsapp') {
      window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`, '_blank');
    } else if (platform === 'twitter') {
      window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`, '_blank');
    } else if (platform === 'instagram') {
      navigator.clipboard.writeText(shareText + ' ' + shareUrl);
      alert('📸 Link copied! Opening Instagram… Paste it in your story or bio!');
      window.open('https://www.instagram.com', '_blank');
    } else if (platform === 'copy') {
      navigator.clipboard.writeText(shareUrl);
      setCopyToast(true);
      setTimeout(() => setCopyToast(false), 2500);
    }
  };

  return (
    <div className="min-h-screen bg-background text-on-surface pt-14 pb-16 relative">
      {/* Toast Notification */}
      {copyToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-inverse-surface text-white px-4 py-3 rounded-2xl shadow-2xl border border-white/20 flex items-center gap-2 text-xs font-bold animate-in fade-in duration-200">
          <span className="material-symbols-outlined text-emerald-400 text-base">check_circle</span>
          Link copied to clipboard!
        </div>
      )}

      {/* Hero Banner */}
      <section className="relative w-full h-[45vh] min-h-[320px] max-h-[500px] overflow-hidden">
        <img
          src={data.heroImage}
          alt={data.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/20" />

        {/* Top Controls */}
        <div className="absolute top-4 left-4 right-4 flex justify-between items-center max-w-6xl mx-auto w-full px-4 sm:px-6 z-20">
          <button
            onClick={onBack}
            className="bg-white/25 hover:bg-white/40 text-white backdrop-blur-md p-2.5 rounded-full transition-all flex items-center justify-center cursor-pointer shadow-md"
            title="Back to My Trips"
          >
            <span className="material-symbols-outlined text-xl">arrow_back</span>
          </button>

          <div className="flex gap-2">
            {tripStatus === 'Drafts' && (
              <button
                onClick={() => alert('✏️ Edit mode enabled for this Draft trip!')}
                className="bg-white/25 hover:bg-white/40 text-white backdrop-blur-md p-2.5 rounded-full transition-all flex items-center justify-center cursor-pointer shadow-md"
                title="Edit Itinerary"
              >
                <span className="material-symbols-outlined text-xl">edit</span>
              </button>
            )}
            <button
              onClick={() => setShowShareModal(true)}
              className="bg-white/25 hover:bg-white/40 text-white backdrop-blur-md p-2.5 rounded-full transition-all flex items-center justify-center cursor-pointer shadow-md"
              title="Share Trip"
            >
              <span className="material-symbols-outlined text-xl">share</span>
            </button>
            <button
              onClick={() => alert(`📥 Downloading PDF Itinerary for ${data.title}…`)}
              className="bg-white/25 hover:bg-white/40 text-white backdrop-blur-md p-2.5 rounded-full transition-all flex items-center justify-center cursor-pointer shadow-md"
              title="Download Itinerary"
            >
              <span className="material-symbols-outlined text-xl">download</span>
            </button>
          </div>
        </div>

        {/* Title & Badges */}
        <div className="absolute bottom-6 left-4 right-4 max-w-6xl mx-auto px-4 sm:px-6 z-20">
          <div className="flex items-center gap-2 mb-2">
            <span className={`px-3 py-1 rounded-full text-xs font-bold shadow-sm ${
              tripStatus === 'Upcoming' ? 'bg-primary-container text-white' :
              tripStatus === 'Past' ? 'bg-surface-container-high text-on-surface-variant' :
              'bg-white text-on-surface border border-surface-container-highest'
            }`}>
              {tripStatus === 'Upcoming' ? '✈️ Upcoming Trip' : tripStatus === 'Past' ? '🏆 Completed Trip' : '✏️ Draft Trip'}
            </span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-3 drop-shadow-md">
            {data.title}
          </h1>
          <div className="flex flex-wrap gap-2.5">
            <span className="bg-white/20 backdrop-blur-md border border-white/40 text-white px-3.5 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5 shadow-sm">
              <span className="material-symbols-outlined text-sm">calendar_month</span>
              {data.dates}
            </span>
            <span className="bg-white/20 backdrop-blur-md border border-white/40 text-white px-3.5 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5 shadow-sm">
              <span className="material-symbols-outlined text-sm">location_on</span>
              {data.cities}
            </span>
          </div>
        </div>
      </section>

      {/* Sticky Sub-header */}
      <div className="sticky top-14 z-30 bg-surface/90 backdrop-blur-md border-b border-surface-container-highest shadow-sm py-3 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-3">
          {/* View Toggle */}
          <div className="bg-surface-container rounded-full p-1 flex">
            <button
              onClick={() => setViewTab('timeline')}
              className={`px-5 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                viewTab === 'timeline'
                  ? 'bg-primary-container text-white shadow-sm'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              <span className="material-symbols-outlined text-sm">timeline</span>
              Timeline
            </button>
            <button
              onClick={() => setViewTab('calendar')}
              className={`px-5 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                viewTab === 'calendar'
                  ? 'bg-primary-container text-white shadow-sm'
                  : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              <span className="material-symbols-outlined text-sm">calendar_view_month</span>
              Calendar
            </button>
          </div>

          {/* Budget & Weather Strip */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowFullBudgetModal(true)}
              className="flex items-center gap-2 bg-surface-container border border-surface-container-highest hover:border-primary-container/40 px-3.5 py-1.5 rounded-full text-xs font-bold text-on-surface hover:text-primary transition-all cursor-pointer shadow-xs"
            >
              <span className="material-symbols-outlined text-primary-container text-base">account_balance_wallet</span>
              <span>{data.totalBudget} total</span>
            </button>
            <div className="flex items-center gap-2 bg-surface-container border border-surface-container-highest px-3.5 py-1.5 rounded-full text-xs font-bold text-on-surface">
              <span className="material-symbols-outlined text-amber-500 text-base">light_mode</span>
              <span>{data.weather}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 mt-8 flex flex-col lg:flex-row gap-8">
        {/* Left: Timeline or Full Month Calendar (68%) */}
        <div className="w-full lg:w-[68%]">
          {viewTab === 'timeline' ? (
            <>
              {/* Day Header Banner */}
              <div className="sticky top-28 z-20 bg-gradient-to-r from-orange-100 via-orange-50 to-amber-50 px-5 py-3.5 rounded-2xl shadow-sm border border-orange-200 mb-6 flex justify-between items-center">
                <div>
                  <h2 className="font-display text-base sm:text-lg font-bold text-on-surface mb-0.5">
                    {data.dayInfo.number}
                  </h2>
                  <div className="flex items-center gap-2">
                    <span className="flex items-center gap-1 text-xs font-semibold text-emerald-700">
                      <span className="w-2 h-2 rounded-full bg-emerald-500" />
                      {data.dayInfo.pace}
                    </span>
                  </div>
                </div>
                <div className="bg-white/80 p-2 rounded-full shadow-sm">
                  <span className="material-symbols-outlined text-amber-500 text-2xl">wb_sunny</span>
                </div>
              </div>

              {/* Activities Timeline */}
              <div className="pl-2 sm:pl-4 space-y-6 relative border-l-2 border-dashed border-primary-container/40 ml-4 sm:ml-6">
                {data.activities.map((act) => (
                  <div key={act.id} className="relative pl-6 sm:pl-8 group">
                    {/* Circle Icon Badge */}
                    <div className="absolute -left-5 top-0 bg-white border-2 border-primary-container w-9 h-9 rounded-full flex items-center justify-center shadow-sm z-10">
                      <span className={`material-symbols-outlined text-lg ${act.color}`}>{act.icon}</span>
                    </div>

                    {/* Card Content */}
                    <div className="bg-white rounded-2xl p-5 shadow-sm hover:shadow-lg transition-all duration-300 border border-surface-container-highest group-hover:border-primary-container/30">
                      <div className="flex flex-col sm:flex-row justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-xs font-bold text-on-surface-variant bg-surface-container px-2.5 py-0.5 rounded">
                              {act.time}
                            </span>
                            <span className="bg-surface-container text-on-surface font-bold text-xs px-2.5 py-0.5 rounded-full border border-surface-container-highest">
                              {act.cost}
                            </span>
                          </div>

                          <h3 className="font-display text-base font-bold text-on-surface mb-1">
                            {act.title}
                          </h3>
                          <p className="text-xs text-on-surface-variant mb-2 font-medium">
                            {act.description}
                          </p>

                          {/* Real Location Map Trigger */}
                          {act.hasMap && (
                            <button
                              type="button"
                              onClick={() =>
                                setActiveMapModal({
                                  title: act.title,
                                  query: act.mapQuery,
                                  url: act.mapUrl,
                                })
                              }
                              className="text-teal-700 font-bold text-xs flex items-center gap-1 hover:underline cursor-pointer mt-1 bg-teal-50 px-2.5 py-1 rounded-lg border border-teal-200 transition-colors w-fit"
                            >
                              <span className="material-symbols-outlined text-sm">map</span>
                              View Real Location on Map 📍
                            </button>
                          )}

                          {act.tip && (
                            <div className="mt-3 bg-amber-50 border-l-3 border-amber-500 p-2.5 rounded-r-lg flex items-start gap-2">
                              <span className="material-symbols-outlined text-amber-600 text-base mt-0.5">lightbulb</span>
                              <p className="text-xs text-on-surface-variant italic font-medium">{act.tip}</p>
                            </div>
                          )}
                        </div>

                        {/* Image Thumbnail */}
                        {act.image && (
                          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden shrink-0 border border-surface-container-highest">
                            <img src={act.image} alt={act.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            /* 📅 Full Month Calendar View (Request 1) */
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-surface-container-highest space-y-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-surface-container-highest pb-4">
                <div>
                  <h3 className="font-display text-xl font-extrabold text-on-surface flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary-container text-2xl">calendar_month</span>
                    {data.monthName}
                  </h3>
                  <p className="text-xs text-on-surface-variant font-medium mt-0.5">
                    Highlighted dates indicate scheduled travel days for <span className="font-bold text-on-surface">{data.title}</span> ({tripStatus})
                  </p>
                </div>

                <div className="flex items-center gap-2 bg-surface-container px-3 py-1 rounded-full text-xs font-bold text-on-surface border border-surface-container-highest">
                  <span className="w-2.5 h-2.5 rounded-full bg-primary-container" />
                  <span>Trip Days ({data.tripStartDay} - {data.tripEndDay})</span>
                </div>
              </div>

              {/* Full Month Calendar Grid (7 columns) */}
              <div className="w-full overflow-x-auto">
                <div className="min-w-[500px]">
                  {/* Days of week header */}
                  <div className="grid grid-cols-7 gap-2 text-center text-xs font-bold text-on-surface-variant py-2 border-b border-surface-container-highest mb-2">
                    <div className="text-red-500">SUN</div>
                    <div>MON</div>
                    <div>TUE</div>
                    <div>WED</div>
                    <div>THU</div>
                    <div>FRI</div>
                    <div>SAT</div>
                  </div>

                  {/* Month days cells */}
                  <div className="grid grid-cols-7 gap-2">
                    {/* Empty padding cells for start day offset */}
                    {Array.from({ length: data.startDayOffset }).map((_, idx) => (
                      <div key={`empty-${idx}`} className="h-20 bg-surface-container/30 rounded-2xl border border-transparent" />
                    ))}

                    {/* Days 1 to daysInMonth */}
                    {Array.from({ length: data.daysInMonth }).map((_, idx) => {
                      const dayNum = idx + 1;
                      const isTripDay = dayNum >= data.tripStartDay && dayNum <= data.tripEndDay;
                      const isSelected = selectedCalendarDay === dayNum;

                      return (
                        <div
                          key={dayNum}
                          onClick={() => isTripDay && setSelectedCalendarDay(dayNum)}
                          className={`h-20 p-2 rounded-2xl border transition-all flex flex-col justify-between relative text-left ${
                            isTripDay
                              ? 'bg-gradient-to-br from-orange-500 to-amber-500 text-white shadow-md border-orange-600 hover:scale-[1.03] cursor-pointer'
                              : 'bg-white text-on-surface border-surface-container-highest hover:border-surface-container-high'
                          } ${isSelected ? 'ring-4 ring-primary-container/40' : ''}`}
                        >
                          <div className="flex justify-between items-center">
                            <span className={`text-xs font-extrabold ${isTripDay ? 'text-white' : 'text-on-surface'}`}>
                              {dayNum}
                            </span>
                            {isTripDay && (
                              <span className="material-symbols-outlined text-xs text-white/90">flight_takeoff</span>
                            )}
                          </div>

                          {isTripDay && (
                            <div className="text-[10px] font-bold bg-black/20 text-white px-1.5 py-0.5 rounded truncate">
                              Day {dayNum - data.tripStartDay + 1}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Selected Day Details Box */}
              {selectedCalendarDay && (
                <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-orange-200 rounded-2xl p-4 flex items-center justify-between text-xs animate-in fade-in duration-200">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-primary-container text-2xl">event_available</span>
                    <div>
                      <h4 className="font-bold text-on-surface">
                        Day {selectedCalendarDay - data.tripStartDay + 1} ({data.monthName.split(' ')[0]} {selectedCalendarDay})
                      </h4>
                      <p className="text-on-surface-variant font-medium">
                        Activities scheduled: Sightseeing, dining & hotel stay.
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setViewTab('timeline')}
                    className="bg-primary-container text-white px-4 py-1.5 rounded-full font-bold hover:bg-primary transition-colors cursor-pointer"
                  >
                    View in Timeline
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Right: Sidebar (32%) */}
        <div className="w-full lg:w-[32%] space-y-6">
          {/* Trip Summary Card */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-surface-container-highest">
            <h3 className="font-display text-base font-bold text-on-surface mb-4">Trip Summary</h3>

            {/* Donut Chart Visual */}
            <div className="flex items-center justify-center mb-6">
              <div
                className="relative w-28 h-28 rounded-full flex items-center justify-center shadow-inner"
                style={{ background: 'conic-gradient(#EA580C 0% 30%, #0D9488 30% 75%, #D97706 75% 100%)' }}
              >
                <div className="w-20 h-20 bg-white rounded-full flex flex-col items-center justify-center">
                  <span className="text-[10px] text-on-surface-variant uppercase font-bold tracking-wider">Total</span>
                  <span className="font-display font-extrabold text-sm text-on-surface">{data.totalBudget}</span>
                </div>
              </div>
            </div>

            {/* Budget Category List */}
            <div className="space-y-2.5 mb-5 text-xs">
              {data.budgetBreakdown.map((item) => (
                <div key={item.category} className="flex justify-between items-center font-medium">
                  <div className="flex items-center gap-2">
                    <span className={`w-2.5 h-2.5 rounded-full ${item.color}`} />
                    <span className="text-on-surface-variant">{item.category}</span>
                  </div>
                  <span className="font-bold text-on-surface">{item.amount}</span>
                </div>
              ))}
            </div>

            {/* View Full Budget Button (Request 2) */}
            <button
              onClick={() => setShowFullBudgetModal(true)}
              className="w-full py-2.5 rounded-xl border-2 border-teal-700 text-teal-700 font-bold text-xs hover:bg-teal-700 hover:text-white transition-colors cursor-pointer flex items-center justify-center gap-1.5"
            >
              <span className="material-symbols-outlined text-sm">receipt_long</span>
              View Full Budget Details
            </button>
          </div>

          {/* Weather Forecast Card */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-surface-container-highest">
            <h3 className="font-display text-sm font-bold text-on-surface mb-3">Forecast</h3>
            <div className="flex justify-between text-center">
              <div className="flex flex-col items-center gap-1">
                <span className="text-[11px] font-bold text-on-surface-variant">SUN</span>
                <span className="material-symbols-outlined text-amber-500 text-xl">wb_sunny</span>
                <span className="font-bold text-xs">28°</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <span className="text-[11px] font-bold text-on-surface-variant">MON</span>
                <span className="material-symbols-outlined text-amber-500 text-xl">partly_cloudy_day</span>
                <span className="font-bold text-xs">27°</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <span className="text-[11px] font-bold text-on-surface-variant">TUE</span>
                <span className="material-symbols-outlined text-slate-400 text-xl">cloud</span>
                <span className="font-bold text-xs">26°</span>
              </div>
            </div>
          </div>

          {/* Quick Actions Card (Request 3 - logic based on trip status) */}
          <div className="bg-white rounded-2xl p-5 shadow-sm border border-surface-container-highest space-y-3">
            <h3 className="font-display text-sm font-bold text-on-surface flex items-center justify-between">
              <span>Quick Actions</span>
              <span className="text-[11px] font-semibold text-on-surface-variant bg-surface-container px-2 py-0.5 rounded-full">
                {tripStatus}
              </span>
            </h3>

            {/* Status-specific banners & rules */}
            {tripStatus === 'Past' && (
              <div className="bg-slate-100 border border-slate-300 p-3 rounded-xl text-xs font-semibold text-slate-700 flex items-center gap-2">
                <span className="material-symbols-outlined text-amber-600 text-base">emoji_events</span>
                <span>Trip Completed — Itinerary archived & finalised.</span>
              </div>
            )}

            {tripStatus === 'Upcoming' && (
              <div className="bg-amber-50 border border-amber-200 p-3 rounded-xl text-xs font-semibold text-amber-800 flex items-center gap-2">
                <span className="material-symbols-outlined text-amber-600 text-base">lock</span>
                <span>Your trip is finalised and can't be edited.</span>
              </div>
            )}

            <div className="space-y-2 pt-1">
              {/* Edit Itinerary button — ONLY shown for Drafts */}
              {tripStatus === 'Drafts' && (
                <button
                  onClick={() => alert(`✏️ Editing Draft itinerary for ${data.title}…`)}
                  className="flex items-center gap-2.5 w-full p-2.5 rounded-xl hover:bg-surface-container transition-colors text-left text-xs font-semibold text-on-surface cursor-pointer"
                >
                  <span className="material-symbols-outlined text-on-surface-variant text-base">edit_square</span>
                  <span>Edit Itinerary</span>
                </button>
              )}

              {/* Invite / Share button — shown for Upcoming and Drafts */}
              {tripStatus !== 'Past' && (
                <button
                  onClick={() => setShowShareModal(true)}
                  className="flex items-center gap-2.5 w-full p-2.5 rounded-xl hover:bg-surface-container transition-colors text-left text-xs font-semibold text-on-surface cursor-pointer"
                >
                  <span className="material-symbols-outlined text-on-surface-variant text-base">group_add</span>
                  <span>Invite Collaborators / Share</span>
                </button>
              )}

              {/* Export Calendar */}
              <button
                onClick={() => alert(`📅 Exporting ${data.title} schedule to Google Calendar…`)}
                className="flex items-center gap-2.5 w-full p-2.5 rounded-xl hover:bg-surface-container transition-colors text-left text-xs font-semibold text-on-surface cursor-pointer"
              >
                <span className="material-symbols-outlined text-on-surface-variant text-base">event</span>
                <span>Export Calendar</span>
              </button>

              {/* Download Memories PDF (for Past) */}
              {tripStatus === 'Past' && (
                <button
                  onClick={() => alert(`📸 Downloading Trip Memories Album PDF for ${data.title}…`)}
                  className="flex items-center gap-2.5 w-full p-2.5 rounded-xl hover:bg-surface-container transition-colors text-left text-xs font-semibold text-on-surface cursor-pointer"
                >
                  <span className="material-symbols-outlined text-on-surface-variant text-base">photo_library</span>
                  <span>Download Memories PDF</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 🧾 Itemized Full Budget Modal (Request 2) */}
      {showFullBudgetModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 relative shadow-2xl border border-surface-container-highest flex flex-col max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="flex justify-between items-center pb-3 border-b border-surface-container-highest">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary-container text-2xl">account_balance_wallet</span>
                <div>
                  <h3 className="font-display font-extrabold text-lg text-on-surface">Itemized Budget Breakdown</h3>
                  <p className="text-xs text-on-surface-variant font-medium">{data.title} · Total: <span className="font-bold text-primary">{data.totalBudget}</span></p>
                </div>
              </div>
              <button
                onClick={() => setShowFullBudgetModal(false)}
                className="text-on-surface-variant hover:text-on-surface p-1.5 rounded-full hover:bg-surface-container transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-xl">close</span>
              </button>
            </div>

            {/* Content Sections */}
            <div className="py-4 space-y-5 text-xs">
              {/* Flights */}
              <div className="bg-surface-container/50 rounded-2xl p-4 border border-surface-container-highest">
                <h4 className="font-bold text-on-surface flex items-center gap-1.5 text-sm mb-2">
                  <span className="material-symbols-outlined text-primary-container text-base">flight</span>
                  Flights Breakdown
                </h4>
                <div className="space-y-1.5">
                  {data.itemizedBudget.flights.map((item, idx) => (
                    <div key={idx} className="flex justify-between text-on-surface-variant font-medium">
                      <span>{item.label}</span>
                      <span className="font-bold text-on-surface">{item.price}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Hotels */}
              <div className="bg-surface-container/50 rounded-2xl p-4 border border-surface-container-highest">
                <h4 className="font-bold text-on-surface flex items-center gap-1.5 text-sm mb-2">
                  <span className="material-symbols-outlined text-teal-600 text-base">hotel</span>
                  Hotels & Accommodations Breakdown
                </h4>
                <div className="space-y-1.5">
                  {data.itemizedBudget.hotels.map((item, idx) => (
                    <div key={idx} className="flex justify-between text-on-surface-variant font-medium">
                      <span>{item.label}</span>
                      <span className="font-bold text-on-surface">{item.price}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Dining */}
              <div className="bg-surface-container/50 rounded-2xl p-4 border border-surface-container-highest">
                <h4 className="font-bold text-on-surface flex items-center gap-1.5 text-sm mb-2">
                  <span className="material-symbols-outlined text-amber-600 text-base">restaurant</span>
                  Dining & Culinary Expenses
                </h4>
                <div className="space-y-1.5">
                  {data.itemizedBudget.dining.map((item, idx) => (
                    <div key={idx} className="flex justify-between text-on-surface-variant font-medium">
                      <span>{item.label}</span>
                      <span className="font-bold text-on-surface">{item.price}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Activities */}
              <div className="bg-surface-container/50 rounded-2xl p-4 border border-surface-container-highest">
                <h4 className="font-bold text-on-surface flex items-center gap-1.5 text-sm mb-2">
                  <span className="material-symbols-outlined text-purple-600 text-base">local_activity</span>
                  Activities & Excursions Breakdown
                </h4>
                <div className="space-y-1.5">
                  {data.itemizedBudget.activities.map((item, idx) => (
                    <div key={idx} className="flex justify-between text-on-surface-variant font-medium">
                      <span>{item.label}</span>
                      <span className="font-bold text-on-surface">{item.price}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Grand Total Footer */}
              <div className="bg-primary-container/10 border border-primary-container/30 rounded-2xl p-4 flex justify-between items-center text-sm font-extrabold">
                <span className="text-on-surface">Grand Total Budget</span>
                <span className="text-primary-container text-base">{data.totalBudget}</span>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex gap-2 justify-end pt-2">
              <button
                onClick={() => alert('📄 Exporting budget receipt as PDF…')}
                className="bg-primary-container text-white px-5 py-2 rounded-xl text-xs font-bold hover:bg-primary transition-colors cursor-pointer"
              >
                Download Budget Receipt PDF
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 📲 Social Share Modal (Request 3 - WhatsApp, X, Instagram, Copy Link) */}
      {showShareModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 relative shadow-2xl border border-surface-container-highest flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-display font-bold text-base text-on-surface flex items-center gap-2">
                <span className="material-symbols-outlined text-primary-container">share</span>
                Share {data.title}
              </h3>
              <button
                onClick={() => setShowShareModal(false)}
                className="text-on-surface-variant hover:text-on-surface p-1.5 rounded-full hover:bg-surface-container transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-xl">close</span>
              </button>
            </div>

            <p className="text-xs text-on-surface-variant font-medium mb-5">
              Invite friends to collaborate or share your trip itinerary on social platforms:
            </p>

            <div className="grid grid-cols-2 gap-3 mb-4">
              <button
                onClick={() => handleShareClick('whatsapp')}
                className="flex items-center justify-center gap-2 p-3 rounded-2xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 font-bold text-xs transition-colors cursor-pointer"
              >
                <span>WhatsApp</span>
              </button>
              <button
                onClick={() => handleShareClick('twitter')}
                className="flex items-center justify-center gap-2 p-3 rounded-2xl bg-sky-50 hover:bg-sky-100 text-sky-700 border border-sky-200 font-bold text-xs transition-colors cursor-pointer"
              >
                <span>X (Twitter)</span>
              </button>
              <button
                onClick={() => handleShareClick('instagram')}
                className="flex items-center justify-center gap-2 p-3 rounded-2xl bg-pink-50 hover:bg-pink-100 text-pink-700 border border-pink-200 font-bold text-xs transition-colors cursor-pointer"
              >
                <span>Instagram</span>
              </button>
              <button
                onClick={() => handleShareClick('copy')}
                className="flex items-center justify-center gap-2 p-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-800 border border-slate-300 font-bold text-xs transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-sm">content_copy</span>
                Copy Link
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Real Location Google Map Modal */}
      {activeMapModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 relative shadow-2xl border border-surface-container-highest flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-teal-700 text-2xl">location_on</span>
                <div>
                  <h3 className="font-display font-bold text-lg text-on-surface">{activeMapModal.title}</h3>
                  <p className="text-xs text-on-surface-variant font-medium">{activeMapModal.query}</p>
                </div>
              </div>
              <button
                onClick={() => setActiveMapModal(null)}
                className="text-on-surface-variant hover:text-on-surface p-1.5 rounded-full hover:bg-surface-container transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-xl">close</span>
              </button>
            </div>

            <div className="w-full h-80 rounded-2xl overflow-hidden border border-surface-container-highest bg-slate-100 relative mb-4">
              <iframe
                title={activeMapModal.title}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
                src={`https://maps.google.com/maps?q=${encodeURIComponent(activeMapModal.query)}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
              />
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
              <p className="text-xs text-on-surface-variant flex items-center gap-1">
                <span className="material-symbols-outlined text-sm text-teal-700">info</span>
                Interactive Google Maps preview centered on real coordinates.
              </p>
              <a
                href={activeMapModal.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto bg-teal-700 hover:bg-teal-800 text-white px-5 py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
              >
                Open in Google Maps
                <span className="material-symbols-outlined text-sm">open_in_new</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
