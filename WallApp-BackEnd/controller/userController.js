var express = require('express');
var jwt = require('jsonwebtoken');
var models = require('../models');
var mailController = require('../controller/mailController');

module.exports = {
  register: function (req, res, next){
    var bodyUser = {
      username  : req.body.username,
      password  : req.body.password,
      firstname : req.body.firstname,
      lastname : req.body.lastname,
      email : req.body.email
    }
    var user = models.User.findOne({
      where: {
        username : bodyUser.username
      }
    }).then(function(result){
      if (!result) {
        models.User.create(bodyUser).then(function(user){
              // create a token
              models.User.findOne({
                where: {
                  username: bodyUser.username,
                  password: bodyUser.password,
                  firstname: bodyUser.firstname,
                  lastname: bodyUser.lastname,
                  email: bodyUser.email
                }
              }).then(function(result){
            var obj = '{'
                +'"id":"' + result.id + '",'
                +'"username":"' + result.username + '",'
                +'"firstname":"' + result.firstname + '",'
                +'"lastname":"' + result.lastname + '",'
                +'"email":"' + result.email + '"'
                +'}';
            res.send(JSON.parse(obj));
            mailController.Mail(bodyUser);
          }).catch(function (err) {
              var obj = '{"error": {"message":"'+ err.message +'", "code":"400"}}';
              res.status(400);
              res.send(JSON.parse(obj));
          });
        });
      }
      else {
        var obj = '{"error": {"message":"User already exists", "code":"400"}}';
        res.status(400);
        res.send(JSON.parse(obj));
      }
    });
  },
	Login: function(req, res, next){
		var bodyUser = {
			username 	: req.body.username,
			password	: req.body.password
		}
        	// create a token
	        var token = jwt.sign(bodyUser, 'superSecret', {
	          expiresIn: 1800 // expires in 30 min.
        	});
        	models.User.findOne({
	       		where: {
	       			username: bodyUser.username,
	       			password: bodyUser.password
	       		}
			}).then(function(result){
				var obj = '{'
	       		+'"id":"' + result.id + '",'
	       		+'"username":"' + result.username + '",'
	       		+'"token":"' + token + '"'
	       		+'}';
				res.send(JSON.parse(obj));
			}).catch(function (err) {
    			var obj = '{"error": {"message":"Invalid Credentials", "code":"400"}}';
          res.status(400);
        	res.send(JSON.parse(obj));
			});
	}
}
