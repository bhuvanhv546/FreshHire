const Notification =
require('../models/Notification.model');

exports.getMyNotifications =
async (req, res) => {
  try {

    const notifications =
      await Notification.find({
        user: req.user.userId
      }).sort({
        createdAt: -1
      });

    res.json(notifications);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

exports.markAsRead =
async (req, res) => {
  try {

    await Notification.findByIdAndUpdate(
      req.params.id,
      {
        read: true
      }
    );

    res.json({
      success: true
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};