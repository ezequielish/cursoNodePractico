const nanoid = require('nanoid');

const TABLA = 'user';

module.exports = function (injectedStore) {
    let store = injectedStore;
    if (!store) {
        store = require('../../../store/dummy'); //si no se exta inyectando el store va a usar el de pruebas
    }

    function list() {
        return store.list(TABLA);
    }

    function get(id) {
        return store.get(TABLA, id);
    }

    function upsert(body) {
        const user = {
            name: body.name,
            username: body.username,
            password: body.password
        }

        if (body.id) {
            user.id = body.id;
        } else {
            user.id = nanoid();
        }

        return store.upsert(TABLA, user);
    }

    return {
        list,
        get,
        upsert,
    };
}