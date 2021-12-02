const express = require('express');
const router = express.Router();
const verifyToken = require('../../middleware/verifyToken');
const authenticateRole = require('../../middleware/authenUser');

//include our model
const Result = require('../../app/model/results');
const Question = require('../../app/model/question');
const { request } = require('express');

//create one quiz question
router.post(
  '/',
  verifyToken,
  authenticateRole(['Admin', 'Student']),
  async (req, res) => {
    const { id_exam, totalhourDb } = req.body;

    Result.findOne({ id_user: req.user.id, id_exam })
      .then((result) => {
        if (!result) {
          var total_score = 0;
          const { quiz } = req.body;
          for (element of quiz) {
            var boolean = false;
            for (alternative of element.alternatives) {
              if (alternative.answer_correct) {
                if (alternative.answer_correct === alternative?.answer_choosen)
                  boolean = true;
                else {
                  boolean = false;
                  break;
                }
              }
            }
            total_score += boolean ? parseFloat(element.point_question) : 0;
          }
          const newResult = new Result({
            id_user: req.user.id,
            username: req.user.username,
            fullname: req.user.fullname,
            phone: req.user.phone,
            birthday: req.user.birthday,
            id_exam: req.body.id_exam,
            totalhourDb: req.body.totalhourDb,
            totalminuteDb: req.body.totalminuteDb,
            totalsecondDb: req.body.totalsecondDb,
            hoursubmitDb: req.body.hoursubmitDb,
            minutesubmitDb: req.body.minutesubmitDb,
            secondsubmitDb: req.body.secondsubmitDb,
            hoursStart: req.body.hoursStart,
            minutesStart: req.body.minutesStart,
            secondsStart: req.body.secondsStart,
            total_score,
            quiz: req.body.quiz,
          });
          newResult
            .save()
            .then((result) => {
              Question.findOne(
                { id_exam: newResult.id_exam },
                (err, question) => {
                  if (question) {
                    question.results.push(newResult);
                    question.save();
                    return res.json({ message: 'success', result });
                  }
                }
              );
            })
            .catch((err) => {
              return res.status(500).json({ err });
            });
        } else
          return res.json({
            success: false,
            message: 'The test must only be taken once',
          });
      })
      .catch((error) => {
        res.status(500).json({ error });
      });
  }
);

router.get('/one-exam/:id_exam/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const id_exam = req.params.id_exam;
    const results = await Result.find({ id_user: id, id_exam: id_exam });
    let result = [];
    for (const iterator of results) {
      result = iterator;
    }
    res.status(200).json({
      result,
    });
  } catch (error) {
    return res.status(500).json({ error: error });
  }
});

router.get('/user/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const result = await Result.find({ id_user: id });
    res.status(200).json({
      result,
    });
  } catch (error) {
    return res.status(500).json({ error: error });
  }
});

//get score for id_exam
router.get('/score', async (req, res) => {
  try {
    var id_exam = req.params.id_exam;
    // let scoreResult = await Result.find({ id_exam: id_exam });

    // let statistics = {};
    // for (let i = 0; i < scoreResult.length; i++) {
    //   const score = scoreResult[i].total_score;
    //   console.log(score);
    //   statistics[score] =
    //     statistics[score] === undefined ? 1 : statistics[score] + 1;
    // }
    // console.log(scoreResult);
    const scoreResult = await Result.aggregate([
      // {
      //   // $match: { id_exam: scoreResult.id_exam },
      // },
      {
        $group: {
          _id: {
            total_score: '$total_score',
          },
          count: { $sum: 1 },
        },
      },
    ]);
    res.json(scoreResult);
  } catch (error) {
    res.status(500).json({ error: error });
  }
});

//update one result
router.patch('/one-exam/:id_exam/:id_user', async (req, res) => {
  try {
    const id_exam = req.params.id_exam;
    const id_user = req.params.id_user;

    await Result.findOneAndUpdate(
      {
        id_exam: id_exam,
        id_user: id_user,
      },
      req.body,
      {
        new: true,
      }
    );

    let { quiz, total_score } = req.body;
    for (const iterator of quiz) {
      if (iterator.essay_score >= 0) total_score += iterator.essay_score;
    }
    console.log(total_score);
    const updateResult = await Result.findOneAndUpdate(
      {
        id_exam: id_exam,
        id_user: id_user,
      },
      {
        total_score,
      },
      { new: true }
    );
    res.json(updateResult);
  } catch (error) {
    console.log(error.toString());
    return res.status(400).json({ error: error.toString() });
  }
});

module.exports = router;
