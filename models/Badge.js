var mongoose = require('mongoose');

var BadgeSchema = new mongoose.Schema({
	id:String,
	name:String,
	description:String,
	image:String,
	condition:String,
	group:String
});

module.exports = mongoose.model('Badge', BadgeSchema);