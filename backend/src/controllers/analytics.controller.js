const User = require('../models/User.model');
const Application = require('../models/Application.model');

exports.getAdminAnalytics = async (req, res) => {
  const userGrowth = await User.aggregate([
    {
      $group: {
        _id: { $month: '$createdAt' },
        count: { $sum: 1 }
      }
    },
    {
      $sort: { '_id': 1 }
    }
  ]);

  const applications = await Application.aggregate([
    {
      $group: {
        _id: { $month: '$appliedDate' },
        count: { $sum: 1 }
      }
    }
  ]);

  const totalApplications =
    await Application.countDocuments();

  const selected =
    await Application.countDocuments({
      status: 'Selected'
    });

  const placementRate = totalApplications
    ? (selected / totalApplications) * 100
    : 0;

  res.json({
    userGrowth: userGrowth.map(d => ({
      month: d._id,
      count: d.count
    })),
    applications: applications.map(d => ({
      month: d._id,
      count: d.count
    })),
    placementRate
  });
};
