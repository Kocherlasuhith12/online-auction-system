import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { auctionService } from '../services/auctionService';
import { bidService } from '../services/bidService';

const AuctionDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [auction, setAuction] = useState(null);
  const [bidAmount, setBidAmount] = useState('');
  const [loading, setLoading] = useState(true);
  const [bidding, setBidding] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchAuction();
  }, [id]);

  const fetchAuction = async () => {
    try {
      const data = await auctionService.getById(id);
      setAuction(data);
      setBidAmount((data.currentPrice + 1).toString());
    } catch (error) {
      console.error('Error fetching auction:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleBid = async (e) => {
    e.preventDefault();
    if (!user) {
      navigate('/login');
      return;
    }

    setError('');
    setSuccess('');
    setBidding(true);

    try {
      await bidService.placeBid(id, parseFloat(bidAmount));
      setSuccess('Bid placed successfully!');
      fetchAuction();
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to place bid');
    } finally {
      setBidding(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!auction) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-gray-600">Auction not found</p>
      </div>
    );
  }

  const isOwner = user && user._id === auction.seller._id;
  const hasEnded = new Date(auction.endDate) < new Date();

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="md:flex">
            {/* Image */}
            <div className="md:w-1/2">
              <img
                src={auction.imageUrl}
                alt={auction.title}
                className="w-full h-96 object-cover"
              />
            </div>

            {/* Details */}
            <div className="md:w-1/2 p-8">
              <div className="flex justify-between items-start mb-4">
                <h1 className="text-3xl font-bold text-gray-800">
                  {auction.title}
                </h1>
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded">
                  {auction.category}
                </span>
              </div>

              <p className="text-gray-600 mb-6">{auction.description}</p>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-50 p-4 rounded">
                  <p className="text-sm text-gray-500">Starting Price</p>
                  <p className="text-xl font-semibold">
                    ${auction.startingPrice.toFixed(2)}
                  </p>
                </div>
                <div className="bg-green-50 p-4 rounded">
                  <p className="text-sm text-gray-500">Current Bid</p>
                  <p className="text-2xl font-bold text-green-600">
                    ${auction.currentPrice.toFixed(2)}
                  </p>
                </div>
              </div>

              <div className="mb-6">
                <p className="text-sm text-gray-500 mb-1">Seller</p>
                <p className="text-lg font-semibold">{auction.seller.name}</p>
              </div>

              <div className="mb-6">
                <p className="text-sm text-gray-500 mb-1">Auction Ends</p>
                <p className="text-lg font-semibold">
                  {new Date(auction.endDate).toLocaleString()}
                </p>
                {hasEnded && (
                  <p className="text-red-600 font-semibold mt-2">
                    This auction has ended
                  </p>
                )}
              </div>

              <div className="mb-6">
                <p className="text-sm text-gray-500">
                  👁️ {auction.views} views | 💬 {auction.bids?.length || 0} bids
                </p>
              </div>

              {/* Bid Form */}
              {!isOwner && !hasEnded && user && (
                <form onSubmit={handleBid} className="mb-6">
                  {error && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                      {error}
                    </div>
                  )}
                  {success && (
                    <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
                      {success}
                    </div>
                  )}
                  <div className="flex gap-2">
                    <input
                      type="number"
                      value={bidAmount}
                      onChange={(e) => setBidAmount(e.target.value)}
                      min={auction.currentPrice + 1}
                      step="0.01"
                      className="flex-1 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                    <button
                      type="submit"
                      disabled={bidding}
                      className="bg-blue-600 text-white px-8 py-2 rounded hover:bg-blue-700 transition disabled:bg-gray-400"
                    >
                      {bidding ? 'Placing...' : 'Place Bid'}
                    </button>
                  </div>
                  <p className="text-sm text-gray-500 mt-2">
                    Minimum bid: ${(auction.currentPrice + 1).toFixed(2)}
                  </p>
                </form>
              )}

              {!user && !hasEnded && (
                <div className="bg-yellow-50 border border-yellow-200 p-4 rounded">
                  <p className="text-yellow-800">
                    Please <a href="/login" className="underline">login</a> to place a bid
                  </p>
                </div>
              )}

              {isOwner && (
                <div className="bg-blue-50 border border-blue-200 p-4 rounded">
                  <p className="text-blue-800">This is your auction</p>
                </div>
              )}

              {/* Recent Bids */}
              {auction.bids && auction.bids.length > 0 && (
                <div className="mt-8">
                  <h3 className="text-xl font-semibold mb-4">Recent Bids</h3>
                  <div className="space-y-2">
                    {auction.bids.slice(0, 5).map((bid) => (
                      <div
                        key={bid._id}
                        className="flex justify-between items-center bg-gray-50 p-3 rounded"
                      >
                        <span className="font-medium">{bid.bidder?.name}</span>
                        <div className="text-right">
                          <p className="font-semibold text-green-600">
                            ${bid.amount.toFixed(2)}
                          </p>
                          <p className="text-xs text-gray-500">
                            {new Date(bid.timestamp).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuctionDetails;
