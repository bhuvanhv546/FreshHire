const mongoose = require('mongoose');

const roadmapSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  domain: String,
  currentSkills: [String],
  goal: String,
  roadmap: [{
    month: Number,
    topics: [String],
    resources: [String],
    milestones: [String]
  }]
}, { timestamps: true });

module.exports = mongoose.model('Roadmap', roadmapSchema);
