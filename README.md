# API REST for talk proposal on MedellínJS

## Prerequisites

- NodeJS - NPM installed
- Postman

We are going to use [MongoLab](https://mlab.com) to host our database, so we don't need to have MongoDB installed on our machine.

## Getting started

- Open the terminal and create a new folder for the project ```mkdir talk_proposal```
- Navigate to the root of the folder ```cd talk_proposal```
- Create the package.json file ```npm init```
- Create a file called server.js ```touch server.js```
- Create a folder called api ```mkdir api```
- Inside api folder, we are going to create folders for models, controllers and routes ```mkdir api/controllers api/models api/routes```
- Create talksController.js and speakersController.js in the api/controller folder ```touch api/controllers/talksController.js api/controllers/speakerController.js```
- Create routes.js in the routes folder ```touch api/routes/routes.js```
- Create talkModel.js and speakerModel.js in the model folder ```touch api/models/talkModel.js api/models/speakerModel.js```

## Server setup

- Install express ```npm install express --save```
- Install nodemon as dev dependency  ```npm install --save-dev nodemon```
- On the package.json we are going to add the following script ```"start": "nodemon server.js"```
- This will be our initial server.js
```js
const express = require('express');
const app = express();
const port = process.env.PORT || 8081;

app.listen(port);

console.log('RESTful API server started on: ' + port);
```
- On ther terminal ```npm run start``` so this will start the server


## Configuring Database

- Install mongoose ```npm install mongoose --save````
- Our speaker model should look like this:
```js
'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const Talk = mongoose.model('Talk');

const SpeakerSchema = new Schema({
    name: {
        type: String,
        required: 'Please enter the name of the speaker'
    },
    email: {
        type: String,
        unique : true,
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
    }
});

module.exports = mongoose.model('Speaker', SpeakerSchema);
```
- Our talk model should look like this:
```js
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
```
## Setting up the routes
- Our routes file should look like this:
```js
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
};
```
- Our speakers controller should look like this:
```js
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
```
- Our talks controller should look like this:
```js
'use strict';

const mongoose = require('mongoose'),
    Talk = mongoose.model('Talk'),
    Speaker = mongoose.model('Speaker');

exports.list_all_talks = function (req, res) {
    Talk.find({}).
        populate('speakers').
        exec( function (err, talk) {
        if (err) {
            return res.send(err);
        }
        return res.json(talk);
    });
};

exports.create_a_talk = function (req, res) {
    var new_talk = new Talk(req.body);
    new_talk.save(function (err, talk) {
        if (err) {
            return res.send(err);
        }
        return res.json(talk);
    });
};

exports.get_a_talk = function (req, res) {
    Talk.findById(req.params.talkId).
        populate('speakers').
        exec(function (err, talk) {
            if (err) {
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
            if (err) {
                return res.send(err);
            }
            return res.json(talk);
        });
};

exports.delete_a_talk = function (req, res) {
    Talk.remove({
        _id: req.params.talkId
    }, function (err, talk) {
        if (err) {
            return res.send(err);
        }
        return res.json({
            message: 'Talk successfully deleted'
        });
    });
};
```
## Conecting to the database
As mentioned before, we are going to use [MongoLab](https://mlab.com) to host our database, in fact it's already created, so let's connect :)

- Require mongoose and our models on our server.js file
```js
const mongoose = require('mongoose');
const Speaker = require('./api/models/speakerModel');
const Talk = require('./api/models/talkModel');
```
- Connect to de database
```js
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://medjs:medjs2017@ds161016.mlab.com:61016/talks');
```





