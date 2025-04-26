import React from 'react';

const FeedbackCard = ({ feedback, onDelete, onView, isDeleting }) => {
  // Get initials for avatar
  const getInitials = (name) => {
    if (!name) return '?';
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .substring(0, 2)
      .toUpperCase();
  };

  // Get category badge color
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

  // Format category label
  const getCategoryLabel = (category) => {
    switch (category) {
      case 'bug':
        return 'Bug Report';
      case 'feature':
        return 'Feature Request';
      case 'praise':
        return 'Praise';
      default:
        return 'General';
    }
  };

  return (
    <li 
      className="relative border rounded-lg p-4 transition bg-white dark:bg-gray-800 hover:shadow-md focus-within:ring-2 focus-within:ring-blue-400 flex gap-3 border-gray-200 dark:border-gray-700"
      tabIndex={0}
      aria-label={`Feedback from ${feedback.name}`}
    >
      {/* Avatar */}
      <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center font-bold text-blue-700 dark:text-blue-300 text-lg">
        {getInitials(feedback.name)}
      </div>
      
      {/* Content */}
      <div className="flex-1 min-w-0 cursor-pointer" onClick={() => onView(feedback)}>
        <div className="flex flex-wrap items-center gap-2 mb-1">
          <h3 className="font-medium text-gray-900 dark:text-white truncate">
            {feedback.name}
          </h3>
          
          {feedback.category && (
            <span className={`text-xs px-2 py-1 rounded-full ${getCategoryColor(feedback.category)}`}>
              {getCategoryLabel(feedback.category)}
            </span>
          )}
        </div>
        
        <div className="text-sm text-gray-500 dark:text-gray-400 mb-1">
          {feedback.email}
        </div>
        
        <div className="text-gray-700 dark:text-gray-300 mt-1 line-clamp-2 text-sm">
          {feedback.message}
        </div>
        
        {feedback.createdAt && (
          <div className="text-xs text-gray-400 dark:text-gray-500 mt-2 flex items-center">
            <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {new Date(feedback.createdAt).toLocaleString()}
          </div>
        )}
      </div>
      
      {/* Actions */}
      <div className="flex flex-col gap-2">
        <button
          className="p-2 text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition rounded-full hover:bg-blue-50 dark:hover:bg-blue-900/30"
          onClick={() => onView(feedback)}
          aria-label="View feedback details"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
        </button>
        
        <button
          className="p-2 text-gray-500 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400 transition rounded-full hover:bg-red-50 dark:hover:bg-red-900/30"
          onClick={() => onDelete(feedback._id)}
          disabled={isDeleting}
          aria-label="Delete feedback"
        >
          {isDeleting ? (
            <svg className="w-5 h-5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          )}
        </button>
      </div>
    </li>
  );
};

export default FeedbackCard;
