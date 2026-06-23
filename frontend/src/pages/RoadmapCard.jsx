import React from 'react';
import { CheckCircle, Target } from 'lucide-react';

const RoadmapCard = ({ roadmap }) => {
  if (!roadmap || roadmap.length === 0) {
    return (
      <div className="mt-6 bg-yellow-50 border border-yellow-300 text-yellow-800 p-4 rounded-xl">
        No roadmap found for this domain.
        Try:
        <br />
        • Data Scientist
        <br />
        • Full Stack Developer
      </div>
    );
  }

  return (
    <div className="mt-8">
      <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
        <Target className="text-blue-600" />
        Career Roadmap
      </h2>

      <div className="space-y-6">
        {roadmap.map((phase, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border-l-4 border-blue-600 hover:shadow-xl transition"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                {phase.phase}
              </span>
            </div>

            <h3 className="text-xl font-semibold mb-4">
              {phase.title}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {phase.skills.map((skill, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 bg-gray-50 dark:bg-gray-700 p-3 rounded-lg"
                >
                  <CheckCircle
                    size={18}
                    className="text-green-500"
                  />
                  <span>{skill}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoadmapCard;