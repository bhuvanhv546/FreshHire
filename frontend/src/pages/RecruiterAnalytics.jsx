import React, {
  useEffect,
  useState
} from 'react'

import axios from 'axios'

const RecruiterAnalytics = () => {

  const [stats, setStats] =
    useState(null)

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {

      const token =
        localStorage.getItem('token')

      const res = await axios.get(
        'http://localhost:5004/api/recruiter-analytics/dashboard',
        {
          headers: {
            Authorization:
              `Bearer ${token}`
          }
        }
      )

      setStats(res.data)

    } catch (error) {
      console.error(error)
    }
  }

  if (!stats) {
    return (
      <div className="p-8">
        Loading...
      </div>
    )
  }

  return (
    <div className="container mx-auto py-10 px-6">

      <h1 className="text-5xl font-bold mb-10">
        Recruiter Dashboard
      </h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

        <div className="bg-white shadow rounded-xl p-6">
          <h2 className="text-lg">
            Total Jobs
          </h2>
          <p className="text-4xl font-bold mt-3">
            {stats.totalJobs}
          </p>
        </div>

        <div className="bg-white shadow rounded-xl p-6">
          <h2 className="text-lg">
            Applications
          </h2>
          <p className="text-4xl font-bold mt-3">
            {stats.totalApplications}
          </p>
        </div>

        <div className="bg-white shadow rounded-xl p-6">
          <h2 className="text-lg">
            Selected
          </h2>
          <p className="text-4xl font-bold text-green-600 mt-3">
            {stats.selected}
          </p>
        </div>

        <div className="bg-white shadow rounded-xl p-6">
          <h2 className="text-lg">
            Rejected
          </h2>
          <p className="text-4xl font-bold text-red-600 mt-3">
            {stats.rejected}
          </p>
        </div>

        <div className="bg-white shadow rounded-xl p-6">
          <h2 className="text-lg">
            Shortlisted
          </h2>
          <p className="text-4xl font-bold text-yellow-600 mt-3">
            {stats.shortlisted}
          </p>
        </div>

      </div>

    </div>
  )
}

export default RecruiterAnalytics