const express = require('express');
const router = express.Router();
const verifyToken = require('../../middleware/verifyToken');
const authenticateRole = require('../../middleware/authenUser');
const { questionValidation } = require('../../validation');

//include our model
const Question = require('../../app/model/question');
const Users = require('../../app/model/users');
const Results = require('../../app/model/results');
const results = require('../../app/model/results');
const { date } = require('joi');
//get all quiz questions
router.get(
  '/question',
  verifyToken,
  authenticateRole(['Admin', 'Teacher']),
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
router.get('/question/:id', verifyToken, async (req, res) => {
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
});

//get exam on topic
router.get(
  '/examtopic/:id',
  authenticateRole(['Admin', 'Teacher']),
  async (req, res) => {
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
  }
);

router.get(
  '/examtopic',
  verifyToken,
  authenticateRole(['Admin', 'Teacher']),
  async (req, res) => {
    try {
      const questions = await Question.aggregate([
        {
          $match: { id_user: req.user.id },
        },
        {
          $group: {
            _id: {
              exam_topic_db: '$exam_topic_db',
            },
            quiz: { $addToSet: '$quiz' },

            // count: { $sum: 1 },
          },
        },
      ]);
      for (let element of questions) {
        let arr = [];
        for (let myArr of element.quiz) {
          arr = arr.concat(myArr);
        }
        element.quiz = arr;
      }
      return res.status(200).json(questions);
    } catch (error) {
      return res.status(500).json({ error: error });
    }
  }
);

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

router.get('/results/:id_exam/:id_user', async (req, res) => {
  Question.findOne({ id_exam: req.params.id_exam })
    .populate({
      path: 'results',
      match: { id_user: req.params.id_user },
    })
    .then((result) => {
      res.json(result);
    })
    .catch((error) => {
      console.log(error.toString());
      res.status(500).json({ error });
    });
});

//create one quiz question
router.post(
  '/question/',
  verifyToken,
  authenticateRole(['Admin', 'Teacher']),
  async (req, res) => {
    const { error } = questionValidation.validate(req.body);
    if (error)
      return res.json({
        success: false,
        message: error.details[0].message,
      });
    const examExist = await Question.findOne({ id_exam: req.body.id_exam });
    if (examExist)
      return res.json({
        success: false,
        message: 'Exam ID already exists',
      });
    const hourOpenDb = req.body.hourOpenDb;
    const hourDueDb = req.body.hourDueDb;
    const minuteOpenDb = req.body.minuteOpenDb;
    const minuteDueDb = req.body.minuteDueDb;
    if (hourDueDb < hourOpenDb)
      return res.json({
        success: false,
        message: 'Invalid exam time',
      });
    if (hourDueDb === hourOpenDb) {
      if (minuteDueDb <= minuteOpenDb)
        return res.json({
          success: false,
          message: 'Invalid exam time',
        });
    }
    const d = new Date();
    let hournow = d.getHours();
    let minutenow = d.getMinutes();
    let dateexam = req.body.exam_date_db;
    let dayexam = +dateexam.slice(-2);
    let monthexam = +dateexam.substr(5, 2);
    let yearexam = +dateexam.substr(0, 4);
    let daynow = d.getDate();
    let monthnow = d.getMonth() + 1;
    let yearnow = d.getFullYear();

    if (dayexam === daynow && monthexam === monthnow && yearexam === yearnow) {
      if (hournow > hourOpenDb)
        return res.json({
          success: false,
          message: 'Invalid exam time',
        });
      if (hournow === +hourOpenDb) {
        if (minutenow >= +minuteOpenDb)
          return res.json({
            success: false,
            message: 'Invalid exam time',
          });
      }
    }

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
      res.json({
        error: error,
      });
    }
  }
);

//update one quiz question
router.patch(
  '/question/:id',
  verifyToken,
  authenticateRole(['Admin', 'Teacher']),
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
  authenticateRole(['Admin', 'Teacher']),
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
