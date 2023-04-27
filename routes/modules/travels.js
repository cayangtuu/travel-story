const express = require('express')
const router = express.Router()
const upload = require('../../middleware/multer')
const travelController = require('../../controllers/travels-controller')

router.get('/list', travelController.travelList)
router.get('/create', travelController.createTravel)
router.get('/:id/edit', travelController.editTravel)
router.get('/:id', travelController.getTravel)
router.get('/', travelController.travelsPage)

router.post('/:id/like', travelController.postTravelLike)
router.post('/:id/unlike', travelController.postTravelUnlike)
router.post('/:id/collected', travelController.postTravelCollected)
router.post('/:id/uncollected', travelController.postTravelUncollected)
router.post('/', upload.array('image', 10), travelController.postTravel)

router.put('/:id', upload.array('image', 10), travelController.putTravel)
router.delete('/:id', travelController.deleteTravel)

module.exports = router