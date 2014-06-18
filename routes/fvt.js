var FVT = {

	checkAuth: function(req, res, next) {
		if (!req.session.user) {
			res.redirect('/');
		} else {
			next();
		}
	},

	login: function(req, res, next) {
		if (req.session.user) {
			res.redirect('/fvt');
		}
		res.render('login');
	},

	processLogin: function(req, res, next) {
		var data = [req.body.username, req.body.password];
		var sqlite3 = require('sqlite3').verbose();
		var db = new sqlite3.Database('db/fvtDB');
		
		db.get('SELECT * FROM users WHERE username = ? AND password = ?', data, 
		function(err, row){
			if (row) {
				req.session.user = row.username; 
				res.redirect('/fvt');
			} else {
				res.redirect('/');
				console.log('falsches PW');
			}
		});
	}, 

	logout: function(req, res, next) {
		delete req.session.user;
		res.redirect('/');
	},

	fvt: function(req, res, next) {
		
		res.send('Succsessfully logged in! Hello ' + req.session.user + '! Press <a href="/logout>Logout</a>"');
	} 
};

module.exports = FVT;