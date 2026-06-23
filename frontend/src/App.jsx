import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Navbar from './components/Layout/Navbar';
import Footer from './components/Layout/Footer';

// Auth Pages
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import ForgotPassword from './pages/Auth/ForgotPassword';
import ResetPassword from './pages/Auth/ResetPassword';

// Main Pages
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Jobs from './pages/Jobs';
import JobDetails from './pages/JobDetails';
import Profile from './pages/Profile';

// AI Features
import ResumeAnalyzer from './pages/ResumeAnalyzer';
import SkillGap from './pages/SkillGap';
import CareerRoadmap from './pages/CareerRoadmap';
import ResumeBuilder from './pages/ResumeBuilder';
import SalaryPredictor from './pages/SalaryPredictor';
import CompanyTracker from './pages/CompanyTracker';
import InterviewPrep from './pages/InterviewPrep';
import Chatbot from './pages/Chatbot';
import LearningResources from './pages/LearningResources';

// Resume
import ResumeUpload from './pages/ResumeUpload';
import MyResume from './pages/MyResume';
import ATSScore from './pages/ATSScore';

// Jobs
import SavedJobs from './pages/SavedJobs';
import MyApplications from './pages/MyApplications';

// Notifications
import Notifications from './pages/Notifications';

// Recruiter
import RecruiterDashboard from './pages/Recruiter/RecruiterDashboard';
import PostJob from './pages/Recruiter/PostJob';
import MyJobs from './pages/Recruiter/MyJobs';

// Admin
import AdminDashboard from './pages/Admin/AdminDashboard';

function ProtectedRoute({ children }) {
  const auth = useSelector((state) => state.auth);

  if (!auth?.isAuthenticated && !localStorage.getItem('token')) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

function App() {
  return (
    <div className="min-h-screen bg-gray-50">

      <Navbar />

      <Routes>

        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        {/* Dashboard */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* Jobs */}
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

        {/* Resume */}
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
          path="/ats-score"
          element={
            <ProtectedRoute>
              <ATSScore />
            </ProtectedRoute>
          }
        />

        {/* AI Tools */}
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

        {/* User */}
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
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
          path="/my-applications"
          element={
            <ProtectedRoute>
              <MyApplications />
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

        {/* Recruiter */}
        <Route
          path="/recruiter/dashboard"
          element={
            <ProtectedRoute>
              <RecruiterDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/recruiter/post-job"
          element={
            <ProtectedRoute>
              <PostJob />
            </ProtectedRoute>
          }
        />

        <Route
          path="/recruiter/my-jobs"
          element={
            <ProtectedRoute>
              <MyJobs />
            </ProtectedRoute>
          }
        />

        {/* Admin */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        {/* Catch All */}
        <Route path="*" element={<Navigate to="/" replace />} />

      </Routes>

      <Footer />

    </div>
  );
}

export default App;