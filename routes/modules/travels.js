const express = require('express')
const router = express.Router()
const upload = require('../../middleware/multer')
const travelController = require('../../controllers/travels-controller')

router.get('/list', travelController.travelList)
router.get('/create', travelController.createTravel)
router.post('/:id/like', travelController.postTravelLike)
router.post('/:id/unlike', travelController.postTravelUnlike)
router.get('/:id', travelController.getTravel)
router.get('/', travelController.getTravels)
router.post('/', upload.array('image', 10), travelController.postTravel)

module.exports = router