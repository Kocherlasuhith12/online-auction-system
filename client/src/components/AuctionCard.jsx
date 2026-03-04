import React from 'react';
import { Link } from 'react-router-dom';

const AuctionCard = ({ auction }) => {
  const getTimeRemaining = () => {
    const now = new Date();
    const end = new Date(auction.endDate);
    const diff = end - now;

    if (diff <= 0) return 'Ended';

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    if (days > 0) return `${days}d ${hours}h`;
    if (hours > 0) return `${hours}h ${minutes}m`;
    return `${minutes}m`;
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition duration-300">
      <img
        src={auction.imageUrl}
        alt={auction.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-gray-800 truncate flex-1">
            {auction.title}
          </h3>
          <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded ml-2">
            {auction.category}
          </span>
        </div>
        
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {auction.description}
        </p>
        
        <div className="flex justify-between items-center mb-3">
          <div>
            <p className="text-xs text-gray-500">Current Bid</p>
            <p className="text-xl font-bold text-green-600">
              ${auction.currentPrice.toFixed(2)}
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-500">Time Left</p>
            <p className="text-sm font-semibold text-red-600">
              {getTimeRemaining()}
            </p>
          </div>
        </div>
        
        <div className="flex justify-between items-center text-xs text-gray-500 mb-3">
          <span>👁️ {auction.views} views</span>
          <span>💬 {auction.bids?.length || 0} bids</span>
        </div>
        
        <Link
          to={`/auction/${auction._id}`}
          className="block w-full bg-blue-600 text-white text-center py-2 rounded hover:bg-blue-700 transition"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default AuctionCard;
