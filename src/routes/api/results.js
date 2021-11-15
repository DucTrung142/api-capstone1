const express = require('express');
const router = express.Router();
const verifyToken = require('../../middleware/verifyToken');
const authenticateRole = require('../../middleware/authenUser');

//include our model
const Result = require('../../app/model/results');
const Question = require('../../app/model/question');
//create one quiz question
router.post(
  '/',
  verifyToken,
  authenticateRole(['A', 'S']),
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

module.exports = router;
