import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const RecruiterDashboard = () => {

  const [stats, setStats] = useState({
    totalJobs: 0,
    totalApplications: 0,
    selected: 0,
    shortlisted: 0,
    rejected: 0
  })

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadDashboard()
  }, [])

  const loadDashboard = async () => {
    try {

      const token =
        localStorage.getItem('token')

      const res = await axios.get(
        'http://localhost:5004/api/recruiter-analytics/dashboard',
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      setStats(res.data)

    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto px-6 py-10">
        <h1 className="text-4xl font-bold">
          Loading Dashboard...
        </h1>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-6 py-10">

      {/* Header */}
      <div className="flex flex-wrap justify-between items-center mb-10">

        <h1 className="text-5xl font-bold">
          Recruiter Dashboard
        </h1>

        <div className="flex gap-4 mt-4 md:mt-0">

          <Link
            to="/recruiter/post-job"
            className="bg-blue-600 text-white px-5 py-3 rounded-lg hover:bg-blue-700"
          >
            Post New Job
          </Link>

          <Link
            to="/recruiter/my-jobs"
            className="bg-indigo-600 text-white px-5 py-3 rounded-lg hover:bg-indigo-700"
          >
            Manage Jobs
          </Link>

        </div>

      </div>

      {/* Statistics Cards */}
      <div className="grid md:grid-cols-5 gap-6 mb-10">

        <div className="bg-white shadow-lg rounded-xl p-6">
          <h2 className="text-gray-500 text-lg">
            Total Jobs
          </h2>

          <p className="text-4xl font-bold text-blue-600 mt-2">
            {stats.totalJobs}
          </p>
        </div>

        <div className="bg-white shadow-lg rounded-xl p-6">
          <h2 className="text-gray-500 text-lg">
            Applications
          </h2>

          <p className="text-4xl font-bold text-purple-600 mt-2">
            {stats.totalApplications}
          </p>
        </div>

        <div className="bg-white shadow-lg rounded-xl p-6">
          <h2 className="text-gray-500 text-lg">
            Selected
          </h2>

          <p className="text-4xl font-bold text-green-600 mt-2">
            {stats.selected}
          </p>
        </div>

        <div className="bg-white shadow-lg rounded-xl p-6">
          <h2 className="text-gray-500 text-lg">
            Shortlisted
          </h2>

          <p className="text-4xl font-bold text-yellow-500 mt-2">
            {stats.shortlisted}
          </p>
        </div>

        <div className="bg-white shadow-lg rounded-xl p-6">
          <h2 className="text-gray-500 text-lg">
            Rejected
          </h2>

          <p className="text-4xl font-bold text-red-600 mt-2">
            {stats.rejected}
          </p>
        </div>

      </div>

      {/* Quick Actions */}
      <div className="bg-white shadow-lg rounded-xl p-8">

        <h2 className="text-3xl font-bold mb-6">
          Quick Actions
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">

          <Link
            to="/recruiter/post-job"
            className="bg-blue-100 text-blue-700 p-5 rounded-lg font-semibold hover:bg-blue-200"
          >
            Post New Job
          </Link>

          <Link
            to="/recruiter/my-jobs"
            className="bg-indigo-100 text-indigo-700 p-5 rounded-lg font-semibold hover:bg-indigo-200"
          >
            Manage Jobs
          </Link>

          <Link
            to="/jobs"
            className="bg-green-100 text-green-700 p-5 rounded-lg font-semibold hover:bg-green-200"
          >
            View All Jobs
          </Link>

          <Link
            to="/saved-jobs"
            className="bg-yellow-100 text-yellow-700 p-5 rounded-lg font-semibold hover:bg-yellow-200"
          >
            Saved Jobs
          </Link>

          <Link
            to="/company-profile"
            className="bg-green-100 text-green-700 p-4 rounded-lg"
          >
            Company Profile
         </Link>

        </div>

      </div>

    </div>
  )
}

export default RecruiterDashboard