// src/components/filters/TypeFilter.jsx
'use client';

import React from 'react';
import { PRESENTATION_TYPES } from '../../utils/constants';

const TypeFilter = ({ selectedType, onChange }) => {
  return (
    <select
      value={selectedType}
      onChange={(e) => onChange(e.target.value)}
      className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
    >
      <option value="all">All Types</option>
      {PRESENTATION_TYPES.map(type => (
        <option key={type.value} value={type.value}>
          {type.icon} {type.label}
        </option>
      ))}
    </select>
  );
};

export default TypeFilter;