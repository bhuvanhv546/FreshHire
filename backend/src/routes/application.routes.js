const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth.middleware');
const applicationController = require('../controllers/application.controller');

router.post('/:jobId/apply', auth, applicationController.applyToJob);

router.get('/my-applications', auth, applicationController.getUserApplications);

router.put('/:id/status', auth, applicationController.updateApplicationStatus);
router.get('/job/:jobId',auth,applicationController.getApplicantsByJob);

module.exports = router;
