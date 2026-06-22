const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },

    company: {
      name: {
        type: String,
        required: true
      },

      logo: {
        type: String,
        default: ''
      },

      website: {
        type: String,
        default: ''
      },

      careerPage: {
        type: String,
        default: ''
      }
    },

    companyProfile: {
      companyName: {
        type: String,
        default: ''
      },

      companyLogo: {
        type: String,
        default: ''
      },

      website: {
        type: String,
        default: ''
      },

      industry: {
        type: String,
        default: ''
      },

      companySize: {
        type: String,
        default: ''
      },

      description: {
        type: String,
        default: ''
      }
    },

    location: {
      city: {
        type: String,
        default: ''
      },

      state: {
        type: String,
        default: ''
      },

      country: {
        type: String,
        default: 'India'
      }
    },

    workMode: {
      type: String,
      enum: ['Remote', 'Hybrid', 'On-site'],
      required: true
    },

    employmentType: {
      type: String,
      enum: [
        'Full Time',
        'Part Time',
        'Internship',
        'Contract'
      ],
      required: true
    },

    salary: {
      min: {
        type: Number,
        default: 0
      },

      max: {
        type: Number,
        default: 0
      },

      currency: {
        type: String,
        default: 'INR'
      },

      isNegotiable: {
        type: Boolean,
        default: false
      }
    },

    skills: [
      {
        type: String
      }
    ],

    experienceRequired: {
      min: {
        type: Number,
        default: 0
      },

      max: {
        type: Number,
        default: 0
      }
    },

    description: {
      type: String,
      default: ''
    },

    responsibilities: [
      {
        type: String
      }
    ],

    requirements: [
      {
        type: String
      }
    ],

    benefits: [
      {
        type: String
      }
    ],

    postedDate: {
      type: Date,
      default: Date.now
    },

    applyLink: {
      type: String,
      default: ''
    },

    source: {
      type: String,
      enum: [
        'LinkedIn',
        'Naukri',
        'Foundit',
        'Freshersworld',
        'Indeed',
        'Company',
        'Manual'
      ],
      default: 'Manual'
    },

    isVerified: {
      type: Boolean,
      default: false
    },

    isActive: {
      type: Boolean,
      default: true
    },

    views: {
      type: Number,
      default: 0
    },

    applications: {
      type: Number,
      default: 0
    },

    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  },
  {
    timestamps: true
  }
);

jobSchema.index({
  title: 'text',
  description: 'text',
  skills: 'text'
});

module.exports = mongoose.model(
  'Job',
  jobSchema
);