import React, { useState } from "react";
import axios from "axios";

const CareerRoadmap = () => {
  const [domain, setDomain] = useState("");
  const [skills, setSkills] = useState("");
  const [goal, setGoal] = useState("");
  const [roadmap, setRoadmap] = useState([]);
  const [loading, setLoading] = useState(false);

  const generateRoadmap = async () => {
    try {
      setLoading(true);

     const res = await axios.post(
  "https://freshhire-backend.onrender.com/api/roadmap/generate",
  {
    targetDomain: domain,
    currentSkills: skills,
    careerGoal: goal
  },
  {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`
    }
  }
);console.log("Response:", res.data);

      setRoadmap(res.data.roadmap || []);
    } catch (error) {
      console.error(error);
      alert("Failed to generate roadmap");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-4xl font-bold text-center mb-8">
        AI Career Roadmap
      </h1>

      <div className="bg-white shadow-lg rounded-xl p-6 mb-8">
        <input
          type="text"
          placeholder="Target Domain (e.g. Full Stack Developer)"
          value={domain}
          onChange={(e) => setDomain(e.target.value)}
          className="w-full border p-3 rounded-lg mb-4"
        />

        <input
          type="text"
          placeholder="Current Skills"
          value={skills}
          onChange={(e) => setSkills(e.target.value)}
          className="w-full border p-3 rounded-lg mb-4"
        />

        <input
          type="text"
          placeholder="Career Goal"
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
          className="w-full border p-3 rounded-lg mb-4"
        />

        <button
          onClick={generateRoadmap}
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
        >
          {loading ? "Generating..." : "Generate Roadmap"}
        </button>
      </div>

      {roadmap.length > 0 && (
        <div className="space-y-6">
          {roadmap.map((phase, index) => (
            <div
              key={index}
              className="bg-white shadow-lg rounded-xl p-6 border-l-4 border-blue-600"
            >
              <h2 className="text-xl font-bold">
                {phase.phase}
              </h2>

              <h3 className="text-lg text-gray-700 mb-4">
                {phase.title}
              </h3>

              <ul className="list-disc ml-6">
                {phase.skills?.map((skill, i) => (
                  <li key={i}>{skill}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CareerRoadmap;