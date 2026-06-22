const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  job: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Job',
    required: true
  },
  status: {
  type: String,
  enum: [
    'Applied',
    'Shortlisted',
    'Under Review',
    'Interview Scheduled',
    'Selected',
    'Rejected'
  ],
  default: 'Applied'
},
  appliedDate: {
    type: Date,
    default: Date.now
  },
  lastUpdated: Date,
  notes: String,
  interviewDetails: {
    date: Date,
    mode: String,
    link: String,
    feedback: String
  },
  resumeUsed: String,
  coverLetter: String
});

applicationSchema.index({ user: 1, job: 1 }, { unique: true });

module.exports = mongoose.model('Application', applicationSchema);
