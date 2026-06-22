import React, {
  useEffect,
  useState
} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { fetchJobs } from '../store/slices/jobSlice'

const Jobs = () => {
  const dispatch = useDispatch()

  const {
    jobs,
    loading,
    error
  } = useSelector(
    (state) => state.jobs
  )

  const [search, setSearch] =
    useState('')

  const [location, setLocation] =
    useState('')

  const [workMode, setWorkMode] =
    useState('')

  const [
    employmentType,
    setEmploymentType
  ] = useState('')

  useEffect(() => {
    dispatch(fetchJobs())
  }, [dispatch])

  const saveJob = async (jobId) => {
    try {
      const token =
        localStorage.getItem('token')

      await axios.post(
        `http://localhost:5004/api/saved-jobs/${jobId}`,
        {},
        {
          headers: {
            Authorization:
              `Bearer ${token}`
          }
        }
      )

      alert(
        'Job saved successfully'
      )

    } catch (error) {
      console.error(error)

      if (
        error.response?.data?.message
      ) {
        alert(
          error.response.data.message
        )
      } else {
        alert(
          'Failed to save job'
        )
      }
    }
  }

  const resetFilters = () => {
    setSearch('')
    setLocation('')
    setWorkMode('')
    setEmploymentType('')
  }

  const filteredJobs =
    jobs?.filter((job) => {

      const titleMatch =
        job.title
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          ) ||
        job.skills?.some(
          (skill) =>
            skill
              .toLowerCase()
              .includes(
                search.toLowerCase()
              )
        )

      const locationMatch =
        !location ||
        job.location?.city
          ?.toLowerCase()
          .includes(
            location.toLowerCase()
          ) ||
        job.location?.state
          ?.toLowerCase()
          .includes(
            location.toLowerCase()
          )

      const workModeMatch =
        !workMode ||
        job.workMode === workMode

      const employmentMatch =
        !employmentType ||
        job.employmentType ===
          employmentType

      return (
        titleMatch &&
        locationMatch &&
        workModeMatch &&
        employmentMatch
      )
    })

  if (loading) {
    return (
      <div className="container mx-auto px-6 py-10">
        Loading Jobs...
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto px-6 py-10 text-red-600">
        Error: {error}
      </div>
    )
  }

  return (
    <div className="container mx-auto px-6 py-10">

      <h1 className="text-5xl font-bold mb-8">
        Available Jobs
      </h1>

      <div className="bg-white shadow rounded-xl p-6 mb-8">

        <div className="grid md:grid-cols-4 gap-4">

          <input
            type="text"
            placeholder="Search title or skill..."
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
            className="border p-3 rounded-lg"
          />

          <input
            type="text"
            placeholder="Location"
            value={location}
            onChange={(e) =>
              setLocation(
                e.target.value
              )
            }
            className="border p-3 rounded-lg"
          />

          <select
            value={workMode}
            onChange={(e) =>
              setWorkMode(
                e.target.value
              )
            }
            className="border p-3 rounded-lg"
          >
            <option value="">
              All Work Modes
            </option>
            <option>
              Remote
            </option>
            <option>
              Hybrid
            </option>
            <option>
              Onsite
            </option>
          </select>

          <select
            value={
              employmentType
            }
            onChange={(e) =>
              setEmploymentType(
                e.target.value
              )
            }
            className="border p-3 rounded-lg"
          >
            <option value="">
              All Types
            </option>
            <option>
              Full Time
            </option>
            <option>
              Part Time
            </option>
            <option>
              Internship
            </option>
          </select>

        </div>

        <button
          onClick={resetFilters}
          className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
        >
          Reset Filters
        </button>

      </div>

      {filteredJobs.length === 0 ? (
        <div className="bg-white p-8 rounded-xl shadow">
          No jobs found
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          {filteredJobs.map(
            (job) => (
              <div
                key={job._id}
                className="bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition"
              >
                <h2 className="text-2xl font-bold mb-3">
                  {job.title}
                </h2>

                <p className="text-gray-600 text-xl mb-4">
                  {
                    job.company
                      ?.name
                  }
                </p>

                <p className="mb-3 text-gray-700">
                  📍{' '}
                  {
                    job.location
                      ?.city
                  }
                  ,{' '}
                  {
                    job.location
                      ?.state
                  }
                </p>

                <p className="text-green-600 text-3xl font-bold mb-3">
                  ₹{' '}
                  {job.salary?.min?.toLocaleString()}
                </p>

                <p className="text-gray-500 mb-4">
                  {
                    job.workMode
                  }{' '}
                  •{' '}
                  {
                    job.employmentType
                  }
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {job.skills?.map(
                    (
                      skill,
                      index
                    ) => (
                      <span
                        key={
                          index
                        }
                        className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm"
                      >
                        {
                          skill
                        }
                      </span>
                    )
                  )}
                </div>

                <p className="text-gray-600 mb-6 line-clamp-3">
                  {
                    job.description
                  }
                </p>

                <div className="flex gap-3">

                  <Link
                    to={`/jobs/${job._id}`}
                    className="flex-1"
                  >
                    <button className="w-full bg-blue-600 text-white py-3 rounded-lg">
                      Apply Now
                    </button>
                  </Link>

                  <button
                    onClick={() =>
                      saveJob(
                        job._id
                      )
                    }
                    className="bg-yellow-500 text-white px-4 py-3 rounded-lg"
                  >
                    Save
                  </button>

                </div>

              </div>
            )
          )}

        </div>
      )}

    </div>
  )
}

export default Jobs