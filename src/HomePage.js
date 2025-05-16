import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if (username.trim() === '' || password.trim() === '') {
      setError('Please enter both username and password.');
      return;
    }
    setError('');
    navigate('/warehouse');
  };

  return (
    <div className="login-container">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-xs flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-4 text-blue-700">Warehouse Login</h1>
        <form onSubmit={handleLogin} className="w-full space-y-4">
          <div>
            <label htmlFor="username" className="block text-gray-700 mb-1 text-sm">
              Username
            </label>
            <input
              id="username"
              type="text"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500 text-sm"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              autoComplete="username"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-gray-700 mb-1 text-sm">
              Password
            </label>
            <input
              id="password"
              type="password"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:border-blue-500 text-sm"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />
          </div>
          {error && <div className="text-red-500 text-xs">{error}</div>}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md font-semibold transition text-sm"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default HomePage;