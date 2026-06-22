exports.generateQuestions = async (req, res) => {
  try {
    const { domain } = req.body;

    const questions = {
      "data scientist": {
        technical: [
          "What is Machine Learning?",
          "Difference between Supervised and Unsupervised Learning?",
          "Explain Linear Regression.",
          "What is Overfitting?",
          "What is Pandas?"
        ],
        hr: [
          "Tell me about yourself.",
          "Why should we hire you?",
          "What are your strengths?",
          "Where do you see yourself in 5 years?"
        ]
      },

      "full stack developer": {
        technical: [
          "What is React?",
          "Difference between SQL and MongoDB?",
          "What is Node.js?",
          "Explain REST APIs.",
          "What is JWT?"
        ],
        hr: [
          "Tell me about yourself.",
          "Why do you want this role?",
          "What is your biggest project?"
        ]
      }
    };

    const result =
      questions[domain.toLowerCase()] ||
      {
        technical: [
          "Explain your favorite technology.",
          "Describe a project you built."
        ],
        hr: [
          "Tell me about yourself.",
          "Why should we hire you?"
        ]
      };

    res.json(result);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};