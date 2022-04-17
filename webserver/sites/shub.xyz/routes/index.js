
var express = require('express');
var router = express.Router();

const userController = require('../controllers/userController.js');
const homeController = require('../controllers/home.js');
const authController = require('../controllers/auth.js');
const twitterController =  require('../controllers/twitterController.js');


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
