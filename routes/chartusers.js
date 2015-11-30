var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var ChartUser = require('../models/ChartUser.js');

/* GET ChartUsers listing. */
router.get('/', function (req, res, next) {
  ChartUser.find(function (err, chartusers){
  	if(err) return next(err);
  	res.json(chartusers);
  });
});

/* GET /ChartUsers/username */
router.get('/:username', function (req, res, next){
	ChartUser.findOne({username: req.params.username}, function (err, post){
		if(err) return next(err);
		res.json(post);
	});
});

/* POST /ChartUsers */
router.post('/', function (req, res, next){
	ChartUser.create(req.body, function (err, post){
		if (err) return next(err);
		res.json(post);
	});
});

/* PUT /ChartUsers/:username */
router.put('/:id', function (req, res, next){
	ChartUser.findByIdAndUpdate(req.params.id, req.body, function (err, post){
		if(err) return next(err);
		res.json(post);
	});
});

/* DELETE /ChartUsers/:username */
router.delete('/:username', function (req, res, next){
	ChartUser.findOneAndRemove({username: req.params.username}, req.body, function (err, post){
		if (err) return next(err);
		res.json(post);
	});
});

module.exports = router;