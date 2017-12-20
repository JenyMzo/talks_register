const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
const mongoose = require('mongoose');
const Speaker = require('./api/models/speakerModel');
const Talk = require('./api/models/talkModel');
const bodyParser = require('body-parser');

// mongoose url connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://medjs:medjs2017@ds161016.mlab.com:61016/talks');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// app.use(function(req, res) {
//     if (res.statusCode == 404){
//         return res.status(404).send({url: req.originalUrl + 'not found'});
//     }
// });

const routes = require('./api/routes/routes.js'); //importing route
routes(app); //register the route

app.listen(port);

console.log('RESTful API server started on: ' + port);

