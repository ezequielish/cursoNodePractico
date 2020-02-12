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
  if (!db[tabla]) {// si no existe la creamos
    db[tabla] = [];
  }

  db[tabla].push(data);

  console.log(db);
}

async function remove(tabla, id) {
  return true;
}

module.exports = {
  list,
  get,
  upsert,
  remove
};
