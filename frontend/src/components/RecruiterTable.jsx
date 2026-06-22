import React from 'react';

const RecruiterTable = ({ recruiters, onVerify, onBlock }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white dark:bg-gray-800 rounded-lg">
        <thead>
          <tr>
            <th>Company</th>
            <th>Email</th>
            <th>Jobs Posted</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {recruiters.map(rec => (
            <tr key={rec._id}>
              <td className="px-6 py-4">{rec.companyName}</td>
              <td>{rec.email}</td>
              <td>{rec.jobsPosted}</td>
              <td>{rec.verified ? 'Verified' : 'Pending'}</td>

              <td>
                <button
                  onClick={() => onVerify(rec._id)}
                  className="text-green-600 mr-2"
                >
                  Verify
                </button>

                <button
                  onClick={() => onBlock(rec._id)}
                  className="text-red-600"
                >
                  Block
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RecruiterTable;
