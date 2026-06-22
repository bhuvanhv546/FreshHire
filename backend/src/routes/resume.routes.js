const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth.middleware');
const upload = require('../middleware/upload.middleware');
const resumeController = require('../controllers/resume.controller');

router.post(
  '/upload',
  auth,
  upload.single('resume'),
  resumeController.uploadResume
);

router.get(
  '/my-resume',
  auth,
  resumeController.getMyResume
);

router.get(
  '/my-resumes',
  auth,
  resumeController.getUserResumes
);

router.post(
  '/analyze-save',
  auth,
  resumeController.saveResumeAnalysis
);

module.exports = router;