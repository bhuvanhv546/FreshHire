import React, { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Toaster } from 'react-hot-toast'
import { motion, AnimatePresence } from 'framer-motion'

import Navbar from './components/Layout/Navbar'
import Footer from './components/Layout/Footer'

import Home from './pages/Home'
import Login from './pages/Auth/Login'
import Register from './pages/Auth/Register'
import ForgotPassword from './pages/Auth/ForgotPassword'
import ResetPassword from './pages/Auth/ResetPassword'
import Dashboard from './pages/Dashboard'
import Jobs from './pages/Jobs'
import JobDetails from './pages/JobDetails'
import ResumeAnalyzer from './pages/ResumeAnalyzer'
import SkillGap from './pages/SkillGap'
import CareerRoadmap from './pages/CareerRoadmap'
import ResumeBuilder from './pages/ResumeBuilder'
import SalaryPredictor from './pages/SalaryPredictor'
import CompanyTracker from './pages/CompanyTracker'
import InterviewPrep from './pages/InterviewPrep'
import Chatbot from './pages/Chatbot'
import LearningResources from './pages/LearningResources'
import AdminDashboard from './pages/Admin/AdminDashboard'
import Profile from './pages/Profile'
import MyApplications from './pages/MyApplications'
import ResumeUpload from './pages/ResumeUpload'
import SavedJobs from './pages/SavedJobs';
import RecruiterDashboard from './pages/Recruiter/RecruiterDashboard'
import PostJob from './pages/Recruiter/PostJob'
import MyJobs from './pages/Recruiter/MyJobs'
import EditJob from './pages/Recruiter/EditJob'
import ViewApplicants from './pages/Recruiter/ViewApplicants'
import MyResume from './pages/MyResume'
import RecruiterAnalytics from './pages/RecruiterAnalytics'
import RecruiterProfile from './pages/Recruiter/RecruiterProfile'
import Notifications from './pages/Notifications';
import CompanyProfile from './pages/CompanyProfile';
import ATSScore from './pages/ATSScore';
import AnalyticsDashboard from './pages/AnalyticsDashboard';



const ProtectedRoute = ({ children, allowedRoles }) => {
  const { isAuthenticated, user } = useSelector(state => state.auth)

  if (!isAuthenticated) return <Navigate to="/login" />
  if (allowedRoles && !allowedRoles.includes(user?.role)) {
    return <Navigate to="/dashboard" />
  }

  return children
}

