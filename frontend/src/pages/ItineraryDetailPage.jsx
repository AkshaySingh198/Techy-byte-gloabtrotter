import { useState } from 'react';
import { jsPDF } from 'jspdf';

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
    totalDays: 8,
    avgCostPerDay: '₹26,875',
    weather: '24°C',
    monthName: 'October 2026',
    year: 2026,
    monthIndex: 9,
    startDayOffset: 4,
    daysInMonth: 31,
    tripStartDay: 10,
    tripEndDay: 17,
    dayInfo: {
      number: 'Day 1 · Oct 10 · Positano',
      pace: 'Relaxed Pace',
      temp: '24°C Sunny',
    },
    dailySchedule: [
      { dayNumber: 1, label: 'Arrival & Suite Check-in', icon: 'flight_land', bgGradient: 'from-blue-600 to-sky-500 border-blue-600', summary: 'Arrival at Rome FCO, private car transfer to Positano cliffside, check-in at Le Sirenuse Suite.' },
      { dayNumber: 2, label: 'Capri Island Yacht Tour', icon: 'sailing', bgGradient: 'from-teal-600 to-emerald-500 border-teal-600', summary: 'Private speed boat charter around Capri, Blue Grotto excursion, and lunch on deck.' },
      { dayNumber: 3, label: 'Path of Gods Hike', icon: 'hiking', bgGradient: 'from-emerald-600 to-green-600 border-emerald-600', summary: 'Guided mountain trek from Bomerano to Nocelle with cliffside Mediterranean views.' },
      { dayNumber: 4, label: 'Beach Club & Spa', icon: 'beach_access', bgGradient: 'from-orange-500 to-amber-500 border-orange-500', summary: 'Arienzo Beach Club sunbathing lounge, cliffside swimming, & afternoon hotel massage.' },
      { dayNumber: 5, label: 'Ravello Historic Tour', icon: 'castle', bgGradient: 'from-purple-600 to-indigo-600 border-purple-600', summary: 'Exploring Villa Cimbrone Infinity Terrace gardens & evening organ concert in Ravello square.' },
      { dayNumber: 6, label: 'Michelin Sunset Dinner', icon: 'restaurant', bgGradient: 'from-rose-500 to-pink-600 border-rose-500', summary: 'Limoncello distillery tour followed by candlelit 7-course seafood dinner at La Sponda.' },
      { dayNumber: 7, label: 'Positano Local Markets', icon: 'shopping_bag', bgGradient: 'from-amber-500 to-yellow-600 border-amber-500', summary: 'Artisanal leather sandal fitting, ceramics shopping, and farewell sunset drinks.' },
      { dayNumber: 8, label: 'Checkout & Departure', icon: 'flight_takeoff', bgGradient: 'from-indigo-600 to-blue-700 border-indigo-600', summary: 'Morning espresso on Positano balcony, hotel checkout, & transfer to FCO airport.' },
    ],
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
    fiveCategoryBreakdown: [
      { category: 'Transport', amount: '₹35,000', percentage: 16, color: '#FF7F50', bgClass: 'bg-[#FF7F50]', icon: 'directions_car' },
      { category: 'Hotel', amount: '₹1,10,000', percentage: 51, color: '#0D9488', bgClass: 'bg-[#0D9488]', icon: 'hotel' },
      { category: 'Rentals', amount: '₹10,000', percentage: 5, color: '#D97706', bgClass: 'bg-[#D97706]', icon: 'two_wheeler' },
      { category: 'Activities', amount: '₹25,000', percentage: 12, color: '#8B5CF6', bgClass: 'bg-[#8B5CF6]', icon: 'local_activity' },
      { category: 'Meals', amount: '₹35,000', percentage: 16, color: '#EC4899', bgClass: 'bg-[#EC4899]', icon: 'restaurant' },
    ],
    dayWiseCosts: [
      { day: 'Day 1', cost: '₹65,000', value: 65000 },
      { day: 'Day 2', cost: '₹22,000', value: 22000 },
      { day: 'Day 3', cost: '₹18,000', value: 18000 },
      { day: 'Day 4', cost: '₹25,000', value: 25000 },
      { day: 'Day 5', cost: '₹20,000', value: 20000 },
      { day: 'Day 6', cost: '₹28,000', value: 28000 },
      { day: 'Day 7', cost: '₹22,000', value: 22000 },
      { day: 'Day 8', cost: '₹15,000', value: 15000 },
    ],
    itemizedBudget: {
      transport: [
        { label: 'Outbound & Return Flight (BOM ⇄ FCO)', price: '₹30,000' },
        { label: 'Rome Airport Private Taxi Transfer', price: '₹5,000' },
      ],
      hotel: [
        { label: 'Le Sirenuse Cliffside Suite (7 Nights)', price: '₹1,10,000' },
      ],
      rentals: [
        { label: 'Vintage Vespa Scooter Rental (3 Days)', price: '₹6,000' },
        { label: 'Private Speedboat Rental', price: '₹4,000' },
      ],
      activities: [
        { label: 'Capri Island Guided Boat Tour', price: '₹18,000' },
        { label: 'Path of the Gods Trek & Entry Ticket', price: '₹7,000' },
      ],
      meals: [
        { label: 'La Sponda Michelin Sunset Dinner (2 Pax)', price: '₹15,000' },
        { label: 'Positano Beach Club Lunches & Cocktails', price: '₹12,000' },
        { label: 'Local Trattoria Dinners & Gelato', price: '₹8,000' },
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
    totalDays: 7,
    avgCostPerDay: '₹25,714',
    weather: '29°C',
    monthName: 'January 2025',
    year: 2025,
    monthIndex: 0,
    startDayOffset: 3,
    daysInMonth: 31,
    tripStartDay: 10,
    tripEndDay: 17,
    dayInfo: {
      number: 'Day 1 · Jan 10 · Male',
      pace: 'Leisure Pace',
      temp: '29°C Clear Skies',
    },
    dailySchedule: [
      { dayNumber: 1, label: 'Seaplane & Water Villa', icon: 'flight_land', bgGradient: 'from-blue-600 to-sky-500 border-blue-600', summary: 'Arrival in Male, scenic seaplane transfer to Soneva Fushi, & check-in to Sunset Water Villa.' },
      { dayNumber: 2, label: 'Reef Snorkeling Safari', icon: 'scuba_diving', bgGradient: 'from-teal-600 to-cyan-500 border-teal-600', summary: 'Guided house reef snorkeling with sea turtles, manta rays, and tropical marine life.' },
      { dayNumber: 3, label: 'Subsix Underwater Dining', icon: 'restaurant', bgGradient: 'from-rose-500 to-pink-600 border-rose-500', summary: 'Lagoon floating breakfast followed by gourmet deep sea dinner at Subsix.' },
      { dayNumber: 4, label: 'Sunset Dolphin Cruise', icon: 'sailing', bgGradient: 'from-cyan-600 to-teal-600 border-cyan-600', summary: 'Traditional Maldivian dhoni boat trip searching for wild spinner dolphins at dusk.' },
      { dayNumber: 5, label: 'Overwater Spa & Massage', icon: 'spa', bgGradient: 'from-purple-600 to-indigo-600 border-purple-600', summary: 'Full-body Ayurvedic massage, yoga session on private deck, & sunset relaxation.' },
      { dayNumber: 6, label: 'Water Sports & Kayak', icon: 'surfing', bgGradient: 'from-orange-500 to-amber-500 border-orange-500', summary: 'Clear-bottom kayak tour around sandbanks and paddleboarding in turquoise lagoons.' },
      { dayNumber: 7, label: 'Sandbank Picnic & Stargazing', icon: 'kayaking', bgGradient: 'from-amber-500 to-yellow-600 border-amber-500', summary: 'Private deserted sandbank seafood lunch and stargazing at resort observatory.' },
      { dayNumber: 8, label: 'Departure Seaplane', icon: 'flight_takeoff', bgGradient: 'from-indigo-600 to-blue-700 border-indigo-600', summary: 'Seaplane transfer back to Male international airport for departure flight.' },
    ],
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
    fiveCategoryBreakdown: [
      { category: 'Transport', amount: '₹28,000', percentage: 15, color: '#FF7F50', bgClass: 'bg-[#FF7F50]', icon: 'directions_car' },
      { category: 'Hotel', amount: '₹1,10,000', percentage: 61, color: '#0D9488', bgClass: 'bg-[#0D9488]', icon: 'hotel' },
      { category: 'Rentals', amount: '₹7,000', percentage: 4, color: '#D97706', bgClass: 'bg-[#D97706]', icon: 'two_wheeler' },
      { category: 'Activities', amount: '₹15,000', percentage: 8, color: '#8B5CF6', bgClass: 'bg-[#8B5CF6]', icon: 'local_activity' },
      { category: 'Meals', amount: '₹20,000', percentage: 12, color: '#EC4899', bgClass: 'bg-[#EC4899]', icon: 'restaurant' },
    ],
    dayWiseCosts: [
      { day: 'Day 1', cost: '₹48,000', value: 48000 },
      { day: 'Day 2', cost: '₹25,000', value: 25000 },
      { day: 'Day 3', cost: '₹22,000', value: 22000 },
      { day: 'Day 4', cost: '₹28,000', value: 28000 },
      { day: 'Day 5', cost: '₹20,000', value: 20000 },
      { day: 'Day 6', cost: '₹24,000', value: 24000 },
      { day: 'Day 7', cost: '₹13,000', value: 13000 },
    ],
    itemizedBudget: {
      transport: [
        { label: 'Roundtrip Flight + Island Seaplane Transfer', price: '₹28,000' },
      ],
      hotel: [
        { label: 'Soneva Sunset Water Villa (7 Nights)', price: '₹1,10,000' },
      ],
      rentals: [
        { label: 'Snorkeling & Jet Ski Equipment Rental', price: '₹7,000' },
      ],
      activities: [
        { label: 'Coral Reef Scuba Diving & Sunset Cruise', price: '₹15,000' },
      ],
      meals: [
        { label: 'Subsix Underwater Dinner & Champagne', price: '₹18,000' },
        { label: 'Beachfront Buffet Dinners', price: '₹2,000' },
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
    totalDays: 12,
    avgCostPerDay: '₹20,416',
    weather: '18°C',
    monthName: 'November 2026',
    year: 2026,
    monthIndex: 10,
    startDayOffset: 0,
    daysInMonth: 30,
    tripStartDay: 12,
    tripEndDay: 24,
    dayInfo: {
      number: 'Day 1 · Nov 12 · Cusco',
      pace: 'Active Altitude Pace',
      temp: '18°C Sunny Altitude',
    },
    dailySchedule: [
      { dayNumber: 1, label: 'Cusco Arrival & Rest', icon: 'flight_land', bgGradient: 'from-blue-600 to-sky-500 border-blue-600', summary: 'Arrival at Cusco (3,400m), oxygen suite check-in, altitude acclimatization, & coca tea.' },
      { dayNumber: 2, label: 'Cusco Walking Tour', icon: 'account_balance', bgGradient: 'from-indigo-600 to-purple-600 border-indigo-600', summary: 'Guided walking tour of Qorikancha, Sacsayhuamán fortress ruins, & San Pedro market.' },
      { dayNumber: 3, label: 'Sacred Valley Trek', icon: 'landscape', bgGradient: 'from-emerald-600 to-green-600 border-emerald-600', summary: 'Exploring Maras Salt Mines, Moray agricultural terraces, & Pisac artisan markets.' },
      { dayNumber: 4, label: 'Vistadome Train', icon: 'directions_railway', bgGradient: 'from-cyan-600 to-blue-600 border-cyan-600', summary: 'Panoramic glass train ride through Urubamba river valley to Machu Picchu Pueblo.' },
      { dayNumber: 5, label: 'Machu Picchu Sunrise', icon: 'temple_hindu', bgGradient: 'from-amber-500 to-orange-600 border-amber-500', summary: 'Early bus to Machu Picchu citadel, guided sanctuary tour, & Huayna Picchu climb.' },
      { dayNumber: 6, label: 'Inca Trail Trek', icon: 'hiking', bgGradient: 'from-green-600 to-emerald-600 border-green-600', summary: 'Scenic trekking along historic stone Inca pathways and orchid forest valley.' },
      { dayNumber: 7, label: 'Ollantaytambo Fort', icon: 'nature', bgGradient: 'from-purple-600 to-indigo-600 border-purple-600', summary: 'Visiting giant stone monolith terraces and living Inca village of Ollantaytambo.' },
      { dayNumber: 8, label: 'Andean Cooking', icon: 'restaurant', bgGradient: 'from-rose-500 to-pink-600 border-rose-500', summary: 'Farm-to-table Peruvian gastronomy workshop and pachamanca underground roast.' },
      { dayNumber: 9, label: 'Rainbow Mountain', icon: 'terrain', bgGradient: 'from-red-500 to-orange-600 border-red-500', summary: 'High-altitude hike to Vinicunca (5,200m) to witness colorful mineral mountain peaks.' },
      { dayNumber: 10, label: 'Humantay Lake', icon: 'water', bgGradient: 'from-teal-600 to-cyan-600 border-teal-600', summary: 'Glacial turquoise alpine lake hike situated beneath snow-capped Andes mountains.' },
      { dayNumber: 11, label: 'San Blas Market', icon: 'shopping_bag', bgGradient: 'from-yellow-500 to-amber-600 border-yellow-500', summary: 'Alpaca wool shopping, coffee tasting, and farewell Andean live music night.' },
      { dayNumber: 12, label: 'Lima City & Flight', icon: 'flight_takeoff', bgGradient: 'from-blue-600 to-indigo-700 border-blue-600', summary: 'Flight back to Lima, seaside Miraflores boardwalk walk, & international return flight.' },
    ],
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
    fiveCategoryBreakdown: [
      { category: 'Transport', amount: '₹65,000', percentage: 26, color: '#FF7F50', bgClass: 'bg-[#FF7F50]', icon: 'directions_car' },
      { category: 'Hotel', amount: '₹95,000', percentage: 39, color: '#0D9488', bgClass: 'bg-[#0D9488]', icon: 'hotel' },
      { category: 'Rentals', amount: '₹10,000', percentage: 4, color: '#D97706', bgClass: 'bg-[#D97706]', icon: 'two_wheeler' },
      { category: 'Activities', amount: '₹45,000', percentage: 18, color: '#8B5CF6', bgClass: 'bg-[#8B5CF6]', icon: 'local_activity' },
      { category: 'Meals', amount: '₹30,000', percentage: 13, color: '#EC4899', bgClass: 'bg-[#EC4899]', icon: 'restaurant' },
    ],
    dayWiseCosts: [
      { day: 'Day 1', cost: '₹75,000', value: 75000 },
      { day: 'Day 2', cost: '₹18,000', value: 18000 },
      { day: 'Day 3', cost: '₹15,000', value: 15000 },
      { day: 'Day 4', cost: '₹22,000', value: 22000 },
      { day: 'Day 5', cost: '₹30,000', value: 30000 },
      { day: 'Day 6', cost: '₹16,000', value: 16000 },
      { day: 'Day 7', cost: '₹20,000', value: 20000 },
      { day: 'Day 8', cost: '₹14,000', value: 14000 },
      { day: 'Day 9', cost: '₹12,000', value: 12000 },
      { day: 'Day 10', cost: '₹10,000', value: 10000 },
      { day: 'Day 11', cost: '₹8,000', value: 8000 },
      { day: 'Day 12', cost: '₹5,000', value: 5000 },
    ],
    itemizedBudget: {
      transport: [
        { label: 'DEL → CUZ International Flights', price: '₹50,000' },
        { label: 'Machu Picchu Vistadome Train Passes', price: '₹15,000' },
      ],
      hotel: [
        { label: 'Belmond Monasterio Suite (12 Nights)', price: '₹95,000' },
      ],
      rentals: [
        { label: 'Inca Trail Trekking Gear & Backpack Rental', price: '₹10,000' },
      ],
      activities: [
        { label: 'Machu Picchu Sanctuary Entry Passes', price: '₹25,000' },
        { label: 'Sacred Valley Guided Day Tour', price: '₹20,000' },
      ],
      meals: [
        { label: 'Cicciolina Fine Dining & Teas', price: '₹18,000' },
        { label: 'Local Peruvian Dinners & Markets', price: '₹12,000' },
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

  const downloadBudgetReceiptPDF = () => {
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });

    // Header Title
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(22);
    doc.setTextColor(234, 88, 12);
    doc.text('GlobeTrotter', 14, 20);

    doc.setFontSize(16);
    doc.setTextColor(30, 41, 59);
    doc.text(data.title, 14, 29);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.setTextColor(100, 116, 139);
    doc.text(`${data.subtitle} • ${data.dates}`, 14, 36);
    doc.text(`Generated Date: ${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}`, 14, 42);

    // Header Line
    doc.setLineWidth(0.5);
    doc.setDrawColor(234, 88, 12);
    doc.line(14, 46, 196, 46);

    // Summary Box
    doc.setFillColor(255, 247, 237);
    doc.roundedRect(14, 50, 182, 26, 3, 3, 'F');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(100, 116, 139);
    doc.text('TOTAL ESTIMATED COST', 20, 59);

    doc.setFontSize(18);
    doc.setTextColor(234, 88, 12);
    doc.text(data.totalBudget, 20, 69);

    doc.setFontSize(10);
    doc.setTextColor(13, 148, 136);
    doc.text(`Average: ${data.avgCostPerDay} / day`, 125, 61);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(100, 116, 139);
    doc.text(`Calculated over ${data.totalDays} trip days`, 125, 68);

    // 5 Category Breakdown
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.setTextColor(15, 23, 42);
    doc.text('5-CATEGORY EXPENSE BREAKDOWN', 14, 87);

    // Table Header
    doc.setFillColor(241, 245, 249);
    doc.rect(14, 91, 182, 8, 'F');
    doc.setFontSize(9);
    doc.setTextColor(51, 65, 85);
    doc.text('Category', 18, 96.5);
    doc.text('Percentage', 105, 96.5);
    doc.text('Estimated Amount', 155, 96.5);

    let y = 105;
    data.fiveCategoryBreakdown.forEach((cat) => {
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9.5);
      doc.setTextColor(30, 41, 59);
      doc.text(cat.category, 18, y);
      doc.text(`${cat.percentage}%`, 105, y);
      doc.setFont('helvetica', 'bold');
      doc.text(cat.amount, 155, y);

      doc.setDrawColor(241, 245, 249);
      doc.line(14, y + 2.5, 196, y + 2.5);
      y += 8;
    });

    // Itemized Line Items
    y += 6;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.setTextColor(15, 23, 42);
    doc.text('ITEMIZED LINE ITEMS', 14, y);
    y += 6;

    const sections = [
      { title: 'Transport', items: data.itemizedBudget.transport },
      { title: 'Hotel', items: data.itemizedBudget.hotel },
      { title: 'Rentals', items: data.itemizedBudget.rentals },
      { title: 'Activities', items: data.itemizedBudget.activities },
      { title: 'Meals', items: data.itemizedBudget.meals },
    ];

    doc.setFillColor(241, 245, 249);
    doc.rect(14, y, 182, 8, 'F');
    doc.setFontSize(9);
    doc.setTextColor(51, 65, 85);
    doc.text('Item Description', 18, y + 5.5);
    doc.text('Cost (INR)', 155, y + 5.5);
    y += 13;

    sections.forEach((sec) => {
      sec.items.forEach((item) => {
        if (y > 270) {
          doc.addPage();
          y = 20;
        }
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(9);
        doc.setTextColor(71, 85, 105);
        const itemLabel = `[${sec.title}] ${item.label}`;
        doc.text(itemLabel.length > 55 ? itemLabel.substring(0, 52) + '...' : itemLabel, 18, y);
        doc.setFont('helvetica', 'bold');
        doc.text(item.price, 155, y);

        doc.setDrawColor(241, 245, 249);
        doc.line(14, y + 2.5, 196, y + 2.5);
        y += 7.5;
      });
    });

    // Day Wise Trend
    if (y > 240) {
      doc.addPage();
      y = 20;
    } else {
      y += 6;
    }

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.setTextColor(15, 23, 42);
    doc.text('DAY-WISE EXPENSE TREND', 14, y);
    y += 6;

    doc.setFillColor(241, 245, 249);
    doc.rect(14, y, 182, 8, 'F');
    doc.setFontSize(9);
    doc.setTextColor(51, 65, 85);
    doc.text('Day', 18, y + 5.5);
    doc.text('Estimated Expense', 155, y + 5.5);
    y += 13;

    data.dayWiseCosts.forEach((d) => {
      if (y > 270) {
        doc.addPage();
        y = 20;
      }
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9);
      doc.setTextColor(71, 85, 105);
      doc.text(d.day, 18, y);
      doc.setFont('helvetica', 'bold');
      doc.text(d.cost, 155, y);

      doc.setDrawColor(241, 245, 249);
      doc.line(14, y + 2.5, 196, y + 2.5);
      y += 7.5;
    });

    // Footer
    y += 8;
    if (y > 275) {
      doc.addPage();
      y = 270;
    }
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.5);
    doc.setTextColor(148, 163, 184);
    doc.text('Thank you for planning your travel itinerary with GlobeTrotter! • www.globetrotter.app', 14, y);

    // Trigger REAL binary PDF file download
    doc.save(`${data.title.replace(/[^a-zA-Z0-9]/g, '_')}_Budget_Receipt.pdf`);
  };

  // Max value for bar chart calculation
  const maxDayCost = Math.max(...data.dayWiseCosts.map((d) => d.value));

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
              onClick={downloadBudgetReceiptPDF}
              className="bg-white/25 hover:bg-white/40 text-white backdrop-blur-md p-2.5 rounded-full transition-all flex items-center justify-center cursor-pointer shadow-md"
              title="Download Itinerary PDF"
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
            /* 📅 Full Month Calendar View */
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
                      const dayIdx = dayNum - data.tripStartDay;
                      const daySched = isTripDay && data.dailySchedule ? data.dailySchedule[dayIdx] : null;

                      return (
                        <div
                          key={dayNum}
                          onClick={() => isTripDay && setSelectedCalendarDay(dayNum)}
                          className={`h-20 p-2 rounded-2xl border transition-all flex flex-col justify-between relative text-left ${
                            isTripDay
                              ? `bg-gradient-to-br ${daySched?.bgGradient || 'from-orange-500 to-amber-500 border-orange-600'} text-white shadow-md hover:scale-[1.04] cursor-pointer`
                              : 'bg-white text-on-surface border-surface-container-highest hover:border-surface-container-high'
                          } ${isSelected ? 'ring-4 ring-primary-container/40' : ''}`}
                        >
                          <div className="flex justify-between items-center">
                            <span className={`text-xs font-extrabold ${isTripDay ? 'text-white' : 'text-on-surface'}`}>
                              {dayNum}
                            </span>
                            {isTripDay && (
                              <span className="material-symbols-outlined text-xs text-white/95" title={daySched?.label || `Day ${dayIdx + 1}`}>
                                {daySched?.icon || 'event'}
                              </span>
                            )}
                          </div>

                          {isTripDay && (
                            <div className="text-[9px] font-extrabold bg-black/25 text-white px-1.5 py-0.5 rounded truncate leading-tight mt-1" title={daySched?.label}>
                              {daySched ? daySched.label : `Day ${dayIdx + 1}`}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Selected Day Details Box */}
              {selectedCalendarDay && (() => {
                const dayIdx = selectedCalendarDay - data.tripStartDay;
                const sched = data.dailySchedule?.[dayIdx];
                return (
                  <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-orange-200 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs animate-in fade-in duration-200">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${sched?.bgGradient || 'from-orange-500 to-amber-500'} text-white flex items-center justify-center shrink-0 shadow-md`}>
                        <span className="material-symbols-outlined text-xl">{sched?.icon || 'event'}</span>
                      </div>
                      <div>
                        <h4 className="font-bold text-on-surface text-sm">
                          Day {dayIdx + 1}: {sched?.label || 'Scheduled Trip Activity'} ({data.monthName.split(' ')[0]} {selectedCalendarDay})
                        </h4>
                        <p className="text-on-surface-variant font-medium mt-0.5">
                          {sched?.summary || 'Sightseeing, dining & hotel stay scheduled.'}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => setViewTab('timeline')}
                      className="bg-primary-container text-white px-4 py-2 rounded-full font-bold hover:bg-primary transition-colors cursor-pointer shrink-0 shadow-xs"
                    >
                      View in Timeline
                    </button>
                  </div>
                );
              })()}
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

            {/* View Full Budget Button */}
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

          {/* Quick Actions Card */}
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

      {/* 🧾 ITEMIZED FULL BUDGET SUB-PAGE MODAL */}
      {showFullBudgetModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-7 relative shadow-2xl border border-surface-container-highest flex flex-col max-h-[92vh] overflow-y-auto">
            {/* Header */}
            <div className="flex justify-between items-start pb-4 border-b border-surface-container-highest">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-full bg-primary-container/10 text-primary-container flex items-center justify-center">
                  <span className="material-symbols-outlined text-2xl">account_balance_wallet</span>
                </div>
                <div>
                  <h3 className="font-display font-extrabold text-xl text-on-surface">Budget & Expense Analytics</h3>
                  <p className="text-xs text-on-surface-variant font-medium">{data.title} · {data.dates}</p>
                </div>
              </div>
              <button
                onClick={() => setShowFullBudgetModal(false)}
                className="text-on-surface-variant hover:text-on-surface p-1.5 rounded-full hover:bg-surface-container transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-xl">close</span>
              </button>
            </div>

            {/* Content Body */}
            <div className="py-5 space-y-6 text-xs">

              {/* 1. PROMINENT TOTAL ESTIMATED COST & AVG/DAY BANNER */}
              <div className="bg-gradient-to-r from-primary-container/10 via-amber-500/10 to-teal-500/10 border border-primary-container/30 rounded-2xl p-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <span className="text-[11px] font-extrabold uppercase tracking-wider text-on-surface-variant">
                    Total Estimated Cost
                  </span>
                  <div className="font-display text-3xl sm:text-4xl font-black text-primary-container mt-0.5">
                    {data.totalBudget}
                  </div>
                </div>

                <div className="flex flex-col sm:items-end gap-1">
                  <span className="bg-white/80 border border-surface-container-highest px-3 py-1 rounded-full font-bold text-xs text-teal-800 shadow-xs flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm">schedule</span>
                    Average: <span className="text-primary font-extrabold">{data.avgCostPerDay}</span> / day
                  </span>
                  <span className="text-[11px] font-medium text-on-surface-variant">
                    Calculated over {data.totalDays} trip days
                  </span>
                </div>
              </div>

              {/* 2. 5-CATEGORY PIE / DONUT CHART BREAKDOWN */}
              <div className="bg-surface-container/40 rounded-2xl p-5 border border-surface-container-highest space-y-4">
                <h4 className="font-display font-bold text-sm text-on-surface flex items-center justify-between">
                  <span>Category Expense Breakdown</span>
                  <span className="text-xs font-normal text-on-surface-variant">5 Main Categories</span>
                </h4>

                <div className="flex flex-col md:flex-row items-center gap-6">
                  {/* Conic-gradient Pie Chart */}
                  <div className="relative w-36 h-36 rounded-full shrink-0 flex items-center justify-center shadow-md"
                    style={{
                      background: `conic-gradient(
                        ${data.fiveCategoryBreakdown[0].color} 0% ${data.fiveCategoryBreakdown[0].percentage}%,
                        ${data.fiveCategoryBreakdown[1].color} ${data.fiveCategoryBreakdown[0].percentage}% ${data.fiveCategoryBreakdown[0].percentage + data.fiveCategoryBreakdown[1].percentage}%,
                        ${data.fiveCategoryBreakdown[2].color} ${data.fiveCategoryBreakdown[0].percentage + data.fiveCategoryBreakdown[1].percentage}% ${data.fiveCategoryBreakdown[0].percentage + data.fiveCategoryBreakdown[1].percentage + data.fiveCategoryBreakdown[2].percentage}%,
                        ${data.fiveCategoryBreakdown[3].color} ${data.fiveCategoryBreakdown[0].percentage + data.fiveCategoryBreakdown[1].percentage + data.fiveCategoryBreakdown[2].percentage}% ${data.fiveCategoryBreakdown[0].percentage + data.fiveCategoryBreakdown[1].percentage + data.fiveCategoryBreakdown[2].percentage + data.fiveCategoryBreakdown[3].percentage}%,
                        ${data.fiveCategoryBreakdown[4].color} ${data.fiveCategoryBreakdown[0].percentage + data.fiveCategoryBreakdown[1].percentage + data.fiveCategoryBreakdown[2].percentage + data.fiveCategoryBreakdown[3].percentage}% 100%
                      )`
                    }}
                  >
                    <div className="w-24 h-24 bg-white rounded-full flex flex-col items-center justify-center shadow-inner">
                      <span className="text-[10px] text-on-surface-variant font-bold uppercase tracking-wider">Share</span>
                      <span className="font-display text-xs font-extrabold text-on-surface">100%</span>
                    </div>
                  </div>

                  {/* Category Legend Grid */}
                  <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-2.5 w-full">
                    {data.fiveCategoryBreakdown.map((cat) => (
                      <div key={cat.category} className="flex items-center justify-between p-2 rounded-xl bg-white border border-surface-container-highest shadow-2xs">
                        <div className="flex items-center gap-2">
                          <span className={`w-3 h-3 rounded-full ${cat.bgClass}`} />
                          <span className="material-symbols-outlined text-sm text-on-surface-variant">{cat.icon}</span>
                          <span className="font-semibold text-on-surface">{cat.category}</span>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-on-surface">{cat.amount}</div>
                          <div className="text-[10px] text-on-surface-variant font-medium">{cat.percentage}%</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* 3. DAY-WISE COST BAR CHART */}
              <div className="bg-surface-container/40 rounded-2xl p-5 border border-surface-container-highest space-y-3">
                <h4 className="font-display font-bold text-sm text-on-surface flex items-center justify-between">
                  <span>Day-Wise Cost Bar Chart</span>
                  <span className="text-xs font-normal text-on-surface-variant">Daily Expense Variance</span>
                </h4>

                <div className="pt-4 pb-2">
                  <div className="flex items-end justify-between gap-2 h-36 px-2 border-b border-surface-container-highest">
                    {data.dayWiseCosts.map((d, idx) => {
                      const barPercent = Math.max(15, Math.round((d.value / maxDayCost) * 100));
                      return (
                        <div key={idx} className="flex-1 flex flex-col items-center gap-1 group h-full justify-end">
                          <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-inverse-surface text-white text-[10px] font-bold px-1.5 py-0.5 rounded shadow-sm whitespace-nowrap mb-1">
                            {d.cost}
                          </div>
                          <div
                            className="w-full max-w-[32px] rounded-t-lg bg-gradient-to-t from-primary-container to-amber-400 group-hover:from-primary group-hover:to-orange-500 transition-all duration-300 shadow-xs"
                            style={{ height: `${barPercent}%` }}
                          />
                          <span className="text-[10px] font-bold text-on-surface-variant mt-1">
                            {d.day.replace('Day ', 'D')}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* 4. ITEMIZED DETAILED LIST ACCORDION */}
              <div className="space-y-3 pt-2">
                <h4 className="font-display font-bold text-sm text-on-surface">Itemized Line Items</h4>

                <div className="grid grid-cols-1 gap-3">
                  {/* Transport */}
                  <div className="bg-white rounded-xl p-3.5 border border-surface-container-highest">
                    <h5 className="font-bold text-on-surface flex items-center gap-1.5 text-xs mb-2">
                      <span className="material-symbols-outlined text-orange-500 text-sm">directions_car</span>
                      Transport Expenses
                    </h5>
                    <div className="space-y-1 text-xs">
                      {data.itemizedBudget.transport.map((item, idx) => (
                        <div key={idx} className="flex justify-between text-on-surface-variant font-medium">
                          <span>{item.label}</span>
                          <span className="font-bold text-on-surface">{item.price}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Hotel */}
                  <div className="bg-white rounded-xl p-3.5 border border-surface-container-highest">
                    <h5 className="font-bold text-on-surface flex items-center gap-1.5 text-xs mb-2">
                      <span className="material-symbols-outlined text-teal-600 text-sm">hotel</span>
                      Hotel & Accommodations
                    </h5>
                    <div className="space-y-1 text-xs">
                      {data.itemizedBudget.hotel.map((item, idx) => (
                        <div key={idx} className="flex justify-between text-on-surface-variant font-medium">
                          <span>{item.label}</span>
                          <span className="font-bold text-on-surface">{item.price}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Rentals */}
                  <div className="bg-white rounded-xl p-3.5 border border-surface-container-highest">
                    <h5 className="font-bold text-on-surface flex items-center gap-1.5 text-xs mb-2">
                      <span className="material-symbols-outlined text-amber-600 text-sm">two_wheeler</span>
                      Rentals & Vehicles
                    </h5>
                    <div className="space-y-1 text-xs">
                      {data.itemizedBudget.rentals.map((item, idx) => (
                        <div key={idx} className="flex justify-between text-on-surface-variant font-medium">
                          <span>{item.label}</span>
                          <span className="font-bold text-on-surface">{item.price}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Activities */}
                  <div className="bg-white rounded-xl p-3.5 border border-surface-container-highest">
                    <h5 className="font-bold text-on-surface flex items-center gap-1.5 text-xs mb-2">
                      <span className="material-symbols-outlined text-purple-600 text-sm">local_activity</span>
                      Activities & Excursions
                    </h5>
                    <div className="space-y-1 text-xs">
                      {data.itemizedBudget.activities.map((item, idx) => (
                        <div key={idx} className="flex justify-between text-on-surface-variant font-medium">
                          <span>{item.label}</span>
                          <span className="font-bold text-on-surface">{item.price}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Meals */}
                  <div className="bg-white rounded-xl p-3.5 border border-surface-container-highest">
                    <h5 className="font-bold text-on-surface flex items-center gap-1.5 text-xs mb-2">
                      <span className="material-symbols-outlined text-pink-600 text-sm">restaurant</span>
                      Meals & Dining
                    </h5>
                    <div className="space-y-1 text-xs">
                      {data.itemizedBudget.meals.map((item, idx) => (
                        <div key={idx} className="flex justify-between text-on-surface-variant font-medium">
                          <span>{item.label}</span>
                          <span className="font-bold text-on-surface">{item.price}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex gap-2 justify-end pt-3 border-t border-surface-container-highest">
              <button
                onClick={downloadBudgetReceiptPDF}
                className="bg-primary-container text-white px-5 py-2.5 rounded-xl text-xs font-bold hover:bg-primary transition-colors cursor-pointer shadow-sm flex items-center gap-1.5"
              >
                <span className="material-symbols-outlined text-sm">download</span>
                Download Budget Receipt PDF
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 📲 Social Share Modal */}
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
