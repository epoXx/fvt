var getDB = function(){
	var sqlite3 = require('sqlite3').verbose();
	var db = new sqlite3.Database('db/fvtDB');
};

module.exports = getDB; 
