// #starting server
const express = require('express');
const http = require('http');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const { Server } = require('socket.io');
require('dotenv').config();

const { connectDB, sequelize } = require('./config/database');
const seedDatabase = require('./scripts/seed');
const setupSocket = require('./socket');
const errorHandler = require('./middleware/errorHandler');

// Route imports
const authRoutes = require('./routes/auth.routes');
const tripsRoutes = require('./routes/trips.routes');
const itineraryRoutes = require('./routes/itinerary.routes');
const citiesRoutes = require('./routes/cities.routes');
const costsRoutes = require('./routes/costs.routes');
const calendarRoutes = require('./routes/calendar.routes');
const suggestionsRoutes = require('./routes/suggestions.routes');
const collaborationRoutes = require('./routes/collaboration.routes');
const blogsRoutes = require('./routes/blogs.routes');
const festivalsRoutes = require('./routes/festivals.routes');
const settingsRoutes = require('./routes/settings.routes');
const shareCardRoutes = require('./routes/shareCard.routes');

const app = express();
const server = http.createServer(app);

// Socket.io initialization
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE']
  }
});
app.set('io', io);
setupSocket(io);

// Middleware
app.use(helmet({ contentSecurityPolicy: false }));
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Health Check Endpoint
app.get('/api/v1/health', (req, res) => {
  res.json({
    status: 'online',
    service: 'GlobeTrotter API',
    version: 'v1',
    timestamp: new Date()
  });
});

// API v1 Router Mounts
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/trips', tripsRoutes);
app.use('/api/v1/itinerary', itineraryRoutes);
app.use('/api/v1/cities', citiesRoutes);
app.use('/api/v1/costs', costsRoutes);
app.use('/api/v1/calendar', calendarRoutes);
app.use('/api/v1/suggestions', suggestionsRoutes);
app.use('/api/v1/collaboration', collaborationRoutes);
app.use('/api/v1/blogs', blogsRoutes);
app.use('/api/v1/festivals', festivalsRoutes);
app.use('/api/v1/settings', settingsRoutes);
app.use('/api/v1/share-card', shareCardRoutes);

// Centralized Error Handling Middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    await connectDB();
    await sequelize.sync({ force: false });
    await seedDatabase();

    server.listen(PORT, () => {
      console.log(`=======================================================`);
      console.log(` ✈️  GlobeTrotter Backend Running on http://localhost:${PORT}`);
      console.log(` 🔗 REST API Endpoint Base: http://localhost:${PORT}/api/v1`);
      console.log(` ⚡ Socket.io Realtime Server Active`);
      console.log(`=======================================================`);
    });
  } catch (error) {
    console.error('[Server Startup Error]:', error);
  }
}

if (require.main === module) {
  startServer();
}

module.exports = { app, server };