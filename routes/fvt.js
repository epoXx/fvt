var FVT = {

	getDb: function() {
		var sqlite3 = require('sqlite3').verbose();
		FVT.db = new sqlite3.Database('db/fvtDB');
		return FVT.db;
	},

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
		var db = FVT.getDb();
		db.get('SELECT * FROM users WHERE username = ? AND password = ?', data, 
		function(err, row){
			if (row) {
				req.session.user = row.username; 
				console.log(req.session.user);
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
		var data = 
		res.send('Succsessfully logged in! Hello ' + req.session.user + '! Press <a href="/logout>Logout</a>"');
	} 
};

module.exports = FVT;