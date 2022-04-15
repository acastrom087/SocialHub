
var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController.js');
const authController = require('../controllers/auth.js');

router.get('/settings', userController.getSettings);

router.post('/enable-token', userController.enableTFA);

module.exports = router;
