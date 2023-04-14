const authHelper = require('../helpers/auth-helper')
module.exports = {
  authenticated: (req, res, next) => {
    if (authHelper.ensureAuthenticated(req)) {
      return next()
    }
    return res.redirect('/signin')
  }
}