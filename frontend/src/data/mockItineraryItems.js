export const INITIAL_STOPS = [
  { id: 'stop-1', city: 'Goa (North)', startDate: '2026-09-01', endDate: '2026-09-03' },
  { id: 'stop-2', city: 'Goa (South)', startDate: '2026-09-04', endDate: '2026-09-05' },
];

export const INITIAL_TRAVEL = {
  id: 'trv-1',
  category: 'Travel',
  title: 'Outbound Flight: Mumbai (BOM) → Goa (GOI)',
  provider: 'IndiGo 6E-241',
  cost: 4500,
  time: '08:30 AM',
  location: 'Chhatrapati Shivaji Maharaj Intl Airport',
  dayNum: 1,
  notes: 'Check-in 2 hrs before departure. Terminal 2.',
};

export const INITIAL_HOTEL = {
  id: 'htl-1',
  category: 'Hotel',
  title: 'Stay: Taj Fort Aguada Resort & Spa',
  provider: 'Taj Hotels',
  cost: 12500, // per night
  time: '02:00 PM (Check-in)',
  location: 'Sinquerim Beach, North Goa',
  dayNum: 1,
  notes: 'Sea view villa reserved. Free breakfast included.',
};

export const INITIAL_ACTIVITIES = [
  {
    id: 'act-1',
    category: 'Activity',
    title: 'Sunset Walk & Local Seafood Tasting',
    provider: 'Goa Experiences',
    cost: 1200,
    time: '05:30 PM',
    location: 'Candolim Beach',
    dayNum: 1,
    notes: 'Try fresh grilled snapper at Curlies shack.',
  },
  {
    id: 'act-2',
    category: 'Activity',
    title: 'Aguada Fort & Lighthouse Guided Tour',
    provider: 'Heritage Walks',
    cost: 850,
    time: '10:00 AM',
    location: 'Sinquerim',
    dayNum: 2,
    notes: 'Skip-the-line pass included. Wear comfortable sneakers.',
  },
  {
    id: 'act-3',
    category: 'Activity',
    title: 'Artisanal Spice Plantation & Lunch',
    provider: 'Sahakari Farms',
    cost: 1500,
    time: '01:00 PM',
    location: 'Ponda',
    dayNum: 2,
    notes: 'Includes traditional buffet lunch and spice tasting tour.',
  },
  {
    id: 'act-4',
    category: 'Activity',
    title: 'Anjuna Flea Market & Vintage Shopping',
    provider: 'Self-guided',
    cost: 500,
    time: '04:00 PM',
    location: 'Anjuna',
    dayNum: 3,
    notes: 'Bargain friendly market for handicrafts and souvenirs.',
  },
  {
    id: 'act-5',
    category: 'Activity',
    title: 'South Goa Water Sports & Kayaking',
    provider: 'Oceanic Adventures',
    cost: 2200,
    time: '11:00 AM',
    location: 'Palolem Beach',
    dayNum: 4,
    notes: 'Lifejackets provided. Dolphin watching included.',
  },
];
