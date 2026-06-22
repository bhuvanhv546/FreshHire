exports.generateRoadmap = async (req, res) => {
  try {
    const { targetDomain } = req.body;

    const roadmaps = {
      "data scientist": [
        {
          phase: "Phase 1",
          title: "Programming Foundations",
          skills: ["Python", "SQL", "Statistics"]
        },
        {
          phase: "Phase 2",
          title: "Data Analysis",
          skills: ["Pandas", "NumPy", "Matplotlib"]
        },
        {
          phase: "Phase 3",
          title: "Machine Learning",
          skills: [
            "Scikit-Learn",
            "Machine Learning",
            "TensorFlow"
          ]
        },
        {
          phase: "Phase 4",
          title: "Deployment",
          skills: ["Docker", "AWS"]
        }
      ],

      "full stack developer": [
        {
          phase: "Phase 1",
          title: "Frontend Basics",
          skills: ["HTML", "CSS", "JavaScript"]
        },
        {
          phase: "Phase 2",
          title: "Frontend Frameworks",
          skills: ["React"]
        },
        {
          phase: "Phase 3",
          title: "Backend Development",
          skills: ["Node.js", "Express"]
        },
        {
          phase: "Phase 4",
          title: "Database & Deployment",
          skills: ["MongoDB", "Docker", "AWS"]
        }
      ]
    };

    const roadmap =
      roadmaps[targetDomain.toLowerCase()] || [];

    res.json({
      targetDomain,
      roadmap
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};