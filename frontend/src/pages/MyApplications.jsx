import React, { useEffect, useState } from 'react'
import axios from 'axios'

const MyApplications = () => {
  const [applications, setApplications] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchApplications()
  }, [])

  const fetchApplications = async () => {
    try {
      const token = localStorage.getItem('token')

      const res = await axios.get(
        'http://freshhire-backend.onrender.com/api/applications/my-applications',
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      setApplications(res.data)
    } catch (error) {
      console.error(error)
      alert('Failed to load applications')
    } finally {
      setLoading(false)
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'Selected':
        return 'bg-green-100 text-green-700'

      case 'Rejected':
        return 'bg-red-100 text-red-700'

      case 'Shortlisted':
        return 'bg-yellow-100 text-yellow-700'

      case 'Interview Scheduled':
        return 'bg-blue-100 text-blue-700'

      case 'Under Review':
        return 'bg-purple-100 text-purple-700'

      default:
        return 'bg-gray-100 text-gray-700'
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Selected':
        return '✅'

      case 'Rejected':
        return '❌'

      case 'Shortlisted':
        return '⭐'

      case 'Interview Scheduled':
        return '📅'

      case 'Under Review':
        return '👀'

      default:
        return '📄'
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto px-6 py-10">
        <h1 className="text-5xl font-bold mb-8">
          My Applications
        </h1>

        <div className="bg-white rounded-xl shadow p-8">
          Loading applications...
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-6 py-10 min-h-screen">

      <h1 className="text-5xl font-bold mb-10">
        My Applications
      </h1>

      {applications.length === 0 ? (
        <div className="bg-white shadow rounded-xl p-8 text-center">
          <h2 className="text-2xl font-bold mb-3">
            No Applications Yet
          </h2>

          <p className="text-gray-600">
            Start applying for jobs to see them here.
          </p>
        </div>
      ) : (
        <div className="grid gap-6">

          {applications.map((app) => (
            <div
              key={app._id}
              className="bg-white shadow-md rounded-xl p-6 hover:shadow-xl transition duration-300"
            >
              <div className="flex justify-between items-start flex-wrap gap-4">

                <div>

                  <h2 className="text-2xl font-bold">
                    {app.job?.title || 'Job Deleted'}
                  </h2>

                  <p className="text-gray-600 mt-1">
                    {app.job?.company?.name || 'Company'}
                  </p>

                  <p className="text-gray-500 mt-2">
                    📍 {app.job?.location?.city},
                    {' '}
                    {app.job?.location?.state}
                  </p>

                  {app.job?.salary?.min && (
                    <p className="text-green-600 font-bold text-lg mt-2">
                      ₹ {app.job.salary.min.toLocaleString()}
                    </p>
                  )}

                  <p className="text-sm text-gray-500 mt-3">
                    Applied On:
                    {' '}
                    {new Date(
                      app.appliedDate
                    ).toLocaleDateString()}
                  </p>

                  {app.lastUpdated && (
                    <p className="text-sm text-gray-500 mt-1">
                      Last Updated:
                      {' '}
                      {new Date(
                        app.lastUpdated
                      ).toLocaleDateString()}
                    </p>
                  )}

                </div>

                <div>
                  <span
                    className={`px-4 py-2 rounded-full font-semibold flex items-center gap-2 ${getStatusColor(
                      app.status
                    )}`}
                  >
                    {getStatusIcon(app.status)}
                    {app.status || 'Applied'}
                  </span>
                </div>

              </div>

              {app.notes && (
                <div className="mt-5 border-t pt-4">
                  <h3 className="font-bold mb-2">
                    Recruiter Notes
                  </h3>

                  <p className="text-gray-600">
                    {app.notes}
                  </p>
                </div>
              )}

              {app.interviewDetails?.date && (
                <div className="mt-5 border-t pt-4">

                  <h3 className="font-bold mb-2">
                    Interview Details
                  </h3>

                  <p>
                    📅
                    {' '}
                    {new Date(
                      app.interviewDetails.date
                    ).toLocaleString()}
                  </p>

                  <p>
                    💻 Mode:
                    {' '}
                    {app.interviewDetails.mode}
                  </p>

                  {app.interviewDetails.link && (
                    <a
                      href={app.interviewDetails.link}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-block mt-2 text-blue-600 font-semibold underline"
                    >
                      Join Interview
                    </a>
                  )}

                </div>
              )}

            </div>
          ))}

        </div>
      )}
    </div>
  )
}

export default MyApplications