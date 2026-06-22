const SavedJob = require('../models/SavedJob.model');

exports.saveJob = async (req, res) => {
  try {
    const { jobId } = req.params;

    const existing =
      await SavedJob.findOne({
        user: req.user.userId,
        job: jobId
      });

    if (existing) {
      return res.status(400).json({
        message: 'Job already saved'
      });
    }

    const saved = await SavedJob.create({
      user: req.user.userId,
      job: jobId
    });

    res.status(201).json(saved);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

exports.getSavedJobs = async (
  req,
  res
) => {
  try {
    const jobs =
      await SavedJob.find({
        user: req.user.userId
      }).populate('job');

    res.json(jobs);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

exports.removeSavedJob = async (
  req,
  res
) => {
  try {
    await SavedJob.findOneAndDelete({
      user: req.user.userId,
      job: req.params.jobId
    });

    res.json({
      message: 'Removed successfully'
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};