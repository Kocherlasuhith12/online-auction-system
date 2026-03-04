import axios from 'axios';

const API_URL = '/api/bids';

export const bidService = {
  // Place bid
  placeBid: async (auctionId, amount) => {
    const response = await axios.post(`${API_URL}/${auctionId}`, { amount });
    return response.data;
  },

  // Get auction bids
  getAuctionBids: async (auctionId) => {
    const response = await axios.get(`${API_URL}/auction/${auctionId}`);
    return response.data;
  },

  // Get user bids
  getUserBids: async (userId) => {
    const response = await axios.get(`${API_URL}/user/${userId}`);
    return response.data;
  },

  // Get winning bids
  getWinningBids: async (userId) => {
    const response = await axios.get(`${API_URL}/winning/${userId}`);
    return response.data;
  }
};
