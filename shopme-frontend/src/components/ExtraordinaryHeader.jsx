import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

import Cart from './Cart';

const ExtraordinaryHeader = ({ onSearch }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const { getCartCount } = useCart();


  const handleSearch = () => {
    if (onSearch && searchQuery.trim()) {
      onSearch(searchQuery.trim());
    }
  };

  return (
    <>
      {/* Top notification bar */}
      <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 text-white text-center py-2 text-sm animate-pulse">
        ✨ FREE SHIPPING on orders over $50 | Use code: SHOPME50 ✨
      </div>

      {/* Main header */}
      <header className="bg-white shadow-2xl sticky top-0 z-50 border-b-4 border-gradient-to-r from-purple-500 to-pink-500">
        <div className="container mx-auto px-4">
          {/* Top row */}
          <div className="flex items-center justify-between py-4">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-600 via-pink-600 to-red-600 rounded-xl flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-300">
                  <span className="text-white font-bold text-xl">S</span>
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full animate-bounce"></div>
              </div>
              <div>
                <h1 className="text-3xl font-black bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 bg-clip-text text-transparent">
                  ShopMe
                </h1>
                <p className="text-xs text-gray-500 -mt-1">Extraordinary Shopping</p>
              </div>
            </Link>

            {/* Search bar */}
            <div className="flex-1 max-w-2xl mx-8">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-300"></div>
                <div className="relative flex bg-white rounded-2xl border-2 border-gray-200 overflow-hidden">
                  <select className="bg-gray-50 px-4 py-3 border-r text-sm font-medium text-gray-700">
                    <option>All</option>
                    <option>Electronics</option>
                    <option>Fashion</option>
                    <option>Home</option>
                  </select>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      if (onSearch) onSearch(e.target.value);
                    }}
                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                    placeholder="Search for amazing products..."
                    className="flex-1 px-4 py-3 focus:outline-none text-gray-700"
                  />
                  <button 
                    onClick={handleSearch}
                    className="bg-gradient-to-r from-purple-600 to-pink-600 px-8 py-3 text-white font-semibold hover:from-purple-700 hover:to-pink-700 transition-all"
                  >
                    <span className="text-lg">🔍</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Right side */}
            <div className="flex items-center space-x-6">
              {user ? (
                <>
                  {/* User menu */}
                  <div className="text-center">
                    <div className="text-sm text-gray-600">Hello,</div>
                    <div className="font-bold text-gray-800">{user.name}</div>
                  </div>


                  <Link to="/orders" className="flex flex-col items-center group">
                    <div className="text-2xl group-hover:scale-110 transition-transform">📦</div>
                    <span className="text-xs font-medium text-gray-600 group-hover:text-purple-600">Orders</span>
                  </Link>

                  {/* Cart */}
                  <button
                    onClick={() => setIsCartOpen(true)}
                    className="relative flex flex-col items-center group"
                  >
                    <div className="relative">
                      <div className="text-3xl group-hover:scale-110 transition-transform">🛒</div>
                      {getCartCount() > 0 && (
                        <div className="absolute -top-2 -right-2 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center animate-pulse">
                          {getCartCount()}
                        </div>
                      )}
                    </div>
                    <span className="text-xs font-medium text-gray-600 group-hover:text-purple-600">Cart</span>
                  </button>

                  {/* Logout */}
                  <button
                    onClick={logout}
                    className="bg-gradient-to-r from-gray-600 to-gray-700 text-white px-4 py-2 rounded-lg hover:from-gray-700 hover:to-gray-800 transition-all"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <div className="flex space-x-3">
                  <Link
                    to="/login"
                    className="border-2 border-purple-600 text-purple-600 px-6 py-2 rounded-lg hover:bg-purple-600 hover:text-white transition-all"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/signup"
                    className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all"
                  >
                    Join Now
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Navigation */}
          <div className="border-t border-gray-200 py-3">
            <nav className="flex items-center justify-between">
              <div className="flex space-x-8">
                <Link to="/deals" className="flex items-center space-x-2 text-gray-700 hover:text-purple-600 font-medium transition-colors group">
                  <span className="text-lg group-hover:animate-bounce">🔥</span>
                  <span>Today's Deals</span>
                </Link>
                <Link to="/popular" className="flex items-center space-x-2 text-gray-700 hover:text-purple-600 font-medium transition-colors group">
                  <span className="text-lg group-hover:animate-bounce">⭐</span>
                  <span>Popular</span>
                </Link>
                <Link to="/new-arrivals" className="flex items-center space-x-2 text-gray-700 hover:text-purple-600 font-medium transition-colors group">
                  <span className="text-lg group-hover:animate-bounce">✨</span>
                  <span>New Arrivals</span>
                </Link>
                <Link to="/best-sellers" className="flex items-center space-x-2 text-gray-700 hover:text-purple-600 font-medium transition-colors group">
                  <span className="text-lg group-hover:animate-bounce">🏆</span>
                  <span>Best Sellers</span>
                </Link>
                <Link to="/support" className="flex items-center space-x-2 text-gray-700 hover:text-purple-600 font-medium transition-colors group">
                  <span className="text-lg group-hover:animate-bounce">💬</span>
                  <span>Support</span>
                </Link>
              </div>

              {/* Quick categories */}
              <div className="hidden lg:flex space-x-4 text-sm">
                <span className="text-gray-500">Quick:</span>
                <a href="#" className="text-purple-600 hover:underline">Electronics</a>
                <a href="#" className="text-purple-600 hover:underline">Fashion</a>
                <a href="#" className="text-purple-600 hover:underline">Home</a>
              </div>
            </nav>
          </div>
        </div>
      </header>
      
      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
};

export default ExtraordinaryHeader;