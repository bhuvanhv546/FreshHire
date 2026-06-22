const User = require('../models/User.model');
const Job = require('../models/Job.model');
const Application = require('../models/Application.model');

exports.getDashboardStats = async (req, res) => {
  try {

    const totalUsers =
      await User.countDocuments({
        role: 'user'
      });

    const totalRecruiters =
      await User.countDocuments({
        role: 'recruiter'
      });

    const totalJobs =
      await Job.countDocuments();

    const totalApplications =
      await Application.countDocuments();

    const latestUsers =
      await User.find()
        .select('-password')
        .sort({ createdAt: -1 })
        .limit(5);

    const latestRecruiters =
      await User.find({
        role: 'recruiter'
      })
        .select('-password')
        .sort({ createdAt: -1 })
        .limit(5);

    const latestJobs =
      await Job.find()
        .sort({ createdAt: -1 })
        .limit(5);

    res.json({
      totalUsers,
      totalRecruiters,
      totalJobs,
      totalApplications,
      latestUsers,
      latestRecruiters,
      latestJobs
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

exports.getAllUsers = async (req, res) => {
  const users =
    await User.find()
      .select('-password');

  res.json(users);
};

exports.deleteUser = async (req, res) => {
  await User.findByIdAndDelete(
    req.params.id
  );

  res.json({
    message: 'User deleted'
  });
};

exports.getAllRecruiters =
  async (req, res) => {

    const recruiters =
      await User.find({
        role: 'recruiter'
      }).select('-password');

    res.json(recruiters);
};

exports.verifyRecruiter =
  async (req, res) => {

    await User.findByIdAndUpdate(
      req.params.id,
      {
        emailVerified: true
      }
    );

    res.json({
      message:
        'Recruiter verified'
    });
};

exports.verifyJob =
  async (req, res) => {

    await Job.findByIdAndUpdate(
      req.params.id,
      {
        isVerified: true
      }
    );

    res.json({
      message:
        'Job verified'
    });
};