import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function EditJob() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [formData, setFormData] =
    useState({
      title: '',
      description: ''
    })

  useEffect(() => {
    loadJob()
  }, [])

  const loadJob = async () => {
    const res = await axios.get(
      `http://freshhire-backend.onrender.com/api/jobs/${id}`
    )

    setFormData({
      title: res.data.title,
      description:
        res.data.description
    })
  }

  const handleSubmit = async e => {
    e.preventDefault()

    try {
      const token =
        localStorage.getItem('token')

      await axios.put(
        `http://freshhire-backend.onrender.com/api/jobs/${id}`,
        formData,
        {
          headers: {
            Authorization:
              `Bearer ${token}`
          }
        }
      )

      alert('Job Updated')
      navigate('/recruiter/my-jobs')

    } catch (err) {
      console.error(err)
      alert('Update failed')
    }
  }

  return (
    <div className="max-w-3xl mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8">
        Edit Job
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >
        <input
          value={formData.title}
          onChange={e =>
            setFormData({
              ...formData,
              title: e.target.value
            })
          }
          className="w-full border p-3 rounded"
        />

        <textarea
          value={formData.description}
          onChange={e =>
            setFormData({
              ...formData,
              description:
                e.target.value
            })
          }
          rows="5"
          className="w-full border p-3 rounded"
        />

        <button
          className="bg-blue-600 text-white px-6 py-3 rounded"
        >
          Update Job
        </button>
      </form>
    </div>
  )
}