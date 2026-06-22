const mongoose = require('mongoose')

const resumeSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },

    resumeUrl: {
      type: String,
      required: true
    },

    originalName: String,

    uploadedAt: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model(
  'Resume',
  resumeSchema
)