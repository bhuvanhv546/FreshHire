import React from "react";

const CareerRoadmap = () => {
  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-4xl font-bold text-center mb-8">
        Career Roadmap
      </h1>

      <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
        <h2 className="text-2xl font-semibold mb-4">
          Full Stack Developer
        </h2>

        <div className="space-y-4">

          <div className="border-l-4 border-blue-500 pl-4">
            <h3 className="font-bold text-lg">Phase 1: Frontend Basics</h3>
            <ul className="list-disc ml-5">
              <li>HTML</li>
              <li>CSS</li>
              <li>JavaScript</li>
            </ul>
          </div>

          <div className="border-l-4 border-green-500 pl-4">
            <h3 className="font-bold text-lg">Phase 2: React Development</h3>
            <ul className="list-disc ml-5">
              <li>React JS</li>
              <li>Redux Toolkit</li>
              <li>React Router</li>
            </ul>
          </div>

          <div className="border-l-4 border-purple-500 pl-4">
            <h3 className="font-bold text-lg">Phase 3: Backend Development</h3>
            <ul className="list-disc ml-5">
              <li>Node.js</li>
              <li>Express.js</li>
              <li>REST APIs</li>
            </ul>
          </div>

          <div className="border-l-4 border-red-500 pl-4">
            <h3 className="font-bold text-lg">Phase 4: Database & Deployment</h3>
            <ul className="list-disc ml-5">
              <li>MongoDB</li>
              <li>Git & GitHub</li>
              <li>Render</li>
              <li>Vercel</li>
            </ul>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CareerRoadmap;