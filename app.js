import express from 'express';
import db from './db/db';// Set up the express app
import bodyParser from 'body-parser';
const dashboard = require('./routes/dashboard')
const bots = require('./routes/bots')

import AWS from 'aws-sdk'

const app = express();
const lexmodelbuildingservice = new AWS.LexModelBuildingService({ region: 'us-east-1'});

app.use(express.static('public'))
app.set('view engine', 'pug');
app.set('views', './views')
// Parse incoming requests data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// get all todos
app.get('/api/v1/todos', (req, res) => {
    res.status(200).send({
        success: 'true',
        message: 'todos retrieved successfully',
        todos: db
    })
});
app.use('/dashboard', dashboard);
app.use('/bots', bots);


const params = {
    name: "DocOrderPizzaBot",
    abortStatement: {
        messages: [
            {
                content: "I don't understand. Can you try again?",
                contentType: "PlainText"
            },
            {
                content: "I'm sorry, I don't understand.",
                contentType: "PlainText"
            }
        ]
    },
    childDirected: true,
    clarificationPrompt: {
        maxAttempts: 1,
        messages: [
            {
                content: "I'm sorry, I didn't hear that. Can you repeate what you just said?",
                contentType: "PlainText"
            },
            {
                content: "Can you say that again?",
                contentType: "PlainText"
            }
        ]
    },
    description: "Orders a pizza from a local pizzeria.",
    idleSessionTTLInSeconds: 300,
    intents: [
        {
            intentName: "DocOrderPizza",
            intentVersion: "$LATEST"
        }
    ],
    locale: "en-US",
    processBehavior: "SAVE"
};

// required params
/*const params = {
    name: "DocOrderPizzaBot",
    childDirected: true,
    locale: "en-US",
};*/

// Lex try
app.post('/api/createBot', (req, res) => {
    lexmodelbuildingservice.putBot(params, function(err, data) {
        if (err) console.log(err, err.stack); // an error occurred
        else console.log(data);
    });

});

app.delete('/api/deleteBot', (req, res) => {
    lexmodelbuildingservice.putBot(params, function(err, data) {
        if (err) console.log(err, err.stack); // an error occurred
        else console.log(data);
    });
});



const PORT = 5000;

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)
});
