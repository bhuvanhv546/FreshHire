import React,
{
  useEffect,
  useState
}
from 'react';

import axios from 'axios';

export default function Notifications() {

  const [notifications,
    setNotifications] =
    useState([]);

  useEffect(() => {
    loadNotifications();
  }, []);

  const loadNotifications =
  async () => {

    try {

      const token =
        localStorage.getItem('token');

      const res =
        await axios.get(
          'http://localhost:5004/api/notifications',
          {
            headers: {
              Authorization:
                `Bearer ${token}`
            }
          }
        );

      setNotifications(res.data);

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container mx-auto px-6 py-10">

      <h1 className="text-5xl font-bold mb-10">
        Notifications
      </h1>

      <div className="space-y-4">

        {notifications.map(n => (

          <div
            key={n._id}
            className="bg-white p-5 rounded-xl shadow"
          >
            <h3 className="font-bold text-lg">
              {n.title}
            </h3>

            <p className="mt-2">
              {n.message}
            </p>

            <p className="text-sm text-gray-500 mt-3">
              {
                new Date(
                  n.createdAt
                ).toLocaleString()
              }
            </p>

          </div>

        ))}

      </div>

    </div>
  );
}