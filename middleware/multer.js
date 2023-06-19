const multer = require('multer')
const multerGoogleStorage = require('multer-cloud-storage')

// const upload = multer({
//   dest: './test',
//   fileFilter(req, file, cb) {
//     if (!file.originalname.toLowerCase().match(/\.(jpg|jpeg|png)$/)) {
//       cb(new Error('上傳照片只接受jpg/jpeg/png格式'))
//     }
//     cb(null, true)
//   }
// })

const gcpUpload = multer({
  storage: multerGoogleStorage.storageEngine({
    bucket: process.env.GCS_BUCKET,
    projectId: process.env.GCS_PROJECT,
    keyFilename: process.env.GCS_KEYFILE
  }),
  fileFilter(req, file, cb) {
    if (!file.originalname.toLowerCase().match(/\.(jpg|jpeg|png)$/)) {
      cb(new Error('上傳照片只接受jpg/jpeg/png格式'))
    }
    cb(null, true)
  }
})

module.exports = { gcpUpload }