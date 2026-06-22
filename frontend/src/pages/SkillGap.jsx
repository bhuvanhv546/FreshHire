import React, { useState } from 'react';
import axios from 'axios';
import SkillGapCard from '../components/AI/SkillGapCard';

const SkillGap = () => {
  const [skills, setSkills] = useState('');
  const [domain, setDomain] = useState('');
  const [result, setResult] = useState(null);

  const analyze = async () => {
    const res = await axios.post(
  'http://localhost:5004/api/skills/gap-analysis',
      {
        currentSkills: skills.split(','),
        targetDomain: domain
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      }
    );
    console.log("Response Data:", res.data);
setResult(res.data);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Skill Gap Analysis</h1>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
        <input
          type="text"
          placeholder="Current skills (comma separated)"
          value={skills}
          onChange={(e) => setSkills(e.target.value)}
          className="w-full p-2 border rounded-lg mb-4"
        />

        <input
          type="text"
          placeholder="Target domain (e.g., Full Stack Developer)"
          value={domain}
          onChange={(e) => setDomain(e.target.value)}
          className="w-full p-2 border rounded-lg mb-4"
        />

        <button
          onClick={analyze}
          className="bg-primary-600 text-white px-6 py-2 rounded-lg"
        >
          Analyze Gap
        </button>
      </div>

      {result && (
  <div className="bg-white p-6 rounded shadow mt-4">
    <h2>Missing Skills</h2>

    {result.missingSkills.map((item, index) => (
      <div key={index}>
        {item.skill}
      </div>
    ))}
  </div>
)}
    </div>
  );
};

export default SkillGap;
