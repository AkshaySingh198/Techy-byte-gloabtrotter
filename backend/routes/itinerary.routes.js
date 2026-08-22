const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const itineraryController = require('../controllers/itineraryController');
const { authenticateToken } = require('../middleware/auth');
const { validateRequest } = require('../middleware/validation');

router.use(authenticateToken);

router.post(
  '/stops',
  [
    body('trip_id').isInt().withMessage('Valid trip_id required'),
    body('city_id').isInt().withMessage('Valid city_id required'),
    validateRequest
  ],
  itineraryController.addStop
);

router.put('/stops/reorder', itineraryController.reorderStops);
router.delete('/stops/:id', itineraryController.deleteStop);

router.post(
  '/activities',
  [
    body('stop_id').isInt().withMessage('Valid stop_id required'),
    body('activity_id').isInt().withMessage('Valid activity_id required'),
    validateRequest
  ],
  itineraryController.assignActivity
);

router.delete('/activities/:id', itineraryController.removeActivity);
router.get('/trips/:tripId/daywise', itineraryController.getDayWiseItinerary);

module.exports = router;
