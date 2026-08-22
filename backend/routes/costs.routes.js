const express = require('express');
const router = express.Router();
const costController = require('../controllers/costController');
const { authenticateToken } = require('../middleware/auth');

router.use(authenticateToken);

router.get('/trips/:tripId/summary', costController.getTripCostSummary);
router.post('/entry', costController.addCustomCost);

module.exports = router;
