// src/components/filters/FilterBar.jsx
'use client';

import React from 'react';
import SearchBar from './SearchBar';
import TypeFilter from './TypeFilter';
import DateFilter from './DateFilter';

const FilterBar = ({ 
  searchTerm, 
  onSearchChange, 
  selectedType, 
  onTypeChange, 
  selectedDate, 
  onDateChange,
  venues = [],
  selectedVenue,
  onVenueChange
}) => {
  const handleClearSearch = () => {
    onSearchChange('');
  };

  const handleClearFilters = () => {
    onSearchChange('');
    onTypeChange('all');
    onDateChange('all');
    if (onVenueChange) onVenueChange('all');
  };

  const hasActiveFilters = searchTerm || selectedType !== 'all' || selectedDate !== 'all' || (selectedVenue && selectedVenue !== 'all');

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <SearchBar 
        value={searchTerm}
        onChange={onSearchChange}
        onClear={handleClearSearch}
      />

      {/* Filters Row */}
      <div className="flex flex-wrap gap-3 items-center">
        <TypeFilter 
          selectedType={selectedType}
          onChange={onTypeChange}
        />
        
        <DateFilter 
          selectedDate={selectedDate}
          onChange={onDateChange}
        />

        {venues.length > 0 && onVenueChange && (
          <select
            value={selectedVenue}
            onChange={(e) => onVenueChange(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
          >
            <option value="all">All Venues</option>
            {venues.map(venue => (
              <option key={venue.id} value={venue.id}>
                {venue.name}
              </option>
            ))}
          </select>
        )}

        {hasActiveFilters && (
          <button
            onClick={handleClearFilters}
            className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 underline"
          >
            Clear all filters
          </button>
        )}
      </div>
    </div>
  );
};

export default FilterBar;