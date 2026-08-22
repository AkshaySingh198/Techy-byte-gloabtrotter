const express = require('express');
const { body } = require('express-validator');
const router = express.Router();
const collaborationController = require('../controllers/collaborationController');
const { authenticateToken } = require('../middleware/auth');
const { validateRequest } = require('../middleware/validation');

router.use(authenticateToken);

router.post(
  '/expenses',
  [
    body('trip_id').isInt().withMessage('Valid trip_id required'),
    body('amount').isFloat({ gt: 0 }).withMessage('Amount must be greater than 0'),
    body('description').notEmpty().withMessage('Description required'),
    validateRequest
  ],
  collaborationController.addExpense
);

router.get('/trips/:tripId/balances', collaborationController.getTripBalances);
router.put('/shares/:shareId/settle', collaborationController.settleShare);

module.exports = router;
