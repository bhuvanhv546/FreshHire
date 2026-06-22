import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slices/authSlice'
import jobReducer from './slices/jobSlice'
import applicationReducer from './slices/applicationSlice'
import themeReducer from './slices/themeSlice'
import notificationReducer from './slices/notificationSlice'
import dashboardReducer from './slices/dashboardSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    jobs: jobReducer,
    applications: applicationReducer,
    theme: themeReducer,
    notifications: notificationReducer,
    dashboard: dashboardReducer,
  },
})
