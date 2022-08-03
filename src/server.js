const app = require('./index');
const config = require('../config/config');

const server = app.listen(config.port);

module.exports = server;
