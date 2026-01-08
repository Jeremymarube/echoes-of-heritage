import React from 'react';
import { motion } from 'framer-motion';

const EmptyState = ({ icon: Icon, title, description, action }) => {
  return (
    <motion.div
      className="flex flex-col items-center justify-center py-16 px-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {Icon && (
        <motion.div
          className="mb-4 text-gray-300"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Icon className="w-24 h-24" />
        </motion.div>
      )}
      <h3 className="text-2xl font-bold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 text-center max-w-md mb-6">{description}</p>
      {action}
    </motion.div>
  );
};

export default EmptyState;