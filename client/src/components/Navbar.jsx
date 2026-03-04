import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="text-2xl font-bold">
            🔨 AuctionHub
          </Link>
          
          <div className="flex items-center space-x-6">
            <Link to="/" className="hover:text-blue-200 transition">
              Home
            </Link>
            <Link to="/auctions" className="hover:text-blue-200 transition">
              Auctions
            </Link>
            
            {user ? (
              <>
                <Link to="/dashboard" className="hover:text-blue-200 transition">
                  Dashboard
                </Link>
                <Link to="/create-auction" className="hover:text-blue-200 transition">
                  Create Auction
                </Link>
                <div className="flex items-center space-x-4">
                  <span className="text-sm">Hello, {user.name}</span>
                  <button
                    onClick={handleLogout}
                    className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded transition"
                  >
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link to="/login" className="hover:text-blue-200 transition">
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded transition"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
