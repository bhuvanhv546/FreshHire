import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, FileText, TrendingUp, Map, Briefcase, DollarSign, Building, MessageSquare, BookOpen, Users, Settings } from 'lucide-react';

const Sidebar = ({ role = 'user' }) => {
  const userLinks = [
    { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/resume-analyzer', icon: FileText, label: 'Resume Analyzer' },
    { to: '/skill-gap', icon: TrendingUp, label: 'Skill Gap' },
    { to: '/career-roadmap', icon: Map, label: 'Career Roadmap' },
    { to: '/jobs', icon: Briefcase, label: 'Jobs' },
    { to: '/salary-predictor', icon: DollarSign, label: 'Salary Predictor' },
    { to: '/company-tracker', icon: Building, label: 'Company Tracker' },
    { to: '/interview-prep', icon: MessageSquare, label: 'Interview Prep' },
    { to: '/chatbot', icon: MessageSquare, label: 'AI Chatbot' },
    { to: '/learning-resources', icon: BookOpen, label: 'Learning' },
    { to: '/profile', icon: Settings, label: 'Profile' },
  ];

  const adminLinks = [
    { to: '/admin/users', icon: Users, label: 'Manage Users' },
    { to: '/admin/recruiters', icon: Users, label: 'Recruiters' },
    { to: '/admin/jobs', icon: Briefcase, label: 'Verify Jobs' },
    { to: '/admin/analytics', icon: TrendingUp, label: 'Analytics' },
  ];

  const links = role === 'admin' ? [...userLinks, ...adminLinks] : userLinks;

  return (
    <aside className="w-64 bg-white dark:bg-gray-800 shadow-lg h-full overflow-y-auto">
      <nav className="p-4 space-y-1">
        {links.map(link => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              `flex items-center space-x-3 px-3 py-2 rounded-lg transition ${
                isActive
                  ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600'
                  : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }`
            }
          >
            <link.icon size={20} />
            <span>{link.label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
