import React from 'react';
import { Calendar, CheckCircle } from 'lucide-react';

const RoadmapCard = ({ roadmap }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
      <h3 className="text-xl font-semibold mb-4">Your Career Roadmap</h3>

      <div className="space-y-4">
        {roadmap?.map((month, idx) => (
          <div key={idx} className="border-l-4 border-primary-500 pl-4">
            <div className="flex items-center gap-2 text-primary-600 font-semibold">
              <Calendar size={16} />
              Month {month.month}
            </div>

            <ul className="mt-2 space-y-1">
              {month.topics?.map((topic, i) => (
                <li key={i} className="flex items-center gap-2 text-sm">
                  <CheckCircle size={12} className="text-green-500" />
                  {topic}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoadmapCard;
