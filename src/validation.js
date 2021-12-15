const Joi = require('joi');

const registerValidation = Joi.object({
  fullname: Joi.string().min(6).max(30).required(),
  username: Joi.string().min(6).max(30).required(),
  password: Joi.string().min(6).max(30).required(),
  phone: Joi.string().min(9).max(11).pattern(new RegExp('^[0-9]')),
  birthday: Joi.date().min('1-1-1800').max('12-31-2021'),
  user_type: Joi.string().required(),
  avatarUrl: Joi.string(),
});
const loginValidation = Joi.object({
  username: Joi.string().min(6).max(30).required(),
  password: Joi.string().min(6).max(30).required(),
});
const questionValidation = Joi.object({
  id_exam: Joi.required(),
  exam_date_db: Joi.date().min('now').required(),
  exam_topic_db: Joi.required(),
  hourOpenDb: Joi.required(),
  minuteOpenDb: Joi.required(),
  secondOpenDb: Joi.required(),
  hourDueDb: Joi.required(),
  minuteDueDb: Joi.required(),
  secondDueDb: Joi.required(),
  totalScoreDb: Joi.number().required(),
  totalQuestionDb: Joi.number(),
  quiz: Joi.array().items({
    name_question: Joi.number(),
    question_type: Joi.string(),
    question_content: Joi.string().required(),
    point_question: Joi.number().positive().required(),
    alternatives: Joi.required(),
  }),

  results: Joi.required(),
});

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
module.exports.questionValidation = questionValidation;
