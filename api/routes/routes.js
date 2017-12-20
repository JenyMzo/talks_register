'use strict';

module.exports = function (app) {
    const talks = require('../controllers/talksController.js');
    const speakers = require('../controllers/speakersController.js');

    // talks Routes
    app.route('/talks')
        .get(talks.list_all_talks)
        .post(talks.create_a_talk);

    app.route('/talks/:talkId')
        .get(talks.get_a_talk)
        .put(talks.update_a_talk)
        .delete(talks.delete_a_talk);

    // speakers Routes
    app.route('/speakers')
        .get(speakers.list_all_speakers)
        .post(speakers.create_a_speaker);

    app.route('/speakers/:speakerId')
        .get(speakers.get_a_speaker)
        .put(speakers.update_a_speaker)
        .delete(speakers.delete_a_speaker);

    app.get('*', function (req, res) {
        console.log('res', res.statusCode);
        return res.status(404).send({ url: req.originalUrl + 'not found' });
    });
};
