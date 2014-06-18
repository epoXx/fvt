var express = require('express');
var FVT = require('./routes/fvt.js');
var users = require('./routes/users.js');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var bodyParser = require('body-parser');

var app = express();

// view engine setup
app.engine('html', require('hogan-express'));
app.enable('view cache');
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.set('layout', 'layout');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser('secret'));
app.use(session({secret: 'dasisteingeheimnis'}));
app.use(require('less-middleware')({ src: path.join(__dirname, 'public') }));
app.use(express.static(path.join(__dirname, 'public')));

// load routes
app.get('/', FVT.login);
app.post('/login', FVT.processLogin);
app.get('/logout', FVT.logout);
app.get('/fvt', FVT.checkAuth, FVT.fvt);

/// catch 404 and forwarding to error handler
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
