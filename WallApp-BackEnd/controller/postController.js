var express = require('express');
var jwt = require('jsonwebtoken');
var model = require('../models/');


module.exports = {
  createPost: function (req, res, next){
    var bodyPost = {
      description  : req.body.description,
      code_user  : req.body.code_user,
      reqToken : req.get("token")
    }
    if(bodyPost.reqToken)
    {
        jwt.verify(bodyPost.reqToken,'superSecret', function(err, decoded) {
            if (err) {
                var obj = '{"error": {"message":"Failed to authenticate token.", "code":"400"}}';
                res.status(400);
                res.send(JSON.parse(obj));
            } else {
                var post = model.Post.findOne({
                    where: {
                        description : bodyPost.description,
                        code_user : bodyPost.code_user,
                    }
                }).then(function(result){
                    if (!result) {
                        model.Post.create(bodyUser).then(function(user){
                            // create a token
                            model.Post.findOne({
                                where: {
                                    description: bodyUser.description,
                                    code_user: bodyUser.code_user
                                }
                            }).then(function(result){
                                var obj = '{'
                                +'"id":"' + result.id + '",'
                                +'"description":"' + result.description + '",'
                                +'"user":"' + result.code_user + '"'
                                +'}';
                                res.send(JSON.parse(obj));
                            }).catch(function (err) {
                                var obj = '{"error": {"message":"'+ err.message +'", "code":"400"}}';
                                res.status(400);
                                res.send(JSON.parse(obj));
                            });
                        });
                    }
                    else {
                        var obj = '{"error": {"message":"Post already exists", "code":"400"}}';
                        res.status(400);
                        res.send(JSON.parse(obj));
                    }
                });
            }
        });
    }
  },
  deletePost: function(req, res, next){
		var bodyPost = {
			idPost 	: req.param.id,
            reqToken : req.get("token")
		}
        if(bodyPost.reqToken){
            jwt.verify(bodyPost.reqToken,'superSecret', function(err, decoded) {
                if (err) {
                    var obj = '{"error": {"message":"Failed to authenticate token.", "code":"400"}}';
                    res.status(400);
                    res.send(JSON.parse(obj));
                } else {
                    model.Post.destroy({
                        where: {
                            id: bodyPost.idPost,
                        }
                    }).success(function(){
                        var obj = '{"success": {"message":"Post deleted", "code":"200"}}';
                        res.send(JSON.parse(obj));
                    });
                }
            });
        }
    },
    getAllPost: function(req, res, next){
        var reqToken = req.get("token");
        if (reqToken) {
      // verifies secret and checks exp
      jwt.verify(reqToken,'superSecret', function(err, decoded) {
          if (err) {
              var obj = '{"error": {"message":"Failed to authenticate token.", "code":"400"}}';
              res.status(400);
              res.send(JSON.parse(obj));
            } else {
              ///test the connection with the data base
                  model.Post.findAll().then(function(result){
                      res.send(JSON.parse(JSON.stringify(result)));
                    }).catch(function (err) {
                        var obj = '{"error": {"message":"'+ err.message +'", "code":"400"}}';
                        res.status(400);
                        res.send(JSON.parse(obj));
                    });
            }
        });
    } else {
        var obj = '{"error": {"message":"No token provided.", "code":"400"}}';
        res.status(400);
        res.send(JSON.parse(obj));
    }
},
    	updatePost: function(req, res, next){
		var bodyPost = {
			idPost 	: req.body.username,
			description	: req.body.password,
            reqToken: req.get("token")
		}
        if(bodyPost.reqToken)
        {
            jwt.verify(bodyPost.reqToken,'superSecret', function(err, decoded) {
                if (err) {
                    var obj = '{"error": {"message":"Failed to authenticate token.", "code":"400"}}';
                    res.status(400);
                    res.send(JSON.parse(obj));
                } else {
                    model.Post.update({
                        description: bodyPost.description }
                        ,{
                       where: {
                            id :bodyPost.idPost
                        }
                    }).then(function(result){
				res.send(JSON.parse(result));
			}).catch(function (err) {
    			var obj = '{"error": {"message":"Invalid Credentials", "code":"400"}}';
          res.status(400);
        	res.send(JSON.parse(obj));
			});
        }
	});
}
}
}
