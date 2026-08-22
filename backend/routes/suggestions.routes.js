const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const suggestionController = require('../controllers/suggestionController');
const { validateRequest } = require('../middleware/validation');

router.post(
  '/recommend',
  [
    body('start_city').notEmpty().withMessage('Start city is required'),
    body('end_city').notEmpty().withMessage('Destination city is required'),
    validateRequest
  ],
  suggestionController.getRouteSuggestions
);

module.exports = router;
