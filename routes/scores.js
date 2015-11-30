var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Score = require('../models/Score.js');

/* GET Scores listing. */
router.get('/', function (req, res, next) {
  Score.find(function (err, Scores){
  	if(err) return next(err);
  	res.json(Scores);
  });
});

/* GET /Scores/score_id */
router.get('/:score_id', function (req, res, next){
	Score.findOne({score_id:req.params.score_id}, function (err, post){
		if(err) return next(err);
		res.json(post);
	});
});

/* POST /Scores */
router.post('/', function (req, res, next){
	Score.create(req.body, function (err, post){
		if (err) return next(err);
		res.json(post);
	});
});

/* PUT /Scores/:score_id */
router.put('/:score_id', function (req, res, next){
	Score.findOneAndUpdate({score_id:req.params.score_id}, req.body, function (err, post){
		if(err) return next(err);
		res.json(post);
	});
});

/* DELETE /Scores/:score_id */
router.delete('/:score_id', function (req, res, next){
	Score.findOneAndRemove({score_id:req.params.score_id}, req.body, function (err, post){
		if (err) return next(err);
		res.json(post);
	});
});

module.exports = router;