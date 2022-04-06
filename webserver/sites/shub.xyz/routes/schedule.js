var express = require('express');
var router = express.Router();
const scheduleController = require('../controllers/scheduleController');

router.get('/schedule', scheduleController.getAll);
router.get('/create', scheduleController.create);
router.get('/delete/:id', scheduleController.delete);
router.get('/edit/:id', scheduleController.edit);
router.post('/save', scheduleController.save);


module.exports = router;