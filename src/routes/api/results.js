const express = require('express');
const router = express.Router();
const verifyToken = require('../../middleware/verifyToken');

//include our model
const Result = require('../../app/model/results');

//create one quiz question
router.post('/', async (req, res) => {
  const newResult = new Result({
    totalhourDb: req.body.totalhourDb,
    totalminuteDb: req.body.totalminuteDb,
    totalseconDb: req.body.totalseconDb,
    hoursubmitDb: req.body.hoursubmitDb,
    minutesubmitDb: req.body.minutesubmitDb,
    secondsubmitDb: req.body.secondsubmitDb,
    score_exam: req.body.score_exam,
    alternatives: req.body.alternatives,
  });
  try {
    const saveresult = await newResult.save();
    res.json({
      result: saveresult,
    });
  } catch (error) {
    res.json({ message: error });
  }
});

module.exports = router;
