const express = require('express');
const router = express.Router();
const verifyToken = require('../../middleware/verifyToken');
const authenticateRole = require('../../middleware/authenUser');

//include our model
const Question = require('../../app/model/question');
const Users = require('../../app/model/users');
const Results = require('../../app/model/results');
//get all quiz questions
router.get(
  '/question',
  verifyToken,
  authenticateRole(['A', 'T']),
  async (req, res) => {
    try {
      // console.log(req.user);
      const questions = await Question.find({ id_user: req.user.id });
      return res.status(200).json(questions);
    } catch (error) {
      return res.status(500).json({ error: error });
    }
  }
);

//get one quiz question
router.get(
  '/question/:id',
  verifyToken,
  authenticateRole(['A', 'S']),
  async (req, res) => {
    try {
      const id = req.params.id;
      console.log(id);
      const question = await Question.findOne({ id_exam: id });
      res.status(200).json({
        question: question,
      });
    } catch (error) {
      return res.status(500).json({ error: error });
    }
  }
);

//get exam on topic
router.get('/examtopic/:id', authenticateRole(['A', 'T']), async (req, res) => {
  try {
    const topic = req.params.id;
    console.log(req.params.id);
    const exam_topic = await Question.find({ exam_topic_db: topic });
    res.status(200).json({
      exam_topic,
    });
  } catch (error) {
    return res.status(500).json({ error: error });
  }
});

//get result question
router.get('/result/:id', verifyToken, async (req, res) => {
  // console.log(req.user);
  // Results.find({ id_exam: req.params.id })
  //   .populate('id_user')
  //   .then((result) => {
  //     if (result) return res.json(result);
  //     else res.json({});
  //   })
  //   .catch((error) => {
  //     res.status(500).json({ error });
  //   });

  Question.findOne({ id_exam: req.params.id })
    .populate('results')
    .then(async (result) => {
      res.json(result);
    })
    .catch((error) => {
      console.log(error.toString());
      res.status(500).json({ error });
    });
});

//create one quiz question
router.post('/question/', verifyToken, async (req, res) => {
  const newQuestion = new Question({
    id_user: req.user.id,
    id_exam: req.body.id_exam,
    exam_date_db: req.body.exam_date_db,
    exam_topic_db: req.body.exam_topic_db,
    hourOpenDb: req.body.hourOpenDb,
    minuteOpenDb: req.body.minuteOpenDb,
    secondOpenDb: req.body.secondOpenDb,
    hourDueDb: req.body.hourDueDb,
    minuteDueDb: req.body.minuteDueDb,
    secondDueDb: req.body.secondDueDb,
    totalQuestionDb: req.body.totalQuestionDb,
    totalScoreDb: req.body.totalScoreDb,
    quiz: req.body.quiz,
    name_question: req.body.name_question,
    question_type: req.body.question_type,
    question_content: req.body.question_content,
    point_question: req.body.point_question,
    alternatives: req.body.alternatives,
  });
  try {
    const saveQuestion = await newQuestion.save();

    res.json({
      question: saveQuestion,
    });
  } catch (error) {
    res.json({ message: error });
  }
});

//update one quiz question
router.patch(
  '/question/:id',
  verifyToken,
  authenticateRole(['A', 'T']),
  async (req, res) => {
    try {
      const id = req.params.id;
      const updateQuestion = await Question.findOneAndUpdate(
        { id_exam: id },
        req.body,
        {
          new: true,
        }
      );
      res.json({
        updateQuestion,
      });
    } catch (error) {
      return res.status(500).json({ error: error });
    }
  }
);

//delete one quiz question
router.delete(
  '/question/:id',
  verifyToken,
  authenticateRole(['A', 'T']),
  async (req, res) => {
    try {
      const id_exam = req.params.id;
      console.log(id_exam);
      const question = await Question.findOneAndDelete(
        { id_exam },
        {
          new: true,
        }
      );
      if (question.deletedCount === 0) {
        return res.status(404).json();
      } else {
        return res.status(200).json(question);
      }
    } catch (error) {
      return res.status(500).json({ error: error });
    }
  }
);

module.exports = router;
