var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController');
const authController = require('../controllers/auth');

router.get('/settings', authController.getSettings);

module.exports = router;
