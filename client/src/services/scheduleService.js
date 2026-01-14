// src/services/scheduleService.js
import api from './api';

const scheduleService = {
  getSchedule: async (filters = {}) => {
    try {
      const params = new URLSearchParams();
      if (filters.date) params.append('date', filters.date);
      if (filters.venue) params.append('venue', filters.venue);
      if (filters.type) params.append('type', filters.type);
      
      const response = await api.get(`/schedule?${params.toString()}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch schedule');
    }
  },

  getVenues: async () => {
    try {
      const response = await api.get('/venues');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch venues');
    }
  },

  checkConflict: async (venueId, date, startTime, endTime) => {
    try {
      const response = await api.post('/schedule/check-conflict', {
        venue_id: venueId,
        date,
        start_time: startTime,
        end_time: endTime
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to check conflict');
    }
  }
};

export default scheduleService;