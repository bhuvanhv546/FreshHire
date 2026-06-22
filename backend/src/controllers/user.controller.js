const User = require('../models/User.model');

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(
      req.user.userId
    ).select('-password -refreshToken');

    res.json(user);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const updates = req.body;

    const user = await User.findByIdAndUpdate(
      req.user.userId,
      updates,
      { new: true }
    ).select('-password');

    res.json(user);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};
exports.updateCompanyProfile =
async (req, res) => {
  try {

    const user =
      await User.findByIdAndUpdate(
        req.user.userId,
        {
          companyProfile: {
            companyName:
              req.body.companyName,

            companyLogo:
              req.body.companyLogo,

            website:
              req.body.website,

            industry:
              req.body.industry,

            companySize:
              req.body.companySize,

            description:
              req.body.description
          }
        },
        {
          new: true
        }
      );

    res.json({
      success: true,
      user
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};
