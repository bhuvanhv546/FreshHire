import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  BarChart,
  Bar
} from 'recharts';

const applicationData = [
  { month: 'Jan', applications: 5 },
  { month: 'Feb', applications: 12 },
  { month: 'Mar', applications: 18 },
  { month: 'Apr', applications: 25 },
  { month: 'May', applications: 30 }
];

const atsData = [
  { month: 'Jan', score: 55 },
  { month: 'Feb', score: 62 },
  { month: 'Mar', score: 70 },
  { month: 'Apr', score: 80 },
  { month: 'May', score: 88 }
];

const AnalyticsDashboard = () => {
  return (
    <div className="container mx-auto px-4 py-8">

      <h1 className="text-3xl font-bold mb-6">
        Analytics Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">

        <div className="bg-blue-100 p-6 rounded-xl">
          <h2>Total Applications</h2>
          <p className="text-3xl font-bold">30</p>
        </div>

        <div className="bg-green-100 p-6 rounded-xl">
          <h2>Saved Jobs</h2>
          <p className="text-3xl font-bold">12</p>
        </div>

        <div className="bg-yellow-100 p-6 rounded-xl">
          <h2>ATS Score</h2>
          <p className="text-3xl font-bold">88</p>
        </div>

        <div className="bg-purple-100 p-6 rounded-xl">
          <h2>Interview Readiness</h2>
          <p className="text-3xl font-bold">90%</p>
        </div>

      </div>

      <div className="bg-white p-6 rounded-xl shadow mb-8">
        <h2 className="font-bold mb-4">
          Applications Trend
        </h2>

        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={applicationData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="applications"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="font-bold mb-4">
          ATS Score Progress
        </h2>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={atsData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="score" />
          </BarChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
};

export default AnalyticsDashboard;