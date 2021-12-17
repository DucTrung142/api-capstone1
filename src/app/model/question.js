const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const QuestionSchema = new Schema({
  id_user: {
    type: String,
    ref: 'User',
  },
  id_exam: {
    type: String,
    unique: true,
    required: true,
  },
  exam_date_db: {
    type: Date,
    required: true,
  },
  exam_topic_db: {
    type: String,
    required: true,
  },
  hourOpenDb: {
    type: String,
    required: true,
  },
  minuteOpenDb: {
    type: String,
    required: true,
  },
  secondOpenDb: {
    type: String,
    required: true,
  },
  hourDueDb: {
    type: String,
    required: true,
  },
  minuteDueDb: {
    type: String,
    required: true,
  },
  secondDueDb: {
    type: String,
    required: true,
  },
  totalScoreDb: {
    type: Number,
    required: true,
  },
  quiz: [
    {
      name_question: {
        type: Number,
      },
      question_type: {
        type: String,
        required: true,
      },
      question_content: {
        type: String,
        required: true,
      },
      point_question: {
        type: Number,
        required: true,
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
    },
  ],
  results: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Result',
    },
  ],
});

module.exports = mongoose.model('Question', QuestionSchema);
