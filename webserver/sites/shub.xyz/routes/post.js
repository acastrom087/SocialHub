var express = require('express');
var router = express.Router();
const postController = require('../controllers/postController');

router.get('/post', postController.post);

module.exports = router;