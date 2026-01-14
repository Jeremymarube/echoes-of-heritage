// src/components/common/Badge.jsx
'use client';

import React from 'react';

const Badge = ({ children, variant = 'default', size = 'md', className = '' }) => {
  const variants = {
    default: 'bg-gray-100 text-gray-800',
    primary: 'bg-indigo-100 text-indigo-800',
    success: 'bg-green-100 text-green-800',
    warning: 'bg-yellow-100 text-yellow-800',
    danger: 'bg-red-100 text-red-800',
    pending: 'bg-orange-100 text-orange-800',
    approved: 'bg-green-100 text-green-800',
    rejected: 'bg-red-100 text-red-800',
    scheduled: 'bg-blue-100 text-blue-800',
    
    // Presentation types
    dance: 'bg-orange-100 text-orange-800',
    music: 'bg-blue-100 text-blue-800',
    panel: 'bg-purple-100 text-purple-800',
    exhibition: 'bg-green-100 text-green-800',
    food: 'bg-red-100 text-red-800',
    workshop: 'bg-teal-100 text-teal-800',
    film: 'bg-indigo-100 text-indigo-800',
    art: 'bg-pink-100 text-pink-800'
  };

  const sizes = {
    sm: 'text-xs px-2 py-0.5',
    md: 'text-sm px-2.5 py-1',
    lg: 'text-base px-3 py-1.5'
  };

  return (
    <span className={`inline-flex items-center font-medium rounded-full ${variants[variant]} ${sizes[size]} ${className}`}>
      {children}
    </span>
  );
};

export default Badge;