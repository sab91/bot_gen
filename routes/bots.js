const express = require('express');
const controller = require('../controller/bots.controller')
const router = express.Router();

router.get('/', controller.listBots)
router.get('/create', controller.create)
router.post('/create', controller.postCreate)
router.get('/update', controller.update)
router.put('/update', controller.putUpdate)
module.exports = router