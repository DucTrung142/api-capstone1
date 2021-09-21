const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { registerValidation, loginValidation } = require('../../validation');

//post Model
const User = require('../../app/model/users');
const { json } = require('express');

//REGISTER
router.post('/register', async (req, res) => {
  // Validation the data before
  const { error } = registerValidation.validate(req.body);
  if (error)
    return res.json({ success: false, messgae: error.details[0].message });

  //checking if the user is already in the database
  const userExist = await User.findOne({ username: req.body.username });
  if (userExist)
    return res.json({ success: false, messgae: 'Username already exists' });

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
    console.log(savedUser);

    // Create and assign a token
    const token = jwt.sign({ _id: savedUser._id }, process.env.TOKEN_SECRET);
    res.header('auth-token', token).json({
      jwt: token,
      User: {
        id: savedUser._id,
        username: savedUser.username,
        fullname: savedUser.fullname,
        phone: savedUser.phone,
        birthday: savedUser.birthday,
        avataUrl: '',
      },
    });
  } catch (error) {
    res.json(error);
  }
});

//LOGIN
router.post('/login', async (req, res) => {
  try {
    //validation the data before
    const { error } = loginValidation.validate(req.body);
    if (error)
      return res.json({
        success: false,
        messgae: error.details[0].message,
      });

    const { username, password } = req.body;
    if (!username || !password)
      return res.json({
        sucess: false,
        message: 'Missing ussername or/and password',
      });

    //checking if the user exists
    const user = await User.findOne({ username });
    if (!user)
      return res.json({ sucess: false, message: 'Username is not found!!!' });

    //password if correct
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword)
      return res.json({ sucess: false, message: 'Password is incorrect!' });

    //create and assign a token
    const token = jwt.sign({ id: user._id }, process.env.TOKEN_SECRET);
    res.header('auth-token', token).json({
      jwt: token,
      user: {
        id: user._id,
        username: user.username,
        fullname: user.fullname,
        phone: user.phone,
        birthday: user.birthday,
        avataUrl: user.avataUrl,
      },
    });
  } catch (error) {
    return res.json({ success: false, message: 'Connection failure!!!' });
  }
});

// [Get] /auth
// Check token
router.get(
  '/',
  async (request, response, next) => {
    //get Token from Authoriztion client
    const header = request.header('Authorization');
    const token = header && header.split(' ')[1];
    try {
      if (token) {
        //verify Token from client
        const verifyToken = await jwt.verify(token, 'asdjfj123bsdvad');

        if (verifyToken) {
          // Find idUser from Token
          const user = await User.findById(verifyToken._id).select('-password');
          if (user)
            // return if idUser in token is true
            return response.json({ success: true, token: token, user: user });
          else
            return response.json({
              success: false,
              message: 'Token is incorrect',
            });
        } else
          return response.json({
            success: false,
            message: 'Token is incorrect',
          });
      } else
        return response.json({ success: false, message: 'Token not found' });
    } catch (error) {
      return response.json({ success: false, message: 'Token is incorrect' });
    }
  },
  async (request, response) => {}
);

module.exports = router;
