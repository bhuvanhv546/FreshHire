const Job = require('../models/Job.model')
const Application = require('../models/Application.model')

exports.getDashboardStats = async (
  req,
  res
) => {
  try {

    const totalJobs =
      await Job.countDocuments()

    const totalApplications =
      await Application.countDocuments()

    const selected =
      await Application.countDocuments({
        status: 'Selected'
      })

    const rejected =
      await Application.countDocuments({
        status: 'Rejected'
      })

    const shortlisted =
      await Application.countDocuments({
        status: 'Shortlisted'
      })

    res.json({
      totalJobs,
      totalApplications,
      selected,
      rejected,
      shortlisted
    })

  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
}