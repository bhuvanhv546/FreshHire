const mongoose = require('mongoose');

const skillSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  category: String,
  demandScore: Number,
  averageSalary: Number,
  learningResources: [{
    title: String,
    url: String,
    type: { type: String, enum: ['Course', 'Video', 'Documentation', 'Practice'] }
  }],
  trending: Boolean
});

module.exports = mongoose.model('Skill', skillSchema);
