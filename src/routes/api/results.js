const express = require('express');
const router = express.Router();
const verifyToken = require('../../middleware/verifyToken');

//include our model
const Result = require('../../app/model/results');
const Question = require('../../app/model/question');
//create one quiz question
router.post('/', verifyToken, async (req, res) => {
  // const { id_exam, totalhourDb } = req.body;
  const newResult = new Result({
    id_user: req.user.id,
    id_exam: req.body.id_exam,
    totalhourDb: req.body.totalhourDb,
    totalminuteDb: req.body.totalminuteDb,
    totalseconDb: req.body.totalseconDb,
    hoursubmitDb: req.body.hoursubmitDb,
    minutesubmitDb: req.body.minutesubmitDb,
    secondsubmitDb: req.body.secondsubmitDb,
    score_exam: req.body.score_exam,
    quiz: req.body.quiz,
    alternatives: req.body.alternatives,
  });
  newResult
    .save()
    .then((result) => {
      Question.findOne({ id_exam: newResult.id_exam }, (err, question) => {
        if (question) {
          question.results.push(newResult);
          question.save();
          res.json({ message: 'success', result });
        }
      });
    })
    .catch((err) => {
      res.status(500).json({ error });
    });
  // console.log(req.body);
  // await question.findOne(
  //   { id_exam: req.body.id_exam },
  //   {
  //     $push: {
  //       results: newResult,
  //     },
  // const newResult = new Result({

  //   results{
  //     id_exam: req.body.id_exam,
  //   totalhourDb: req.body.totalhourDb,
  //   totalminuteDb: req.body.totalminuteDb,
  //   totalseconDb: req.body.totalseconDb,
  //   hoursubmitDb: req.body.hoursubmitDb,
  //   minutesubmitDb: req.body.minutesubmitDb,
  //   secondsubmitDb: req.body.secondsubmitDb,
  //   score_exam: req.body.score_exam,
  //   // quiz: req.body.quiz,
  //   alternatives: req.body.alternatives,
  //   }
  // });
  // newResult.save()
  // Question.findOneAndUpdate(
  //   { id_exam: newResult.id_exam },
  //   {
  //     $push: {
  //       results: {
  //         id_exam: req.body.id_exam,
  //         totalhourDb: req.body.totalhourDb,
  //       },
  //     },
  //   }
  // );
});
// });

module.exports = router;
