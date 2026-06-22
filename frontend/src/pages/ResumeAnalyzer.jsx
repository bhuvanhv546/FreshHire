import React, { useState } from "react";
import axios from "axios";

const ResumeAnalyzer = () => {

  const [analysis, setAnalysis] =
    useState(null);

  const analyzeResume =
    async () => {

      try {

        const token =
          localStorage.getItem("token");

        const res =
          await axios.post(
            "http://localhost:5004/api/resume-analyzer/analyze",
            {},
            {
              headers: {
                Authorization:
                  `Bearer ${token}`
              }
            }
          );

        setAnalysis(res.data);

      } catch (error) {

        console.log(error);

      }

    };

  return (

    <div className="container mx-auto py-10">

      <h1 className="text-4xl font-bold mb-6">
        ATS Resume Analyzer
      </h1>

      <button
        onClick={analyzeResume}
        className="bg-blue-600 text-white px-6 py-3 rounded"
      >
        Analyze Resume
      </button>

      {analysis && (

        <div className="mt-8 bg-white p-6 rounded shadow">

          <h2 className="text-2xl font-bold mb-4">
            ATS Score
          </h2>

          <div className="text-6xl font-bold text-green-600 mb-6">
            {analysis.atsScore}%
          </div>

          <h3 className="text-xl font-bold mb-2">
            Skills Found
          </h3>

          <ul className="mb-6">

            {analysis.skillsFound.map(
              (skill, index) => (

                <li key={index}>
                  ✅ {skill}
                </li>

              )
            )}

          </ul>

          <h3 className="text-xl font-bold mb-2">
            Missing Skills
          </h3>

          <ul className="mb-6">

            {analysis.missingSkills.map(
              (skill, index) => (

                <li key={index}>
                  ❌ {skill}
                </li>

              )
            )}

          </ul>

          <h3 className="text-xl font-bold mb-2">
            Suggestions
          </h3>

          <ul>

            {analysis.suggestions.map(
              (item, index) => (

                <li key={index}>
                  💡 {item}
                </li>

              )
            )}

          </ul>

        </div>

      )}

    </div>

  );

};

export default ResumeAnalyzer;