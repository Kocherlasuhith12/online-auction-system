import React, { useState, useEffect } from 'react';
import { auctionService } from '../services/auctionService';
import AuctionCard from '../components/AuctionCard';

const Auctions = () => {
  const [auctions, setAuctions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    category: 'all',
    search: '',
    sort: 'newest'
  });

  const categories = [
    'all',
    'Electronics',
    'Fashion',
    'Home & Garden',
    'Sports',
    'Collectibles',
    'Art',
    'Books',
    'Toys',
    'Automotive',
    'Other'
  ];

  useEffect(() => {
    fetchAuctions();
  }, [filters]);

  const fetchAuctions = async () => {
    setLoading(true);
    try {
      const params = {
        status: 'active',
        ...(filters.category !== 'all' && { category: filters.category }),
        ...(filters.search && { search: filters.search }),
        sort: filters.sort
      };
      const data = await auctionService.getAll(params);
      setAuctions(data);
    } catch (error) {
      console.error('Error fetching auctions:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">
          Browse Auctions
        </h1>

        {/* Filters */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Search
              </label>
              <input
                type="text"
                name="search"
                value={filters.search}
                onChange={handleFilterChange}
                placeholder="Search auctions..."
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <select
                name="category"
                value={filters.category}
                onChange={handleFilterChange}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat === 'all' ? 'All Categories' : cat}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Sort By
              </label>
              <select
                name="sort"
                value={filters.sort}
                onChange={handleFilterChange}
                className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="newest">Newest First</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
                <option value="ending_soon">Ending Soon</option>
              </select>
            </div>
          </div>
        </div>

        {/* Auctions Grid */}
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : auctions.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {auctions.map((auction) => (
              <AuctionCard key={auction._id} auction={auction} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No auctions found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Auctions;
