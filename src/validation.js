const Joi = require('joi');

const registerValidation = Joi.object({
  fullname: Joi.string().min(6).max(30).required().messages({
    'string.empty': ` You need to enter the fullname`,
    'string.max': `Fullname Characters whose length exceeds 30`,
    'string.min': `Fullname characters less than 6`,
  }),
  username: Joi.string().min(6).max(30).required().messages({
    'string.empty': ` You need to enter the username`,
    'string.max': `Username Characters whose length exceeds 30`,
    'string.min': `Username characters less than 6`,
  }),
  password: Joi.string().min(6).max(30).required().messages({
    'string.empty': ` You need to enter the password`,
    'string.max': `Password characters whose length exceeds 30`,
    'string.min': `Password characters less than 6`,
  }),
  phone: Joi.string()
    .required()
    .min(9)
    .max(11)
    .pattern(new RegExp('^[0-9]'))
    .messages({
      'string.empty': ` You need to enter the phone`,
      'string.max': `Phone characters whose length exceeds 9`,
      'string.min': `phone characters less than 11`,
    }),
  birthday: Joi.date().min('1-1-1800').max('12-31-2021'),
  user_type: Joi.string().required().messages({
    'string.empty': ` You need to enter the user_type`,
  }),
});
const loginValidation = Joi.object({
  username: Joi.string().min(6).max(30).required().messages({
    'string.empty': ` You need to enter the username`,
    'string.max': `Username Characters whose length exceeds 30`,
    'string.min': `Username characters less than 6`,
  }),
  password: Joi.string().min(6).max(30).required().messages({
    'string.empty': ` You need to enter the password`,
    'string.max': `Password characters whose length exceeds 30`,
    'string.min': `Password characters less than 6`,
  }),
});
const questionValidation = Joi.object({
  id_exam: Joi.string().required().messages({
    'string.empty': ` You need to enter id exam`,
  }),
  exam_date_db: Joi.date().min('now').required().messages({
    'date.min': `Invalid exam date`,
    'any.empty': ` You need to enter the exam date`,
    'date.base': `You need to enter the correct date format`,
  }),
  exam_topic_db: Joi.string().required().messages({
    'string.empty': ` You need to enter the exam topics`,
  }),
  hourOpenDb: Joi.string().required().messages({
    'string.empty': ` You need to enter the exam start hours`,
  }),
  minuteOpenDb: Joi.string().required().messages({
    'string.empty': ` You need to enter the exam start minute`,
  }),
  secondOpenDb: Joi.string().required().messages({
    'string.empty': ` You need to enter the exam start second`,
  }),
  hourDueDb: Joi.string().required().messages({
    'string.empty': ` You need to enter the exam due hours`,
  }),
  minuteDueDb: Joi.string().required().messages({
    'string.empty': ` You need to enter the exam due minute`,
  }),
  secondDueDb: Joi.string().required().messages({
    'string.empty': ` You need to enter the exam due second`,
  }),
  totalScoreDb: Joi.number().required().messages({
    'number.base': `You need to enter the correct number format total score`,
  }),
  quiz: Joi.array()
    .required()
    .items({
      name_question: Joi.number(),
      question_type: Joi.string().required().messages({
        'string.empty': ` You need to enter the question type`,
      }),
      question_content: Joi.string().max(700).required().messages({
        'string.empty': ` You need to enter the question content`,
        'string.max': `Characters whose length exceeds 700`,
      }),
      point_question: Joi.number().positive().required().messages({
        'number.empty': ` You need to enter the point question`,
        'number.positive': `Question score must be greater than 0`,
        'number.base': `You need to enter the correct number format point question`,
      }),
      alternatives: Joi.array(),
    }),

  results: Joi.array(),
});

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
module.exports.questionValidation = questionValidation;
