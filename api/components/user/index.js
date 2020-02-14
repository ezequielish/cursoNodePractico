// const store = require('../../../store/dummy');
const { remoteDB } = require("../../../config")

const rdb = new Boolean(remoteDB)


let store, cache;

if ( rdb == true) {
    store = require('../../../store/remote-mysql');
    // cache = require('../../../store/remote-cache');
} else {
    store = require('../../../store/mysql');
    // cache = require('../../../store/redis');
}

const ctrl = require('./controller');
/**
 * aqui lo que estamos haciendo es inyectar a nuestro controlador el store que queramos en este caso el de pruebas
 */
module.exports = ctrl(store);