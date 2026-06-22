exports.trackCompany = async (req, res) => {
  try {
    const { company } = req.body;

    const companies = {
      infosys: {
        name: "Infosys",
        hiringStatus: "Actively Hiring",
        roles: [
          "Software Engineer",
          "Data Analyst",
          "System Engineer"
        ],
        skills: [
          "Java",
          "Python",
          "SQL",
          "React"
        ]
      },

      tcs: {
        name: "TCS",
        hiringStatus: "Actively Hiring",
        roles: [
          "Graduate Trainee",
          "Developer",
          "Data Analyst"
        ],
        skills: [
          "Java",
          "Python",
          "SQL"
        ]
      },

      wipro: {
        name: "Wipro",
        hiringStatus: "Hiring",
        roles: [
          "Project Engineer",
          "Software Developer"
        ],
        skills: [
          "Java",
          "Python",
          "Cloud"
        ]
      }
    };

    const result =
      companies[company.toLowerCase()] || {
        name: company,
        hiringStatus: "No Data Available",
        roles: [],
        skills: []
      };

    res.json(result);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};