import React, { useMemo } from 'react';

const DashboardStats = ({ feedbacks }) => {
  // Calculate stats from feedbacks
  const stats = useMemo(() => {
    if (!feedbacks || feedbacks.length === 0) {
      return {
        total: 0,
        categories: {},
        today: 0,
        lastWeek: 0
      };
    }

    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
    const lastWeek = today - 7 * 24 * 60 * 60 * 1000;

    const categories = {};
    let todayCount = 0;
    let lastWeekCount = 0;

    feedbacks.forEach(feedback => {
      // Count by category
      const category = feedback.category || 'general';
      categories[category] = (categories[category] || 0) + 1;

      // Count by time period
      const date = new Date(feedback.createdAt).getTime();
      if (date >= today) {
        todayCount++;
      }
      if (date >= lastWeek) {
        lastWeekCount++;
      }
    });

    return {
      total: feedbacks.length,
      categories,
      today: todayCount,
      lastWeek: lastWeekCount
    };
  }, [feedbacks]);

  // Get category label
  const getCategoryLabel = (category) => {
    switch (category) {
      case 'bug':
        return 'Bug Reports';
      case 'feature':
        return 'Feature Requests';
      case 'praise':
        return 'Praise';
      default:
        return 'General Feedback';
    }
  };

  // Get category color
  const getCategoryColor = (category) => {
    switch (category) {
      case 'bug':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      case 'feature':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      case 'praise':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      default:
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
      <h2 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Dashboard Overview</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Total Feedback */}
        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-100 dark:border-blue-900/50">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-blue-600 dark:text-blue-400">Total Feedback</p>
              <p className="text-2xl font-bold text-blue-800 dark:text-blue-300">{stats.total}</p>
            </div>
            <div className="bg-blue-100 dark:bg-blue-800/50 p-2 rounded-full">
              <svg className="w-6 h-6 text-blue-800 dark:text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
            </div>
          </div>
        </div>
        
        {/* Today's Feedback */}
        <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-100 dark:border-green-900/50">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-green-600 dark:text-green-400">Today</p>
              <p className="text-2xl font-bold text-green-800 dark:text-green-300">{stats.today}</p>
            </div>
            <div className="bg-green-100 dark:bg-green-800/50 p-2 rounded-full">
              <svg className="w-6 h-6 text-green-800 dark:text-green-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
        </div>
        
        {/* Last 7 Days */}
        <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg border border-purple-100 dark:border-purple-900/50">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-purple-600 dark:text-purple-400">Last 7 Days</p>
              <p className="text-2xl font-bold text-purple-800 dark:text-purple-300">{stats.lastWeek}</p>
            </div>
            <div className="bg-purple-100 dark:bg-purple-800/50 p-2 rounded-full">
              <svg className="w-6 h-6 text-purple-800 dark:text-purple-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
          </div>
        </div>
        
        {/* Average Rating (placeholder) */}
        <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg border border-yellow-100 dark:border-yellow-900/50">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-yellow-600 dark:text-yellow-400">Response Rate</p>
              <p className="text-2xl font-bold text-yellow-800 dark:text-yellow-300">100%</p>
            </div>
            <div className="bg-yellow-100 dark:bg-yellow-800/50 p-2 rounded-full">
              <svg className="w-6 h-6 text-yellow-800 dark:text-yellow-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      
      {/* Category Breakdown */}
      {stats.total > 0 && (
        <div className="mt-6">
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Feedback by Category</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {Object.keys(stats.categories).map(category => (
              <div key={category} className={`px-3 py-2 rounded-lg ${getCategoryColor(category)} flex justify-between items-center border border-gray-200`}>
                <span>{getCategoryLabel(category)}</span>
                <span className="font-semibold">{stats.categories[category]}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardStats;
