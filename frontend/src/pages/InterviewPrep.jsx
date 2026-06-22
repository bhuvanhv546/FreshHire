import React, { useState } from 'react';
import axios from 'axios';
import InterviewCard from '../components/AI/InterviewCard';

const InterviewPrep = () => {

  const [domain, setDomain] = useState('');
  const [questions, setQuestions] = useState(null);

  const generateQuestions = async () => {
    try {

      const res = await axios.post(
        'http://localhost:5004/api/interview/questions',
        { domain }
      );

      setQuestions(res.data);

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">

      <h1 className="text-3xl font-bold mb-6">
        AI Interview Preparation
      </h1>

      <div className="bg-white p-6 rounded-xl shadow-lg">

        <input
          type="text"
          placeholder="Enter Domain"
          value={domain}
          onChange={(e) => setDomain(e.target.value)}
          className="w-full p-2 border rounded mb-4"
        />

        <button
          onClick={generateQuestions}
          className="bg-blue-600 text-white px-6 py-2 rounded"
        >
          Generate Questions
        </button>

      </div>

      {questions && (
        <InterviewCard questions={questions} />
      )}

    </div>
  );
};

export default InterviewPrep;