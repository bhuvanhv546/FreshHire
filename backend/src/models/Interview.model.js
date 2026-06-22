const mongoose = require('mongoose');

const interviewSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  type: { type: String, enum: ['HR', 'Technical', 'Coding', 'Aptitude'] },
  questions: [{
    question: String,
    userAnswer: String,
    aiFeedback: String,
    score: Number
  }],
  overallScore: Number,
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Interview', interviewSchema);
