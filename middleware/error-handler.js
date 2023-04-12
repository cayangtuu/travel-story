const { AssertError } = require('../helpers/error-helper')
module.exports = {
  generalErrorHandler: (err, req, res, next) => {
    if (err instanceof Error) {
      req.flash('err_msg', `${err.status}:${err.name}  ${err.message}`)
    } else {
      req.flash('err_msg', `500:伺服器錯誤`)
      console.log(err)
    }
    res.redirect('back')
    next(err)
  },
  assertErrorHandler: (err, req, res, next) => {
    if (err instanceof AssertError) {
      req.flash('err_msg', `${err.status}:${err.name}  ${err.message}`)
      res.redirect('back')
      next(err)
    }
  }
}