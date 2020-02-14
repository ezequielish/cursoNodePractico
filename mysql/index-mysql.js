const express = require('express');
const bodyParser = require('body-parser');

const { dbMysqlRemote: { port } } = require('../config');
const router = require('./network');

const app = express();

app.use(bodyParser.json());

// RUTAS
app.use('/', router)

app.listen(port, () => {
    console.log('Servicio de mysql escuchando en el puerto', port);
})