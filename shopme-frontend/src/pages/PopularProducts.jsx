import React, { useState, useEffect } from 'react';
import ExtraordinaryHeader from '../components/ExtraordinaryHeader';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const PopularProducts = () => {
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState('all');
  const { addToCart } = useCart();
  const { user } = useAuth();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:8001/api/products');
      const popularData = response.data.map(item => ({
        ...item,
        popularity: Math.floor(Math.random() * 1000) + 500,
        trending: Math.random() > 0.7
      })).sort((a, b) => b.popularity - a.popularity);
      setProducts(popularData);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const handleAddToCart = (product) => {
    if (!user) {
      alert('Please sign in to add items to cart');
      return;
    }
    addToCart(product.id);
    alert('Added to cart!');
  };

  const filteredProducts = products.filter(product => {
    if (filter === 'trending') return product.trending;
    if (filter === 'top-rated') return product.popularity > 800;
    return true;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <ExtraordinaryHeader />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-4">🌟 Popular Products</h1>
            <p className="text-xl mb-8">Most loved by our customers</p>
          </div>
          
          {/* Filter Tabs */}
          <div className="flex justify-center gap-4">
            {[
              { key: 'all', label: 'All Popular' },
              { key: 'trending', label: '🔥 Trending' },
              { key: 'top-rated', label: '⭐ Top Rated' }
            ].map(tab => (
              <button
                key={tab.key}
                onClick={() => setFilter(tab.key)}
                className={`px-6 py-3 rounded-full font-semibold transition-all ${
                  filter === tab.key 
                    ? 'bg-white text-blue-600' 
                    : 'bg-white/20 hover:bg-white/30'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredProducts.map((product, index) => (
            <div key={product.id} className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group">
              <div className="relative">
                <img src={product.image} alt={product.name} className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300" />
                
                {/* Badges */}
                <div className="absolute top-3 left-3 flex flex-col gap-2">
                  {index < 3 && (
                    <div className="bg-gradient-to-r from-yellow-400 to-orange-400 text-black px-3 py-1 rounded-full text-xs font-bold">
                      #{index + 1} POPULAR
                    </div>
                  )}
                  {product.trending && (
                    <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                      🔥 TRENDING
                    </div>
                  )}
                </div>
                
                {/* Popularity Score */}
                <div className="absolute top-3 right-3 bg-black/70 text-white px-2 py-1 rounded text-xs">
                  {product.popularity} sold
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="font-bold text-xl mb-2 line-clamp-2">{product.name}</h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>
                
                <div className="flex items-center mb-4">
                  <div className="flex text-yellow-400 text-lg">★★★★★</div>
                  <span className="text-gray-500 text-sm ml-2">({product.popularity})</span>
                </div>
                
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl font-bold text-blue-600">${product.price}</span>
                  <div className="text-sm text-gray-500">Stock: {product.stock_quantity}</div>
                </div>
                
                <button
                  onClick={() => handleAddToCart(product)}
                  disabled={product.stock_quantity === 0}
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 px-4 rounded-xl font-semibold hover:from-blue-600 hover:to-purple-600 transition-all transform hover:scale-105 disabled:bg-gray-300"
                >
                  {product.stock_quantity === 0 ? 'Out of Stock' : 'Add to Cart'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PopularProducts;