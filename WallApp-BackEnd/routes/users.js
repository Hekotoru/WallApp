var express = require('express');
var router = express.Router();
var userController = require('../controller/userController');
/* GET users listing. */
router.post('/register',userController.register);
router.post('/login',userController.Login);
module.exports = router;
