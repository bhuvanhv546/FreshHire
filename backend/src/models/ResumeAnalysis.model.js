const mongoose = require('mongoose');

const ResumeAnalysisSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },

  resumeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Resume'
  },

  atsScore: {
    type: Number,
    default: 0
  },

  skillsFound: [String],

  missingSkills: [String],

  suggestions: [String],

  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model(
  'ResumeAnalysis',
  ResumeAnalysisSchema
);