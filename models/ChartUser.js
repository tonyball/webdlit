var mongoose = require('mongoose');

var ChartUserSchema = new mongoose.Schema({
	username: String,
    month: String,
    title:String,
    code:String,
    times: Array,
    scores: Array
});

module.exports = mongoose.model('ChartUser', ChartUserSchema);