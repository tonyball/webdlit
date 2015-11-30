var mongoose = require('mongoose');

var ScoreSchema = new mongoose.Schema({
	score_id:String,
	username:String,
	test_name:String,
	course_code:String,
	description:String,
	teacher_comment:String,
	submit_date: {type:Date, default:Date.now},
	status: String,
	score: Number,
	full_score: Number,
	score_percentage: Number,
	submit_answer: Array,
	correct_answer: Array,
	comment_by_problem: Array,
});

module.exports = mongoose.model('Score', ScoreSchema);