// src/context/AgendaContext.jsx
'use client';

import React, { createContext, useState, useEffect, useContext } from 'react';
import { AuthContext } from './AuthContext';

export const AgendaContext = createContext(null);

export const AgendaProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [savedEvents, setSavedEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  // Initialize agenda from memory storage
  useEffect(() => {
    if (user) {
      loadAgenda();
    } else {
      setSavedEvents([]);
    }
    setLoading(false);
  }, [user]);

  const loadAgenda = () => {
    try {
      const storageKey = `agenda_${user.id}`;
      const stored = window[storageKey];
      if (stored) {
        const parsed = JSON.parse(stored);
        setSavedEvents(parsed);
      } else {
        setSavedEvents([]);
      }
    } catch (error) {
      console.error('Failed to load agenda:', error);
      setSavedEvents([]);
    }
  };

  const saveAgenda = (events) => {
    try {
      const storageKey = `agenda_${user.id}`;
      window[storageKey] = JSON.stringify(events);
    } catch (error) {
      console.error('Failed to save agenda:', error);
    }
  };

  const addToAgenda = (eventId) => {
    if (!user) {
      throw new Error('You must be logged in to save events');
    }

    if (savedEvents.includes(eventId)) {
      return; // Already saved
    }

    const updated = [...savedEvents, eventId];
    setSavedEvents(updated);
    saveAgenda(updated);
  };

  const removeFromAgenda = (eventId) => {
    const updated = savedEvents.filter(id => id !== eventId);
    setSavedEvents(updated);
    saveAgenda(updated);
  };

  const isInAgenda = (eventId) => {
    return savedEvents.includes(eventId);
  };

  const toggleAgenda = (eventId) => {
    if (isInAgenda(eventId)) {
      removeFromAgenda(eventId);
    } else {
      addToAgenda(eventId);
    }
  };

  const clearAgenda = () => {
    setSavedEvents([]);
    if (user) {
      const storageKey = `agenda_${user.id}`;
      delete window[storageKey];
    }
  };

  const getAgendaCount = () => {
    return savedEvents.length;
  };

  const value = {
    savedEvents,
    loading,
    addToAgenda,
    removeFromAgenda,
    isInAgenda,
    toggleAgenda,
    clearAgenda,
    getAgendaCount
  };

  return (
    <AgendaContext.Provider value={value}>
      {!loading && children}
    </AgendaContext.Provider>
  );
};

// Custom hook for easier access
export const useAgendaContext = () => {
  const context = useContext(AgendaContext);
  if (!context) {
    throw new Error('useAgendaContext must be used within an AgendaProvider');
  }
  return context;
};