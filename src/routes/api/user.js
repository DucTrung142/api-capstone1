const express = require('express');
const router = express.Router();
const verifyToken = require('../../middleware/verifyToken');
const User = require('../../app//model/users');
const bcrypt = require('bcrypt');

//UPDATE ACCOUNT
router.patch('/:userId', verifyToken, async (req, res) => {
  const { userId } = req.params;
  const { password } = req.body;

  if (password) {
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    req.body.password = hashPassword;
  }

  const updatedUser = await User.findByIdAndUpdate(userId, req.body, {
    new: true,
  });
  res.json({
    user: {
      id: updatedUser._id,
      username: updatedUser.username,
      fullname: updatedUser.fullname,

      phone: updatedUser.phone || '',
      birthday: updatedUser.birthday || '',
      avatarUrl: updatedUser.avatarUrl || '',
    },
  });
});

router.get('/:userId', async (req, res) => {
  const { userId } = req.params;
  const user = await User.findById(userId);
  res.json({
    user: {
      id: user._id,
      username: user.username,
      fullname: user.fullname,

      phone: user.phone || '',
      birthday: user.birthday || '',
      avatarUrl: user.avatarUrl || '',
    },
  });
});

module.exports = router;
