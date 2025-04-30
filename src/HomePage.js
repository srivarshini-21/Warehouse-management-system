import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">Select Application</h1>
        <div className="space-y-4">
          <button
            onClick={() => navigate('/warehouse')}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg transition"
          >
            Warehouse Management System
          </button>
          <button
            onClick={() => navigate('/logistics')}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg transition"
          >
            Logistics Tracking System
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;