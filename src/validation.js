import { object, string, date, required, number } from 'joi';

const registerValidation = object({
  fullname: string().min(6).max(30).required(),
  username: string().min(6).max(30).lowercase().required(),
  password: string().min(6).max(30).required(),
  phone: string().min(9).max(11).pattern(new RegExp('^[0-9]')),
  birthday: date().min('1-1-1800').max('12-31-2021'),
  user_type: string().uppercase(),
});
const loginValidation = object({
  username: string().min(6).max(30).required(),
  password: string().min(6).max(30).required(),
});
const questionValidation = object({
  id_exam: required(),
  exam_topic_db: required(),
  hourOpenDb: required(),
  minuteOpenDb: required(),
  secondOpenDb: required(),
  hourDueDb: required(),
  minuteDueDb: required(),
  secondDueDb: required(),
  totalScoreDb: required(),
  totalQuestionDb: number(),
  quiz: required(),
  results: required(),
});

const _registerValidation = registerValidation;
export { _registerValidation as registerValidation };
const _loginValidation = loginValidation;
export { _loginValidation as loginValidation };
const _questionValidation = questionValidation;
export { _questionValidation as questionValidation };
