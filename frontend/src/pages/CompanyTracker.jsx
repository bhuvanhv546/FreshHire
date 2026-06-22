import React, { useState } from 'react';
import axios from 'axios';
import CompanyCard from '../components/AI/CompanyCard';

const CompanyTracker = () => {

  const [company, setCompany] = useState('');
  const [result, setResult] = useState(null);

  const searchCompany = async () => {

    try {

      const res = await axios.post(
        'http://localhost:5004/api/company/track',
        { company }
      );

      setResult(res.data);

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">

      <h1 className="text-3xl font-bold mb-6">
        Company Tracker
      </h1>

      <div className="bg-white p-6 rounded-xl shadow-lg">

        <input
          type="text"
          placeholder="Enter Company Name"
          value={company}
          onChange={(e) =>
            setCompany(e.target.value)
          }
          className="w-full p-2 border rounded mb-4"
        />

        <button
          onClick={searchCompany}
          className="bg-blue-600 text-white px-6 py-2 rounded"
        >
          Search Company
        </button>

      </div>

      {result && (
        <CompanyCard company={result} />
      )}

    </div>
  );
};

export default CompanyTracker;