var express = require('express');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var tr8n = require('./../../lib/extensions/express.js');

var routes = require('./routes/index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(favicon(__dirname + "/public/images/favicon.ico"));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//app.use(tr8n.init("4a70fec459854794e", "680a8479c8387ebc1", {
//  cache: {
//    enabled: true,
//    adapter: "redis",
//    host: "localhost",
//    port: 6379,
//    version: 1,
//    timeout: 3600
//  }
//}));

//app.use(tr8n.init("680d6c3913971ac32", "35510cb65d5144673", {
app.use(tr8n.init("77b274618a8d58873", "cff464ce525ad6020", {
  //host: "http://localhost:3000",
  cache: {
    enabled: true,
//    adapter: "redis",
//    host: "localhost",
//    port: 6379,
//    version: 1,
//    timeout: 3600
    adapter: "memcached",
    hosts: {"localhost:11211": 1},
    options: {},
    version: 1,
    timeout: 3600
  }
}));

app.use('/', routes);

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

/// error handlers

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
