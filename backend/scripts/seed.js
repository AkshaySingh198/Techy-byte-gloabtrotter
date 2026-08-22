const { sequelize, City, Activity, Festival } = require('../models');
const { connectDB } = require('../config/database');

const indianCities = [
  {
    name: 'Goa',
    country: 'India',
    state: 'Goa',
    cost_index: 3.5,
    popularity_score: 95,
    lat: 15.2993,
    lng: 74.1240,
    best_season: 'November - February (Monsoon Warning: July-Sept)'
  },
  {
    name: 'Manali',
    country: 'India',
    state: 'Himachal Pradesh',
    cost_index: 2.8,
    popularity_score: 90,
    lat: 32.2432,
    lng: 77.1892,
    best_season: 'October - June (Winter Snow / High Altitude Monsoon Landslide Warning)'
  },
  {
    name: 'Jaipur',
    country: 'India',
    state: 'Rajasthan',
    cost_index: 3.0,
    popularity_score: 88,
    lat: 26.9124,
    lng: 75.7873,
    best_season: 'October - March (Extreme Summer Heat Warning: April-June)'
  },
  {
    name: 'Leh Ladakh',
    country: 'India',
    state: 'Ladakh',
    cost_index: 4.2,
    popularity_score: 92,
    lat: 34.1526,
    lng: 77.5771,
    best_season: 'May - September (Winter Road Closure / Sub-zero Warning: Oct-April)'
  },
  {
    name: 'Munnar',
    country: 'India',
    state: 'Kerala',
    cost_index: 2.5,
    popularity_score: 85,
    lat: 10.0889,
    lng: 77.0595,
    best_season: 'September - May'
  },
  {
    name: 'Varanasi',
    country: 'India',
    state: 'Uttar Pradesh',
    cost_index: 2.0,
    popularity_score: 87,
    lat: 25.3176,
    lng: 82.9739,
    best_season: 'October - March'
  },
  {
    name: 'Gangtok',
    country: 'India',
    state: 'Sikkim',
    cost_index: 3.2,
    popularity_score: 86,
    lat: 27.3389,
    lng: 88.6065,
    best_season: 'March - May & October - December (Inner Line Permit Required)'
  },
  {
    name: 'Port Blair & Havelock',
    country: 'India',
    state: 'Andaman & Nicobar',
    cost_index: 4.5,
    popularity_score: 89,
    lat: 11.6234,
    lng: 92.7265,
    best_season: 'October - May (Restricted Area Permit Check Required)'
  }
];

const mockActivities = {
  'Goa': [
    { name: 'Baga Beach Watersports (Parasailing & Jet Ski)', type: 'adventure', cost: 1800.00, duration_mins: 120, description: 'High-adrenaline water sports along Baga beach.' },
    { name: 'Dudhsagar Waterfalls Trek & Jeep Safari', type: 'adventure', cost: 2200.00, duration_mins: 360, description: 'Scenic jeep trip into Bhagwan Mahavir Wildlife Sanctuary.' },
    { name: 'Old Goa Latin Quarter (Fontainhas) Walking Tour', type: 'cultural', cost: 500.00, duration_mins: 90, description: 'Heritage walk amidst colorful Portuguese-style villas.' }
  ],
  'Manali': [
    { name: 'Solang Valley Paragliding', type: 'adventure', cost: 3000.00, duration_mins: 60, description: 'Tandem paragliding flight over lush green alpine valleys.' },
    { name: 'Hadimba Temple & Cedar Forest Visit', type: 'cultural', cost: 100.00, duration_mins: 90, description: 'Historic 16th-century wooden temple nestled in deodar forest.' },
    { name: 'Jogini Waterfall Hike', type: 'sightseeing', cost: 0.00, duration_mins: 180, description: 'Easy trek leading up to breathtaking twin cascades.' }
  ],
  'Jaipur': [
    { name: 'Amber Fort Elephant / Jeep Heritage Tour', type: 'cultural', cost: 750.00, duration_mins: 180, description: 'Majestic hilltop fort featuring Sheesh Mahal mirror palace.' },
    { name: 'Hawa Mahal & City Palace Photo Walk', type: 'sightseeing', cost: 400.00, duration_mins: 120, description: 'Iconic pink sandstone facade and royal museum artifacts.' },
    { name: 'Chokhi Dhani Rajasthani Village & Dinner', type: 'food', cost: 1200.00, duration_mins: 240, description: 'Traditional Rajasthani thali dinner, folk dance, and camel ride.' }
  ],
  'Leh Ladakh': [
    { name: 'Pangong Tso Lake Day Excursion', type: 'sightseeing', cost: 3500.00, duration_mins: 600, description: 'High-altitude brackish lake famous for changing colors.' },
    { name: 'Nubra Valley & Hunder Sand Dunes Camel Safari', type: 'adventure', cost: 2800.00, duration_mins: 480, description: 'Double-humped Bactrian camel ride in cold desert dunes.' },
    { name: 'Magnetic Hill & Sangam Confluence', type: 'sightseeing', cost: 800.00, duration_mins: 180, description: 'Gravity-defying hill and Indus-Zanskar river confluence.' }
  ],
  'Gangtok': [
    { name: 'Tsomgo Lake & Baba Mandir Excursion', type: 'sightseeing', cost: 2500.00, duration_mins: 360, description: 'Glacial lake near Indo-China border requiring Sikkim permit.' },
    { name: 'Nathula Pass Border View', type: 'adventure', cost: 3000.00, duration_mins: 300, description: 'Historic Silk Route pass at 14,140 ft altitude.' }
  ]
};

const festivals = [
  { name: 'Diwali - Festival of Lights', region: 'Pan-India', start_date: '2026-11-08', end_date: '2026-11-12' },
  { name: 'Holi - Color Festival', region: 'Pan-India / Mathura', start_date: '2026-03-04', end_date: '2026-03-05' },
  { name: 'Durga Puja', region: 'West Bengal & Eastern India', start_date: '2026-10-16', end_date: '2026-10-20' },
  { name: 'Pushkar Camel Fair', region: 'Rajasthan', start_date: '2026-11-20', end_date: '2026-11-28' },
  { name: 'Hornbill Festival', region: 'Nagaland', start_date: '2026-12-01', end_date: '2026-12-10' },
  { name: 'Ladakh Harvest Festival', region: 'Ladakh', start_date: '2026-09-01', end_date: '2026-09-15' }
];

async function seedDatabase() {
  try {
    await connectDB();
    await sequelize.sync({ force: false }); // sync models without dropping existing data if present

    console.log('[Seed] Seeding Indian cities...');
    for (const cityData of indianCities) {
      const [city, created] = await City.findOrCreate({
        where: { name: cityData.name },
        defaults: cityData
      });

      if (created && mockActivities[city.name]) {
        for (const act of mockActivities[city.name]) {
          await Activity.create({
            city_id: city.id,
            ...act
          });
        }
      }
    }

    console.log('[Seed] Seeding major Indian festivals...');
    for (const fest of festivals) {
      await Festival.findOrCreate({
        where: { name: fest.name, start_date: fest.start_date },
        defaults: fest
      });
    }

    console.log('[Seed] Database seeding completed successfully!');
  } catch (error) {
    console.error('[Seed Error]:', error);
  }
}

if (require.main === module) {
  seedDatabase().then(() => process.exit(0));
}

module.exports = seedDatabase;
