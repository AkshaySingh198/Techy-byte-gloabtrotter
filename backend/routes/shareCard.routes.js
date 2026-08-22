const express = require('express');
const router = express.Router();
const shareCardController = require('../controllers/shareCardController');

router.get('/trips/:tripId', shareCardController.generateShareCard);

module.exports = router;
