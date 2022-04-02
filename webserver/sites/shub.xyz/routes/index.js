var express = require('express');
var router = express.Router();

const userController = require('../controllers/user');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/login', function(req, res, next) {
  res.render('../views/login.ejs');
});

router.get('/register', function(req, res, next) {
  res.render('../views/register.ejs');
});

router.post('/login', userController.login);

router.post('/register', userController.addUsers);


module.exports = router;
