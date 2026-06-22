import React, { useEffect, useState } from "react";
import axios from "axios";

function MyResume() {
  const [resume, setResume] = useState(null);

  useEffect(() => {
    fetchResume();
  }, []);

  const fetchResume = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        "https://freshhire-backend.onrender.com/api/resume/my-resume",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setResume(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container mx-auto p-10">
      <h1 className="text-4xl font-bold mb-6">
        My Resume
      </h1>

      {!resume ? (
        <p>No resume uploaded yet.</p>
      ) : (
        <div className="bg-white p-6 rounded shadow">
          <h2 className="text-xl font-semibold mb-4">
            Uploaded Resume
          </h2>

          <p>
            <strong>File:</strong>{" "}
            {resume.originalName}
          </p>

          <p>
            <strong>Uploaded:</strong>{" "}
            {new Date(
              resume.uploadedAt
            ).toLocaleString()}
          </p>

          <a
            href={`https://freshhire-backend.onrender.com/${resume.resumeUrl}`}
            target="_blank"
            rel="noreferrer"
            className="inline-block mt-4 bg-blue-600 text-white px-6 py-2 rounded"
          >
            View Resume
          </a>
        </div>
      )}
    </div>
  );
}

export default MyResume;