const express = require('express');
const router = express.Router();

//include our model
const Question = require('../../app/model/question');

//get all quiz questions
router.get('/question', (req, res) => {});

//get one quiz question
router.get('/question/:id', (req, res) => {});

//create one quiz question
router.post('/question/', (req, res) => {});

//update one quiz question
router.patch('/question/:id', (req, res) => {});

//delete one quiz question
router.delete('/question/:id', (req, res) => {});

module.exports = router;
