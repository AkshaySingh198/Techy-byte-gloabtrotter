const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const tripController = require('../controllers/tripController');
const { authenticateToken } = require('../middleware/auth');
const { validateRequest } = require('../middleware/validation');

router.use(authenticateToken);

router.post(
  '/',
  [
    body('name').trim().notEmpty().withMessage('Trip name is required'),
    body('start_date').isDate().withMessage('Valid start date is required'),
    body('end_date').isDate().withMessage('Valid end date is required'),
    validateRequest
  ],
  tripController.createTrip
);

router.get('/', tripController.getTrips);
router.get('/:id', tripController.getTripById);
router.put('/:id', tripController.updateTrip);
router.delete('/:id', tripController.deleteTrip);

router.post(
  '/:id/members',
  [
    body('email').isEmail().withMessage('Valid email of invited member is required'),
    validateRequest
  ],
  tripController.addMember
);

module.exports = router;
