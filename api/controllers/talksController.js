'use strict';

const mongoose = require('mongoose'),
    Talk = mongoose.model('Talk');

exports.list_all_talks = function (req, res) {
    Talk.find({}, function (err, talk) {
        if (err){
            return res.send(err);
        }
        return res.json(talk);
    });
};

exports.create_a_talk = function (req, res) {
    var new_talk = new Talk(req.body);
    new_talk.save(function (err, talk) {
        if (err){
            return res.send(err);
        }
        return res.json(talk);
    });
};

exports.get_a_talk = function (req, res) {
    Talk.findById(req.params.talkId, function (err, talk) {
        if (err){
            return res.send(err);
        }
        return res.json(talk);
    });
};

exports.update_a_talk = function (req, res) {
    Talk.findOneAndUpdate({
        _id: req.params.talkId
    },
    req.body,
    {
        new: true
    },
    function (err, talk) {
        if (err){
            return res.send(err);
        }
        return res.json(talk);
    });
};

exports.delete_a_talk = function (req, res) {
    Talk.remove({
        _id: req.params.talkId
    }, function (err, talk) {
        if (err){
            return res.send(err);
        }
        return res.json({
            message: 'Talk successfully deleted'
        });
    });
};