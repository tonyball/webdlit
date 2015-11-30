var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Notification = require('../models/Notification.js');

/* GET Notifications listing. */
router.get('/', function (req, res, next) {
  Notification.find(function (err, notifications){
  	if(err) return next(err);
  	res.json(notifications);
  });
});

/* GET /Notifications/id */
router.get('/:id', function (req, res, next){
	Notification.findById(req.params.id, function (err, post){
		if(err) return next(err);
		res.json(post);
	});
});

/* POST /Notifications */
router.post('/', function (req, res, next){
	Notification.create(req.body, function (err, post){
		if (err) return next(err);
		res.json(post);
	});
});

/* PUT /Notifications/:id */
router.put('/:id', function (req, res, next){
	Notification.findByIdAndUpdate(req.params.id, req.body, function (err, post){
		if(err) return next(err);
		res.json(post);
	});
});

/* DELETE /Notifications/:id */
router.delete('/:id', function (req, res, next){
	Notification.findByIdAndRemove(req.params.id, req.body, function (err, post){
		if (err) return next(err);
		res.json(post);
	});
});

module.exports = router;
