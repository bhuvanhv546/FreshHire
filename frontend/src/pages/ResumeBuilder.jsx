import React, { useState } from 'react';
import axios from 'axios';

const ResumeBuilder = () => {
  const [formData, setFormData] = useState({
    personal: {},
    education: [],
    skills: [],
    projects: []
  });

  const [template, setTemplate] = useState('modern');
  const [downloading, setDownloading] = useState(false);

  const handleDownload = async () => {
    setDownloading(true);

    const res = await axios.post(
      '/api/ai/build-resume',
      { userData: formData, template },
      {
        responseType: 'blob',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      }
    );

    const url = window.URL.createObjectURL(new Blob([res.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'resume.pdf');
    document.body.appendChild(link);
    link.click();

    setDownloading(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">AI Resume Builder</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
          <h2 className="text-xl font-semibold mb-4">Personal Details</h2>

          <input
            placeholder="Name"
            className="w-full p-2 border rounded mb-2"
            onChange={(e) =>
              setFormData({
                ...formData,
                personal: {
                  ...formData.personal,
                  name: e.target.value
                }
              })
            }
          />

          <input
            placeholder="Email"
            className="w-full p-2 border rounded mb-2"
            onChange={(e) =>
              setFormData({
                ...formData,
                personal: {
                  ...formData.personal,
                  email: e.target.value
                }
              })
            }
          />

          <input
            placeholder="Phone"
            className="w-full p-2 border rounded mb-2"
            onChange={(e) =>
              setFormData({
                ...formData,
                personal: {
                  ...formData.personal,
                  phone: e.target.value
                }
              })
            }
          />

          <h2 className="text-xl font-semibold mt-4 mb-2">Education</h2>

          <input
            placeholder="Degree, Institution, Year"
            className="w-full p-2 border rounded"
            onChange={(e) =>
              setFormData({
                ...formData,
                education: [{ degree: e.target.value }]
              })
            }
          />

          <h2 className="text-xl font-semibold mt-4 mb-2">Skills</h2>

          <input
            placeholder="React, Python, SQL"
            className="w-full p-2 border rounded"
            onChange={(e) =>
              setFormData({
                ...formData,
                skills: e.target.value.split(',')
              })
            }
          />

          <div className="mt-4">
            <label>Template</label>
            <select
              value={template}
              onChange={(e) => setTemplate(e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option>modern</option>
              <option>corporate</option>
              <option>fresher</option>
              <option>creative</option>
            </select>
          </div>

          <button
            onClick={handleDownload}
            disabled={downloading}
            className="mt-6 bg-primary-600 text-white w-full py-2 rounded-lg"
          >
            Download Resume
          </button>
        </div>

        <div className="bg-gray-100 dark:bg-gray-700 p-6 rounded-xl">
          <h2 className="text-xl font-semibold mb-4">Preview</h2>
          <div className="bg-white p-4 rounded shadow">
            {/* Preview content */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilder;
