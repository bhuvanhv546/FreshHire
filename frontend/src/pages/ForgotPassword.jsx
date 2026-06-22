import React, { useState } from 'react';
import axios from 'axios';
import { Mail } from 'lucide-react';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('/api/auth/forgot-password', { email });
      setMessage('Password reset link sent to your email');
    } catch (error) {
      setMessage(error.response?.data?.message || 'Error');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Forgot Password</h2>

        <form onSubmit={handleSubmit}>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-10 p-2 border rounded-lg"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full mt-4 bg-primary-600 text-white py-2 rounded-lg"
          >
            Send Reset Link
          </button>
        </form>

        {message && (
          <p className="mt-2 text-green-600">
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
