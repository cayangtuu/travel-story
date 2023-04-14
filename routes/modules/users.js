const express = require('express')
const router = express.Router()
const upload = require('../../middleware/multer')
const userController = require('../../controllers/users-controller')

router.get('/profile', userController.getProfile)
router.post('/profile', upload.single('avatar'), userController.postProfile)

module.exports = router