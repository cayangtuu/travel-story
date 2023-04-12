const { User } = require('../models')
const bcrypt = require('bcryptjs')
const { CustomError } = require('../helpers/error-helper')
const userController = {
  signUpPage: (req, res, next) => {
    try {
      return res.render('signup')
    } catch (err) { next(err) }
  },
  signUp: async (req, res, next) => {
    try {
      const { name, email, password, passwordCheck } = req.body
      if (!email.trim() || !password.trim() || !passwordCheck.trim()) throw new CustomError('必填欄位未正確填寫', 400)
      if (password !== passwordCheck) throw new CustomError('密碼輸入不相符', 403)
      const user = await User.findOne({ where: { email } })
      if (user) throw new CustomError('email 已重複註冊', 403)

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