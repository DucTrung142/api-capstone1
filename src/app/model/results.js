const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ResultsSchema = new Schema({
  id_user: {
    type: String,
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
  totalsecondDb: {
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
  hoursStart: {
    type: String,
    // required:true,
  },
  minutesStart: {
    type: String,
    // required:true,
  },
  secondsStart: {
    type: String,
    // required:true,
  },
  old_point: {
    type: Number,
  },
  total_score: {
    type: Number,
    default: 0,
  },
  quiz: [
    {
      question_type: {
        type: String,
      },
      question_content: {
        type: String,
        // required: true,
      },
      point_question: {
        type: Number,
        // required: true,
      },
      essay_score: {
        type: Number,
        default: 0,
      },

      alternatives: [
        {
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
          essay_answer_content: {
            type: String,
          },
        },
      ],
    },
  ],
});

module.exports = mongoose.model('Result', ResultsSchema);
