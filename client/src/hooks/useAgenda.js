// src/hooks/useAgenda.js
import { useState, useEffect } from 'react';

const useAgenda = (userId) => {
  const [savedEvents, setSavedEvents] = useState([]);

  useEffect(() => {
    // Load from memory (in a real app, this would fetch from API)
    const saved = JSON.parse(window.agendaStore || '[]');
    setSavedEvents(saved);
  }, [userId]);

  const addToAgenda = (eventId) => {
    const updated = [...new Set([...savedEvents, eventId])];
    setSavedEvents(updated);
    window.agendaStore = JSON.stringify(updated);
  };

  const removeFromAgenda = (eventId) => {
    const updated = savedEvents.filter(id => id !== eventId);
    setSavedEvents(updated);
    window.agendaStore = JSON.stringify(updated);
  };

  const isInAgenda = (eventId) => {
    return savedEvents.includes(eventId);
  };

  const clearAgenda = () => {
    setSavedEvents([]);
    window.agendaStore = '[]';
  };

  return {
    savedEvents,
    addToAgenda,
    removeFromAgenda,
    isInAgenda,
    clearAgenda
  };
};

export default useAgenda;