const express = require('express')
const router = express.Router()
const travels = require('./modules/travels')
const users = require('./modules/users')
const userController = require('../controllers/users-controller')
const passport = require('../config/passport')
const { authenticated } = require('../middleware/auth')
const { generalErrorHandler, assertErrorHandler } = require('../middleware/error-handler')

router.use('/travels', authenticated, travels)
router.use('/users', authenticated, users)

router.get('/signup', userController.signUpPage)
router.post('/signup', userController.signUp)
router.get('/signin', userController.signInPage)
router.post('/signin', passport.authenticate('local', { failureRedirect: '/signin' }), userController.signIn)
router.post('/logout', userController.logOut)

router.use('/', (req, res) => res.redirect('/travels'))
router.use('/', generalErrorHandler)
router.use('/', assertErrorHandler)

module.exports = router