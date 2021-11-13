const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ResultsSchema = new Schema({
  id_user: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
  },
  username: {
    type: String,
  },
  fullname: {
    type: String,
  },
  phone: {
    type: String,
  },
  birthday: {
    type: Date,
  },
  id_exam: {
    type: String,
    required: true,
  },
  totalhourDb: {
    type: String,
    // required:true,
  },
  totalminuteDb: {
    type: String,
    // required:true,
  },
  totalseconDb: {
    type: String,
    // required:true,
  },
  hoursubmitDb: {
    type: String,
    // required:true,
  },
  minutesubmitDb: {
    type: String,
    // required:true,
  },
  secondsubmitDb: {
    type: String,
    // required:true,
  },
  total_score: {
    type: Number,
    default: 0,
  },
  quiz: [
    {
      alternatives: [
        {
          answer_content: {
            type: String,
            required: false,
          },
          answer_correct: {
            type: Boolean,
            required: false,
          },
          answer_choosen: {
            type: Boolean,
            default: false,
          },
          answer_content: {
            type: String,
          },
        },
      ],
    },
  ],
});

module.exports = mongoose.model('Result', ResultsSchema);
