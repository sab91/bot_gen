const express = require('express');
const controller = require('../controller/intents.controller')
const router = express.Router();

router.get('/', controller.listIntents)
router.get('/create', controller.createIntent)
router.post('/create', controller.postCreateIntent)
module.exports = router