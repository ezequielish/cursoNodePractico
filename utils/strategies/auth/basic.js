const passport = require("passport");
const { BasicStrategy } = require("passport-http");
const bcrypt = require("bcrypt");
const error = require("../../error");
const TABLA = "user";
const store = require("../../../store/dummy");
passport.use(
  new BasicStrategy(async function(username, password, cb) {
    try {
      const user = await store.query(TABLA, { username: username });
      
      if (!user) {
        throw error("No autorizado", 401);
        // return cb("No autorizado", false);
      }

      if (!(await bcrypt.compare(password, user.password))) {
        throw error("No autorizado", 401);
      }

      delete user.password;

      return cb(null, user);
    } catch (error) {
      return cb(error, null);
    }
  })
);
