var express = require('express');
var router = express.Router();
var postController = require('../controller/postController');
/* GET home page. */
router.get('/', postController.getAllPost);
router.post('/create',postController.createPost);
router.get('/delete/:id',postController.deletePost);
router.post('/update/:id',postController.updatePost);

module.exports = router;
