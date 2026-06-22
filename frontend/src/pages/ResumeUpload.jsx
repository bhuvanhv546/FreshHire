import React, { useState } from "react";
import axios from "axios";

function ResumeUpload() {
  const [file, setFile] = useState(null);

  const handleUpload = async () => {
    if (!file) {
      alert("Select a file first");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("resume", file);

      const token = localStorage.getItem("token");

      const res = await axios.post(
        "http://freshhire-backend.onrender.com/api/resume/upload",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data"
          }
        }
      );

      alert("Resume uploaded successfully");
      console.log(res.data);

    } catch (error) {
      console.error(error);
      alert("Upload failed");
    }
  };

  return (
    <div className="container mx-auto p-10">
      <h1 className="text-4xl font-bold mb-6">
        Upload Resume
      </h1>

      <input
        type="file"
        accept=".pdf,.doc,.docx"
        onChange={(e) =>
          setFile(e.target.files[0])
        }
      />

      <button
        onClick={handleUpload}
        className="ml-4 bg-blue-600 text-white px-6 py-2 rounded"
      >
        Upload
      </button>
    </div>
  );
}

export default ResumeUpload;