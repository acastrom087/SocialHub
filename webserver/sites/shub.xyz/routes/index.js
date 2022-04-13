var express = require('express');
var router = express.Router();

const userController = require('../controllers/userController');
const homeController = require('../controllers/home');
const authController = require('../controllers/auth');


/* GET home page. */
router.get('/', homeController.getHome);

router.get('/login', homeController.getLogin);

router.post('/login', authController.login);

router.get('/login-authentication', authController.loginTFA);

router.post('/login-authentication', authController.authentication);

router.get('/register', homeController.getRegister);

router.post('/register', userController.addUsers);

router.get('/dashboard', authController.getDashboard);

router.post('/logout', authController.logout);

module.exports = router;
