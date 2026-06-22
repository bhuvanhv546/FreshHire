import React from 'react';

const UserTable = ({ users, onDelete, onVerify }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white dark:bg-gray-800 rounded-lg">
        <thead>
          <tr className="border-b dark:border-gray-700">
            <th className="px-6 py-3 text-left">Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Verified</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {users.map(user => (
            <tr
              key={user._id}
              className="border-b dark:border-gray-700"
            >
              <td className="px-6 py-4">{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>{user.emailVerified ? 'Yes' : 'No'}</td>

              <td>
                <button
                  onClick={() => onDelete(user._id)}
                  className="text-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
