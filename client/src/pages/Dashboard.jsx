import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { auctionService } from '../services/auctionService';
import { bidService } from '../services/bidService';

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [myAuctions, setMyAuctions] = useState([]);
  const [myBids, setMyBids] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('auctions');

  useEffect(() => {
    if (user) {
      fetchData();
    }
  }, [user]);

  const fetchData = async () => {
    try {
      const [auctionsData, bidsData] = await Promise.all([
        auctionService.getUserAuctions(user._id),
        bidService.getUserBids(user._id)
      ]);
      setMyAuctions(auctionsData);
      setMyBids(bidsData);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-gray-600">Please login to view dashboard</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">
          My Dashboard
        </h1>

        {/* Tabs */}
        <div className="mb-6 border-b border-gray-200">
          <div className="flex space-x-8">
            <button
              onClick={() => setActiveTab('auctions')}
              className={`pb-4 px-2 ${
                activeTab === 'auctions'
                  ? 'border-b-2 border-blue-600 text-blue-600 font-semibold'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              My Auctions ({myAuctions.length})
            </button>
            <button
              onClick={() => setActiveTab('bids')}
              className={`pb-4 px-2 ${
                activeTab === 'bids'
                  ? 'border-b-2 border-blue-600 text-blue-600 font-semibold'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              My Bids ({myBids.length})
            </button>
          </div>
        </div>

        {/* My Auctions */}
        {activeTab === 'auctions' && (
          <div>
            {myAuctions.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {myAuctions.map((auction) => (
                  <div
                    key={auction._id}
                    className="bg-white rounded-lg shadow-md overflow-hidden"
                  >
                    <img
                      src={auction.imageUrl}
                      alt={auction.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-4">
                      <h3 className="text-lg font-semibold mb-2">
                        {auction.title}
                      </h3>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm text-gray-600">
                          Current: ${auction.currentPrice.toFixed(2)}
                        </span>
                        <span
                          className={`text-sm px-2 py-1 rounded ${
                            auction.status === 'active'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}
                        >
                          {auction.status}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">
                        Bids: {auction.bids?.length || 0}
                      </p>
                      <Link
                        to={`/auction/${auction._id}`}
                        className="block w-full bg-blue-600 text-white text-center py-2 rounded hover:bg-blue-700 transition"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-white rounded-lg">
                <p className="text-gray-600 mb-4">
                  You haven't created any auctions yet
                </p>
                <Link
                  to="/create-auction"
                  className="inline-block bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
                >
                  Create Your First Auction
                </Link>
              </div>
            )}
          </div>
        )}

        {/* My Bids */}
        {activeTab === 'bids' && (
          <div>
            {myBids.length > 0 ? (
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Auction
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        My Bid
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Current Price
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {myBids.map((bid) => (
                      <tr key={bid._id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <img
                              src={bid.auction?.imageUrl}
                              alt={bid.auction?.title}
                              className="h-10 w-10 rounded object-cover mr-3"
                            />
                            <div className="text-sm font-medium text-gray-900">
                              {bid.auction?.title}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            ${bid.amount.toFixed(2)}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            ${bid.auction?.currentPrice.toFixed(2)}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              bid.amount === bid.auction?.currentPrice
                                ? 'bg-green-100 text-green-800'
                                : 'bg-yellow-100 text-yellow-800'
                            }`}
                          >
                            {bid.amount === bid.auction?.currentPrice
                              ? 'Winning'
                              : 'Outbid'}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <Link
                            to={`/auction/${bid.auction?._id}`}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            View
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-12 bg-white rounded-lg">
                <p className="text-gray-600 mb-4">
                  You haven't placed any bids yet
                </p>
                <Link
                  to="/auctions"
                  className="inline-block bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
                >
                  Browse Auctions
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
