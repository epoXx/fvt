var express = require('express');
var model = require('../models/users.js');
var fvtDB = require('../config/db.js');

/* Check Login */

exports.checkAuth = function(req, res, next) {
	if (!req.session.user) {
		res.redirect('/');
	} else {
		next();
	}
};

exports.login = function(req, res, next) {
	if (req.session.user) {
		res.redirect('/fvt');
	}
	res.render('login');
};

exports.processLogin = function(req, res, next) {
	var data = [req.body.username, req.body.password];
	var db = fvtDB.getDB();

	db.get('SELECT * FROM users WHERE username = ? AND password = ?', data, 
		function(err, row) {
			if (row) {
				req.session.user = row.username;
				res.redirect('/fvt');
			} else {
				res.redirect('/');
			}
		});
};

exports.logout = function(req, res, next) {
	delete req.session.user;
	res.redirect('/');
};

exports.fvt = function(req, res, next) {
	res.send('Succsessfully logged in!');
}; 