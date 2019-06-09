import express from 'express';
import db from './db/db';// Set up the express app
import bodyParser from 'body-parser';
const dashboard = require('./routes/dashboard')
const bots = require('./routes/bots')

const app = express();
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
const PORT = 5000;

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)
});
