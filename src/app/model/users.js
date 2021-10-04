const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const mongooseDateFormat = require('mongoose-date-format');
const moment = require('moment');

const UserSchema = new Schema({
  avatarUrl: {
    type: String,
  },
  fullname: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
  },
  birthday: {
    type: moment(Date).format('DD/MM/YYYY'),
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('User', UserSchema);
