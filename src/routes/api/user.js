const express = require('express');
const router = express.Router();
const verifyToken = require('../../middleware/verifyToken');
const User = require('../../app//model/users');
const bcrypt = require('bcrypt');
const authenticateRole = require('../../middleware/authenUser');
const { registerValidation } = require('../../validation');

//UPDATE ACCOUNT
router.patch('/:userId', verifyToken, async (req, res) => {
  const { userId } = req.params;
  const { password } = req.body;

  if (password) {
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    req.body.password = hashPassword;
  }
  const { error } = registerValidation.validate(req.body);
  if (error)
    return res.json({
      success: false,
      message: error.details[0].message,
    });

  const updatedUser = await User.findByIdAndUpdate(userId, req.body, {
    new: true,
  });
  res.json({
    user: {
      id: updatedUser._id,
      username: updatedUser.username,
      fullname: updatedUser.fullname,
      user_type: updatedUser.user_type,

      phone: updatedUser.phone || '',
      birthday: updatedUser.birthday || '',
      avatarUrl: updatedUser.avatarUrl || '',
    },
  });
});

router.get('/:userId', verifyToken, async (req, res) => {
  const { userId } = req.params;
  const user = await User.findById(userId);
  res.json({
    user: {
      id: user._id,
      username: user.username,
      fullname: user.fullname,
      user_type: user.user_type,

      phone: user.phone || '',
      birthday: user.birthday || '',
      avatarUrl: user.avatarUrl || '',
    },
  });
});

module.exports = router;
