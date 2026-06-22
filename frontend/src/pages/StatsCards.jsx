import React from 'react';
import { motion } from 'framer-motion';

const StatsCards = ({ stats }) => {
  const cards = [
    { title: 'Jobs Available', value: stats.jobsAvailable, color: 'from-blue-500 to-blue-600' },
    { title: 'Companies Hiring', value: stats.companiesHiring, color: 'from-green-500 to-green-600' },
    { title: 'Applications Submitted', value: stats.applicationsSubmitted, color: 'from-purple-500 to-purple-600' },
    { title: 'Interviews Scheduled', value: stats.interviewsScheduled, color: 'from-orange-500 to-orange-600' },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((card, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.1 }}
          className={`bg-gradient-to-r ${card.color} rounded-xl shadow-lg p-6 text-white`}
        >
          <p className="text-sm opacity-90">{card.title}</p>
          <p className="text-3xl font-bold mt-2">{card.value}</p>
        </motion.div>
      ))}
    </div>
  );
};

export default StatsCards;
