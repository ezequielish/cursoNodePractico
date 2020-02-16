require("dotenv").config();
module.exports = {
  remoteDB: process.env.REMOTE_DB || false,
  api: {
    port: process.env.API_PORT || 4000,
    authJwtSecret: process.env.JWT_SECRET_SIGN
  },
  db: {
    database: process.env.DB_NAME,
    host: process.env.DB_HOTS,
    password: process.env.DB_USER_PASSWORD,
    user: process.env.DB_USER
  },
  dbMysqlRemote: {
    host: process.env.MYSQL_SRV_HOST || "localhost",
    port: process.env.MYSQL_SRV_PORT || 4001
  },
  cachaService: {
    host: process.env.CACHE_HOST || "localhost",
    port: process.env.CACHE_PORT || 4002
  },
  redis: {
    host: process.env.HOST_REDIS,
    port: process.env.PORT_REDIS,
    password: process.env.PASS_REDIS
  }
};
// const dbconf = {
//     host: config.mysql.host,
//     user: config.mysql.user,
//     password: config.mysql.password,
//     database: config.mysql.database,
// };
