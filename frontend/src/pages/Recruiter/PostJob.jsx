import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function PostJob() {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    title: '',
    description: '',

    companyName: '',
    companyLogo: '',
    companyWebsite: '',
    industry: '',
    companySize: '',
    companyDescription: '',

    city: '',
    state: '',
    country: 'India',

    workMode: 'Remote',
    employmentType: 'Full Time',

    minSalary: '',
    maxSalary: '',

    experienceMin: '',
    experienceMax: '',

    skills: '',
    requirements: '',
    responsibilities: '',
    benefits: ''
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const token = localStorage.getItem('token')

      await axios.post(
        'https://freshhire-backend.onrender.com/api/jobs',
        {
          title: formData.title,

          description: formData.description,

          company: {
            name: formData.companyName,
            logo: formData.companyLogo,
            website: formData.companyWebsite
          },

          companyProfile: {
            companyName: formData.companyName,
            companyLogo: formData.companyLogo,
            website: formData.companyWebsite,
            industry: formData.industry,
            companySize: formData.companySize,
            description: formData.companyDescription
          },

          location: {
            city: formData.city,
            state: formData.state,
            country: formData.country
          },

          workMode: formData.workMode,

          employmentType:
            formData.employmentType,

          salary: {
            min: Number(formData.minSalary),
            max: Number(formData.maxSalary)
          },

          experienceRequired: {
            min: Number(
              formData.experienceMin
            ),
            max: Number(
              formData.experienceMax
            )
          },

          skills: formData.skills
            .split(',')
            .map((s) => s.trim()),

          requirements:
            formData.requirements
              .split('\n')
              .filter(Boolean),

          responsibilities:
            formData.responsibilities
              .split('\n')
              .filter(Boolean),

          benefits:
            formData.benefits
              .split('\n')
              .filter(Boolean)
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      alert('Job Posted Successfully')

      navigate('/recruiter/my-jobs')

    } catch (err) {
      console.error(err)
      alert('Failed to post job')
    }
  }

  return (
    <div className="max-w-5xl mx-auto p-8">

      <h1 className="text-4xl font-bold mb-8">
        Post New Job
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >

        <input
          name="title"
          placeholder="Job Title"
          className="w-full border p-3 rounded"
          onChange={handleChange}
        />

        <textarea
          name="description"
          placeholder="Job Description"
          rows="5"
          className="w-full border p-3 rounded"
          onChange={handleChange}
        />

        <h2 className="text-2xl font-bold mt-8">
          Company Information
        </h2>

        <input
          name="companyName"
          placeholder="Company Name"
          className="w-full border p-3 rounded"
          onChange={handleChange}
        />

        <input
          name="companyLogo"
          placeholder="Company Logo URL"
          className="w-full border p-3 rounded"
          onChange={handleChange}
        />

        <input
          name="companyWebsite"
          placeholder="Company Website"
          className="w-full border p-3 rounded"
          onChange={handleChange}
        />

        <input
          name="industry"
          placeholder="Industry"
          className="w-full border p-3 rounded"
          onChange={handleChange}
        />

        <input
          name="companySize"
          placeholder="Company Size"
          className="w-full border p-3 rounded"
          onChange={handleChange}
        />

        <textarea
          name="companyDescription"
          placeholder="Company Description"
          rows="4"
          className="w-full border p-3 rounded"
          onChange={handleChange}
        />

        <h2 className="text-2xl font-bold mt-8">
          Location
        </h2>

        <input
          name="city"
          placeholder="City"
          className="w-full border p-3 rounded"
          onChange={handleChange}
        />

        <input
          name="state"
          placeholder="State"
          className="w-full border p-3 rounded"
          onChange={handleChange}
        />

        <h2 className="text-2xl font-bold mt-8">
          Salary
        </h2>

        <input
          name="minSalary"
          placeholder="Minimum Salary"
          className="w-full border p-3 rounded"
          onChange={handleChange}
        />

        <input
          name="maxSalary"
          placeholder="Maximum Salary"
          className="w-full border p-3 rounded"
          onChange={handleChange}
        />

        <h2 className="text-2xl font-bold mt-8">
          Experience
        </h2>

        <input
          name="experienceMin"
          placeholder="Minimum Experience"
          className="w-full border p-3 rounded"
          onChange={handleChange}
        />

        <input
          name="experienceMax"
          placeholder="Maximum Experience"
          className="w-full border p-3 rounded"
          onChange={handleChange}
        />

        <input
          name="skills"
          placeholder="React, Node.js, MongoDB"
          className="w-full border p-3 rounded"
          onChange={handleChange}
        />

        <textarea
          name="requirements"
          placeholder="One requirement per line"
          rows="4"
          className="w-full border p-3 rounded"
          onChange={handleChange}
        />

        <textarea
          name="responsibilities"
          placeholder="One responsibility per line"
          rows="4"
          className="w-full border p-3 rounded"
          onChange={handleChange}
        />

        <textarea
          name="benefits"
          placeholder="One benefit per line"
          rows="4"
          className="w-full border p-3 rounded"
          onChange={handleChange}
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-8 py-3 rounded-lg"
        >
          Post Job
        </button>

      </form>
    </div>
  )
}