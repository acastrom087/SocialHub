
var express = require('express');
var router = express.Router();
const postController = require('../controllers/postController.js');
const twitterController = require('../controllers/twitterController');
const multer = require('multer');
var day = Date.now();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images');
  },
  filename: function (req, file, cb) {
    cb(null, day + "_" + file.originalname);
  }
})
const upload = multer({ storage: storage });


router.post('/create', upload.single("media"), postController.createPost);
router.post('/schedule', upload.single("media"), postController.createPostScheduled);

router.get('/tweet', upload.single("media"), twitterController.tweet);



module.exports = router;