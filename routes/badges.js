var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Badge = require('../models/Badge.js');

/* GET badges listing. */
router.get('/', function (req, res, next) {
  Badge.find(function (err, badges){
  	if(err) return next(err);
  	res.json(badges);
  });
});

/* GET /badges/id */
router.get('/:id', function (req, res, next){
	Badge.findOne({id:req.params.id}, function (err, post){
		if(err) return next(err);
		res.json(post);
	});
});

/* POST /badges */
router.post('/', function (req, res, next){
	Badge.create(req.body, function (err, post){
		if (err) return next(err);
		res.json(post);
	});
});

/* PUT /badges/:id */
router.put('/:id', function (req, res, next){
	Badge.findByIdAndUpdate({id:req.params.id}, req.body, function (err, post){
		if(err) return next(err);
		res.json(post);
	});
});

/* DELETE /badges/:id */
router.delete('/:id', function (req, res, next){
	Badge.findByIdAndRemove({id:req.params.id}, req.body, function (err, post){
		if (err) return next(err);
		res.json(post);
	});
});

module.exports = router;