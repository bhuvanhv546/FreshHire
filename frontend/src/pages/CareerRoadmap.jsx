import React, { useState } from 'react';
import axios from 'axios';
import RoadmapCard from '../components/AI/RoadmapCard';

const CareerRoadmap = () => {
  const [domain, setDomain] = useState('');
const [skills, setSkills] = useState('');
const [goal, setGoal] = useState('');
const [roadmap, setRoadmap] = useState(null);
  const generate = async () => {
  try {
    const res = await axios.post(
      'http://localhost:5004/api/roadmap/generate',
      {
        targetDomain: domain
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      }
    );

    
    setRoadmap(res.data.roadmap);
  } catch (error) {
    console.error(error);
  }
};

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">AI Career Roadmap</h1>
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
        <input placeholder="Domain (e.g., Data Science)" value={domain} onChange={(e) => setDomain(e.target.value)} className="w-full p-2 border rounded-lg mb-4" />
        <input placeholder="Current skills (comma)" value={skills} onChange={(e) => setSkills(e.target.value)} className="w-full p-2 border rounded-lg mb-4" />
        <input placeholder="Career goal" value={goal} onChange={(e) => setGoal(e.target.value)} className="w-full p-2 border rounded-lg mb-4" />
        <button onClick={generate} className="bg-primary-600 text-white px-6 py-2 rounded-lg">Generate Roadmap</button>
      </div>
      {roadmap && <RoadmapCard roadmap={roadmap} />}
    </div>
  );
};

export default CareerRoadmap;
