module.exports = {
  localInforms: (req, res, next) => {
    res.locals.err_msg = req.flash('err_msg')
    res.locals.success_msg = req.flash('success_msg')
    next()
  }
}