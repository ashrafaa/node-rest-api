const appRoutes = require('./routes');

module.exports = function(app, db) {
    appRoutes(app, db);
}