
var express = require('express');
var router = express.Router();
const postController = require('../controllers/postController.js');
const multer = require('multer');
var day = Date.now();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'media');
  },
  filename: function (req, file, cb) {
    cb(null, day + "_" + file.originalname);
  }
})
const upload = multer({ storage: storage });


router.get('/create', postController.home);
router.get('/send-now', postController.home);
router.get('/schedule', postController.home);
router.post('/create', postController.createPost);
router.post('/send-now', postController.createPostNow);
router.post('/schedule', postController.createPostScheduled);
router.post('/tweet', postController.createPostNow);
router.get('/delete/:id', postController.delete);




module.exports = router;