const { Travel, Image, sequelize } = require('../models')
const imgurFileHandler = require('../helpers/file-helper')
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
      const { id } = req.params
      const travel = await Travel.findByPk(id, {
        include: {
          model: Image,
          attributes: ['image'],
          order: ['created_at', 'DESC']
        }
      })
      return res.render('travel', {
        travel: travel.toJSON(),
        firstImage: travel.Images[0].image
      })
    } catch (err) { next(err) }
  },
  travelList: async (req, res, next) => {
    try {
      const travels = await Travel.findAll({
        include: {
          model: Image,
          attributes: ['image'],
          order: ['created_at', 'DESC']
        }
      })
      const data = travels.map(travel => ({
        ...travel.toJSON(),
        name: travel.name.length > 10 ? travel.name.slice(0, 10) + ' ...' : travel.name,
        Images: travel.Images[0].image
      }))
      return res.render('travel-list', { travels: data })
    } catch (err) { next(err) }
  },
  createTravel: (req, res, next) => {
    try {
      return res.render('create-travel')
    } catch (err) { next(err) }
  },
  postTravel: async (req, res, next) => {
    const t = await sequelize.transaction()
    try {
      const { name, location, beginDate, finishDate, score, description } = req.body
      if (!name || !location || !beginDate || !finishDate) throw new Error('err_msg', '必填欄位未正確填寫')

      const newTravel = await Travel.create({
        name, location, beginDate, finishDate, score, description,
      }, { transaction: t })

      const { files } = req
      const allImages = await Promise.all(
        files.map(async (file) => {
          const filePath = await imgurFileHandler(file)
          if (!filePath) throw new Error('err_msg', '相片未上傳成功')
          return await Image.create({
            image: filePath, travelId: newTravel.toJSON().id
          }, { transaction: t })
        }))
      console.log(allImages)
      await t.commit()
      req.flash('success_msg', '筆記新增成功!!!')
      return res.redirect('/travels/list')
    } catch (err) {
      await t.rollback()
      return next(err)
    }
  }
}
module.exports = travelController