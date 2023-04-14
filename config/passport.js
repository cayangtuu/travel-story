const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcryptjs')
const { User } = require('../models')
const { CustomError } = require('../helpers/error-helper')

passport.use(new LocalStrategy(
  {
    usernameField: 'email',
    passwordField: 'password'
  },
  async (email, password, cb) => {
    try {
      const user = await User.findOne({ where: { email } })
      if (!user) throw new CustomError('驗證失敗', 401)
      const isCorrectPassword = await bcrypt.compare(password, user.password)
      if (!isCorrectPassword) throw new CustomError('驗證失敗', 401)
      return cb(null, user)
    } catch (err) {
      return cb(err)
    }
  }
))

passport.serializeUser((user, cb) => {
  cb(null, user.id)
})

passport.deserializeUser(async (id, cb) => {
  try {
    const user = await User.findByPk(id)
    return cb(null, user.toJSON())
  } catch (err) {
    return cb(err)
  }
})

module.exports = passport