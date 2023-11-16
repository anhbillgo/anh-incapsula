var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const fs = require('fs');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var incapsulaRouter = require('./routes/incapsular');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/_Incapsula_Resource', incapsulaRouter);

var getJSfunction = (req, res) => {
  var url = req.originalUrl.indexOf('?') > 0 ? req.originalUrl.split('?')[0] : req.originalUrl; 
  var filePath = url.replace('/', '');   
  //console.log(req);
  if (req.query.cachebuster) {
      res.send({
          token : "olloal", 
          renewInSec : 10_077, 
          cookieDomain : req.host
      });
  }
  else {
      //console.log(__dirname);
      var stat = fs.statSync(__dirname + "/public/javascripts/" + filePath);

      res.writeHead(200, {
          'Content-Type': 'text/javascript',
          'Content-Length': stat.size,
      });

      var readStream = fs.createReadStream(__dirname + "/public/javascripts/" + filePath);      
      readStream.pipe(res);
  }    
};
app.get('/incapsulajs.js', getJSfunction);
app.get('/jspath.js', getJSfunction);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
