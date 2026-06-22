const Skill = require('../models/Skill.model');

exports.analyzeSkillGap = async (req, res) => {
  try {

    const {
      currentSkills,
      targetDomain
    } = req.body;

    let missingSkills = [];

    if (
      targetDomain.toLowerCase().includes(
        'data'
      )
    ) {

      const requiredSkills = [
        'Python',
        'SQL',
        'Machine Learning',
        'TensorFlow',
        'Power BI',
        'Docker',
        'AWS'
      ];

      missingSkills =
        requiredSkills
          .filter(
            skill =>
              !currentSkills.includes(skill)
          )
          .map(skill => ({
            skill,
            priority:
              [
                'Python',
                'SQL',
                'Machine Learning'
              ].includes(skill)
                ? 'high'
                : 'medium'
          }));

    } else if (
      targetDomain.toLowerCase().includes(
        'full stack'
      )
    ) {

      const requiredSkills = [
        'HTML',
        'CSS',
        'JavaScript',
        'React',
        'Node.js',
        'MongoDB',
        'Docker'
      ];

      missingSkills =
        requiredSkills
          .filter(
            skill =>
              !currentSkills.includes(skill)
          )
          .map(skill => ({
            skill,
            priority:
              [
                'JavaScript',
                'React',
                'Node.js'
              ].includes(skill)
                ? 'high'
                : 'medium'
          }));
    }

    res.json({
      success: true,
      targetDomain,
      missingSkills
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};