import React from 'react';
import FeedbackModal from './FeedbackModal';
import FeedbackCard from './FeedbackCard';
import SkeletonLoader from './SkeletonLoader';
import styles from './AdminDashboard.module.css';

const FeedbackList = ({ 
  feedbacks, 
  loading, 
  onDelete, 
  onView, 
  deletingId, 
  selectedFeedback, 
  onCloseModal 
}) => {
  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <SkeletonLoader key={i} />
        ))}
      </div>
    );
  }

  if (!feedbacks || feedbacks.length === 0) {
    return (
      <div className="text-center py-10 border rounded-lg bg-gray-50 dark:bg-gray-800">
        <svg 
          className="w-12 h-12 mx-auto text-gray-400" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={1.5} 
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" 
          />
        </svg>
        <p className="mt-2 text-gray-500 dark:text-gray-400">No feedback found</p>
      </div>
    );
  }

  return (
    <>
      <ul className={`space-y-4 max-h-[calc(100vh-300px)] overflow-y-auto ${styles['admin-scrollbar']}`}>
        {feedbacks.map((feedback) => (
          <FeedbackCard
            key={feedback._id}
            feedback={feedback}
            onDelete={onDelete}
            onView={onView}
            isDeleting={deletingId === feedback._id}
          />
        ))}
      </ul>

      {selectedFeedback && (
        <FeedbackModal
          feedback={selectedFeedback}
          onClose={onCloseModal}
        />
      )}
    </>
  );
};

export default FeedbackList;
