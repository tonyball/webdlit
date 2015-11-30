var mongoose = require('mongoose');

var ChartCourseSchema = new mongoose.Schema({
	id:String,
	code:String,
	classrooms:Array,
	title: String,
	users:Array
});

module.exports = mongoose.model('ChartCourse', ChartCourseSchema);