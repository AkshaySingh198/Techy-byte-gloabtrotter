const express = require('express');
const router = express.Router();
const calendarController = require('../controllers/calendarController');
const { authenticateToken } = require('../middleware/auth');

router.use(authenticateToken);
router.get('/', calendarController.getCalendarEvents);

module.exports = router;
