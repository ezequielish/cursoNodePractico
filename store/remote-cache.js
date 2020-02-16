const remote = require('./remote');
const { cachaService: { host, port } } = require('../config');

module.exports = new remote(host, port);