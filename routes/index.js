const express = require('express')
const router = express.Router()
const upload = require('../middleware/multer')
const travelController = require('../controllers/travels-controller')

router.get('/create', travelController.createTravel)
router.post('/travels', upload.single('image'), travelController.postTravel)
router.get('/', travelController.getTravels)

module.exports = router