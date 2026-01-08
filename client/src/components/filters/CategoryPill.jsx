import React from 'react';
import { motion } from 'framer-motion';

const CategoryPill = ({ label, icon, color, isActive, onClick }) => {
  return (
    <motion.button
      onClick={onClick}
      className={`
        px-4 py-2 rounded-full font-semibold transition-all flex items-center gap-2 whitespace-nowrap
        ${isActive 
          ? 'text-white shadow-lg' 
          : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-accent'
        }
      `}
      style={isActive ? { backgroundColor: color } : {}}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <span className="text-lg">{icon}</span>
      <span>{label}</span>
    </motion.button>
  );
};

export default CategoryPill;