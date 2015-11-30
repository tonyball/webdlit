var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Classroom = require('../models/Classroom.js');

/* GET Classroom listing. */
router.get('/', function (req, res, next) {
  Classroom.find(function (err, classrooms){
  	if(err) return next(err);
  	res.json(classrooms);
  });
});

/* GET /Classroom/code */
router.get('/:code', function (req, res, next){
	Classroom.findOne({code: req.params.code}, function (err, post){
		if(err) return next(err);
		res.json(post);
	});
});

/* POST /Classroom */
router.post('/', function (req, res, next){
	Classroom.create(req.body, function (err, post){
		if (err) return next(err);
		res.json(post);
	});
});

/* PUT /Classroom/:code */
router.put('/:code', function (req, res, next){
	Classroom.findOneAndUpdate({code: req.params.code}, req.body, function (err, post){
		if(err) return next(err);
		res.json(post);
	});
});

/* DELETE /Classroom/:code */
router.delete('/:code', function (req, res, next){
	Classroom.findOneAndRemove({code: req.params.code}, req.body, function (err, post){
		if (err) return next(err);
		res.json(post);
	});
});

module.exports = router;