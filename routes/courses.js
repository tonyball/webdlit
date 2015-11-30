var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Course = require('../models/Course.js');

/* GET Course listing. */
router.get('/', function (req, res, next) {
  Course.find(function (err, courses){
  	if(err) return next(err);
  	res.json(courses);
  });
});

/* GET /Course/code */
router.get('/:code', function (req, res, next){
	Course.findOne({code: req.params.code}, function (err, post){
		if(err) return next(err);
		res.json(post);
	});
});

/* POST /Course */
router.post('/', function (req, res, next){
	Course.create(req.body, function (err, post){
		if (err) return next(err);
		res.json(post);
	});
});

/* PUT /Course/:code */
router.put('/:code', function (req, res, next){
	Course.findOneAndUpdate({code: req.params.code}, req.body, function (err, post){
		if(err) return next(err);
		res.json(post);
	});
});

/* DELETE /Course/:code */
router.delete('/:code', function (req, res, next){
	Course.findOneAndRemove({code: req.params.code}, req.body, function (err, post){
		if (err) return next(err);
		res.json(post);
	});
});

module.exports = router;