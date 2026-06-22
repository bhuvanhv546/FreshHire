import { useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md w-full">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">

        <Link
          to="/"
          className="text-xl md:text-2xl font-bold text-blue-600"
        >
          FreshHire India
        </Link>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          <Link to="/">Home</Link>
          <Link to="/jobs">Jobs</Link>
          <Link to="/resume-analyzer">Resume Analyzer</Link>
          <Link to="/career-roadmap">Roadmap</Link>
          <Link to="/login">Login</Link>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden flex flex-col px-4 pb-4 gap-3 bg-white border-t">
          <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link to="/jobs" onClick={() => setMenuOpen(false)}>Jobs</Link>
          <Link to="/resume-analyzer" onClick={() => setMenuOpen(false)}>Resume Analyzer</Link>
          <Link to="/career-roadmap" onClick={() => setMenuOpen(false)}>Roadmap</Link>
          <Link to="/login" onClick={() => setMenuOpen(false)}>Login</Link>
          <Link to="/resume" onClick={() => setMenuOpen(false)}>Resume</Link>
          <Link to="/saved-jobs" onClick={() => setMenuOpen(false)}>Saved Jobs</Link>
          <Link to="/my-resume" onClick={() => setMenuOpen(false)}>My Resume</Link>
          <Link to="/notifications" onClick={() => setMenuOpen(false)}>Notifications</Link>
          <Link to="/salary-predictor" onClick={() => setMenuOpen(false)}>Salary Predictor</Link>
          <Link to="/ats-score" onClick={() => setMenuOpen(false)}>ATS Score</Link>
          <Link to="/analytics-dashboard" onClick={() => setMenuOpen(false)}>Analytics</Link>
        </div>
      )}
    </nav>
  );
}