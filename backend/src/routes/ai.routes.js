const express = require('express');
const router = express.Router();
const multer = require('multer');
const authMiddleware = require('../middleware/auth.middleware');
const aiController = require('../controllers/ai.controller');

const upload = multer({ storage: multer.memoryStorage() });

router.post('/analyze-resume', authMiddleware, upload.single('resume'), aiController.analyzeResume);
router.post('/skill-gap', authMiddleware, aiController.analyzeSkillGap);
router.post('/career-roadmap', authMiddleware, aiController.generateRoadmap);
router.post('/build-resume', authMiddleware, aiController.buildResume);
router.post('/predict-salary', authMiddleware, aiController.predictSalary);
router.post('/interview-questions', authMiddleware, aiController.generateQuestions);
router.post('/evaluate-answer', authMiddleware, aiController.evaluateAnswer);
router.post('/chat', authMiddleware, aiController.chat);

module.exports = router;
