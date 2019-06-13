const express = require('express');
const controller = require('../controller/bots_api.controller')
const router = express.Router();

router.get('/', controller.listBots)
router.get('/:nameBot', controller.bot)
router.post('/', controller.create)
router.put('/:nameBot', controller.update)
router.delete('/:nameBot', controller.delete)
module.exports = router