const express = require('express')
const router = express.Router()
const upload = require('../middleware/multer')
const travelController = require('../controllers/travels-controller')
const { generalErrorHandler } = require('../middleware/error-handler')

router.get('/travels/list', travelController.travelList)
router.get('/create', travelController.createTravel)
router.get('/travels', travelController.getTravels)
router.get('/travels/:id', travelController.getTravel)
router.post('/travels', upload.array('image', 10), travelController.postTravel)

router.use('/', (req, res) => res.redirect('/travels'))
router.use('/', generalErrorHandler)

module.exports = router