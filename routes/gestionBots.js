const express = require('express');
const controller = require('../controller/bots.controller')
const router = express.Router();

router.get('/', controller.listBots)
router.get('/create', controller.create)
router.post('/create', controller.postCreate)

router.put('/update/:nameBot', controller.update)
router.post('/update/:nameBot', controller.postUpdate)

router.delete('/delete/:nameBot', controller.delete)
module.exports = router
