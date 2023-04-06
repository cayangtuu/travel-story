const { Travel } = require('../models')
const imgurFileHandler = require('../helpers/file-helper')
const travelController = {
  getTravels: (req, res, next) => {
    return Travel.findAll({
      raw: true
    })
      .then(travels => res.render('travels', { travels }))
      .catch(err => next(err))
  },
  getTravel: (req, res, next) => {
    const { id } = req.params
    return Travel.findByPk(id, {
      raw: true
    })
      .then(travel => res.render('travel', { travel }))
      .catch(err => next(err))
  },
  travelList: (req, res, next) => {
    Travel.findAll({
      raw: true
    })
      .then(travels => res.render('travel-list', { travels }))
      .catch(err => next(err))
  },
  createTravel: (req, res, next) => {
    try {
      return res.render('create-travel')
    } catch (err) { next(err) }
  },
  postTravel: (req, res, next) => {
    const { name, location, beginDate, finishDate, score, description } = req.body
    if (!name || !location || !beginDate || !finishDate) throw new Error('err_msg', '必填欄位未正確填寫')
    const { file } = req
    return imgurFileHandler(file)
      .then(filePath => {
        if (!filePath) throw new Error('err_msg', '相片未上傳')
        return Travel.create({
          name, location, beginDate, finishDate, score, description,
          image: filePath || null
        })
      })
      .then(() => {
        req.flash('success_msg', '筆記新增成功!!!')
        res.redirect('/')
      })
      .catch(err => next(err))
  }
}
module.exports = travelController