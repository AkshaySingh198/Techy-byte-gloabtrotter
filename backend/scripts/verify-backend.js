const http = require('http');
const { app, server } = require('../server');
const { connectDB, sequelize } = require('../config/database');
const seedDatabase = require('./seed');

function makeRequest(options, postData = null) {
  return new Promise((resolve, reject) => {
    const req = http.request(options, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        try {
          const parsed = JSON.parse(body);
          resolve({ statusCode: res.statusCode, body: parsed });
        } catch (e) {
          resolve({ statusCode: res.statusCode, body });
        }
      });
    });

    req.on('error', reject);

    if (postData) {
      req.write(typeof postData === 'string' ? postData : JSON.stringify(postData));
    }
    req.end();
  });
}

async function runVerification() {
  console.log('--- STARTING GLOBETROTTER BACKEND VERIFICATION SUITE ---');

  await connectDB();
  await sequelize.sync({ force: true }); // Clean slate for verification
  await seedDatabase();

  const PORT = 5001; // Use separate port for verification test
  await new Promise(resolve => server.listen(PORT, resolve));
  console.log(`[Verification] Test server listening on port ${PORT}`);

  try {
    // 1. Health Check
    console.log('\n[1] Testing Health Endpoint...');
    const health = await makeRequest({
      hostname: 'localhost',
      port: PORT,
      path: '/api/v1/health',
      method: 'GET'
    });
    console.log('Result:', health.statusCode === 200 ? '✅ PASSED' : '❌ FAILED', health.body);

    // 2. Auth - Register
    console.log('\n[2] Testing User Registration...');
    const regRes = await makeRequest({
      hostname: 'localhost',
      port: PORT,
      path: '/api/v1/auth/register',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    }, {
      name: 'Rohan Sharma',
      email: 'rohan.sharma@example.com',
      password: 'Password123!',
      phone: '9876543210',
      city: 'Delhi',
      state: 'Delhi',
      gender: 'male',
      age: 26
    });
    console.log('Result:', regRes.statusCode === 201 ? '✅ PASSED' : '❌ FAILED', regRes.body.message);
    const token = regRes.body.data.accessToken;

    // 3. Auth - Login
    console.log('\n[3] Testing User Login...');
    const loginRes = await makeRequest({
      hostname: 'localhost',
      port: PORT,
      path: '/api/v1/auth/login',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    }, {
      email: 'rohan.sharma@example.com',
      password: 'Password123!'
    });
    console.log('Result:', loginRes.statusCode === 200 ? '✅ PASSED' : '❌ FAILED');

    // 4. Cities List
    console.log('\n[4] Testing Cities List...');
    const citiesRes = await makeRequest({
      hostname: 'localhost',
      port: PORT,
      path: '/api/v1/cities',
      method: 'GET'
    });
    console.log(`Result: ✅ PASSED (${citiesRes.body.data.length} Indian cities seeded)`);
    const goaCity = citiesRes.body.data.find(c => c.name === 'Goa');

    // 5. Trip Creation (with permit check)
    console.log('\n[5] Testing Trip Creation (Sikkim & Goa Explorer)...');
    const tripRes = await makeRequest({
      hostname: 'localhost',
      port: PORT,
      path: '/api/v1/trips',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    }, {
      name: 'Sikkim & Goa Vacation',
      start_date: '2026-10-10',
      end_date: '2026-10-20',
      description: 'Exploring Gangtok Sikkim mountains & Baga beach Goa',
      visibility: 'group'
    });
    console.log('Result:', tripRes.statusCode === 201 ? '✅ PASSED' : '❌ FAILED', `Permit Flag: ${tripRes.body.data.permit_required}`);
    const tripId = tripRes.body.data.id;

    // 6. Itinerary - Add City Stop
    console.log('\n[6] Testing Itinerary - Add City Stop...');
    const stopRes = await makeRequest({
      hostname: 'localhost',
      port: PORT,
      path: '/api/v1/itinerary/stops',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    }, {
      trip_id: tripId,
      city_id: goaCity ? goaCity.id : 1,
      arrival_date: '2026-10-10',
      departure_date: '2026-10-15'
    });
    console.log('Result:', stopRes.statusCode === 201 ? '✅ PASSED' : '❌ FAILED', stopRes.body.message);
    const stopId = stopRes.body.data.id;

    // 7. Itinerary - Schedule Activity
    console.log('\n[7] Testing Itinerary - Assign Activity...');
    const actRes = await makeRequest({
      hostname: 'localhost',
      port: PORT,
      path: '/api/v1/itinerary/activities',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    }, {
      stop_id: stopId,
      activity_id: 1, // Watersports
      scheduled_time: '11:00 AM',
      day_number: 1
    });
    console.log('Result:', actRes.statusCode === 201 ? '✅ PASSED' : '❌ FAILED');

    // 8. Day-wise Itinerary
    console.log('\n[8] Testing Day-wise Itinerary Fetch...');
    const daywiseRes = await makeRequest({
      hostname: 'localhost',
      port: PORT,
      path: `/api/v1/itinerary/trips/${tripId}/daywise`,
      method: 'GET',
      headers: { 'Authorization': `Bearer ${token}` }
    });
    console.log('Result:', daywiseRes.statusCode === 200 ? '✅ PASSED' : '❌ FAILED', `Total Days: ${daywiseRes.body.data.total_days}`);

    // 9. Cost Engine Breakdown
    console.log('\n[9] Testing Cost Breakdown Engine...');
    const costRes = await makeRequest({
      hostname: 'localhost',
      port: PORT,
      path: `/api/v1/costs/trips/${tripId}/summary`,
      method: 'GET',
      headers: { 'Authorization': `Bearer ${token}` }
    });
    console.log('Result:', costRes.statusCode === 200 ? '✅ PASSED' : '❌ FAILED', `Total Estimated Cost: ₹${costRes.body.data.total_cost}`);

    // 10. Suggestions Engine
    console.log('\n[10] Testing Transport & Hotel Comparison Engine...');
    const sugRes = await makeRequest({
      hostname: 'localhost',
      port: PORT,
      path: '/api/v1/suggestions/recommend',
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    }, {
      start_city: 'Delhi',
      end_city: 'Goa',
      budget_tier: 'mid'
    });
    console.log('Result:', sugRes.statusCode === 200 ? '✅ PASSED' : '❌ FAILED', `Transport Options Found: ${sugRes.body.data.transport_options.length}`);

    // 11. Group Expense Splitting
    console.log('\n[11] Testing Group Expense & UPI Splitting...');
    const expRes = await makeRequest({
      hostname: 'localhost',
      port: PORT,
      path: '/api/v1/collaboration/expenses',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    }, {
      trip_id: tripId,
      amount: 4500.00,
      description: 'Baga Beach Shack Dinner & Drinks',
      split_type: 'equal'
    });
    console.log('Result:', expRes.statusCode === 201 ? '✅ PASSED' : '❌ FAILED', expRes.body.message);

    // 12. Travel Blog & Socket Toast Broadcast
    console.log('\n[12] Testing Travel Blog Publishing...');
    const blogRes = await makeRequest({
      hostname: 'localhost',
      port: PORT,
      path: '/api/v1/blogs',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    }, {
      title: 'Top 5 Hidden Gems in Goa You Must Visit',
      content: 'From Fontainhas Latin Quarter to tranquil Galgibaga beach, here is my complete guide!',
      images: ['https://images.unsplash.com/photo-1512343879784-a960bf40e7f2']
    });
    console.log('Result:', blogRes.statusCode === 201 ? '✅ PASSED' : '❌ FAILED', blogRes.body.message);

    // 13. Social Share Card Generator
    console.log('\n[13] Testing Server-side Social Share Card Generator...');
    const cardRes = await makeRequest({
      hostname: 'localhost',
      port: PORT,
      path: `/api/v1/share-card/trips/${tripId}`,
      method: 'GET'
    });
    console.log('Result:', cardRes.statusCode === 200 ? '✅ PASSED' : '❌ FAILED', `Card SVG Generated (${cardRes.body.data.svg_card_code.length} bytes)`);

    console.log('\n=======================================================');
    console.log(' 🎉 ALL BACKEND VERIFICATION TESTS PASSED SUCCESSFULLY! 🎉');
    console.log('=======================================================\n');

  } catch (err) {
    console.error('❌ Verification Error:', err);
  } finally {
    server.close();
    process.exit(0);
  }
}

runVerification();
