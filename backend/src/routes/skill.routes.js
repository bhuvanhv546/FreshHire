const express = require('express');
const router = express.Router();

const auth =
  require('../middleware/auth.middleware');

const skillController =
  require('../controllers/skill.controller');

router.post(
  '/gap-analysis',
  auth,
  skillController.analyzeSkillGap
);

module.exports = router;