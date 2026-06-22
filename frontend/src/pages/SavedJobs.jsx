import React, { useEffect, useState } from 'react'
import axios from 'axios'

const SavedJobs = () => {
  const [jobs, setJobs] = useState([])

  useEffect(() => {
    fetchSavedJobs()
  }, [])

  const fetchSavedJobs = async () => {
    try {
      const token = localStorage.getItem('token')

      const res = await axios.get(
        'http://freshhire-backend.onrender.com/api/saved-jobs',
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      setJobs(res.data)
    } catch (error) {
      console.error(error)
    }
  }

  const removeJob = async (jobId) => {
    try {
      const token = localStorage.getItem('token')

      await axios.delete(
        `http://freshhire-backend.onrender.com/api/saved-jobs/${jobId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      fetchSavedJobs()

    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="container mx-auto py-10 px-6">
      <h1 className="text-4xl font-bold mb-8">
        Saved Jobs
      </h1>

      {jobs.length === 0 ? (
        <p>No saved jobs</p>
      ) : (
        jobs.map(item => (
          <div
            key={item._id}
            className="bg-white shadow rounded p-6 mb-4"
          >
            <h2 className="text-2xl font-semibold">
              {item.job?.title}
            </h2>

            <p>
              {item.job?.company?.name}
            </p>

            <button
              onClick={() =>
                removeJob(item.job._id)
              }
              className="bg-red-600 text-white px-4 py-2 rounded mt-4"
            >
              Remove
            </button>
          </div>
        ))
      )}
    </div>
  )
}

export default SavedJobs