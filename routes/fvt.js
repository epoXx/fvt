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
		var db = FVT.getDb();
		db.all('SELECT * FROM wbs',
			function(err, data){
				if(data) {
					var list = JSON.stringify(data);
					res.render('fvt', {'data': data, 'partials': { navbar: 'navbar'}});
				}
			});
	},

	addWBS: function(req, res, next) {
		res.render('addWB');
	},

	processAddWb: function(req, res, next) {
		var data = [req.body.wbnum, req.body.vorname, req.body.nachname, 
					req.body.waldflaeche, req.body.strasse, req.body.plz, req.body.stadt];
		var db = FVT.getDb();
		console.log(data);
		db.run("INSERT INTO wbs VALUES (?,?,?,?,?,?,?)", data, function(err){
			if(err) {
				console.log(err)
			} else {
				db.close();
				res.send('Success!')
			}
		});
	} 
};

module.exports = FVT;