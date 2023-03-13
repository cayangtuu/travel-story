const travelController = {
  getTravels: (req, res, next) => {
    return res.render('travels', { travels })
  },
  createTravel: (req, res, next) => {
    return res.render('create-travel')
  }
}
module.exports = travelController