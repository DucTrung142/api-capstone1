const Joi = require('joi');

const registerValidation = Joi.object({
  fullname: Joi.string().min(6).max(30).required().messages({
    'any.required': ` You need to enter the fullname`,
    'string.max': `Fullname Characters whose length exceeds 30`,
    'string.min': `Fullname characters less than 6`,
  }),
  username: Joi.string().min(6).max(30).required().messages({
    'any.required': ` You need to enter the username`,
    'string.max': `Username Characters whose length exceeds 30`,
    'string.min': `Username characters less than 6`,
  }),
  password: Joi.string().min(6).max(30).required().messages({
    'any.required': ` You need to enter the password`,
    'string.max': `Password characters whose length exceeds 30`,
    'string.min': `Password characters less than 6`,
  }),
  phone: Joi.string().min(9).max(11).pattern(new RegExp('^[0-9]')).messages({
    'string.max': `Phone characters whose length exceeds 9`,
    'string.min': `phone characters less than 11`,
  }),
  birthday: Joi.date().min('1-1-1800').max('12-31-2021'),
  user_type: Joi.string().required().messages({
    'any.required': ` You need to enter the user_type`,
  }),
  avatarUrl: Joi.string(),
});
const loginValidation = Joi.object({
  username: Joi.string().min(6).max(30).required().messages({
    'any.required': ` You need to enter the username`,
    'string.max': `Username Characters whose length exceeds 30`,
    'string.min': `Username characters less than 6`,
  }),
  password: Joi.string().min(6).max(30).required().messages({
    'any.required': ` You need to enter the password`,
    'string.max': `Password characters whose length exceeds 30`,
    'string.min': `Password characters less than 6`,
  }),
});
const questionValidation = Joi.object({
  id_exam: Joi.required(),
  exam_date_db: Joi.date().min('now').required().messages({
    'date.min': `Exam date must not be less than current date`,
    'any.required': ` You need to enter the exam date`,
  }),
  exam_topic_db: Joi.required().messages({
    'any.required': ` You need to enter the exam topics`,
  }),
  hourOpenDb: Joi.required().messages({
    'any.required': ` You need to enter the exam start hours`,
  }),
  minuteOpenDb: Joi.required().messages({
    'any.required': ` You need to enter the exam start hours`,
  }),
  secondOpenDb: Joi.required().messages({
    'any.required': ` You need to enter the exam start hours`,
  }),
  hourDueDb: Joi.required().messages({
    'any.required': ` You need to enter the exam due hours`,
  }),
  minuteDueDb: Joi.required().messages({
    'any.required': ` You need to enter the exam due hours`,
  }),
  secondDueDb: Joi.required().messages({
    'any.required': ` You need to enter the exam due hours`,
  }),
  totalScoreDb: Joi.number().required(),
  totalQuestionDb: Joi.number(),
  quiz: Joi.array()
    .required()
    .items({
      name_question: Joi.number(),
      question_type: Joi.string(),
      question_content: Joi.string().max(700).required().messages({
        'any.required': ` You need to enter the question content`,
        'string.max': `Characters whose length exceeds 700`,
      }),
      point_question: Joi.number().positive().required().messages({
        'any.required': ` You need to enter the point question`,
        'number.positive': `Question score must be greater than 0`,
      }),
      alternatives: Joi.array(),
    }),

  results: Joi.array(),
});

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
module.exports.questionValidation = questionValidation;
