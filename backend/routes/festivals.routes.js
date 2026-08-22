const express = require('express');
const router = express.Router();
const festivalController = require('../controllers/festivalController');

router.get('/check-overlap', festivalController.checkFestivalAndSeasonOverlap);

module.exports = router;
