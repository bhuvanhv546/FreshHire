import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Briefcase } from 'lucide-react';

const RecommendedJobs = ({ jobs }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
        Recommended for You
      </h3>

      <div className="space-y-4">
        {jobs.map((job, idx) => (
          <motion.div
            key={job._id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.05 }}
            className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition"
          >
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white">
                  {job.title}
                </h4>

                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {job.company?.name}
                </p>

                <div className="flex items-center gap-3 mt-2 text-xs text-gray-500">
                  <span className="flex items-center">
                    <MapPin size={12} className="mr-1" />
                    {job.location?.city}
                  </span>

                  <span className="flex items-center">
                    <Briefcase size={12} className="mr-1" />
                    {job.employmentType}
                  </span>
                </div>
              </div>

              <a
                href={job.applyLink}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-primary-600 text-white px-3 py-1 rounded-lg text-sm hover:bg-primary-700"
              >
                Apply
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default RecommendedJobs;
