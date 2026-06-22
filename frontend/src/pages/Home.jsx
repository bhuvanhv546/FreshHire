import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50">

      {/* Hero Section */}
      <section className="bg-blue-600 text-white py-20">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold mb-6">
            FreshHire India
          </h1>

          <p className="text-xl mb-8">
            AI Powered Job Portal For Freshers
          </p>

          <Link
            to="/jobs"
            className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold"
          >
            Explore Jobs
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="py-16">
        <div className="container mx-auto px-6">

          <h2 className="text-3xl font-bold text-center mb-12">
            AI Features
          </h2>

          <div className="grid md:grid-cols-3 gap-6">

            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="font-bold text-xl mb-2">
                Resume Analyzer
              </h3>

              <p>
                Get ATS score and resume improvement suggestions.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="font-bold text-xl mb-2">
                Skill Gap Analysis
              </h3>

              <p>
                Identify missing skills for your dream job.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="font-bold text-xl mb-2">
                Career Roadmap
              </h3>

              <p>
                Generate personalized learning roadmaps.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-6">

          <div className="grid md:grid-cols-4 gap-6 text-center">

            <div>
              <h3 className="text-4xl font-bold text-blue-600">
                10K+
              </h3>
              <p>Jobs</p>
            </div>

            <div>
              <h3 className="text-4xl font-bold text-blue-600">
                5K+
              </h3>
              <p>Companies</p>
            </div>

            <div>
              <h3 className="text-4xl font-bold text-blue-600">
                50K+
              </h3>
              <p>Users</p>
            </div>

            <div>
              <h3 className="text-4xl font-bold text-blue-600">
                95%
              </h3>
              <p>Success Rate</p>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;