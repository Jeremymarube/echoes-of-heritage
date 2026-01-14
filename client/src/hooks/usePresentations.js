// src/hooks/usePresentations.js
import { useState, useEffect } from 'react';
import presentationService from '../services/presentationService';

const usePresentations = (filters = {}) => {
  const [presentations, setPresentations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPresentations = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await presentationService.getAllPresentations(filters);
      setPresentations(data);
    } catch (err) {
      setError(err.message || 'Failed to fetch presentations');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPresentations();
  }, [JSON.stringify(filters)]);

  const createPresentation = async (presentationData) => {
    try {
      const newPresentation = await presentationService.createPresentation(presentationData);
      setPresentations(prev => [...prev, newPresentation]);
      return newPresentation;
    } catch (err) {
      throw new Error(err.message || 'Failed to create presentation');
    }
  };

  const updatePresentation = async (id, updates) => {
    try {
      const updated = await presentationService.updatePresentation(id, updates);
      setPresentations(prev => 
        prev.map(p => p.id === id ? updated : p)
      );
      return updated;
    } catch (err) {
      throw new Error(err.message || 'Failed to update presentation');
    }
  };

  const deletePresentation = async (id) => {
    try {
      await presentationService.deletePresentation(id);
      setPresentations(prev => prev.filter(p => p.id !== id));
    } catch (err) {
      throw new Error(err.message || 'Failed to delete presentation');
    }
  };

  return {
    presentations,
    loading,
    error,
    refetch: fetchPresentations,
    createPresentation,
    updatePresentation,
    deletePresentation
  };
};

export default usePresentations;