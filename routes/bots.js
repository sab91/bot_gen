const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('bots');
})
router.get('/create', (req, res) => {
    res.render('createBots')
})
module.exports = router