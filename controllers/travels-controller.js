const assert = require('assert')
const { Travel, Image, User, Like, Collect, sequelize } = require('../models')
const imgurFileHandler = require('../helpers/file-helper')
const { CustomError, AssertError } = require('../helpers/error-helper')
const { getUser } = require('../helpers/auth-helper')

const travelController = {
  getTravels: async (req, res, next) => {
    try {
      const travels = await Travel.findAll({
        raw: true
      })
      return res.render('travels', { travels })
    } catch (err) {
      next(err)
    }
  },
  getTravel: async (req, res, next) => {
    try {
      const userId = getUser(req).id
      const travelId = req.params.id

      const travel = await Travel.findByPk(travelId, {
        include: [{
          model: Image,
          attributes: ['image'],
          order: ['created_at', 'DESC']
        }, {
          model: User,
          attributes: ['id', 'avatar']
        }]
      })
      assert(travel, new AssertError('找不到資料'))

      const isLiked = await Like.findOne({ where: { userId, travelId } })
      const isCollected = await Collect.findOne({ where: { userId, travelId } })

      return res.render('travel', {
        travel: travel.toJSON(),
        firstImage: travel.Images[0].image,
        isLiked: isLiked ? true : false,
        isCollected: isCollected ? true : false
      })
    } catch (err) { next(err) }
  },
  travelList: async (req, res, next) => {
    try {
      const userId = getUser(req).id
      const travels = await Travel.findAll({
        include: {
          model: Image,
          attributes: ['image'],
          order: ['created_at', 'DESC']
        }
      })
      const userLikes = await Like.findAll({ raw: true, where: { userId }, attributes: ['travelId'] })
      const userCollects = await Collect.findAll({ raw: true, where: { userId }, attributes: ['travelId'] })
      const data = travels.map(travel => ({
        ...travel.toJSON(),
        name: travel.name.length > 10 ? travel.name.slice(0, 10) + ' ...' : travel.name,
        Images: travel.Images[0].image,
        isLiked: userLikes.some(userLike => userLike.travelId == travel.id),
        isCollected: userCollects.some(userCollect => userCollect.travelId == travel.id)
      }))
      return res.render('travel-list', { travels: data })
    } catch (err) { next(err) }
  },
  createTravel: (req, res, next) => {
    try {
      return res.render('edit-create-travel', { titleText: '新增' })
    } catch (err) { next(err) }
  },
  postTravel: async (req, res, next) => {
    const t = await sequelize.transaction()
    try {
      const { name, location, beginDate, finishDate, score, description } = req.body
      if (!name.trim() || !location.trim() || !beginDate || !finishDate) throw new CustomError('必填欄位未正確填寫', 400)
      if (beginDate > finishDate) throw new CustomError('開始日期需<=結束日期', 400)
      const newTravel = await Travel.create({
        name, location, beginDate, finishDate, score, description, userId: getUser(req).id
      }, { transaction: t })

      const { files } = req
      await Promise.all(
        files.map(async (file) => {
          const filePath = await imgurFileHandler(file)
          return await Image.create({
            image: filePath, travelId: newTravel.toJSON().id
          }, { transaction: t })
        }))
      await t.commit()
      req.flash('success_msg', '筆記新增成功!!!')
      return res.redirect(`/travels/${newTravel.toJSON().id}`)
    } catch (err) {
      await t.rollback()
      return next(err)
    }
  },
  editTravel: async (req, res, next) => {
    try {
      const userId = getUser(req).id
      const travelId = req.params.id

      const travel = await Travel.findByPk(travelId, { raw: true })
      assert(travel, new AssertError('資料不存在'))
      if (Number(travel.userId) !== Number(userId)) throw new CustomError('只能編輯自己的資料', 403)

      return res.render('edit-create-travel', { titleText: '編輯', travel })
    } catch (err) { next(err) }
  },
  putTravel: async (req, res, next) => {
    const t = await sequelize.transaction()
    try {
      const userId = getUser(req).id
      const travelId = req.params.id

      const travel = await Travel.findByPk(travelId)
      assert(travel, new AssertError('資料不存在'))
      if (Number(travel.userId) !== Number(userId)) throw new CustomError('只能編輯自己的資料', 403)

      const { name, location, beginDate, finishDate, score, description } = req.body
      if (!name.trim() || !location.trim() || !beginDate || !finishDate) throw new CustomError('必填欄位未正確填寫', 400)
      if (beginDate > finishDate) throw new CustomError('開始日期需<=結束日期', 400)

      await travel.update({
        name, location, beginDate, finishDate, score, description, userId
      }, { transaction: t })

      const { files } = req
      if (files.length > 0) {
        await Image.destroy({ where: { travelId }, transaction: t })
        await Promise.all(
          files.map(async (file) => {
            const filePath = await imgurFileHandler(file)
            return await Image.create({
              image: filePath, travelId
            }, { transaction: t })
          })
        )
      }
      await t.commit()
      req.flash('success_msg', '筆記更新成功!!!')
      return res.redirect(`/travels/${travelId}`)
    } catch (err) {
      await t.rollback()
      return next(err)
    }
  },
  deleteTravel: async (req, res, next) => {
    const t = await sequelize.transaction()
    try {
      const userId = getUser(req).id
      const travelId = req.params.id

      const travel = await Travel.findByPk(travelId)
      assert(travel, new AssertError('資料不存在'))
      if (Number(travel.userId) !== Number(userId)) throw new CustomError('只能刪除自己的資料', 403)

      await travel.destroy({ transaction: t })
      await Image.destroy({ where: { travelId }, transaction: t })
      await Like.destroy({ where: { travelId }, transaction: t })
      await Collect.destroy({ where: { travelId }, transaction: t })

      await t.commit()
      req.flash('success_msg', '筆記刪除成功!!!')
      return res.redirect(`/travels/list`)
    } catch (err) {
      await t.rollback()
      return next(err)
    }
  },
  postTravelLike: async (req, res, next) => {
    try {
      const userId = getUser(req).id
      const travelId = req.params.id

      const travel = await Travel.findByPk(travelId)
      assert(travel, new AssertError('找不到資料'))

      const like = await Like.findOne({ where: { userId, travelId } })
      if (like) throw new CustomError('使用者已重複按讚', 400)

      await Like.create({
        userId, travelId
      })
      return res.redirect('back')
    } catch (err) { next(err) }
  },
  postTravelUnlike: async (req, res, next) => {
    try {
      const userId = getUser(req).id
      const travelId = req.params.id

      const travel = await Travel.findByPk(travelId)
      assert(travel, new AssertError('找不到資料'))

      const like = await Like.findOne({ where: { userId, travelId } })
      if (!like) throw new CustomError('使用者未按讚', 400)

      await like.destroy()
      return res.redirect('back')
    } catch (err) { next(err) }
  },
  postTravelCollected: async (req, res, next) => {
    try {
      const userId = getUser(req).id
      const travelId = req.params.id

      const travel = await Travel.findByPk(travelId)
      assert(travel, new AssertError('找不到資料'))

      const collect = await Collect.findOne({ where: { userId, travelId } })
      if (collect) throw new CustomError('使用者已重複收藏', 400)

      await Collect.create({
        userId, travelId
      })
      return res.redirect('back')
    } catch (err) { next(err) }
  },
  postTravelUncollected: async (req, res, next) => {
    try {
      const userId = getUser(req).id
      const travelId = req.params.id

      const travel = await Travel.findByPk(travelId)
      assert(travel, new AssertError('找不到資料'))

      const collect = await Collect.findOne({ where: { userId, travelId } })
      if (!collect) throw new CustomError('使用者未收藏', 400)

      await collect.destroy()
      return res.redirect('back')
    } catch (err) { next(err) }
  },
}
module.exports = travelController