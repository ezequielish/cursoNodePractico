// const store = require('../../../store/dummy');
const store = require('../../../store/mysql');

const ctrl = require('./controller');
/**
 * aqui lo que estamos haciendo es inyectar a nuestro controlador el store que queramos en este caso el de pruebas
 */
module.exports = ctrl(store);