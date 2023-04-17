const bcrypt = require('bcryptjs')
const assert = require('assert')
const { User } = require('../models')
const { CustomError, AssertError } = require('../helpers/error-helper')
const { getUser } = require('../helpers/auth-helper')
const imgurFileHandler = require('../helpers/file-helper')

const userController = {
  signUpPage: (req, res, next) => {
    try {
      return res.render('signup')
    } catch (err) { next(err) }
  },
  signUp: async (req, res, next) => {
    try {
      const { name, email, password, passwordCheck } = req.body
      if (!name.trim() || !email.trim() || !password.trim() || !passwordCheck.trim()) throw new CustomError('必填欄位未正確填寫', 400)
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
  },
  signInPage: (req, res, next) => {
    try {
      return res.render('signin')
    } catch (err) { next(err) }
  },
  signIn: async (req, res, next) => {
    try {
      req.flash('success_msg', '登入成功')
      return res.redirect('/travels')
    } catch (err) { next(err) }
  },
  logOut: (req, res, next) => {
    req.logout(err => {
      if (err) { return next(err) }
      req.flash('success_msg', '登出成功')
      return res.redirect('/signin')
    })
  },
  getProfile: async (req, res, next) => {
    try {
      const userId = req.params.id
      const user = await User.findByPk(userId, { raw: true })
      assert(user, new AssertError('找不到使用者'))
      return res.render('profile', { user })
    } catch (err) { next(err) }
  },
  editProfile: async (req, res, next) => {
    try {
      const userId = req.params.id
      console.log(userId)
      console.log(getUser(req).id)
      if (Number(userId) !== Number(getUser(req).id)) throw new CustomError('只能編輯自己的資料', 403)
      const user = await User.findByPk(userId, { raw: true, attributes: ['id', 'name', 'avatar', 'introduction'] })
      assert(user, new AssertError('找不到使用者'))
      return res.render('edit-profile', { user })
    } catch (err) { next(err) }

  },
  putProfile: async (req, res, next) => {
    try {
      const userId = req.params.id
      console.log(userId)
      const { name, introduction } = req.body
      if (!name.trim()) throw new CustomError('必填欄位未正確填寫', 400)
      const filePath = await imgurFileHandler(req.file)
      const user = await User.findByPk(userId)
      assert(user, new AssertError('找不到使用者'))
      await user.update({
        name,
        avatar: filePath || user.avatar,
        introduction
      })
      req.flash('success_msg', '個人資料更新成功!!!')
      return res.redirect(`/users/profile/${userId}`)
    } catch (err) { next(err) }
  }
}
module.exports = userController