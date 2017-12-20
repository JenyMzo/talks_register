'use strict'
const mongoose = require('mongoose');
const Speaker = require('./api/models/speakerModel');
const Talk = require('./api/models/talkModel');

module.exports = () => {
    mongoose.Promise = global.Promise;
    mongoose.connect('mongodb://medjs:medjs2017@ds161016.mlab.com:61016/talks');
}