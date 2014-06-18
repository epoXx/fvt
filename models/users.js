var getDB = require('./config/db');

module.exports = {
  login: function(req, res, next) {
    if (!req.session.user) {
    	res.redirect('/');
    } else {
    	next(); 
    }
  }
}