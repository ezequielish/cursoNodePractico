const nanoid = require("nanoid");
const bcrypt = require("bcrypt");
const error = require("../../../utils/error");

const TABLA = "user";

module.exports = function(injectedStore, injectedCache) {
  let store = injectedStore;
  let cache = injectedCache;
  
  if (!store) {
    store = require("../../../store/dummy"); //si no se exta inyectando el store va a usar el de pruebas
  }
  if (!cache) {
    cache = require("../../../store/dummy");
  }

  async function list(next) {
    try {
      let users = await cache.list(TABLA);      
      if (!users) {
        
         users = await store.list(TABLA);
         cache.upsert(TABLA, users);//lo ingresamos a la cache
      }
      const usersSelect = users.map(u => ({
        name: u.name,
        id: u.id,
        username: u.username
      }));
      return usersSelect;
    } catch (error) {
      next(error);
    }
  }

  async function get(idJwt, idParams, next) {
    // if(idJwt != idParams){
    //   throw error("no autorizado")
    // }
    try {
      const user = await store.get(TABLA, idJwt);
      delete user[0].password;

      return user;
    } catch (error) {
      next(error);
    }
  }

  async function upsert(body, userTokn, next) {
    const user = {
      name: body.name || userTokn.name,
      username: body.username || userTokn.username,
      password: body.password ? await bcrypt.hash(body.password, 10) : false
    };

    if (user) {
      user.id = userTokn.sub;

      if (!user.name || !user.username) {
        throw error("datos inválidos", 401);
      }
    } else {
      if (!store) {
        user.id = nanoid();
      }
    }
    if (!user.password) {
      delete user.password;
    }

    try {
      const result = await store.upsert(TABLA, user);
      return result;
    } catch (error) {
      next(error);
    }
  }
  function follow(from, to) {
    // console.log(from);

    return store.upsert(TABLA + "_follow", {
      user_from: from,
      user_to: to
    });
  }
  async function following(user) {
    const join = {};
    join[TABLA] = "user_to"; // tabla y campo a la cual haremos join
    const query = { user_from: user };

    return await store.query(TABLA + "_follow", query, join);
  }
  return {
    list,
    get,
    upsert,
    follow,
    following
  };
};
