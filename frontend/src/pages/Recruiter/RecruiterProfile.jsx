import React, {
  useEffect,
  useState
} from 'react'
import axios from 'axios'

const RecruiterProfile = () => {

  const [profile, setProfile] =
    useState({
      companyName: '',
      website: '',
      industry: '',
      companySize: '',
      description: '',
      companyLogo: ''
    })

  useEffect(() => {
    loadProfile()
  }, [])

  const loadProfile = async () => {
    try {

      const token =
        localStorage.getItem('token')

      const res = await axios.get(
        'http://localhost:5004/api/users/profile',
        {
          headers: {
            Authorization:
              `Bearer ${token}`
          }
        }
      )

      if (
        res.data.companyProfile
      ) {
        setProfile(
          res.data.companyProfile
        )
      }

    } catch (error) {
      console.error(error)
    }
  }

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]:
        e.target.value
    })
  }

  const saveProfile = async () => {
    try {

      const token =
        localStorage.getItem('token')

      await axios.put(
        'http://localhost:5004/api/users/profile',
        {
          companyProfile:
            profile
        },
        {
          headers: {
            Authorization:
              `Bearer ${token}`
          }
        }
      )

      alert(
        'Profile updated'
      )

    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="container mx-auto py-10 px-6">

      <h1 className="text-5xl font-bold mb-8">
        Company Profile
      </h1>

      <div className="bg-white rounded-xl shadow p-8">

        <input
          name="companyName"
          placeholder="Company Name"
          value={profile.companyName}
          onChange={handleChange}
          className="border p-3 rounded w-full mb-4"
        />

        <input
          name="website"
          placeholder="Website"
          value={profile.website}
          onChange={handleChange}
          className="border p-3 rounded w-full mb-4"
        />

        <input
          name="industry"
          placeholder="Industry"
          value={profile.industry}
          onChange={handleChange}
          className="border p-3 rounded w-full mb-4"
        />

        <input
          name="companySize"
          placeholder="Company Size"
          value={profile.companySize}
          onChange={handleChange}
          className="border p-3 rounded w-full mb-4"
        />

        <input
          name="companyLogo"
          placeholder="Logo URL"
          value={profile.companyLogo}
          onChange={handleChange}
          className="border p-3 rounded w-full mb-4"
        />

        <textarea
          name="description"
          placeholder="Company Description"
          value={profile.description}
          onChange={handleChange}
          className="border p-3 rounded w-full mb-4"
          rows="5"
        />

        <button
          onClick={saveProfile}
          className="bg-blue-600 text-white px-6 py-3 rounded"
        >
          Save Profile
        </button>

      </div>

    </div>
  )
}

export default RecruiterProfile