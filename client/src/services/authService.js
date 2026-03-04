import axios from 'axios';

const API_URL = '/api/auth';

export const authService = {
  // Register
  register: async (userData) => {
    const response = await axios.post(`${API_URL}/register`, userData);
    return response.data;
  },

  // Login
  login: async (credentials) => {
    const response = await axios.post(`${API_URL}/login`, credentials);
    return response.data;
  },

  // Get current user
  getMe: async () => {
    const response = await axios.get(`${API_URL}/me`);
    return response.data;
  }
};
