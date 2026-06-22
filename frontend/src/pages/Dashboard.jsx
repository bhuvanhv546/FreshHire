import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Dashboard = () => {
  const [stats, setStats] = useState({
    applications: 0,
    pending: 0,
    shortlisted: 0,
    rejected: 0
  })

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem('token')

      const res = await axios.get(
        'https://freshhire-backend.onrender.com/api/applications/my-applications',
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      const applications = res.data

      setStats({
        applications: applications.length,
        pending: applications.filter(
          a => a.status === 'Pending'
        ).length,
        shortlisted: applications.filter(
          a => a.status === 'Shortlisted'
        ).length,
        rejected: applications.filter(
          a => a.status === 'Rejected'
        ).length
      })
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="container mx-auto py-10 px-6">
      <h1 className="text-4xl font-bold mb-8">
        Dashboard
      </h1>

      <div className="grid md:grid-cols-4 gap-6">

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold">
            Applications
          </h2>
          <p className="text-4xl font-bold text-blue-600">
            {stats.applications}
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold">
            Pending
          </h2>
          <p className="text-4xl font-bold text-yellow-500">
            {stats.pending}
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold">
            Shortlisted
          </h2>
          <p className="text-4xl font-bold text-green-600">
            {stats.shortlisted}
          </p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-semibold">
            Rejected
          </h2>
          <p className="text-4xl font-bold text-red-600">
            {stats.rejected}
          </p>
        </div>

      </div>
    </div>
  )
}

export default Dashboard