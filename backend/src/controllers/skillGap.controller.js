exports.analyzeSkillGap = async (req, res) => {
  try {
    const { currentSkills, targetDomain } = req.body;

    const normalizedDomain = targetDomain
      .toLowerCase()
      .trim();

    const domainSkills = {
      "data scientist": [
        "Python",
        "SQL",
        "Machine Learning",
        "TensorFlow",
        "Docker",
        "AWS"
      ],

      "full stack developer": [
        "HTML",
        "CSS",
        "JavaScript",
        "React",
        "Node.js",
        "MongoDB",
        "Docker"
      ]
    };

    const requiredSkills =
      domainSkills[normalizedDomain] || [];

    const missingSkills = requiredSkills
      .filter(
        skill =>
          !currentSkills.some(
            s =>
              s.toLowerCase().trim() ===
              skill.toLowerCase().trim()
          )
      )
      .map(skill => ({
        skill,
        priority: "high"
      }));

    res.json({
      targetDomain,
      missingSkills
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: error.message
    });
  }
};