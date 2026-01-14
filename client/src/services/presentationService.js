// src/services/presentationService.js
import api from './api';

const presentationService = {
  getAllPresentations: async (filters = {}) => {
    try {
      const params = new URLSearchParams();
      if (filters.status) params.append('status', filters.status);
      if (filters.type) params.append('type', filters.type);
      if (filters.date) params.append('date', filters.date);
      
      const response = await api.get(`/presentations?${params.toString()}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch presentations');
    }
  },

  getPresentation: async (id) => {
    try {
      const response = await api.get(`/presentations/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch presentation');
    }
  },

  createPresentation: async (presentationData) => {
    try {
      const response = await api.post('/presentations', presentationData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to create presentation');
    }
  },

  updatePresentation: async (id, updates) => {
    try {
      const response = await api.put(`/presentations/${id}`, updates);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to update presentation');
    }
  },

  deletePresentation: async (id) => {
    try {
      const response = await api.delete(`/presentations/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to delete presentation');
    }
  },

  getMyPresentations: async () => {
    try {
      const response = await api.get('/presentations/my');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch your presentations');
    }
  },

  getPendingPresentations: async () => {
    try {
      const response = await api.get('/presentations/pending');
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch pending presentations');
    }
  },

  approvePresentation: async (id) => {
    try {
      const response = await api.post(`/presentations/${id}/approve`);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to approve presentation');
    }
  },

  rejectPresentation: async (id, reason) => {
    try {
      const response = await api.post(`/presentations/${id}/reject`, { reason });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to reject presentation');
    }
  },

  schedulePresentation: async (id, scheduleData) => {
    try {
      const response = await api.post(`/presentations/${id}/schedule`, scheduleData);
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to schedule presentation');
    }
  }
};

export default presentationService;