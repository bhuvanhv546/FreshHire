exports.scoreResume = async (req, res) => {
  try {
    const { skills, projects, certifications } = req.body;

    let score = 0;
    let suggestions = [];

    // Skills
    if (skills?.length >= 5) score += 40;
    else suggestions.push("Add more technical skills");

    // Projects
    if (projects?.length >= 2) score += 30;
    else suggestions.push("Add more projects");

    // Certifications
    if (certifications?.length >= 1) score += 20;
    else suggestions.push("Add certifications");

    score += 10;

    res.json({
      atsScore: score,
      suggestions,
      strengths: [
        "Technical Skills",
        "Projects",
        "Education"
      ]
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};