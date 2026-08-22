const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');
const { authenticateToken } = require('../middleware/auth');
const { validateRequest } = require('../middleware/validation');

router.post('/checkout', validateRequest, paymentController.processPayment);

module.exports = router;
