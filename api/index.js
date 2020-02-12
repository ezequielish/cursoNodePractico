const express = require('express');
const bodyParser = require('body-parser');
const { api: { port } } = require('../config');
const user = require('./components/user/network');
const auth = require('./components/auth/network');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const erros = require("../middlewares/errors")
const app = express();
app.use(bodyParser.json());
 
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
// ROUTER
app.use('/api/user', user);
app.use('/api/auth', auth);
app.use(erros)


app.listen(port, () => {
    console.log('Api escuchando en el puerto ', port);
});