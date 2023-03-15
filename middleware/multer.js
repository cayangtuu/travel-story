const multer = require('multer')
const upload = multer({
  dest: './test',
  fileFilter(req, file, cb) {
    if (!file.originalname.toLowerCase().match(/\.(jpg|jpeg|png)$/)) {
      cb(new Error('上傳照片只接受jpg/jpeg/png格式'))
    }
    cb(null, true)
  }
})
module.exports = upload