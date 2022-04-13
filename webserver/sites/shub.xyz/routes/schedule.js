var express = require('express');
var router = express.Router();
const scheduleController = require('../controllers/scheduleController');
const multer = require('multer');
var fecha = Date.now();

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null,'./public/images/');
    },
    filename: function (req, file, cb) {
      console.log(file);
      cb(null, fecha+"_"+file.originalname);
    }
  })
  const upload = multer({ storage: storage });

router.get('/schedule', scheduleController.getAll);
router.get('/create', scheduleController.create);
router.get('/delete/:id', scheduleController.delete);
router.get('/edit/:id', scheduleController.edit);
router.post('/save', upload.single("image"), scheduleController.save);


module.exports = router;