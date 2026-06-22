import React, { useState } from 'react';
import axios from 'axios';

const SalaryPredictor = () => {
  const [skills, setSkills] = useState('');
  const [experience, setExperience] = useState('');
  const [location, setLocation] = useState('');
  const [salary, setSalary] = useState(null);
  const [loading, setLoading] = useState(false);

  const predictSalary = async () => {
    try {
      setLoading(true);

      const res = await axios.post(
        'https://freshhire-backend.onrender.com/api/salary/predict',
        {
          skills: skills.split(',').map(skill => skill.trim()),
          experience: Number(experience),
          location
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      );

      setSalary(res.data.predictedSalary);
    } catch (error) {
      console.error(error);
      alert('Failed to predict salary');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">
        AI Salary Predictor
      </h1>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
        <input
          type="text"
          placeholder="Skills (comma separated)"
          value={skills}
          onChange={(e) => setSkills(e.target.value)}
          className="w-full p-3 border rounded-lg mb-4"
        />

        <input
          type="number"
          placeholder="Experience (years)"
          value={experience}
          onChange={(e) => setExperience(e.target.value)}
          className="w-full p-3 border rounded-lg mb-4"
        />

        <input
          type="text"
          placeholder="Location (e.g. Bangalore)"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="w-full p-3 border rounded-lg mb-4"
        />

        <button
          onClick={predictSalary}
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
        >
          {loading ? 'Predicting...' : 'Predict Salary'}
        </button>
      </div>

      {salary && (
        <div className="mt-6 bg-green-100 border border-green-300 p-6 rounded-xl">
          <h2 className="text-2xl font-bold text-green-700">
            Predicted Salary
          </h2>

          <p className="text-4xl font-bold mt-2">
            {salary}
          </p>
        </div>
      )}
    </div>
  );
};

export default SalaryPredictor;