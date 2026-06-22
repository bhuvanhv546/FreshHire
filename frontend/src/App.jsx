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
    <Router>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        <Navbar />
        <AnimatePresence mode="wait">
          <motion.main
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route path="/dashboard" element={<ProtectedRoute allowedRoles={['user','recruiter','admin']}><Dashboard /></ProtectedRoute>} />
              <Route path="/jobs" element={<Jobs />} />
              <Route path="/jobs/:id" element={<JobDetails />} />
              <Route
  path="/skill-gap"
  element={<SkillGap />}
/>
              <Route
  path="/career-roadmap"
  element={<CareerRoadmap />}
/>
              <Route path="/resume-builder" element={<ProtectedRoute allowedRoles={['user']}><ResumeBuilder /></ProtectedRoute>} />
              <Route path="/salary-predictor" element={<SalaryPredictor />} />
              <Route path="/company-tracker" element={<CompanyTracker />} />
              <Route path="/interview-prep" element={<InterviewPrep />} />
              <Route path="/chatbot" element={<Chatbot />} />
              <Route path="/learning-resources" element={<LearningResources />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/admin" element={<ProtectedRoute allowedRoles={['admin']}><AdminDashboard /></ProtectedRoute>}/>
              <Route path="/my-applications"element={<MyApplications />}/>
              <Route path="/resume-upload"element={<ResumeUpload />}/>
              <Route path="/resume-analyzer"element={<ResumeAnalyzer />}/>
              <Route path="/saved-jobs"element={<SavedJobs />}/>
              <Route path="/recruiter/dashboard"element={<RecruiterDashboard />}/>
              <Route path="/recruiter/post-job"element={<PostJob />}/>
              <Route path="/recruiter/my-jobs"element={<MyJobs />}/>
              <Route path="/recruiter/edit-job/:id"element={<EditJob />}/>
              <Route path="/recruiter/applicants/:jobId"element={<ViewApplicants />}/>
              <Route path="/resume"element={<ResumeUpload />}/>
              <Route path="/my-resume"element={<MyResume />}/>
              <Route path="/recruiter-dashboard"element={<RecruiterAnalytics />}/>
              <Route path="/recruiter/profile"element={<RecruiterProfile />}/>
              <Route path="/notifications"element={<Notifications />}/>
              <Route path="/company-profile"element={<CompanyProfile />}/>
              <Route
  path="/ats-score"
  element={<ATSScore />}/>
  <Route
  path="/analytics-dashboard"
  element={<AnalyticsDashboard />}
/>
              
            </Routes>
          </motion.main>
        </AnimatePresence>
        <Footer />
        <Toaster position="top-right" />
      </div>
    </Router>
  )
}

export default App
