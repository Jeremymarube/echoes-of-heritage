// src/components/filters/DateFilter.jsx
'use client';

import React from 'react';

const DateFilter = ({ selectedDate, onChange, dates = [] }) => {
  // Default dates for Culture Week
  const defaultDates = [
    { value: 'all', label: 'All Days' },
    { value: '2024-03-18', label: 'Monday, Mar 18' },
    { value: '2024-03-19', label: 'Tuesday, Mar 19' },
    { value: '2024-03-20', label: 'Wednesday, Mar 20' },
    { value: '2024-03-21', label: 'Thursday, Mar 21' },
    { value: '2024-03-22', label: 'Friday, Mar 22' }
  ];

  const dateOptions = dates.length > 0 ? dates : defaultDates;

  return (
    <select
      value={selectedDate}
      onChange={(e) => onChange(e.target.value)}
      className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
    >
      {dateOptions.map(date => (
        <option key={date.value} value={date.value}>
          {date.label}
        </option>
      ))}
    </select>
  );
};

export default DateFilter;