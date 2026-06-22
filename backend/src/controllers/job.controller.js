const Job = require('../models/Job.model');
const User =require('../models/User.model');

exports.getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find({
      isActive: true
    }).sort({
      postedDate: -1
    });

    res.json(jobs);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

exports.getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({
        message: 'Job not found'
      });
    }

    res.json(job);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

exports.searchJobs = async (req, res) => {
  try {
    const { q } = req.query;

    const jobs = await Job.find({
      $text: { $search: q },
      isActive: true
    });

    res.json(jobs);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

exports.filterJobs = async (req, res) => {
  try {
    const filters = req.body;

    const query = {
      isActive: true
    };

    if (filters.state) {
      query['location.state'] = filters.state;
    }

    if (filters.workMode) {
      query.workMode = filters.workMode;
    }

    if (filters.employmentType) {
      query.employmentType = filters.employmentType;
    }

    const jobs = await Job.find(query);

    res.json(jobs);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

exports.getCompaniesHiring = async (req, res) => {
  try {
    const companies = await Job.aggregate([
      {
        $match: {
          isActive: true
        }
      },
      {
        $group: {
          _id: '$company.name',
          name: { $first: '$company.name' },
          openings: { $sum: 1 },
          careerPage: {
            $first: '$company.careerPage'
          }
        }
      }
    ]);

    res.json(companies);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

exports.createJob = async (
  req,
  res
) => {
  try {

    const recruiter =
  await User.findById(req.user.userId);

    const job = new Job({

      title:
        req.body.title,

      company: {
  name:
    recruiter.companyProfile?.companyName ||
    req.body.company?.name ||
    '',

  logo:
    recruiter.companyProfile?.companyLogo ||
    '',

  website:
    recruiter.companyProfile?.website ||
    '',

  careerPage:
    recruiter.companyProfile?.website ||
    ''
},
      companyProfile:
        recruiter.companyProfile,

      location:
        req.body.location,

      workMode:
        req.body.workMode,

      employmentType:
        req.body.employmentType,

      salary:
        req.body.salary,

      skills:
        req.body.skills,

      description:
        req.body.description,

      responsibilities:
        req.body.responsibilities || [],

      requirements:
        req.body.requirements || [],

      benefits:
        req.body.benefits || [],

      postedBy:
        req.user.userId
    });

    await job.save();

    res.status(201).json({
      success: true,
      job
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });
  }
};

exports.getMyJobs = async (req, res) => {
  try {
    const jobs = await Job.find({
      postedBy: req.user.userId
    }).sort({
      postedDate: -1
    });

    res.json(jobs);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

exports.updateJob = async (req, res) => {
  try {
    const job = await Job.findById(
      req.params.id
    );

    if (!job) {
      return res.status(404).json({
        message: 'Job not found'
      });
    }

    if (
      job.postedBy &&
      job.postedBy.toString() !==
        req.user.userId
    ) {
      return res.status(403).json({
        message: 'Unauthorized'
      });
    }

    const updatedJob =
      await Job.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true
        }
      );

    res.json({
      success: true,
      job: updatedJob
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

exports.deleteJob = async (req, res) => {
  try {
    const job = await Job.findById(
      req.params.id
    );

    if (!job) {
      return res.status(404).json({
        message: 'Job not found'
      });
    }

    await Job.findByIdAndDelete(
      req.params.id
    );

    res.json({
      success: true,
      message: 'Job deleted successfully'
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};