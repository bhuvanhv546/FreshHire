const aiService = require('../services/ai.service');
const Resume = require('../models/Resume.model');
const Roadmap = require('../models/Roadmap.model');

exports.analyzeResume = async (req, res) => {
  try {
    const resumeBuffer = req.file.buffer;
    const analysis = await aiService.analyzeResume(resumeBuffer);

    const resume = new Resume({
      user: req.user.userId,
      originalFile: req.file.originalname,
      parsedData: analysis.extractedInformation,
      atsScore: analysis.atsScore,
      analysis: {
        strengths: analysis.strengths,
        weaknesses: analysis.weaknesses,
        suggestions: analysis.suggestions
      },
      lastAnalyzed: new Date()
    });

    await resume.save();
    res.json(analysis);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.analyzeSkillGap = async (req, res) => {
  try {
    const { currentSkills, targetDomain } = req.body;
    const analysis = await aiService.analyzeSkillGap(currentSkills, targetDomain);
    res.json(analysis);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.generateRoadmap = async (req, res) => {
  try {
    const { domain, currentSkills, goal } = req.body;
    const roadmapData = await aiService.generateCareerRoadmap(domain, currentSkills, goal);

    const roadmap = new Roadmap({
      user: req.user.userId,
      domain,
      currentSkills,
      goal,
      roadmap: roadmapData.roadmap
    });

    await roadmap.save();
    res.json(roadmapData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.buildResume = async (req, res) => {
  try {
    const { userData, template } = req.body;
    const resume = await aiService.buildResume(userData, template);

    res.json(resume);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.predictSalary = async (req, res) => {
  try {
    const { skills, domain, experience, location } = req.body;
    const prediction = await aiService.predictSalary(skills, domain, experience, location);
    res.json(prediction);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.generateQuestions = async (req, res) => {
  try {
    const { jobRole, type } = req.body;
    const questions = await aiService.generateInterviewQuestions(jobRole, type);
    res.json(questions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.evaluateAnswer = async (req, res) => {
  try {
    const { question, answer, jobRole } = req.body;
    const evaluation = await aiService.evaluateInterviewAnswer(question, answer, jobRole);
    res.json(evaluation);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.chat = async (req, res) => {
  try {
    const { message, context } = req.body;
    const response = await aiService.chatResponse(message, context);
    res.json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
