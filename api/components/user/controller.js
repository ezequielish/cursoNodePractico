const nanoid = require('nanoid');
const bcrypt = require("bcrypt");

const TABLA = 'user';

module.exports = function (injectedStore) {
    let store = injectedStore;
    if (!store) {
        store = require('../../../store/dummy'); //si no se exta inyectando el store va a usar el de pruebas
    }

    async function list() {
        const users = await store.list(TABLA)
        const usersSelect = users.map((u) =>({
            name: u.name,
            id: u.id,
            username: u.username
        }))
        return usersSelect;
    }

    function get(id) {
        return store.get(TABLA, id);
    }

    async function upsert(body) {
        const user = {
            name: body.name,
            username: body.username,
            password: await bcrypt.hash(body.password, 10)
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