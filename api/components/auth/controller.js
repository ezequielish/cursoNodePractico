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
    console.log(authJwtSecret);
    
    const newToken = jwt.sign(payload, authJwtSecret, {
      expiresIn: "15m"
    });

    const data = {
      token: newToken,
      ...user
    };

    return data;
    // return bcrypt.compare(password, data.password).then(sonIguales => {
    //   if (sonIguales === true) {
    //     // Generar token;
    //     return auth.sign({ ...data });
    //   } else {
    //     throw new Error("Informacion invalida");
    //   }
    // });
  }

  return {
    logIn
  };
};
