const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { registerValidation, loginValidation } = require('../../validation');

//post Model
const User = require('../../app/model/users');

// Chỗ ông bị lỗi là do res.send gửi error (400)á bởi dù kết nối thành công hay không là bên tui
// sẽ nhận dữ liệu không được á.
// Rồi á ông gửi lên git lại đi

//REGISTER
router.post('/register', async (req, res) => {
  // Validation the data before
  const { error } = registerValidation.validate(req.body);
  if (error)
    //return res.status(400).send(error.details[0].message);
    return res.json({ success: false, messgae: 'error' });
  //checking if the user is already in the database
  const userExist = await User.findOne({ username: req.body.username });
  if (userExist)
    //return res.status(400).send('username already exists');
    return res.json({ success: false, messgae: 'username already exists' });
  //hash password
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password, salt);

  const newUser = new User({
    username: req.body.username,
    password: hashPassword,
    fullname: req.body.fullname,
    phone: req.body.phone,
    birthday: req.body.birthday,
  });
  try {
    const savedUser = await newUser.save();

    // Create and assign a token
    const token = jwt.sign({ _id: savedUser._id }, process.env.TOKEN_SECRET);
    return res.json({
      token,
      user,
      savedUser,
    });
    // res.header('auth-token', token).send({
    //   jwt: token,
    //   User: {
    //     id: savedUser._id,
    //     username: savedUser.username,
    //     fullname: savedUser.fullname,
    //     phone: savedUser.phone,
    //     birthday: savedUser.birthday,
    //     avataUrl: '',
    //   },
    // });
  } catch (error) {
    res.status(400).send(error);
  }
});

//LOGIN
router.post('/login', async (req, res) => {
  try {
    //validation the data before
    const { error } = loginValidation.validate(req.body);
    if (error)
      // return res.status(400).json(error.details[0].message);
      return res.json({ sucess: false, message: 'Error' });

    //checking if the user exists
    const user = await User.findOne({ username: req.body.username });
    if (!user)
      //return res.status(400).send('username is not found');
      return res.json({ sucess: false, message: 'username is not found' });

    //password if correct
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword)
      //return res.status(400).send('Invalid password');
      return res.json({ sucess: false, message: 'password is incorrect' });
    console.log('connect');
    //create and assign a token

    const token = jwt.sign({ id: user._id }, process.env.TOKEN_SECRET);
    // res.header('auth-token', token).send({
    //   jwt: token,
    //   user: {
    //     id: user._id,
    //     username: user.username,
    //     fullname: user.fullname,
    //     phone: user.phone,
    //     birthday: user.birthday,
    //     avataUrl: user.avataUrl,
    //   },
    // });

    //return token to client
    return res.json({
      token,
    });
  } catch (error) {
    return res.json({ success: false, message: 'connection failure' });
  }
});

module.exports = router;
