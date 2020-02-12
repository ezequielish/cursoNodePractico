const passport = require("passport");
const { BasicStrategy } = require("passport-http");
const bcrypt = require("bcrypt");
const error = require("../../error");
const TABLA = "auth";
const store = require("../../../store/dummy");
passport.use(
  new BasicStrategy(async function(username, password, cb) {
    try {
      const user = await store.query(TABLA, { username: username });

      if (!user.length) {
        throw error("No autorizado", 401);
        // return cb("No autorizado", false);
      }

      if (!(await bcrypt.compare(password, user[0].password))) {
        throw error("No autorizado", 401);
      }

      delete user[0].password;

      return cb(null, user[0]);
    } catch (error) {
      return cb(error, null);
    }
  })
);
