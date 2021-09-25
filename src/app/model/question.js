const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const date = new Date();

const QuestionSchema = new Schema({
  examdate: {
    type: Date,
    required: true,
  },
  examtopic: {
    type: String,
    required: true,
  },
  open: {
    type: date.getTime,
    // required: true,
  },
  due: {
    type: date.getTime,
    //   required:true,
  },
  quiz: [
    {
      questionNumber: {
        type: Number,
        // required: true,
      },
      typeQuestion: {
        type: String,
        // required: true,
      },
      scoreFactor: {
        type: Number,
        // required: true,
      },
      description: {
        type: String,
        required: true,
      },
      alternatives: [
        {
          text: {
            type: String,
            required: true,
          },
          isCorrect: {
            type: Boolean,
            required: true,
            default: false,
          },
        },
      ],
    },
  ],
});

module.exports = mongoose.model('Question', QuestionSchema);
