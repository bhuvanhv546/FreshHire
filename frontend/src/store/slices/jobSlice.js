import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'

export const fetchJobs = createAsyncThunk(
  'jobs/fetchJobs',
  async () => {
    const response = await axios.get(
  'https://freshhire-backend.onrender.com/api/jobs'
)
    return response.data
  }
)

const initialState = {
  jobs: [],
  filteredJobs: [],
  loading: false,
  error: null
}

const jobSlice = createSlice({
  name: 'jobs',
  initialState,

  reducers: {
    searchJobs: (state, action) => {
      const search = action.payload.toLowerCase()

      state.filteredJobs = state.jobs.filter((job) =>
        job.title.toLowerCase().includes(search)
      )
    },

    filterJobs: (state, action) => {
      const category = action.payload

      state.filteredJobs =
        category === 'all'
          ? state.jobs
          : state.jobs.filter(
              (job) => job.category === category
            )
    }
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchJobs.pending, (state) => {
        state.loading = true
        state.error = null
      })

      .addCase(fetchJobs.fulfilled, (state, action) => {
        state.loading = false
        state.jobs = action.payload
        state.filteredJobs = action.payload
      })

      .addCase(fetchJobs.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
  }
})

export const {
  searchJobs,
  filterJobs
} = jobSlice.actions

export default jobSlice.reducer