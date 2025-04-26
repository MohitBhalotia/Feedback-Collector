import React, { useState } from 'react';
import { toast } from 'react-hot-toast';

const AdminLogin = ({ onLogin }) => {
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!password.trim()) {
      setError('Password is required');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Test the password by making a request to the API
      const res = await fetch(`${API_URL}/api/feedbacks`, {
        headers: {
          Authorization: `Bearer ${password}`,
        },
      });

      if (res.status === 401) {
        setError('Incorrect admin password');
        toast.error('Authentication failed');
        return;
      }

      if (!res.ok) {
        throw new Error('Failed to authenticate');
      }

      // Password is correct
      toast.success('Logged in successfully');
      onLogin(password);
    } catch (err) {
      setError('Authentication failed. Please try again.');
      toast.error('Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className="space-y-4 animate-fade-in bg-white dark:bg-gray-800 p-6 rounded-lg border border-gray-200 dark:border-gray-700" 
      aria-label="Admin Login"
    >
      <div className="text-center mb-6">
        <svg 
          className="w-16 h-16 mx-auto text-blue-600 dark:text-blue-400" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={1.5} 
            d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" 
          />
        </svg>
        <h2 className="mt-2 text-xl font-semibold text-gray-900 dark:text-white">Admin Login</h2>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Enter your admin password to access the dashboard</p>
      </div>

      <div>
        <label htmlFor="admin-password" className="block font-medium mb-1 text-gray-700 dark:text-gray-300">
          Admin Password
        </label>
        <div className="relative">
          <input
            id="admin-password"
            type={showPassword ? "text" : "password"}
            className="w-full border rounded px-3 py-2 outline-none focus:ring focus:border-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white border-gray-200 dark:border-gray-600 pr-10"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoFocus
            required
            aria-label="Admin Password"
            placeholder="Enter admin password"
          />
          <button
            type="button"
            className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-400 hover:text-gray-700 dark:text-gray-500 dark:hover:text-white focus:outline-none"
            tabIndex={-1}
            onClick={() => setShowPassword((v) => !v)}
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? (
              <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13.875 18.825A10.05 10.05 0 0112 19c-5 0-9-4-9-7 0-1.167.417-2.25 1.125-3.188M8.25 8.25A3 3 0 0115 12m2.25 2.25a3 3 0 01-4.5-4.5M21 21L3 3"
              />
            </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0zm6 0c0 1.657-2.686 6-9 6s-9-4.343-9-6 4.343-6 9-6 9 4.343 9 6z" />
              </svg>
            )}
          </button>
        </div>
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-400 transition disabled:opacity-50"
        disabled={loading}
      >
        {loading ? (
          <span className="flex items-center justify-center">
            <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="4" fill="none" />
            </svg>
            Authenticating...
          </span>
        ) : (
          'Login as Admin'
        )}
      </button>

      <p className="text-xs text-center text-gray-500 dark:text-gray-400 mt-4">
        This area is restricted to administrators only.
        <br />
        If you're a user, please use the feedback form.
      </p>
    </form>
  );
};

export default AdminLogin;
