const express = require('express');
const controller = require('../controller/bots.controller')
const router = express.Router();

router.get('/', controller.index)
router.get('/create', controller.create)
router.post('/create', controller.postCreate)
module.exports = router