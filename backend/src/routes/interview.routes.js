const express = require('express');
const router = express.Router();

const {
  generateQuestions
} = require('../controllers/interview.controller');

router.post('/questions', generateQuestions);

module.exports = router;