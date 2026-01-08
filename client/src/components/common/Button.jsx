import React from 'react';
import { motion } from 'framer-motion';

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  onClick, 
  disabled = false,
  className = '',
  type = 'button',
  icon: Icon,
}) => {
  const variants = {
    primary: 'gradient-accent text-white',
    secondary: 'bg-secondary text-black hover:bg-primary',
    outline: 'border-2 border-accent text-accent hover:bg-accent hover:text-white',
    ghost: 'text-accent hover:bg-accent/10',
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        ${variants[variant]} 
        ${sizes[size]} 
        rounded-lg font-semibold 
        transition-all duration-300 
        transform hover:scale-105 active:scale-95 
        shadow-lg hover:shadow-xl
        disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
        flex items-center gap-2 justify-center
        ${className}
      `}
      whileHover={{ scale: disabled ? 1 : 1.05 }}
      whileTap={{ scale: disabled ? 1 : 0.95 }}
    >
      {Icon && <Icon className="w-5 h-5" />}
      {children}
    </motion.button>
  );
};

export default Button;