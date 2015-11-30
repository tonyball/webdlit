var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var User = require('../models/User.js');

/* GET users listing. */
router.get('/', function (req, res, next) {
  User.find(function (err, users){
  	if(err) return next(err);
  	res.json(users);
  });
});

/* GET /users/username */
router.get('/:username', function (req, res, next){
	User.findOne({username: req.params.username}, function (err, post){
		if(err) return next(err);
		res.json(post);
	});
});

/* POST /users */
router.post('/', function (req, res, next){
	User.create(req.body, function (err, post){
		if (err) return next(err);
		res.json(post);
	});
});

/* PUT /users/:username */
router.put('/:username', function (req, res, next){
	User.findOneAndUpdate({username: req.params.username}, req.body, function (err, post){
		if(err) return next(err);
		res.json(post);
	});
});

/* DELETE /users/:username */
router.delete('/:username', function (req, res, next){
	User.findOneAndRemove({username: req.params.username}, req.body, function (err, post){
		if (err) return next(err);
		res.json(post);
	});
});

module.exports = router;
