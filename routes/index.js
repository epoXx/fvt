var express = require('express');
var router = express.Router();
var model = require('../models/users.js');

/* GET home page. */
router.get('/', function(req, res) {
  res.render(
  	'index',
  	{ 
  		title: 'FBG Mettmatal Verwaltung',
  		partials: {
  			header: 'header',
  		}
  	});
});

module.exports = router;
