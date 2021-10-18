const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const QuestionSchema = new Schema({
  //   id_exam: {
  //     type: Number,
  //     // required: true,
  //   },
  //   exam_date_db: {
  //     type: Date,
  //   },
  //   exam_topic_db: {
  //     type: String,
  //     // required: true,
  //   },
  //   exam_open_db: {
  //     type: Date,
  //   },
  //   exam_due_db: {
  //     type: Date,
  //   },
  //   quiz: [
  //     {
  //       type: mongoose.Schema.Types.ObjectId,
  //       ref: 'Quiz',
  //     },
  //   ],
  // });

  id_exam: {
    type: String,
    // required: true,
  },
  exam_date_db: {
    type: Date,
  },
  exam_topic_db: {
    type: String,
    // required: true,
  },
  hourOpenDb: {
    type: Number,
    // required:true,
  },
  minuteOpenDb: {
    type: Number,
    // required:true,
  },
  secondOpenDb: {
    type: Number,
    // required:true,
  },
  hourDueDb: {
    type: Number,
    // required:true,
  },
  minuteDueDb: {
    type: Number,
    // required:true,
  },
  secondDueDb: {
    type: Number,
    // required:true,
  },
  totalQuestionDb: {
    type: Number,
    // required: true,
  },
  totalScoreDb: {
    type: Number,
    // required: true,
  },
  quiz: [
    {
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
    },
  ],
});

module.exports = mongoose.model('Question', QuestionSchema);
