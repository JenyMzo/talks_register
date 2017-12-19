'use strict';

var mongoose = require('mongoose'),
    Speaker = mongoose.model('Speaker'),
    Talk = mongoose.model('Talk');

exports.list_all_speakers = function (req, res) {
    Speaker.find({}, function (err, speaker) {
        if (err) {
            return res.send(err);
        }
        return res.json(speaker);
    });
};

exports.create_a_speaker = function (req, res) {
    var new_speaker = new Speaker(req.body);
    new_speaker.save(function (err, speaker) {
        if (err) {
            return res.send(err);
        }
        return res.json(speaker);
    });
};

exports.get_a_speaker = function (req, res) {
    Speaker.findById(req.params.speakerId, function (err, speaker) {
        if (err) {
            res.send(err);
        }
        return res.json(speaker);
    });
};

exports.update_a_speaker = function (req, res) {
    Speaker.findOneAndUpdate({
        _id: req.params.speakerId
    },
        req.body,
        {
            new: true
        },
        function (err, speaker) {
            if (err)
                res.send(err);
            res.json(speaker);
        });
};

exports.delete_a_speaker = function (req, res) {
    Speaker.remove({
        _id: req.params.speakerId
    }, function (err, speaker) {
        if (err)
            res.send(err);
        res.json({
            message: 'Speaker successfully deleted'
        });
    });
};