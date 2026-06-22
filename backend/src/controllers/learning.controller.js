exports.getResources = async (req, res) => {
  const { domain } = req.body;

  const resources = {
    "data scientist": {
      courses: [
        "Machine Learning by Andrew Ng",
        "IBM Data Science Professional Certificate"
      ],
      youtube: [
        "Krish Naik",
        "CodeBasics"
      ],
      certifications: [
        "Google Data Analytics",
        "AWS Machine Learning"
      ]
    },

    "full stack developer": {
      courses: [
        "Meta Full Stack Developer",
        "The Complete Web Development Bootcamp"
      ],
      youtube: [
        "Traversy Media",
        "CodeWithHarry"
      ],
      certifications: [
        "AWS Cloud Practitioner",
        "MongoDB Associate"
      ]
    }
  };

  res.json(
    resources[domain.toLowerCase()] || {
      courses: ["General Programming Course"],
      youtube: ["freeCodeCamp"],
      certifications: ["AWS Cloud Practitioner"]
    }
  );
};