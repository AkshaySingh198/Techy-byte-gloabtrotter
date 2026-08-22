const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const tripController = require('../controllers/tripController');
const { optionalAuthToken } = require('../middleware/auth');

router.use(optionalAuthToken);

router.post('/', tripController.createTrip);

router.get('/', tripController.getTrips);
router.get('/:id', tripController.getTripById);
router.put('/:id', tripController.updateTrip);
router.delete('/:id', tripController.deleteTrip);

module.exports = router;
