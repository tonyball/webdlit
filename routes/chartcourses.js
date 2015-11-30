var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var ChartCourse = require('../models/ChartCourse.js');

/* GET chartcourses listing. */
router.get('/', function (req, res, next) {
  ChartCourse.find(function (err, chartcourses){
  	if(err) return next(err);
  	res.json(chartcourses);
  });
});

/* GET /chartcourses/code */
router.get('/:code', function (req, res, next){
	ChartCourse.findOne({code: req.params.code}, function (err, post){
		if(err) return next(err);
		res.json(post);
	});
});

/* POST /chartcourses */
router.post('/', function (req, res, next){
	ChartCourse.create(req.body, function (err, post){
		if (err) return next(err);
		res.json(post);
	});
});

/* PUT /chartcourses/:code */
router.put('/:code', function (req, res, next){
	ChartCourse.findOneAndUpdate({code: req.params.code}, req.body, function (err, post){
		if(err) return next(err);
		res.json(post);
	});
});

/* DELETE /chartcourses/:code */
router.delete('/:code', function (req, res, next){
	ChartCourse.findOneAndRemove({code: req.params.code}, req.body, function (err, post){
		if (err) return next(err);
		res.json(post);
	});
});

module.exports = router;