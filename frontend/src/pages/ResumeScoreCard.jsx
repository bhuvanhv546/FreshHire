import React from 'react';
import { TrendingUp, Award, AlertCircle } from 'lucide-react';

const ResumeScoreCard = ({ atsScore, strengths, weaknesses }) => {
  const getColor = () => {
    if (atsScore >= 80) return 'text-green-600';
    if (atsScore >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold">ATS Score</h3>
        <TrendingUp className="text-primary-600" />
      </div>

      <div className="text-center">
        <div className={`text-5xl font-bold ${getColor()}`}>
          {atsScore}
        </div>
        <div className="text-sm text-gray-500">out of 100</div>
      </div>

      <div className="mt-4 space-y-3">
        <div>
          <h4 className="font-semibold flex items-center gap-2">
            <Award size={16} /> Strengths
          </h4>

          <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400">
            {strengths?.slice(0, 3).map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-semibold flex items-center gap-2">
            <AlertCircle size={16} /> Weaknesses
          </h4>

          <ul className="list-disc list-inside text-sm text-gray-600">
            {weaknesses?.slice(0, 3).map((w, i) => (
              <li key={i}>{w}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ResumeScoreCard;
