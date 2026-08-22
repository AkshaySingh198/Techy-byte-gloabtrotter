const express = require('express');
const router = express.Router();
const cityController = require('../controllers/cityController');

router.get('/', cityController.getCities);
router.get('/:id/activities', cityController.getCityActivities);

module.exports = router;
