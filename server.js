const express = require('express');
const app = express();
const port = process.env.PORT || 8081;
const mongoose = require('mongoose');
const Speaker = require('./api/models/speakerModel');
const Talk = require('./api/models/talkModel');
const bodyParser = require('body-parser');
const Schema = mongoose.Schema;

// mongoose instance connection url connection
mongoose.Promise = global.Promise;
//mongodb://<dbuser>:<dbpassword>@ds161016.mlab.com:61016/talks
mongoose.connect('mongodb://medjs:medjs2017@ds161016.mlab.com:61016/talks');
// const userSchema = new Schema({
//     name  :  { type: String, default: 'medjs' },
//     password   :  { type: String, default: 'medjs2017' }
// });

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const routes = require('./api/routes/routes.js'); //importing route
routes(app); //register the route

app.listen(port);

console.log('todo list RESTful API server started on: ' + port);
