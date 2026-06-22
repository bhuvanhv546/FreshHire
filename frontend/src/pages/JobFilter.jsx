import React, { useState } from 'react';
import { Filter, X } from 'lucide-react';

const JobFilter = ({ filters, setFilters, onApply }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const clearFilters = () => {
    setFilters({
      state: '',
      city: '',
      salary: '',
      domain: '',
      workMode: '',
      employmentType: ''
    });
    onApply();
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800"
      >
        <Filter size={18} /> Filters
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-xl border dark:border-gray-700 p-4 z-20">
          <div className="flex justify-between items-center mb-3">
            <h4 className="font-semibold">Filter Jobs</h4>
            <button onClick={() => setIsOpen(false)}>
              <X size={18} />
            </button>
          </div>

          <div className="space-y-3">
            <select
              name="state"
              value={filters.state}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg dark:bg-gray-700"
            >
              <option value="">Select State</option>
              <option>Maharashtra</option>
              <option>Karnataka</option>
              <option>Delhi</option>
              <option>Tamil Nadu</option>
              <option>Telangana</option>
            </select>

            <select
              name="workMode"
              value={filters.workMode}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg dark:bg-gray-700"
            >
              <option value="">Work Mode</option>
              <option>Remote</option>
              <option>Hybrid</option>
              <option>On-site</option>
            </select>

            <select
              name="employmentType"
              value={filters.employmentType}
              onChange={handleChange}
              className="w-full p-2 border rounded-lg dark:bg-gray-700"
            >
              <option value="">Employment Type</option>
              <option>Full Time</option>
              <option>Internship</option>
              <option>Contract</option>
            </select>

            <div className="flex gap-2 pt-2">
              <button
                onClick={onApply}
                className="flex-1 bg-primary-600 text-white py-2 rounded-lg"
              >
                Apply
              </button>

              <button
                onClick={clearFilters}
                className="flex-1 border border-gray-300 py-2 rounded-lg"
              >
                Clear
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobFilter;
