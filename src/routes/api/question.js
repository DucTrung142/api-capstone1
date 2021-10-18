const express = require('express');
const router = express.Router();
const verifyToken = require('../../middleware/verifyToken');

//include our model
const Question = require('../../app/model/question');

//get all quiz questions
router.get('/question', async (req, res) => {
  try {
    const questions = await Question.find();
    return res.status(200).json(questions);
  } catch (error) {
    return res.status(500).json({ error: error });
  }
});

//get one quiz question
router.get('/question/:id', async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);
    const question = await Question.findOne({ id_exam: id });
    res.status(200).json({
      question,
    });
  } catch (error) {
    return res.status(500).json({ error: error });
  }
});

//create one quiz question
router.post('/question/', async (req, res) => {
  const newQuestion = new Question({
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
    question_content: req.body.question_content,
    point_question: req.body.point_question,
    alternatives: req.body.alternatives,
  });
  try {
    const saveQuestion = await newQuestion.save();

    res.json(saveQuestion);
  } catch (error) {
    res.json({ message: error });
  }
});

//update one quiz question
router.patch('/question/:id', async (req, res) => {
  try {
  } catch (error) {
    return res.status(500).json({ error: error });
  }
});

//delete one quiz question
router.delete('/question/:id', async (req, res) => {
  try {
    const id_exam = req.params.id_exam;

    const question = await Question.deleteOne({ id_exam });

    if (question.deletedCount === 0) {
      return res.status(404).json();
    } else {
      return res.status(204).json();
    }
  } catch (error) {
    return res.status(500).json({ error: error });
  }
});

module.exports = router;
