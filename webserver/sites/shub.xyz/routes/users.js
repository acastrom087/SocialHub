var express = require('express');
var router = express.Router();
var con = require('../util/database');
var User = require('../models/user');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/registro', function(req, res, next) {
  res.render('./user/index');

});




module.exports = router;
