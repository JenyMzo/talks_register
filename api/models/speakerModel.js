'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SpeakerSchema = new Schema({
    name: {
        type: String,
        required: 'Please enter the name of the speaker'
    },
    email: {
        type: String,
        required: 'Please enter the email of the speaker'
    },
    twitterUser: {
        type: String,
        required: 'Please enter the twitter username of the speaker'
    },
    description: {
        type: String,
        required: 'Please enter a description for the speaker'
    },
    size: {
        type: String,
        required: 'Please enter the t-shirt size of the speaker'
    },
    created_date: {
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model('Speaker', SpeakerSchema);
