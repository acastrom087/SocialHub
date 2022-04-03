var express = require('express');
var router = express.Router();
const scheduleController = require('../controllers/scheduleController');

router.get('/schedule', scheduleController.getAll);
router.get('/create', scheduleController.create);
router.post('/save', scheduleController.save);

module.exports = router;