const connection = require('./connection.js');
const express = require('express');
const app = express();
const middlewares = require('./middlewares.js');
const port = process.env.PORT || 8080;
const routes = require('./api/routes/routes.js');

connection();
middlewares(app);
routes(app);

app.listen(port);

console.log('RESTful API server started on: ' + port);