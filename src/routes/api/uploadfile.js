const express = require('express');
const router = express.Router();
const cloudinary = require('cloudinary').v2;

const upload = require('../../config/db/multerfile');

router.post('/file', upload.single('file'), async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: 'file-uploader',
      flags: 'attachment:pretty_flower',
    });
    res.status(200).json({
      name: req.file.originalname,
      url: result.secure_url,

      size: req.file.size,
      created_at: result.created_at,
    });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
