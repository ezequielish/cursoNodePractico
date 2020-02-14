const remote = require('./remote');
const { dbMysqlRemote: { host, port } } = require('../config');

module.exports = new remote(host, port);