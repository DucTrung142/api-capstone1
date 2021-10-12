const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const QuizSchema = new Schema({
  name_question: {
    type: Number,
    // required: true,
  },
  question_content: {
    type: String,
    // required: true,
  },
  point_question: {
    type: Number,
    // required: true,
  },
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
    },
  ],
});

module.exports = mongoose.model('Quiz', QuizSchema);
