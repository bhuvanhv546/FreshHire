exports.chat = async (req, res) => {

  const { message } = req.body;

  let reply =
    "I can help with careers, resumes and interviews.";

  if (
    message.toLowerCase().includes("resume")
  ) {
    reply =
      "Add projects, certifications and measurable achievements.";
  }

  if (
    message.toLowerCase().includes("salary")
  ) {
    reply =
      "Improve in-demand skills like React, AWS and AI to increase salary.";
  }

  if (
    message.toLowerCase().includes("interview")
  ) {
    reply =
      "Practice technical and HR questions daily.";
  }

  res.json({
    reply
  });
};