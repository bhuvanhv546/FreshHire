import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Briefcase, DollarSign, Calendar, Bookmark, Share2 } from 'lucide-react';
import { motion } from 'framer-motion';

const JobCard = ({ job }) => {
  const formatSalary = (min, max) => {
    if (!min && !max) return 'Not disclosed';
    if (min && max) return `₹${min.toLocaleString()} - ₹${max.toLocaleString()}`;
    if (min) return `₹${min.toLocaleString()}+`;
    return `Up to ₹${max.toLocaleString()}`;
  };

  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300"
    >
      <div className="p-6">
        <div className="flex justify-between items-start">
          <Link to={`/jobs/${job._id}`} className="flex-1">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white hover:text-primary-600">{job.title}</h3>
            <p className="text-gray-600 dark:text-gray-400 mt-1">{job.company?.name}</p>
          </Link>

          <div className="flex gap-2">
            <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition">
              <Bookmark size={18} />
            </button>
            <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition">
              <Share2 size={18} />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4 text-sm text-gray-500 dark:text-gray-400">
          <div className="flex items-center">
            <MapPin size={14} className="mr-1" />
            {job.location?.city}, {job.location?.state}
          </div>

          <div className="flex items-center">
            <Briefcase size={14} className="mr-1" />
            {job.employmentType} • {job.workMode}
          </div>

          <div className="flex items-center">
            <DollarSign size={14} className="mr-1" />
            {formatSalary(job.salary?.min, job.salary?.max)}
          </div>

          <div className="flex items-center">
            <Calendar size={14} className="mr-1" />
            {new Date(job.postedDate).toLocaleDateString()}
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {job.skills?.slice(0, 4).map((skill, idx) => (
            <span
              key={idx}
              className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 text-xs rounded-full"
            >
              {skill}
            </span>
          ))}
          {job.skills?.length > 4 && (
            <span className="text-xs text-gray-500">
              +{job.skills.length - 4}
            </span>
          )}
        </div>

        <div className="mt-5 flex justify-between items-center">
          <span className="text-xs text-gray-400">
            Posted {Math.floor((new Date() - new Date(job.postedDate)) / (1000 * 60 * 60 * 24))} days ago
          </span>

          <a
            href={job.applyLink}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-primary-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-primary-700 transition"
          >
            Apply Now
          </a>
        </div>
      </div>
    </motion.div>
  );
};

export default JobCard;
