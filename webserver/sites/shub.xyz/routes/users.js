var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController');
const authController = require('../controllers/auth');

router.get('/settings', userController.getSettings);

router.post('/enable-token', userController.enableTFA);

module.exports = router;
