require("dotenv").config();
module.exports = {
  api: {
    port: process.env.API_PORT || 4000,
    authJwtSecret: process.env.JWT_SECRET_SIGN
  },
  db: {
    database: process.env.DB_NAME,
    host: process.env.DB_HOTS,
    password: process.env.DB_USER_PASSWORD,
    user: process.env.DB_USER,
  }
};
// const dbconf = {
//     host: config.mysql.host,
//     user: config.mysql.user,
//     password: config.mysql.password,
//     database: config.mysql.database,
// };