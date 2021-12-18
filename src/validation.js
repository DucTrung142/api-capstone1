const Joi = require('joi');

const registerValidation = Joi.object({
  fullname: Joi.string().min(6).max(30).required().messages({
    'string.empty': `Need to enter enough information`,
    'string.max': `Fullname Characters whose length exceeds 30`,
    'string.min': `Fullname characters less than 6`,
  }),
  username: Joi.string().min(6).max(30).required().messages({
    'string.empty': `Need to enter enough information`,
    'string.max': `Username Characters whose length exceeds 30`,
    'string.min': `Username characters less than 6`,
  }),
  password: Joi.string().min(6).max(30).required().messages({
    'string.empty': `Need to enter enough information`,
    'string.max': `Password characters whose length exceeds 30`,
    'string.min': `Password characters less than 6`,
  }),
  phone: Joi.string()
    .required()
    .min(9)
    .max(11)
    .pattern(new RegExp('^[0-9]'))
    .messages({
      'string.empty': `Need to enter enough information`,
      'string.max': `Phone characters whose length exceeds 9`,
      'string.min': `phone characters less than 11`,
    }),
  birthday: Joi.date().min('1-1-1800').max('12-31-2021'),
  user_type: Joi.string().required().messages({
    'string.empty': `Need to enter enough information`,
  }),
});
const loginValidation = Joi.object({
  username: Joi.string().min(6).max(30).required().messages({
    'string.empty': `Need to enter enough information`,
    'string.max': `Username Characters whose length exceeds 30`,
    'string.min': `Username characters less than 6`,
  }),
  password: Joi.string().min(6).max(30).required().messages({
    'string.empty': `Need to enter enough information`,
    'string.max': `Password characters whose length exceeds 30`,
    'string.min': `Password characters less than 6`,
  }),
});
const questionValidation = Joi.object({
  id_exam: Joi.string().required().messages({
    'string.empty': `Need to enter enough information`,
  }),
  exam_date_db: Joi.date().min('now').required().messages({
    'date.min': `Invalid exam date`,
    'date.base': `re-enter the date`,
  }),
  exam_topic_db: Joi.string().required().messages({
    'string.empty': `Need to enter enough information`,
  }),
  hourOpenDb: Joi.string().required().messages({
    'string.empty': `Need to enter enough information`,
  }),
  minuteOpenDb: Joi.string().required().messages({
    'string.empty': `Need to enter enough information`,
  }),
  secondOpenDb: Joi.string().required().messages({
    'string.empty': `Need to enter enough information`,
  }),
  hourDueDb: Joi.string().required().messages({
    'string.empty': `Need to enter enough information`,
  }),
  minuteDueDb: Joi.string().required().messages({
    'string.empty': `Need to enter enough information`,
  }),
  secondDueDb: Joi.string().required().messages({
    'string.empty': `Need to enter enough information`,
  }),
  totalScoreDb: Joi.number().required().messages({
    'number.base': `You need to enter the correct number format total score`,
  }),
  quiz: Joi.array()
    .required()
    .items({
      name_question: Joi.number(),
      question_type: Joi.string().required().messages({
        'string.empty': ` Need to enter enough information`,
      }),
      question_content: Joi.string().max(700).required().messages({
        'string.empty': `Need to enter enough information`,
        'string.max': `Characters whose length exceeds 700`,
      }),
      point_question: Joi.number().positive().required().messages({
        'number.empty': ` Need to enter enough information`,
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
