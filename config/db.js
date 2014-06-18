var fvtDB = {
	_db: null,

	getDB: function(){
		if(!fvtDB._db) {
			var sqlite3 = require('sqlite3').verbose();
		}
		return fvtDB._db; 
	}
}

module.exports = fvtDB;