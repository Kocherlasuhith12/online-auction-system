import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { auctionService } from '../services/auctionService';
import AuctionCard from '../components/AuctionCard';

const Home = () => {
  const [featuredAuctions, setFeaturedAuctions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeaturedAuctions();
  }, []);

  const fetchFeaturedAuctions = async () => {
    try {
      const data = await auctionService.getAll({ status: 'active' });
      setFeaturedAuctions(data.slice(0, 6));
    } catch (error) {
      console.error('Error fetching auctions:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">Welcome to AuctionHub</h1>
          <p className="text-xl mb-8">
            Discover amazing deals and bid on unique items
          </p>
          <div className="flex justify-center space-x-4">
            <Link
              to="/auctions"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
            >
              Browse Auctions
            </Link>
            <Link
              to="/create-auction"
              className="bg-green-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-600 transition"
            >
              Create Auction
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Us?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl mb-4">🔒</div>
              <h3 className="text-xl font-semibold mb-2">Secure Bidding</h3>
              <p className="text-gray-600">
                Your transactions are safe and secure with our advanced security measures
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="text-xl font-semibold mb-2">Real-time Updates</h3>
              <p className="text-gray-600">
                Get instant notifications when you're outbid or win an auction
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-xl font-semibold mb-2">Wide Selection</h3>
              <p className="text-gray-600">
                Browse thousands of items across multiple categories
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Auctions */}
      <div className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Featured Auctions
          </h2>
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          ) : featuredAuctions.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {featuredAuctions.map((auction) => (
                <AuctionCard key={auction._id} auction={auction} />
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-600">No auctions available</p>
          )}
          <div className="text-center">
            <Link
              to="/auctions"
              className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition"
            >
              View All Auctions
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
