import React, { useState } from 'react';
import ExtraordinaryHeader from '../components/ExtraordinaryHeader';
import HeroBanner from '../components/HeroBanner';
import Sidebar from '../components/Sidebar';
import ProductGrid from '../components/ProductGrid';

const AmazonHome = () => {
  const [filters, setFilters] = useState({
    categories: [],
    priceRange: [0, 50],
    searchQuery: ''
  });

  const handleFilterChange = (newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const handleSearch = (searchQuery) => {
    setFilters(prev => ({ ...prev, searchQuery }));
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <ExtraordinaryHeader onSearch={handleSearch} />
      <HeroBanner />
      
      <div className="container mx-auto px-4 py-6">
        <div className="flex gap-6">
          <Sidebar onFilterChange={handleFilterChange} />
          <div className="flex-1">
            <ProductGrid filters={filters} />
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 mt-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h4 className="font-bold mb-4">Get to Know Us</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-orange-400">About ShopMe</a></li>
                <li><a href="#" className="hover:text-orange-400">Careers</a></li>
                <li><a href="#" className="hover:text-orange-400">Press Releases</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Make Money with Us</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-orange-400">Sell on ShopMe</a></li>
                <li><a href="#" className="hover:text-orange-400">Become an Affiliate</a></li>
                <li><a href="#" className="hover:text-orange-400">Advertise Your Products</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Payment Products</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-orange-400">ShopMe Rewards</a></li>
                <li><a href="#" className="hover:text-orange-400">ShopMe Credit Card</a></li>
                <li><a href="#" className="hover:text-orange-400">Shop with Points</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Let Us Help You</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-orange-400">Your Account</a></li>
                <li><a href="#" className="hover:text-orange-400">Your Orders</a></li>
                <li><a href="#" className="hover:text-orange-400">Shipping Rates</a></li>
                <li><a href="#" className="hover:text-orange-400">Returns</a></li>
                <li><a href="#" className="hover:text-orange-400">Help</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-8 pt-8 text-center">
            <div className="text-2xl font-bold text-orange-400 mb-4">ShopMe</div>
            <p className="text-sm text-gray-400">
              © 2024 ShopMe.com, Inc. or its affiliates
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AmazonHome;