import React from 'react';
import { motion } from 'framer-motion';
import CategoryPill from './CategoryPill';
import { EVENT_TYPES } from '../../utils/constants';

const FilterBar = ({ activeFilters, onFilterChange }) => {
  const toggleFilter = (filterId) => {
    if (activeFilters.includes(filterId)) {
      onFilterChange(activeFilters.filter(f => f !== filterId));
    } else {
      onFilterChange([...activeFilters, filterId]);
    }
  };

  return (
    <motion.div
      className="flex flex-wrap gap-3"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
    >
      <CategoryPill
        label="All Events"
        icon="🎭"
        color="#6366f1"
        isActive={activeFilters.length === 0}
        onClick={() => onFilterChange([])}
      />
      {EVENT_TYPES.map((type) => (
        <CategoryPill
          key={type.id}
          label={type.label}
          icon={type.icon}
          color={type.color}
          isActive={activeFilters.includes(type.id)}
          onClick={() => toggleFilter(type.id)}
        />
      ))}
    </motion.div>
  );
};

export default FilterBar;