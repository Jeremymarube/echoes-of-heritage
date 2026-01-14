// src/hooks/useSchedule.js
import { useState, useEffect } from 'react';
import scheduleService from '../services/scheduleService';

const useSchedule = (filters = {}) => {
  const [schedule, setSchedule] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchSchedule = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await scheduleService.getSchedule(filters);
      setSchedule(data);
    } catch (err) {
      setError(err.message || 'Failed to fetch schedule');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSchedule();
  }, [JSON.stringify(filters)]);

  return {
    schedule,
    loading,
    error,
    refetch: fetchSchedule
  };
};

export default useSchedule;