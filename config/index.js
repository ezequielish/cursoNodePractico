require('dotenv').config()
module.exports = {
    api: {
        port: process.env.API_PORT || 4000,
        authJwtSecret: process.env.JWT_SECRET_SIGN
    }
}