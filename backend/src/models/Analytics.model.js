const mongoose = require('mongoose');

const analyticsSchema = new mongoose.Schema({
  date: Date,
  metric: String,
  value: Number,
  filters: mongoose.Schema.Types.Mixed
}, { timestamps: true });

module.exports = mongoose.model('Analytics', analyticsSchema);
