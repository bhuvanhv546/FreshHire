import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

const ViewApplicants = () => {
  const { jobId } = useParams()

  const [applicants, setApplicants] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchApplicants()
  }, [])

  const fetchApplicants = async () => {
    try {
      const token = localStorage.getItem('token')

      const res = await axios.get(
        `https://freshhire-backend.onrender.com/api/applications/job/${jobId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      setApplicants(res.data)

    } catch (error) {
      console.error(error)
      alert('Failed to load applicants')
    } finally {
      setLoading(false)
    }
  }

  const updateStatus = async (
    applicationId,
    status
  ) => {
    try {
      const token = localStorage.getItem('token')

      await axios.put(
        `https://freshhire-backend.onrender.com/api/applications/${applicationId}/status`,
        {
          status
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      alert(`Applicant ${status}`)
      fetchApplicants()

    } catch (error) {
      console.error(error)
      alert('Failed to update status')
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'Selected':
        return 'text-green-600'
      case 'Rejected':
        return 'text-red-600'
      case 'Shortlisted':
        return 'text-yellow-600'
      default:
        return 'text-blue-600'
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto p-8">
        <h1 className="text-4xl font-bold mb-6">
          Applicants
        </h1>

        <p>Loading applicants...</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-6 py-10">

      <h1 className="text-5xl font-bold mb-8">
        Job Applicants
      </h1>

      {applicants.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-6">
          No applicants found
        </div>
      ) : (
        <div className="grid gap-6">

          {applicants.map((app) => (
            <div
              key={app._id}
              className="bg-white shadow-lg rounded-xl p-6"
            >
              <div className="flex justify-between items-start">

                <div>
                  <h2 className="text-2xl font-bold">
                    {app.user?.name}
                  </h2>

                  <p className="text-gray-600">
                    {app.user?.email}
                  </p>

                  <p className="mt-3">
                    Status:
                    <span
                      className={`ml-2 font-bold ${getStatusColor(
                        app.status
                      )}`}
                    >
                      {app.status}
                    </span>
                  </p>

                  <p className="text-gray-500 mt-2">
                    Applied:
                    {' '}
                    {new Date(
                      app.appliedDate ||
                      app.createdAt
                    ).toLocaleDateString()}
                  </p>
                </div>

              </div>

              <div className="flex gap-3 mt-6">

                <button
                  onClick={() =>
                    updateStatus(
                      app._id,
                      'Shortlisted'
                    )
                  }
                  className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded"
                >
                  Shortlist
                </button>

                <button
                  onClick={() =>
                    updateStatus(
                      app._id,
                      'Selected'
                    )
                  }
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
                >
                  Select
                </button>

                <button
                  onClick={() =>
                    updateStatus(
                      app._id,
                      'Rejected'
                    )
                  }
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
                >
                  Reject
                </button>

              </div>
            </div>
          ))}

        </div>
      )}
    </div>
  )
}

export default ViewApplicants