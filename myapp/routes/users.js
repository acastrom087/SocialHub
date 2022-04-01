var express = require('express');
var router = express.Router();
const userController = require('../controllers/userController');


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/index', userController.index);

router.get('/crear', userController.crear);

router.post('/guardar', userController.guardar);



module.exports = router;
