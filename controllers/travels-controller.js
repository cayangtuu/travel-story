const { Travel } = require('../models')
const travelController = {
  getTravels: (req, res, next) => {
    Travel.findAll({
      raw: true
    })
      .then(travels => res.render('travels', { travels }))
  },
  createTravel: (req, res, next) => {
    return res.render('create-travel')
  }
}
module.exports = travelController