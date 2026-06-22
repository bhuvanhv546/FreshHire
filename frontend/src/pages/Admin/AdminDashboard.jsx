import React, { useEffect, useState } from 'react'
import axios from 'axios'

const AdminDashboard = () => {

  const [stats, setStats] = useState({
    totalUsers: 0,
    totalRecruiters: 0,
    totalJobs: 0,
    totalApplications: 0
  })

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {

      const token =
        localStorage.getItem('token')

      const res = await axios.get(
        'http://freshhire-backend.onrender.com/api/admin/dashboard',
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      setStats(res.data)

    } catch (error) {
      console.error(error)
      alert('Failed to load admin dashboard')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto px-6 py-10">
        Loading Admin Dashboard...
      </div>
    )
  }

  return (
    <div className="container mx-auto px-6 py-10 min-h-screen">

      <h1 className="text-5xl font-bold mb-10">
        Admin Dashboard
      </h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-lg text-gray-600">
            Total Users
          </h2>

          <p className="text-5xl font-bold text-blue-600 mt-3">
            {stats.totalUsers}
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-lg text-gray-600">
            Recruiters
          </h2>

          <p className="text-5xl font-bold text-green-600 mt-3">
            {stats.totalRecruiters}
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-lg text-gray-600">
            Jobs Posted
          </h2>

          <p className="text-5xl font-bold text-purple-600 mt-3">
            {stats.totalJobs}
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-lg text-gray-600">
            Applications
          </h2>

          <p className="text-5xl font-bold text-red-600 mt-3">
            {stats.totalApplications}
          </p>
        </div>

      </div>

      <div className="mt-10 bg-white rounded-xl shadow-md p-6">

        <h2 className="text-2xl font-bold mb-4">
          System Overview
        </h2>

        <div className="space-y-3 text-lg">

          <p>
            👤 Users:
            <span className="font-bold ml-2">
              {stats.totalUsers}
            </span>
          </p>

          <p>
            🏢 Recruiters:
            <span className="font-bold ml-2">
              {stats.totalRecruiters}
            </span>
          </p>

          <p>
            💼 Jobs:
            <span className="font-bold ml-2">
              {stats.totalJobs}
            </span>
          </p>

          <p>
            📄 Applications:
            <span className="font-bold ml-2">
              {stats.totalApplications}
            </span>
          </p>

        </div>

      </div>

    </div>
  )
}

export default AdminDashboard