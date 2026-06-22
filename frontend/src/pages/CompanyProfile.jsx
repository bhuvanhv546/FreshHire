import React, { useEffect, useState } from 'react'
import axios from 'axios'

const CompanyProfile = () => {
  const [loading, setLoading] = useState(false)

  const [formData, setFormData] = useState({
    companyName: '',
    companyLogo: '',
    website: '',
    industry: '',
    companySize: '',
    foundedYear: '',
    city: '',
    state: '',
    country: 'India',
    linkedin: '',
    twitter: '',
    facebook: '',
    description: ''
  })

  useEffect(() => {
    fetchProfile()
  }, [])

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem('token')

      const res = await axios.get(
        'http://freshhire-backend.onrender.com/api/users/profile',
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      const company =
        res.data.companyProfile || {}

      setFormData({
        companyName:
          company.companyName || '',
        companyLogo:
          company.companyLogo || '',
        website:
          company.website || '',
        industry:
          company.industry || '',
        companySize:
          company.companySize || '',
        foundedYear:
          company.foundedYear || '',
        city:
          company.headquarters?.city || '',
        state:
          company.headquarters?.state || '',
        country:
          company.headquarters?.country ||
          'India',
        linkedin:
          company.linkedin || '',
        twitter:
          company.twitter || '',
        facebook:
          company.facebook || '',
        description:
          company.description || ''
      })
    } catch (error) {
      console.error(error)
    }
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      setLoading(true)

      const token =
        localStorage.getItem('token')

      await axios.put(
        'http://freshhire-backend.onrender.com/api/users/profile',
        {
          companyProfile: {
            companyName:
              formData.companyName,

            companyLogo:
              formData.companyLogo,

            website:
              formData.website,

            industry:
              formData.industry,

            companySize:
              formData.companySize,

            foundedYear:
              Number(
                formData.foundedYear
              ),

            headquarters: {
              city: formData.city,
              state: formData.state,
              country: formData.country
            },

            linkedin:
              formData.linkedin,

            twitter:
              formData.twitter,

            facebook:
              formData.facebook,

            description:
              formData.description
          }
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )

      alert(
        'Company Profile Saved Successfully'
      )
    } catch (error) {
      console.error(error)
      alert(
        error.response?.data?.message ||
          'Failed to save company profile'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-5xl mx-auto py-10 px-6">

      <h1 className="text-5xl font-bold mb-8">
        Company Profile
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-xl rounded-xl p-8 space-y-5"
      >

        <input
          type="text"
          name="companyName"
          placeholder="Company Name"
          value={formData.companyName}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />

        <input
          type="text"
          name="companyLogo"
          placeholder="Company Logo URL"
          value={formData.companyLogo}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />

        <input
          type="text"
          name="website"
          placeholder="Website"
          value={formData.website}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />

        <input
          type="text"
          name="industry"
          placeholder="Industry"
          value={formData.industry}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />

        <input
          type="text"
          name="companySize"
          placeholder="Company Size"
          value={formData.companySize}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />

        <input
          type="number"
          name="foundedYear"
          placeholder="Founded Year"
          value={formData.foundedYear}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />

        <input
          type="text"
          name="city"
          placeholder="Headquarters City"
          value={formData.city}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />

        <input
          type="text"
          name="state"
          placeholder="Headquarters State"
          value={formData.state}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />

        <input
          type="text"
          name="country"
          placeholder="Country"
          value={formData.country}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />

        <input
          type="text"
          name="linkedin"
          placeholder="LinkedIn URL"
          value={formData.linkedin}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />

        <input
          type="text"
          name="twitter"
          placeholder="Twitter URL"
          value={formData.twitter}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />

        <input
          type="text"
          name="facebook"
          placeholder="Facebook URL"
          value={formData.facebook}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />

        <textarea
          rows="6"
          name="description"
          placeholder="Company Description"
          value={formData.description}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg"
        >
          {loading
            ? 'Saving...'
            : 'Save Company Profile'}
        </button>

      </form>
    </div>
  )
}

export default CompanyProfile