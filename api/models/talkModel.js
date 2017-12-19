'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Speaker = mongoose.model('Speaker');

const TalkSchema = new Schema({
    title: {
        type: String,
        required: 'Please enter a title for the talk'
    },
    duration: {
        type: Number,
        required: 'Please enter the duration for the talk'
    },
    description: {
        type: String,
        required: 'Please enter a description for the talk'
    },
    sources: {
        type: String,
        required: 'Please enter the required sources for the talk'
    },
    createdDate: {
        type: Date,
        default: Date.now
    },
    status: {
        type: [{
            type: String,
            enum: ['pending', 'done']
        }],
        default: ['pending']
    },
    speakers: [{ type: Schema.Types.ObjectId, ref: 'Speaker' }]
});

module.exports = mongoose.model('Talk', TalkSchema);
