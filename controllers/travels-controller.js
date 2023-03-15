const { Travel } = require('../models')
const imgurFileHandler = require('../helpers/file-helper')
const travelController = {
  getTravels: (req, res, next) => {
    Travel.findAll({
      raw: true
    })
      .then(travels => res.render('travels', { travels }))
  },
  createTravel: (req, res, next) => {
    return res.render('create-travel')
  },
  postTravel: (req, res, next) => {
    const { name, location, beginDate, finishDate, score, image, description } = req.body
    if (!name || !location || !beginDate || !finishDate) { console.log('ERRor') }
    const { file } = req
    return imgurFileHandler(file)
      .then(filePath => {
        if (!filePath) { console.log(' no image ERRor') }
        return Travel.create({
          name, location, beginDate, finishDate, score, description,
          image: filePath || null
        })
      })
      .then(() => res.redirect('/'))
      .catch(err => next(err))
  }
}
module.exports = travelController