import React from 'react';

const RoadmapCard = ({ roadmap }) => {
  return (
    <div className="mt-6">
      {roadmap.map((phase, index) => (
        <div
          key={index}
          className="bg-white shadow rounded-lg p-4 mb-4"
        >
          <h2 className="text-xl font-bold">
            {phase.phase}
          </h2>

          <h3 className="text-lg text-blue-600">
            {phase.title}
          </h3>

          <ul className="list-disc ml-6 mt-2">
            {phase.skills.map((skill, i) => (
              <li key={i}>{skill}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default RoadmapCard;