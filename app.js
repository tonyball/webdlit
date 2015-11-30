var express = require('express');
var path = require('path');
var mongoose = require('mongoose');
var passport = require('passport');
var flash = require('connect-flash');
var favicon = require('serve-favicon');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var port = process.env.PORT || 80
var routes = require('./routes/index');
var users = require('./routes/users');
var badges = require('./routes/badges');
var chartcourses = require('./routes/chartcourses');
var chartusers = require('./routes/chartusers');
var classrooms = require('./routes/classrooms');
var courses = require('./routes/courses');
var notifications = require('./routes/notifications');
var scores = require('./routes/scores');
var messages = require('./routes/messages');

var app = express();
mongoose.connect('mongodb://dlit:dlit@ds045614.mongolab.com:45614/dlit', function(err){
  if(err){
    console.log('database connection error', err);
  } else {
    console.log('database connection successful');
  }
});

// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.use(favicon(path.join(__dirname, 'app', 'favicon.ico')));
app.use(morgan('dev'));
app.use(bodyParser.json({limit:'50mb'}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(__dirname + '/app'));

app.use(session({secret: 'dlitnewkruapplication2015'}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use('/',routes);
app.use('/users', users);
app.use('/badges', badges);
app.use('/chartcourses', chartcourses);
app.use('/chartusers', chartusers);
app.use('/classrooms',classrooms);
app.use('/courses', courses);
app.use('/notifications', notifications);
app.use('/scores', scores);
app.use('/messages', messages);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.listen(port);
console.log('server is listening on port '+port);