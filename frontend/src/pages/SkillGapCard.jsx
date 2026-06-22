import React from "react";

function SkillGapCard({ missingSkills, prioritySkills }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow mt-4">
      <h2 className="text-xl font-bold">
        Skill Gap Analysis
      </h2>

      <h3 className="mt-4 font-semibold">
        Missing Skills
      </h3>

      <ul>
        {missingSkills?.map((skill, index) => (
          <li key={index}>{skill}</li>
        ))}
      </ul>

      <h3 className="mt-4 font-semibold">
        Priority Skills
      </h3>

      <ul>
        {prioritySkills?.map((skill, index) => (
          <li key={index}>{skill}</li>
        ))}
      </ul>
    </div>
  );
}

export default SkillGapCard;