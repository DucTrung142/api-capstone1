const multer = require('multer');
const path = require('path');

const fileFilter = (req, file, cb) => {
  const extensionOfPath = path.extname(file.originalname);
  if (!['.jpg', '.png'].includes(extensionOfPath)) {
    cb(new Error('File type is not supported'));
  }

  cb(null, true);
};

module.exports = multer({ fileFilter, storage: multer.diskStorage({}) });
