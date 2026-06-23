const { GoogleGenerativeAI } = require("@google/generative-ai");

exports.generateRoadmap = async (req, res) => {
  try {
    const {
      targetDomain,
      currentSkills,
      careerGoal
    } = req.body;

    if (!targetDomain) {
      return res.status(400).json({
        success: false,
        message: "Target domain is required"
      });
    }

    console.log(
      "Gemini Key Exists:",
      !!process.env.GEMINI_API_KEY
    );

    const genAI = new GoogleGenerativeAI(
      process.env.GEMINI_API_KEY
    );

    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash"
    });

    const prompt = `
Generate a professional career roadmap.

Domain: ${targetDomain}
Current Skills: ${currentSkills || "Not specified"}
Career Goal: ${careerGoal || "Not specified"}

Return ONLY valid JSON in this format:

[
  {
    "phase": "Phase 1",
    "title": "Title",
    "skills": ["Skill 1", "Skill 2"]
  },
  {
    "phase": "Phase 2",
    "title": "Title",
    "skills": ["Skill 1", "Skill 2"]
  }
]

Do not include explanations.
Do not include markdown.
Do not include \`\`\`json.
`;

    const result = await model.generateContent(prompt);

    const response = await result.response;

    let text = response.text();

    // Clean Gemini response
    text = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    console.log("Gemini Response:", text);

    let roadmap;

    try {
      roadmap = JSON.parse(text);
    } catch (parseError) {
      console.error("JSON Parse Error:", parseError);

      roadmap = [
        {
          phase: "AI Generated",
          title: `${targetDomain} Career Roadmap`,
          skills: [text]
        }
      ];
    }

    res.status(200).json({
      success: true,
      roadmap
    });

  } catch (error) {
    console.error("Roadmap Error:", error);

    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};