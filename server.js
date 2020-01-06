require('dotenv').config({ path: '.env' });

//  import express, bodyparser, cors, pusher
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const Pusher = require('pusher');

const app = express();

// initialise the pusher sdk
const pusher = new Pusher({
    appId: process.env.PUSHER_APP_ID,
    key: process.env.PUSHER_APP_KEY,
    secret: process.env.PUSHER_APP_SECRET,
    cluster: process.env.PUSHER_APP_CLUSTER,
    useTLS: true,
});

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// use post request containing pusher and method .trigger to ensure multiple collaborators can edit and preview the code at the same time
app.post('/update-editor', (req, res) => {
    pusher.trigger('editor', 'code-update', {
        ...req.body,
    });

    res.status(200).send('OK');
});

app.set('port', process.env.PORT || 5000);
const server = app.listen(app.get('port'), () => {
    console.log(`Express running → PORT ${server.address().port}`);
});