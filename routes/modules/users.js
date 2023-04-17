const express = require('express')
const router = express.Router()
const upload = require('../../middleware/multer')
const userController = require('../../controllers/users-controller')

router.get('/profile/:id', userController.getProfile)
router.get('/profile/:id/edit', userController.editProfile)
router.put('/profile/:id', upload.single('avatar'), userController.putProfile)

module.exports = router