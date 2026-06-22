const express = require('express');
const router = express.Router();

const auth =
require('../middleware/auth.middleware');

const controller =
require('../controllers/resumeAnalyzer.controller');

router.post(
 '/analyze',
 auth,
 controller.analyzeResume
);

router.get(
 '/result',
 auth,
 controller.getAnalysis
);

module.exports = router;