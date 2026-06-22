const express = require('express')
const router = express.Router()

const auth =
  require('../middleware/auth.middleware')

const analyticsController =
  require('../controllers/recruiterAnalytics.controller')

router.get(
  '/dashboard',
  auth,
  analyticsController.getDashboardStats
)

module.exports = router