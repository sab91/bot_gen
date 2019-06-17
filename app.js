import express from 'express';
import db from './db/db';// Set up the express app
import bodyParser from 'body-parser';
const dashboard = require('./routes/dashboard')
const gestionBots = require('./routes/gestionBots')
const bots_api = require('./routes/bots_api')
const intents = require('./routes/intents')
const methodOverride = require('method-override')
const cors = require('cors')


import AWS from 'aws-sdk'

const app = express();
app.use(cors())

app.use(express.static('public'))
app.set('view engine', 'pug');
app.set('views', './views')
// Parse incoming requests data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//method override
app.use(methodOverride(function (req, res) {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
      // look in urlencoded POST bodies and delete it
      var method = req.body._method
      delete req.body._method
      return method
    }
  }))
// get all todos
app.get('/api/v1/todos', (req, res) => {
    res.status(200).send({
        success: 'true',
        message: 'todos retrieved successfully',
        todos: db
    })
});
//interface
app.use('/', dashboard);
app.use('/gestionBots', gestionBots);
app.use('/gestionIntents', intents);
//api
app.use('/bots', bots_api)
const PORT = 5000;

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)
});
