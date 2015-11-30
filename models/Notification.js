var mongoose = require('mongoose');

var NotificationSchema = new mongoose.Schema({
    sender:String,
    receiver:String,
    content:String,
    datetime:{type: Date, default: Date.now},
    status:{type:Boolean, default: false},
    url:String
});

module.exports = mongoose.model('Notification', NotificationSchema);