function App() {
  const { darkMode } = useSelector(state => state.theme)

  useEffect(() => {
    if (darkMode) document.documentElement.classList.add('dark')
    else document.documentElement.classList.remove('dark')
  }, [darkMode])

  return (
   
    
 <Routes>

  {/* Public Routes */}
  <Route
    path="/"
    element={
      localStorage.getItem("token")
        ? <Navigate to="/dashboard" />
        : <Navigate to="/login" />
    }
  />

  <Route path="/login" element={<Login />} />
  <Route path="/register" element={<Register />} />
  <Route path="/forgot-password" element={<ForgotPassword />} />
  <Route path="/reset-password" element={<ResetPassword />} />

  {/* Protected Routes */}

  <Route
    path="/dashboard"
    element={
      <ProtectedRoute allowedRoles={['user', 'recruiter', 'admin']}>
        <Dashboard />
      </ProtectedRoute>
    }
  />

  <Route
    path="/jobs"
    element={
      <ProtectedRoute>
        <Jobs />
      </ProtectedRoute>
    }
  />

  <Route
    path="/jobs/:id"
    element={
      <ProtectedRoute>
        <JobDetails />
      </ProtectedRoute>
    }
  />

  <Route
    path="/resume-analyzer"
    element={
      <ProtectedRoute>
        <ResumeAnalyzer />
      </ProtectedRoute>
    }
  />

  <Route
    path="/skill-gap"
    element={
      <ProtectedRoute>
        <SkillGap />
      </ProtectedRoute>
    }
  />

  <Route
    path="/career-roadmap"
    element={
      <ProtectedRoute>
        <CareerRoadmap />
      </ProtectedRoute>
    }
  />

  <Route
    path="/resume-builder"
    element={
      <ProtectedRoute>
        <ResumeBuilder />
      </ProtectedRoute>
    }
  />

  <Route
    path="/salary-predictor"
    element={
      <ProtectedRoute>
        <SalaryPredictor />
      </ProtectedRoute>
    }
  />

  <Route
    path="/company-tracker"
    element={
      <ProtectedRoute>
        <CompanyTracker />
      </ProtectedRoute>
    }
  />

  <Route
    path="/interview-prep"
    element={
      <ProtectedRoute>
        <InterviewPrep />
      </ProtectedRoute>
    }
  />

  <Route
    path="/chatbot"
    element={
      <ProtectedRoute>
        <Chatbot />
      </ProtectedRoute>
    }
  />

  <Route
    path="/learning-resources"
    element={
      <ProtectedRoute>
        <LearningResources />
      </ProtectedRoute>
    }
  />

  <Route
    path="/profile"
    element={
      <ProtectedRoute>
        <Profile />
      </ProtectedRoute>
    }
  />

  <Route
    path="/my-applications"
    element={
      <ProtectedRoute>
        <MyApplications />
      </ProtectedRoute>
    }
  />

  <Route
    path="/resume-upload"
    element={
      <ProtectedRoute>
        <ResumeUpload />
      </ProtectedRoute>
    }
  />

  <Route
    path="/resume"
    element={
      <ProtectedRoute>
        <ResumeUpload />
      </ProtectedRoute>
    }
  />

  <Route
    path="/my-resume"
    element={
      <ProtectedRoute>
        <MyResume />
      </ProtectedRoute>
    }
  />

  <Route
    path="/saved-jobs"
    element={
      <ProtectedRoute>
        <SavedJobs />
      </ProtectedRoute>
    }
  />

  <Route
    path="/notifications"
    element={
      <ProtectedRoute>
        <Notifications />
      </ProtectedRoute>
    }
  />

  <Route
    path="/company-profile"
    element={
      <ProtectedRoute>
        <CompanyProfile />
      </ProtectedRoute>
    }
  />

  <Route
    path="/ats-score"
    element={
      <ProtectedRoute>
        <ATSScore />
      </ProtectedRoute>
    }
  />

  <Route
    path="/analytics-dashboard"
    element={
      <ProtectedRoute>
        <AnalyticsDashboard />
      </ProtectedRoute>
    }
  />

  {/* Recruiter Routes */}

  <Route
    path="/recruiter/dashboard"
    element={
      <ProtectedRoute allowedRoles={['recruiter', 'admin']}>
        <RecruiterDashboard />
      </ProtectedRoute>
    }
  />

  <Route
    path="/recruiter/post-job"
    element={
      <ProtectedRoute allowedRoles={['recruiter', 'admin']}>
        <PostJob />
      </ProtectedRoute>
    }
  />

  <Route
    path="/recruiter/my-jobs"
    element={
      <ProtectedRoute allowedRoles={['recruiter', 'admin']}>
        <MyJobs />
      </ProtectedRoute>
    }
  />

  <Route
    path="/recruiter/edit-job/:id"
    element={
      <ProtectedRoute allowedRoles={['recruiter', 'admin']}>
        <EditJob />
      </ProtectedRoute>
    }
  />

  <Route
    path="/recruiter/applicants/:jobId"
    element={
      <ProtectedRoute allowedRoles={['recruiter', 'admin']}>
        <ViewApplicants />
      </ProtectedRoute>
    }
  />

  <Route
    path="/recruiter-dashboard"
    element={
      <ProtectedRoute allowedRoles={['recruiter', 'admin']}>
        <RecruiterAnalytics />
      </ProtectedRoute>
    }
  />

  <Route
    path="/recruiter/profile"
    element={
      <ProtectedRoute allowedRoles={['recruiter', 'admin']}>
        <RecruiterProfile />
      </ProtectedRoute>
    }
  />

  {/* Admin */}

  <Route
    path="/admin"
    element={
      <ProtectedRoute allowedRoles={['admin']}>
        <AdminDashboard />
      </ProtectedRoute>
    }
  />

  {/* Catch All */}

  <Route
    path="*"
    element={
      localStorage.getItem("token")
        ? <Navigate to="/dashboard" />
        : <Navigate to="/login" />
    }
  />

</Routes>
  )
}

export default App
