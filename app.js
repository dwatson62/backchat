require('dotenv').config();

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var Pusher = require('pusher');

var pusher = new Pusher({
  appId: process.env.app_id,
  key: process.env.key,
  secret: process.env.secret
});

pusher.trigger('message_channel', 'new_message');

var mongoose   = require('mongoose');

var mongoUri = process.env.MONGODB_URI ||
               'mongodb://localhost/backchat_' + process.env.NODE_ENV;

var Message = require('./models/message.js');

mongoose.connect(mongoUri, function(err) {
  if (err) {
    console.log('Connection error:', err);
  } else {
    console.log('Connection to ' + process.env.NODE_ENV + ' database was successful!');
  }
});


var routes = require('./routes/index');
var messages = require('./routes/messages');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/node_modules',  express.static(__dirname + '/node_modules'));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/js', express.static(__dirname + '/js'));
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));
app.use(favicon(__dirname + '/public/images/favicon.ico'));

app.use('/', routes);
app.use('/', messages);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
