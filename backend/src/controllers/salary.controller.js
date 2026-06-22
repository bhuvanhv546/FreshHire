exports.predictSalary = async (req, res) => {
  try {
    const { skills = [], experience = 0, location = "" } = req.body;

    let predictedSalary = "3-5 LPA";

    if (
      skills.includes("Python") &&
      skills.includes("Machine Learning")
    ) {
      predictedSalary = "8-12 LPA";
    } else if (
      skills.includes("Java") &&
      skills.includes("Spring Boot")
    ) {
      predictedSalary = "6-10 LPA";
    }

    res.json({
      predictedSalary,
      skills,
      experience,
      location
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};