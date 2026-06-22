const express = require('express');
const router = express.Router();

const auth =
require('../middleware/auth.middleware');

const notificationController =
require('../controllers/notification.controller');

router.get(
  '/',
  auth,
  notificationController.getMyNotifications
);

router.put(
  '/:id/read',
  auth,
  notificationController.markAsRead
);

module.exports = router;