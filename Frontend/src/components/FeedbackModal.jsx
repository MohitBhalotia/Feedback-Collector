import React from 'react';

const FeedbackModal = ({ feedback, onClose }) => {
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
        return 'General Feedback';
    }
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 dark:bg-opacity-70 backdrop-blur-sm animate-fade-in" 
      onClick={onClose}
      aria-modal="true"
      role="dialog"
    >
      <div 
        className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 max-w-lg w-full mx-4 relative animate-scale-in border border-gray-200 dark:border-gray-700" 
        onClick={e => e.stopPropagation()}
      >
        {/* Close button */}
        <button 
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 dark:hover:text-white transition" 
          onClick={onClose} 
          aria-label="Close"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        
        {/* Header */}
        <div className="flex items-center gap-4 mb-4 pb-4 border-b dark:border-gray-700">
          <div className="w-14 h-14 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center font-bold text-blue-700 dark:text-blue-300 text-xl">
            {getInitials(feedback.name)}
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{feedback.name}</h2>
            <p className="text-gray-500">{feedback.email}</p>
            {feedback.category && (
              <span className={`inline-block mt-1 text-xs px-2 py-1 rounded-full ${getCategoryColor(feedback.category)}`}>
                {getCategoryLabel(feedback.category)}
              </span>
            )}
          </div>
        </div>
        
        {/* Content */}
        <div className="mb-4">
          <h3 className="text-lg font-medium mb-2 text-gray-900 dark:text-white">Feedback</h3>
          <div className="bg-blue-50 dark:bg-gray-700 p-4 rounded-lg text-gray-900 dark:text-gray-200 whitespace-pre-line border border-blue-100 dark:border-gray-700">
            {feedback.message}
          </div>
        </div>
        
        {/* Footer */}
        <div className="flex justify-between items-center text-sm text-gray-500 dark:text-gray-400">
          <div>
            {feedback.createdAt && (
              <div className="flex items-center">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Submitted: {new Date(feedback.createdAt).toLocaleString()}
              </div>
            )}
          </div>
          <div>
            ID: {feedback._id?.substring(0, 8)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedbackModal;
