import React from 'react';

const InterviewCard = ({ questions }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mt-6">

      <h2 className="text-2xl font-bold mb-4">
        Technical Questions
      </h2>

      <ul className="list-disc pl-6">
        {questions.technical?.map((q, i) => (
          <li key={i}>{q}</li>
        ))}
      </ul>

      <h2 className="text-2xl font-bold mt-6 mb-4">
        HR Questions
      </h2>

      <ul className="list-disc pl-6">
        {questions.hr?.map((q, i) => (
          <li key={i}>{q}</li>
        ))}
      </ul>

    </div>
  );
};

export default InterviewCard;