const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
    type: Date,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  user_type: {
    type: String,
    default: 'S',
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('User', UserSchema);
