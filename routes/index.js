const express = require('express')
const router = express.Router()
const travelController = require('../controllers/travels-controller')

router.get('/', travelController.getTravels)

module.exports = router