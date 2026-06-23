const Resume = require('../models/Resume.model');

exports.uploadResume = async (req, res) => {
  try {

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No file uploaded'
      });
    }

    const resume = await Resume.create({
      user: req.user.userId,
      resumeUrl:req.file.path.replace(/\\/g, "/"),
      originalName: req.file.originalname
    });

    res.json({
      success: true,
      message: 'Resume uploaded successfully',
      resume
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

exports.getMyResume = async (req, res) => {
  try {
    const resume = await Resume.findOne({
      user: req.user.userId
    });

    res.json(resume);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

exports.saveResumeAnalysis = async (req, res) => {
  try {
    res.json({
      success: true,
      message: 'Resume analysis saved'
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

exports.getUserResumes = async (req, res) => {
  try {
    const resumes = await Resume.find({
      user: req.user.userId
    });

    res.json(resumes);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};
const { GoogleGenerativeAI } = require("@google/generative-ai");

exports.analyzeResume = async (req, res) => {
  try {
    const { resumeText } = req.body;

    if (!resumeText || resumeText.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "Resume text is required"
      });
    }

    const genAI = new GoogleGenerativeAI(
      process.env.GEMINI_API_KEY
    );

    const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash-lite"
});

    const prompt = `
You are an ATS Resume Analyzer.

Analyze the following resume and return ONLY valid JSON.

Resume:
${resumeText}

Format:
{
  "atsScore": 0,
  "strengths": [],
  "weaknesses": [],
  "missingSkills": [],
  "suggestions": []
}
`;

    const result = await model.generateContent(prompt);

    let responseText = result.response.text();

    responseText = responseText
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    const analysis = JSON.parse(responseText);

    return res.status(200).json({
      success: true,
      analysis
    });

  } catch (error) {
    console.error("Resume Analysis Error:", error);

    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};