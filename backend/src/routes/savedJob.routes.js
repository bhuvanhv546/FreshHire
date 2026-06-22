const express = require('express');
const router = express.Router();

const auth =
require('../middleware/auth.middleware');

const controller =
require('../controllers/savedJob.controller');

router.post(
  '/:jobId',
  auth,
  controller.saveJob
);

router.get(
  '/',
  auth,
  controller.getSavedJobs
);

router.delete(
  '/:jobId',
  auth,
  controller.removeSavedJob
);

module.exports = router;