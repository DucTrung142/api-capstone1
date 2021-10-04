const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const QuestionSchema = new Schema({
  id_exam: {
    type: Number,
    required: true,
  },
  exam_date_db: {
    type: Date,
  },
  exam_topic_db: {
    type: Date,
  },
  exam_open_db: {
    type: Date,
  },
  exam_due_db: {
    type: Date,
  },
  quiz: [
    {
      name_question: {
        type: Number,
        required: true,
      },
      content_question: {
        type: String,
        required: true,
      },
      point_question: {
        type: Number,
        required: true,
      },
      alternatives: [
        {
          content_question_type1_ans: {
            type: String,
            required: false,
          },
          question_type1_ans: {
            type: Boolean,
            required: false,
          },

          content_question_type2: {
            type: String,
            required: false,
          },
          question_type2: {
            type: Boolean,
            required: false,
          },

          content_question_type3_ans: {
            type: String,
            required: false,
          },
          question_type3_ans: {
            type: Boolean,
            required: false,
          },

          question_type4: {
            type: String,
            required: false,
          },
        },
      ],
    },
  ],
});

module.exports = mongoose.model('Question', QuestionSchema);
