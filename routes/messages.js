var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Message = require('../models/Message.js');

/* GET Scores listing. */
router.get('/', function (req, res, next) {
  Message.find(function (err, Scores){
  	if(err) return next(err);
  	res.json(Scores);
  });
});

/* GET /Scores/score_id */
router.get('/:message_id', function (req, res, next){
	Message.findOne({message_id:req.params.message_id}, function (err, post){
		if(err) return next(err);
		res.json(post);
	});
});

/* POST /Scores */
router.post('/', function (req, res, next){
	Message.create(req.body, function (err, post){
		if (err) return next(err);
		res.json(post);
	});
});

/* PUT /Scores/:score_id */
router.put('/:message_id', function (req, res, next){
	Message.findOneAndUpdate({message_id:req.params.message_id}, req.body, function (err, post){
		if(err) return next(err);
		res.json(post);
	});
});

/* DELETE /Scores/:score_id */
router.delete('/:message_id', function (req, res, next){
	Message.findOneAndRemove({message_id:req.params.message_id}, req.body, function (err, post){
		if (err) return next(err);
		res.json(post);
	});
});

module.exports = router;