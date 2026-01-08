import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const ClearFilters = ({ show, onClear, count }) => {
  return (
    <AnimatePresence>
      {show && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          onClick={onClear}
          className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-full font-semibold hover:bg-red-100 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <X className="w-4 h-4" />
          Clear {count} {count === 1 ? 'filter' : 'filters'}
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default ClearFilters;