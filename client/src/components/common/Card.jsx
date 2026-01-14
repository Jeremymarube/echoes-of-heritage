// src/components/common/Card.jsx
'use client';

import React from 'react';

const Card = ({ children, className = '', hover = false, onClick }) => {
  const hoverClass = hover ? 'hover:shadow-lg transition-shadow cursor-pointer' : '';
  const clickableClass = onClick ? 'cursor-pointer' : '';
  
  return (
    <div 
      className={`bg-white rounded-lg shadow-md ${hoverClass} ${clickableClass} ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

const CardHeader = ({ children, className = '' }) => (
  <div className={`p-6 border-b ${className}`}>{children}</div>
);

const CardBody = ({ children, className = '' }) => (
  <div className={`p-6 ${className}`}>{children}</div>
);

const CardFooter = ({ children, className = '' }) => (
  <div className={`p-6 border-t bg-gray-50 rounded-b-lg ${className}`}>{children}</div>
);

Card.Header = CardHeader;
Card.Body = CardBody;
Card.Footer = CardFooter;

export default Card;