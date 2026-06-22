import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

export default function MyJobs() {
  const [jobs, setJobs] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchJobs()
  }, [])

  const fetchJobs = async () => {
    try {
      const token = localStorage.getItem('token')

      const res = await axios.get(
        'https://freshhire-backend.onrender.com/api/jobs/my-jobs',
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      setJobs(res.data)

    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const deleteJob = async (id) => {
  console.log("DELETE CLICKED:", id);

  const confirmDelete = window.confirm(
    "Delete this job?"
  );

  if (!confirmDelete) return;

  try {
    const token = localStorage.getItem("token");

    console.log("TOKEN:", token);
    console.log("URL:", `https://freshhire-backend.onrender.com/api/jobs/${id}`);

    const res = await axios.delete(
      `https://freshhire-backend.onrender.com/api/jobs/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    console.log("DELETE RESPONSE:", res.data);

    setJobs(
      jobs.filter(job => job._id !== id)
    );

    alert("Job deleted successfully");

  } catch (err) {
    console.error("DELETE ERROR:", err);
    console.log(err.response?.data);

    alert(
      err.response?.data?.message ||
      "Failed to delete job"
    );
  }
};

  if (loading) {
    return (
      <div className="container mx-auto p-8">
        Loading...
      </div>
    )
  }

  return (
    <div className="container mx-auto px-6 py-10">

      <h1 className="text-4xl font-bold mb-8">
        My Posted Jobs
      </h1>

      {jobs.length === 0 ? (
        <div className="bg-white p-6 rounded-xl shadow">
          No jobs posted yet.
        </div>
      ) : (
        <div className="grid gap-6">

          {jobs.map(job => (
            <div
              key={job._id}
              className="bg-white shadow rounded-xl p-6"
            >
              <h2 className="text-2xl font-bold">
                {job.title}
              </h2>

              <p className="text-gray-600 mt-2">
                {job.location?.city},
                {' '}
                {job.location?.state}
              </p>

              <p className="text-green-600 font-bold mt-3">
                ₹ {job.salary?.min?.toLocaleString()}
                {' - '}
                ₹ {job.salary?.max?.toLocaleString()}
              </p>

              <div className="flex gap-3 mt-5">

                <Link
                  to={`/jobs/${job._id}`}
                  className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                  View
                </Link>
                <Link
  to={`/recruiter/edit-job/${job._id}`}
  className="bg-yellow-500 text-white px-4 py-2 rounded mr-2"
>
  Edit
</Link>
<Link
  to={`/recruiter/applicants/${job._id}`}
  className="bg-green-600 text-white px-4 py-2 rounded mr-2"
>
  Applicants
</Link>
                <button
  onClick={() => deleteJob(job._id)}
  className="bg-red-600 text-white px-4 py-2 rounded"
>
  Delete
</button>
              </div>

            </div>
          ))}

        </div>
      )}

    </div>
  )
}