const redis = require('redis');

const { redis: { host, port, password } } = require('../config');

const client = redis.createClient({
    host: host,
    port: port,
    password: password,
});

function list(table) {
    return new Promise((resolve, reject) => {
        client.get(table, (err, data) => {
            if (err) return reject(err);
            
            let res = data || null;
            if (data) {
                res = JSON.parse(data);
            }
            resolve(res);
        });
    });
}

function get(table, id) {
    return list(table + '_' + id);
}

async function upsert(table, data) {
    let key = table;
    if (data && data.id) {
        key = key + '_' + data.id;
    }

    client.setex(key, 10, JSON.stringify(data));//tabla, tiempo de expiracion del dato, data
    return true;
}

module.exports = {
    list,
    get,
    upsert,
};
