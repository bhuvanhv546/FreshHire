const Notification = require('../models/Notification.model');
const { io } = require('../../server');

exports.createNotification = async (
  userId,
  type,
  title,
  message,
  data = {}
) => {
  const notification = new Notification({
    user: userId,
    type,
    title,
    message,
    data
  });

  await notification.save();

  io.to(userId).emit('notification', notification);

  return notification;
};
