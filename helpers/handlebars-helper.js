const dayjs = require('dayjs')
module.exports = {
  formatDate: a => dayjs(a).format('YYYY/MM/DD')
}