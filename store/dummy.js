const db = {
  user: [
    {
      id: 1,
      name: "Ezequiel"
    },
    {
      id: 2,
      name: "Misael"
    }
  ]
};

async function list(tabla) {

  return db[tabla];
}

async function get(tabla, id) {
  let col = list(tabla);
  return col.filter(item => item.id === id)[0] || null; //filtramos por id y devolvemos el primer seleccion
}

async function upsert(tabla, data) {
  if (!db[tabla]) {
    // si no existe la creamos
    db[tabla] = [];
  }

  db[tabla].push(data);

  // console.log(db);
}

async function remove(tabla, id) {
  return true;
}

async function query(tabla, q) {
  let col = await list(tabla);
  let keys = Object.keys(q);
  let key = keys[0];

  return col.filter(item => item[key] === q[key])[0] || null;
}
module.exports = {
  list,
  get,
  upsert,
  remove,
  query
};
