import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">

        <Link
          to="/"
          className="text-2xl font-bold text-blue-600"
        >
          FreshHire India
        </Link>

        <div className="hidden md:flex items-center gap-6">
          <Link to="/">Home</Link>
          <Link to="/jobs">Jobs</Link>
          <Link to="/resume-analyzer">Resume Analyzer</Link>
          <Link to="/career-roadmap">Roadmap</Link>
          <Link to="/login">Login</Link>
          <Link to="/resume">Resume</Link>
          <Link to="/saved-jobs">Saved Jobs</Link>
          <Link to="/my-resume">My Resume</Link>
          <Link to="/notifications">Notifications</Link>
          <Link to="/salary-predictor">Salary Predictor</Link>
          <Link to="/ats-score">ATS Score</Link>
          <Link to="/analytics-dashboard">Analytics</Link>
        </div>

      </div>
    </nav>
  );
}