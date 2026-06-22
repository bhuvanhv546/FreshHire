import React, { useState } from 'react';
import axios from 'axios';

const LearningResources = () => {

  const [domain, setDomain] = useState('');
  const [resources, setResources] = useState(null);

  const getResources = async () => {

    const res = await axios.post(
      'http://localhost:5004/api/learning/resources',
      { domain }
    );

    setResources(res.data);
  };

  return (
    <div className="container mx-auto p-8">

      <h1 className="text-3xl font-bold mb-6">
        Learning Resources
      </h1>

      <input
        value={domain}
        onChange={(e)=>setDomain(e.target.value)}
        placeholder="Enter Domain"
        className="border p-3 w-full"
      />

      <button
        onClick={getResources}
        className="bg-blue-600 text-white px-6 py-2 mt-4 rounded"
      >
        Get Resources
      </button>

      {resources && (
        <div className="mt-6 bg-white p-6 rounded shadow">

          <h2 className="font-bold">Courses</h2>
          {resources.courses.map((c,i)=>
            <p key={i}>{c}</p>
          )}

          <h2 className="font-bold mt-4">YouTube</h2>
          {resources.youtube.map((c,i)=>
            <p key={i}>{c}</p>
          )}

          <h2 className="font-bold mt-4">Certifications</h2>
          {resources.certifications.map((c,i)=>
            <p key={i}>{c}</p>
          )}

        </div>
      )}

    </div>
  );
};

export default LearningResources;