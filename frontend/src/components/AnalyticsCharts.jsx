import React from 'react';
import { Line, Bar } from 'react-chartjs-2';

const AnalyticsCharts = ({ userGrowth, applications, placementRate }) => {
  const lineData = {
    labels: userGrowth.map(d => d.month),
    datasets: [
      {
        label: 'User Growth',
        data: userGrowth.map(d => d.count),
        borderColor: '#3b82f6',
        fill: false
      }
    ]
  };

  const barData = {
    labels: applications.map(d => d.month),
    datasets: [
      {
        label: 'Applications',
        data: applications.map(d => d.count),
        backgroundColor: '#10b981'
      }
    ]
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="bg-white p-4 rounded-lg shadow">
        <Line data={lineData} />
      </div>

      <div className="bg-white p-4 rounded-lg shadow">
        <Bar data={barData} />
      </div>

      <div className="bg-white p-4 rounded-lg shadow col-span-2">
        <h3 className="font-semibold">
          Placement Rate: {placementRate}%
        </h3>

        <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
          <div
            className="bg-primary-600 h-2 rounded-full"
            style={{ width: `${placementRate}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsCharts;
