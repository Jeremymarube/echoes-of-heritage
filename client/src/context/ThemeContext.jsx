// src/context/ThemeContext.jsx
'use client';

import React, { createContext, useState, useEffect, useContext } from 'react';

export const ThemeContext = createContext(null);

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');
  const [colorScheme, setColorScheme] = useState('indigo'); // indigo, purple, blue, green

  // Initialize theme from memory storage
  useEffect(() => {
    loadTheme();
  }, []);

  const loadTheme = () => {
    try {
      const savedTheme = window.userTheme;
      const savedColorScheme = window.userColorScheme;
      
      if (savedTheme) {
        setTheme(savedTheme);
        applyTheme(savedTheme);
      }
      
      if (savedColorScheme) {
        setColorScheme(savedColorScheme);
        applyColorScheme(savedColorScheme);
      }
    } catch (error) {
      console.error('Failed to load theme:', error);
    }
  };

  const applyTheme = (newTheme) => {
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const applyColorScheme = (scheme) => {
    // Remove all color scheme classes
    document.documentElement.classList.remove(
      'color-indigo',
      'color-purple',
      'color-blue',
      'color-green'
    );
    // Add new color scheme class
    document.documentElement.classList.add(`color-${scheme}`);
  };

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    applyTheme(newTheme);
    window.userTheme = newTheme;
  };

  const changeColorScheme = (scheme) => {
    setColorScheme(scheme);
    applyColorScheme(scheme);
    window.userColorScheme = scheme;
  };

  const isDark = theme === 'dark';

  const colors = {
    indigo: {
      primary: '#6366f1',
      secondary: '#818cf8',
      light: '#c7d2fe',
      dark: '#4f46e5'
    },
    purple: {
      primary: '#8b5cf6',
      secondary: '#a78bfa',
      light: '#ddd6fe',
      dark: '#7c3aed'
    },
    blue: {
      primary: '#3b82f6',
      secondary: '#60a5fa',
      light: '#bfdbfe',
      dark: '#2563eb'
    },
    green: {
      primary: '#10b981',
      secondary: '#34d399',
      light: '#a7f3d0',
      dark: '#059669'
    }
  };

  const currentColors = colors[colorScheme];

  const value = {
    theme,
    colorScheme,
    isDark,
    colors: currentColors,
    toggleTheme,
    changeColorScheme,
    setTheme: (newTheme) => {
      setTheme(newTheme);
      applyTheme(newTheme);
      window.userTheme = newTheme;
    }
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook for easier access
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};