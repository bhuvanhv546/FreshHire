const Resume = require('../models/Resume.model');

exports.uploadResume = async (req, res) => {
  try {

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No file uploaded'
      });
    }

    const resume = await Resume.create({
      user: req.user.userId,
      resumeUrl: req.file.path,
      originalName: req.file.originalname
    });

    res.json({
      success: true,
      message: 'Resume uploaded successfully',
      resume
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

exports.getMyResume = async (req, res) => {
  try {
    const resume = await Resume.findOne({
      user: req.user.userId
    });

    res.json(resume);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

exports.saveResumeAnalysis = async (req, res) => {
  try {
    res.json({
      success: true,
      message: 'Resume analysis saved'
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

exports.getUserResumes = async (req, res) => {
  try {
    const resumes = await Resume.find({
      user: req.user.userId
    });

    res.json(resumes);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};