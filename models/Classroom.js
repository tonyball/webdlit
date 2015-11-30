var mongoose = require('mongoose');

var ClassroomSchema = new mongoose.Schema({
	id: String,
    title: String,
    code: String,
    duration: Number,
    image: String,
    username: String,
    teacher_name: String,
    subject: String,
    courses: Array,
    students: Array,
    verification_code:String,
    posts: Array
});

module.exports = mongoose.model('Classroom', ClassroomSchema);