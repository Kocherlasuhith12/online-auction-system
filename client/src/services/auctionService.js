import axios from 'axios';

const API_URL = '/api/auctions';

export const auctionService = {
  // Get all auctions
  getAll: async (params = {}) => {
    const response = await axios.get(API_URL, { params });
    return response.data;
  },

  // Get single auction
  getById: async (id) => {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  },

  // Create auction
  create: async (auctionData) => {
    const response = await axios.post(API_URL, auctionData);
    return response.data;
  },

  // Update auction
  update: async (id, auctionData) => {
    const response = await axios.put(`${API_URL}/${id}`, auctionData);
    return response.data;
  },

  // Delete auction
  delete: async (id) => {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  },

  // Get user auctions
  getUserAuctions: async (userId) => {
    const response = await axios.get(`${API_URL}/user/${userId}`);
    return response.data;
  }
};
