import React, { useState } from 'react';
import axios from 'axios';

const ATSScore = () => {

  const [skills, setSkills] = useState('');
  const [projects, setProjects] = useState('');
  const [certs, setCerts] = useState('');

  const [result, setResult] = useState(null);

  const calculateScore = async () => {

    const res = await axios.post(
      'http://localhost:5004/api/ats/score',
      {
        skills: skills.split(','),
        projects: projects.split(','),
        certifications: certs.split(',')
      }
    );

    setResult(res.data);
  };

  return (
    <div className="container mx-auto px-4 py-8">

      <h1 className="text-3xl font-bold mb-6">
        ATS Resume Scoring
      </h1>

      <div className="bg-white p-6 rounded-xl shadow-lg">

        <input
          type="text"
          placeholder="Skills"
          value={skills}
          onChange={(e)=>setSkills(e.target.value)}
          className="w-full p-2 border rounded mb-4"
        />

        <input
          type="text"
          placeholder="Projects"
          value={projects}
          onChange={(e)=>setProjects(e.target.value)}
          className="w-full p-2 border rounded mb-4"
        />

        <input
          type="text"
          placeholder="Certifications"
          value={certs}
          onChange={(e)=>setCerts(e.target.value)}
          className="w-full p-2 border rounded mb-4"
        />

        <button
          onClick={calculateScore}
          className="bg-blue-600 text-white px-6 py-2 rounded"
        >
          Calculate ATS Score
        </button>

      </div>

      {result && (

        <div className="bg-green-100 mt-6 p-6 rounded-xl">

          <h2 className="text-2xl font-bold">
            ATS Score: {result.atsScore}/100
          </h2>

          <h3 className="mt-4 font-semibold">
            Suggestions
          </h3>

          <ul>
            {result.suggestions.map((item,index)=>(
              <li key={index}>• {item}</li>
            ))}
          </ul>

        </div>

      )}

    </div>
  );
};

export default ATSScore;