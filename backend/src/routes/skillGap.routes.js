const express = require('express');
const router = express.Router();

const auth =
require('../middleware/auth.middleware');

const {
  analyzeSkillGap
} = require('../controllers/skillGap.controller');

router.post(
  '/gap-analysis',
  auth,
  analyzeSkillGap
);

module.exports = router;