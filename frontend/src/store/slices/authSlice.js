import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import toast from 'react-hot-toast'

const API_URL = '/api/auth'

export const login = createAsyncThunk(
  'auth/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/login`, { email, password })
      localStorage.setItem('token', response.data.token)
      localStorage.setItem('refreshToken', response.data.refreshToken)
      axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`
      toast.success('Login successful!')
      return response.data
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed')
      return rejectWithValue(error.response?.data)
    }
  }
)

export const register = createAsyncThunk(
  'auth/register',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/register`, userData)
      toast.success('Registration successful! Please verify your email.')
      return response.data
    } catch (error) {
      toast.error(error.response?.data?.message || 'Registration failed')
      return rejectWithValue(error.response?.data)
    }
  }
)

export const googleLogin = createAsyncThunk(
  'auth/googleLogin',
  async (token, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/google`, { token })
      localStorage.setItem('token', response.data.token)
      localStorage.setItem('refreshToken', response.data.refreshToken)
      axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`
      toast.success('Google login successful!')
      return response.data
    } catch (error) {
      toast.error('Google login failed')
      return rejectWithValue(error.response?.data)
    }
  }
)

export const logout = createAsyncThunk('auth/logout', async () => {
  await axios.post(`${API_URL}/logout`)
  localStorage.removeItem('token')
  localStorage.removeItem('refreshToken')
  delete axios.defaults.headers.common['Authorization']
  toast.success('Logged out successfully')
})

const authSlice = createSlice({
  name: 'auth',

  initialState: {
    user: null,
    isAuthenticated: !!localStorage.getItem('token'),
    loading: false,
    error: null,
  },

  reducers: {
    clearError: (state) => {
      state.error = null
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false
        state.isAuthenticated = true
        state.user = action.payload.user
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(register.pending, (state) => {
        state.loading = true
      })
      .addCase(register.fulfilled, (state) => {
        state.loading = false
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      .addCase(googleLogin.fulfilled, (state, action) => {
        state.isAuthenticated = true
        state.user = action.payload.user
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null
        state.isAuthenticated = false
      })
  },
})

export const { clearError } = authSlice.actions
export default authSlice.reducer
