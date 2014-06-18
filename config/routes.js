var routes = require('../routes/index.js');

module.exports = function(app) {
	app.get('/', routes.login);
	app.post('/login', routes.processLogin);
	app.get('/logout', routes.logout);
	app.get('/fvt', routes.checkAuth, routes.fvt);
};