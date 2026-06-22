import React, { useState } from 'react';
import axios from 'axios';

const Chatbot = () => {

  const [message, setMessage] =
    useState('');

  const [reply, setReply] =
    useState('');

  const sendMessage = async () => {

    const res =
      await axios.post(
        'https://freshhire-backend.onrender.com/api/chatbot/chat',
        { message }
      );

    setReply(res.data.reply);
  };

  return (
    <div className="container mx-auto p-8">

      <h1 className="text-3xl font-bold mb-6">
        AI Career Chatbot
      </h1>

      <input
        value={message}
        onChange={(e) =>
          setMessage(e.target.value)
        }
        className="border p-3 w-full"
        placeholder="Ask anything..."
      />

      <button
        onClick={sendMessage}
        className="bg-blue-600 text-white px-6 py-2 mt-4 rounded"
      >
        Send
      </button>

      {reply && (
        <div className="mt-6 bg-white p-4 rounded shadow">
          {reply}
        </div>
      )}

    </div>
  );
};

export default Chatbot;