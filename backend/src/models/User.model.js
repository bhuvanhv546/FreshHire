const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },

  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },

  password: {
    type: String,
    required: function () {
      return !this.googleId;
    }
  },

  googleId: {
    type: String,
    sparse: true
  },

  role: {
    type: String,
    enum: ['user', 'recruiter', 'admin'],
    default: 'user'
  },

  profilePicture: {
    type: String,
    default: null
  },

  phone: {
    type: String,
    trim: true
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

  skills: [String],

  education: [
    {
      degree: String,
      institution: String,
      year: Number,
      percentage: Number
    }
  ],

  experience: [
    {
      company: String,
      role: String,
      startDate: Date,
      endDate: Date,
      current: Boolean
    }
  ],

  resumeUrl: {
    type: String,
    default: ''
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

    foundedYear: {
      type: Number,
      default: null
    },

    headquarters: {
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

    linkedin: {
      type: String,
      default: ''
    },

    twitter: {
      type: String,
      default: ''
    },

    facebook: {
      type: String,
      default: ''
    },

    description: {
      type: String,
      default: ''
    },

    benefits: [
      {
        type: String
      }
    ],

    verified: {
      type: Boolean,
      default: false
    }
  },

  profileCompleted: {
    type: Number,
    default: 0
  },

  emailVerified: {
    type: Boolean,
    default: false
  },

  emailVerificationToken: String,

  passwordResetToken: String,

  passwordResetExpires: Date,

  refreshToken: String,

  lastLogin: Date
},
{
  timestamps: true
});

userSchema.pre('save', async function (next) {
  if (
    !this.isModified('password') ||
    !this.password
  ) {
    return next();
  }

  this.password = await bcrypt.hash(
    this.password,
    12
  );

  next();
});

userSchema.methods.comparePassword =
  async function (candidatePassword) {
    return await bcrypt.compare(
      candidatePassword,
      this.password
    );
  };

module.exports = mongoose.model(
  'User',
  userSchema
);