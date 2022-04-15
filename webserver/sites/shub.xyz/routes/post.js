
var express = require('express');
var router = express.Router();
const postController = require('../controllers/postController.js');
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

router.get('/post', postController.getAll);
router.get('/create', postController.create);
router.get('/delete/:id', postController.delete);
router.get('/edit/:id', postController.edit);
router.post('/save', upload.single("image"), postController.save);
router.get('/post/:id', postController.post);


module.exports = router;