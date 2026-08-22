const express = require('express');
const router = express.Router();
const settingsController = require('../controllers/settingsController');
const { authenticateToken } = require('../middleware/auth');

router.use(authenticateToken);

router.put('/profile', settingsController.updateProfile);
router.delete('/account', settingsController.deleteAccount);

module.exports = router;
