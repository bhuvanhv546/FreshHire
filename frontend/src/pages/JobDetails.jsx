import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import {
  MapPin,
  Briefcase,
  Clock,
  Building
} from 'lucide-react'

const JobDetails = () => {
  const { id } = useParams()

  const [job, setJob] = useState(null)
  const [loading, setLoading] = useState(true)
  const [applying, setApplying] = useState(false)

  useEffect(() => {
    fetchJob()
  }, [id])

  const fetchJob = async () => {
    try {
      const res = await axios.get(
        `http://freshhire-backend.onrender.com/api/jobs/${id}`
      )

      setJob(res.data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleApply = async () => {
    try {
      setApplying(true)

      const token =
        localStorage.getItem('token')

      if (!token) {
        alert('Please login first')
        return
      }

      await axios.post(
        `http://freshhire-backend.onrender.com/api/applications/${id}/apply`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      alert('Application submitted successfully')

    } catch (err) {
      alert(
        err?.response?.data?.message ||
        'Failed to apply'
      )
    } finally {
      setApplying(false)
    }
  }

  const handleSaveJob = async () => {
    try {
      const token =
        localStorage.getItem('token')

      await axios.post(
        `http://freshhire-backend.onrender.com/api/saved-jobs/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      alert('Job saved successfully')

    } catch (err) {
      alert(
        err?.response?.data?.message ||
        'Failed to save job'
      )
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto p-10">
        Loading...
      </div>
    )
  }

  if (!job) {
    return (
      <div className="container mx-auto p-10">
        Job not found
      </div>
    )
  }

  return (
    <div className="container mx-auto px-6 py-10">

      <div className="bg-white rounded-2xl shadow-lg p-10">

        <div className="flex items-center gap-6 mb-8">

          {job.companyProfile?.companyLogo && (
            <img
              src={job.companyProfile.companyLogo}
              alt="logo"
              className="w-20 h-20 rounded-xl object-cover"
            />
          )}

          <div>
            <h1 className="text-5xl font-bold">
              {job.title}
            </h1>

            <h2 className="text-2xl text-gray-600 mt-2">
              {job.company?.name}
            </h2>
          </div>

        </div>

        <div className="space-y-3 mb-8">

          <div className="flex items-center gap-2">
            <MapPin size={18} />
            {job.location?.city},
            {job.location?.state}
          </div>

          <div className="flex items-center gap-2">
            <Briefcase size={18} />
            {job.workMode}
          </div>

          <div className="flex items-center gap-2">
            <Clock size={18} />
            {job.employmentType}
          </div>

          <div className="flex items-center gap-2">
            <Building size={18} />
            {job.companyProfile?.industry}
          </div>

        </div>

        <div className="text-green-600 text-4xl font-bold mb-8">
          ₹ {job.salary?.min?.toLocaleString()}
          {' - '}
          ₹ {job.salary?.max?.toLocaleString()}
        </div>

        <div className="flex gap-4 mb-10">

          <button
            onClick={handleApply}
            disabled={applying}
            className="bg-green-600 text-white px-8 py-4 rounded-lg"
          >
            {applying
              ? 'Applying...'
              : 'Apply Now'}
          </button>

          <button
            onClick={handleSaveJob}
            className="bg-blue-600 text-white px-8 py-4 rounded-lg"
          >
            Save Job
          </button>

        </div>

        <h3 className="text-3xl font-bold mb-4">
          Job Description
        </h3>

        <p className="mb-8 text-gray-700">
          {job.description}
        </p>

        <h3 className="text-3xl font-bold mb-4">
          Skills Required
        </h3>

        <div className="flex flex-wrap gap-2 mb-10">
          {job.skills?.map((skill, index) => (
            <span
              key={index}
              className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full"
            >
              {skill}
            </span>
          ))}
        </div>

        <h3 className="text-3xl font-bold mb-4">
          Requirements
        </h3>

        <ul className="list-disc ml-6 mb-8">
          {job.requirements?.map(
            (item, index) => (
              <li key={index}>{item}</li>
            )
          )}
        </ul>

        <h3 className="text-3xl font-bold mb-4">
          Responsibilities
        </h3>

        <ul className="list-disc ml-6 mb-8">
          {job.responsibilities?.map(
            (item, index) => (
              <li key={index}>{item}</li>
            )
          )}
        </ul>

        <h3 className="text-3xl font-bold mb-4">
          Benefits
        </h3>

        <ul className="list-disc ml-6 mb-8">
          {job.benefits?.map(
            (item, index) => (
              <li key={index}>{item}</li>
            )
          )}
        </ul>

        <h3 className="text-3xl font-bold mb-4">
          Company Information
        </h3>

        <div className="bg-gray-50 p-6 rounded-xl">

          <p>
            <strong>Company:</strong>{' '}
            {job.companyProfile?.companyName}
          </p>

          <p>
            <strong>Industry:</strong>{' '}
            {job.companyProfile?.industry}
          </p>

          <p>
            <strong>Company Size:</strong>{' '}
            {job.companyProfile?.companySize}
          </p>

          <p className="mt-4">
            {job.companyProfile?.description}
          </p>

          {job.companyProfile?.website && (
            <a
              href={job.companyProfile.website}
              target="_blank"
              rel="noreferrer"
              className="text-blue-600 underline block mt-4"
            >
              Visit Company Website
            </a>
          )}

        </div>

      </div>

    </div>
  )
}

export default JobDetails