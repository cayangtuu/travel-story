const dayjs = require('dayjs')
module.exports = {
  formatDate: a => dayjs(a).format('YYYY/MM/DD'),
  inputDate: a => dayjs(a).format('YYYY-MM-DD'),
  ifCond: (v1, v2, options) => {
    return v1 === v2 ? options.fn(this) : options.inverse(this)
  }
}