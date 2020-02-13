const jwt = require("jsonwebtoken");
const {
  api: { authJwtSecret }
} = require("../../../config");
module.exports = function() {
  async function logIn(user) {
    const { id, username, name } = user;
    const payload = {
      sub: id,
      name,
      username
    };
    
    const newToken = jwt.sign(payload, authJwtSecret, {
      expiresIn: "15m"
    });

    const data = {
      token: newToken,
      ...user
    };

    return data;
  }

  return {
    logIn
  };
};
