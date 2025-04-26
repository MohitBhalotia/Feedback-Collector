import React, { useState, useEffect } from 'react';
import { Toaster, toast } from 'react-hot-toast';

// Components
import Header from './components/Header';
import Footer from './components/Footer';
import FeedbackForm from './components/FeedbackForm';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';

// Theme helper
const getInitialTheme = () => {
  if (typeof window !== 'undefined' && window.localStorage) {
    const stored = window.localStorage.getItem('theme');
    if (stored) return stored;
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) return 'dark';
  }
  return 'light';
};

function App() {
  // State
  const [theme, setTheme] = useState(getInitialTheme());
  const [isAdmin, setIsAdmin] = useState(false);
  const [showAdminPrompt, setShowAdminPrompt] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  
  // Apply theme
  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    window.localStorage.setItem('theme', theme);
  }, [theme]);

  // Toggle theme
  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  // Toggle admin mode
  const toggleAdmin = () => {
    if (!isAdmin && !showAdminPrompt) {
      setShowAdminPrompt(true);
    } else {
      setIsAdmin(false);
      setShowAdminPrompt(false);
      setAdminPassword('');
    }
  };

  // Handle admin login
  const handleAdminLogin = (password) => {
    setAdminPassword(password);
    setShowAdminPrompt(false);
    setIsAdmin(true);
    toast.success('Welcome to Admin Dashboard');
  };

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-300 ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      {/* Toast notifications */}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: theme === 'dark' ? '#374151' : '#ffffff',
            color: theme === 'dark' ? '#ffffff' : '#1f2937',
          },
        }}
      />
      
      {/* Header */}
      <Header 
        theme={theme} 
        toggleTheme={toggleTheme} 
        isAdmin={isAdmin || showAdminPrompt} 
        toggleAdmin={toggleAdmin} 
      />
      
      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center py-8 px-4 sm:px-6 lg:px-8">
        <div className={`w-full max-w-4xl rounded-xl shadow-lg p-6 sm:p-8 transition-all duration-500 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}>
          {/* Conditional rendering based on state */}
          {showAdminPrompt ? (
            <AdminLogin onLogin={handleAdminLogin} />
          ) : isAdmin ? (
            <AdminDashboard adminPassword={adminPassword} />
          ) : (
            <div>
              <h1 className="text-2xl font-bold mb-6 text-center text-gray-900 dark:text-white">Share Your Feedback</h1>
              <FeedbackForm onSubmitSuccess={() => {}} />
            </div>
          )}
        </div>
      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
