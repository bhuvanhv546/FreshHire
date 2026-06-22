const Application = require('../models/Application.model');
const Job = require('../models/Job.model');
const Notification =require('../models/Notification.model');

exports.applyToJob = async (req, res) => {
  try {
    const { jobId } = req.params;

    const existing = await Application.findOne({
      user: req.user.userId,
      job: jobId
    });

    if (existing) {
      return res.status(400).json({
        message: 'Already applied'
      });
    }

    const application = new Application({
      user: req.user.userId,
      job: jobId,
      status: 'Applied'
    });

    await application.save();

    await Job.findByIdAndUpdate(
      jobId,
      {
        $inc: { applications: 1 }
      }
    );

    res.status(201).json({
      success: true,
      application
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

exports.getUserApplications = async (
  req,
  res
) => {
  try {

    const applications =
      await Application.find({
        user: req.user.userId
      })
        .populate('job')
        .sort({
          appliedDate: -1
        });

    res.json(applications);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

exports.getApplicantsByJob = async (
  req,
  res
) => {
  try {

    const applicants =
      await Application.find({
        job: req.params.jobId
      })
        .populate(
          'user',
          'name email'
        )
        .sort({
          appliedDate: -1
        });

    res.json(applicants);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

exports.updateApplicationStatus =
async (req, res) => {
  try {

    const application =
      await Application.findByIdAndUpdate(
        req.params.id,
        {
          status: req.body.status
        },
        {
          new: true
        }
      );

    if (!application) {
      return res.status(404).json({
        message: 'Application not found'
      });
    }

    let message = '';

    switch (req.body.status) {

      case 'Shortlisted':
        message =
          'Your application has been shortlisted.';
        break;

      case 'Selected':
        message =
          'Congratulations! You have been selected.';
        break;

      case 'Rejected':
        message =
          'Unfortunately your application was rejected.';
        break;

      default:
        message =
          `Application status changed to ${req.body.status}`;
    }

    await Notification.create({
      user: application.user,
      title: 'Application Update',
      message,
      type: 'application'
    });

    res.json({
      success: true,
      application
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};