const Joi = require('joi');

const registerValidation = Joi.object({
  fullname: Joi.string().min(6).max(30).required(),
  username: Joi.string().min(6).max(30).lowercase(),
  password: Joi.string().min(6).max(30).required(),
  phone: Joi.string().min(9).max(11).pattern(new RegExp('^[0-9]')),
  birthday: Joi.date().min('1-1-1800').max('12-31-2021'),
  user_type: Joi.string().uppercase(),
});
const loginValidation = Joi.object({
  username: Joi.string().min(6).max(30).required(),
  password: Joi.string().min(6).max(30).required(),
});

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
