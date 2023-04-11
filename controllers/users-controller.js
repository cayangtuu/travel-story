const { User } = require('../models')
const bcrypt = require('bcryptjs')
const userController = {
  signUpPage: (req, res, next) => {
    try {
      return res.render('signup')
    } catch (err) { next(err) }
  },
  signUp: async (req, res, next) => {
    try {
      const { name, email, password, passwordCheck } = req.body
      if (!email || !password || !passwordCheck) throw new Error('必填欄位未正確填寫')
      if (password !== passwordCheck) throw new Error('密碼輸入不相符')
      const user = await User.findOne({ where: { email } })
      if (user) throw new Error('此帳號已註冊過')

      const salt = await bcrypt.genSalt(10)
      const hashPassword = await bcrypt.hash(password, salt)
      await User.create({
        name, email, password: hashPassword
      })
      return res.redirect('/signin')
    } catch (err) { next(err) }
  }
}
module.exports = userController