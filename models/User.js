var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var UserSchema = new mongoose.Schema({

	username: {type:String, lowercase: true, unique: true, trim:true},
	password: String,
	title: String,
	firstname: String,
	lastname: String,
	email: String,
	school: String,
	role: Boolean,
	gender: String,
	birthdate: String,
	tel: String,
	education_level: String,
	bio: String,
	location: String,
	citizenid: String,
	avatarGroup: String,
	avatar: String,
	classrooms: Array,
	activities: Array,
	badges: Array,
	scores: Array,
	charts: Array,
	fb_id: String,
	fb_token: String,
	fb_email: String,
	fb_name: String,
	tw_id: String,
	tw_token: String,
	tw_displayName: String,
	tw_username: String,
	gg_id: String,
	gg_token: String,
	gg_email: String,
	gg_name: String
	
});

module.exports = mongoose.model('User', UserSchema);