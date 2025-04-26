import React from 'react';

const Header = ({ theme, toggleTheme, isAdmin, toggleAdmin }) => {
  return (
    <header className="bg-gray-50 dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo and Title */}
          <div className="flex items-center">
            <svg 
              className="h-8 w-8 text-blue-600 dark:text-blue-400" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" 
              />
            </svg>
            <h1 className="ml-2 text-xl font-bold text-gray-900 dark:text-white">Feedback Collector</h1>
          </div>
          
          {/* Controls */}
          <div className="flex items-center space-x-4">
            {/* Admin Toggle */}
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <span className="text-sm font-medium text-gray-800 dark:text-gray-300">Admin</span>
              <input
                type="checkbox"
                className="sr-only peer"
                checked={isAdmin}
                onChange={toggleAdmin}
                aria-checked={isAdmin}
                aria-label="Toggle admin mode"
              />
              <div className="w-10 h-5 bg-gray-300 dark:bg-gray-600 rounded-full peer-focus:ring-2 peer-focus:ring-blue-400 relative transition-colors duration-300">
                <div className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full transition-transform duration-300 shadow ${isAdmin ? 'translate-x-5 bg-blue-600 dark:bg-blue-500' : 'bg-white dark:bg-gray-200'}`}></div>
              </div>
            </label>
            
            {/* Theme Toggle */}
            <button
              aria-label="Toggle dark/light mode"
              className="p-2 rounded-full focus:outline-none focus:ring focus:ring-blue-400 transition hover:bg-gray-100 dark:hover:bg-gray-700"
              onClick={toggleTheme}
              title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            >
              {theme === "dark" ? (
                <svg className="h-5 w-5 text-gray-400 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m8.66-13.66l-.71.71M4.05 19.07l-.71.71M21 12h-1M4 12H3m16.66 6.66l-.71-.71M4.05 4.93l-.71-.71M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg className="h-5 w-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
