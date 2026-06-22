const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth.middleware');
const role = require('../middleware/role.middleware');
const analyticsController = require('../controllers/analytics.controller');

router.get(
  '/admin',
  auth,
  role('admin'),
  analyticsController.getAdminAnalytics
);

module.exports = router;
