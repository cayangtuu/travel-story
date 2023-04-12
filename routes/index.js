const express = require('express')
const router = express.Router()
const travels = require('./modules/travels')
const userController = require('../controllers/users-controller')
const { generalErrorHandler, assertErrorHandler } = require('../middleware/error-handler')

router.get('/signup', userController.signUpPage)
router.post('/signup', userController.signUp)
router.use('/travels', travels)
router.use('/', (req, res) => res.redirect('/travels'))
router.use('/', generalErrorHandler)
router.use('/', assertErrorHandler)

module.exports = router