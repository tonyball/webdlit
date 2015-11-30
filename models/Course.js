var mongoose = require('mongoose');

var CourseSchema = new mongoose.Schema({
    id:String,
    title:String,
    topics:Array,
    classrooms:Array,
    code:String,
    duration: Number,
    image:String,
    username:String,
    teacher_name:String,
    subject:String,
    degree:String,
    sections:Array,
    students:Array,
    tested_students:Array,
    sentNotifyTest:Boolean
});

module.exports = mongoose.model('Course', CourseSchema);