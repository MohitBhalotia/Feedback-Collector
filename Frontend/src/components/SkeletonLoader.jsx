import React from 'react';

const SkeletonLoader = () => {
  return (
    <div className="border rounded-lg p-4 animate-pulse bg-white dark:bg-gray-800 flex gap-3 border-gray-200 dark:border-gray-700">
      {/* Avatar skeleton */}
      <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-700"></div>
      
      {/* Content skeleton */}
      <div className="flex-1">
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mb-2"></div>
        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mb-3"></div>
        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-full mb-1"></div>
        <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
        <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded w-1/4 mt-3"></div>
      </div>
      
      {/* Actions skeleton */}
      <div className="flex flex-col gap-2">
        <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
        <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
      </div>
    </div>
  );
};

export default SkeletonLoader;
