var mongoose = require('mongoose');

var MessageSchema = new mongoose.Schema({
	message_id:String,
    sender:String,
    receiver:String,
    message:String,
    reply_to:String,
    datetime:{type: Date, default: Date.now},
    status:Boolean,
    url:String
});

module.exports = mongoose.model('Message', MessageSchema);