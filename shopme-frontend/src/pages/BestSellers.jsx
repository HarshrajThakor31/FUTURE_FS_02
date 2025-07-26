import React, { useState, useEffect } from 'react';
import ExtraordinaryHeader from '../components/ExtraordinaryHeader';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const BestSellers = () => {
  const [products, setProducts] = useState([]);
  const [viewMode, setViewMode] = useState('grid');
  const { addToCart } = useCart();
  const { user } = useAuth();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:8001/api/products');
      const bestSellers = response.data.map((item, index) => ({
        ...item,
        salesCount: Math.floor(Math.random() * 5000) + 1000,
        rank: index + 1,
        growth: Math.floor(Math.random() * 50) + 10,
        badge: index < 3 ? ['🥇', '🥈', '🥉'][index] : null
      })).sort((a, b) => b.salesCount - a.salesCount);
      setProducts(bestSellers);
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-amber-50">
      <ExtraordinaryHeader />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-yellow-500 to-amber-500 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-5xl font-bold mb-4">🏆 Best Sellers</h1>
            <p className="text-xl">Top performing products this month</p>
          </div>
          
          {/* View Toggle */}
          <div className="flex justify-center gap-2">
            <button
              onClick={() => setViewMode('grid')}
              className={`px-6 py-2 rounded-l-lg font-medium transition-all ${
                viewMode === 'grid' ? 'bg-white text-yellow-600' : 'bg-white/20'
              }`}
            >
              Grid View
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`px-6 py-2 rounded-r-lg font-medium transition-all ${
                viewMode === 'list' ? 'bg-white text-yellow-600' : 'bg-white/20'
              }`}
            >
              Ranking List
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {viewMode === 'grid' ? (
          /* Grid View */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <div key={product.id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all overflow-hidden relative">
                {/* Rank Badge */}
                <div className="absolute top-3 left-3 z-10">
                  <div className="bg-gradient-to-r from-yellow-400 to-amber-400 text-black px-3 py-1 rounded-full text-sm font-bold">
                    {product.badge || `#${product.rank}`}
                  </div>
                </div>
                
                <div className="relative">
                  <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
                  <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-xs">
                    {product.salesCount} sold
                  </div>
                </div>
                
                <div className="p-4">
                  <h3 className="font-bold text-lg mb-2">{product.name}</h3>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
                  
                  <div className="flex items-center mb-3">
                    <div className="flex text-yellow-400">★★★★★</div>
                    <span className="text-gray-500 text-sm ml-2">(4.8)</span>
                  </div>
                  
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-bold text-amber-600">${product.price}</span>
                    <div className="text-green-600 text-sm font-medium">+{product.growth}% ↗</div>
                  </div>
                  
                  <button
                    onClick={() => handleAddToCart(product)}
                    disabled={product.stock_quantity === 0}
                    className="w-full bg-gradient-to-r from-yellow-500 to-amber-500 text-white py-2 px-4 rounded-lg font-semibold hover:from-yellow-600 hover:to-amber-600 transition-all disabled:bg-gray-300"
                  >
                    {product.stock_quantity === 0 ? 'Out of Stock' : 'Add to Cart'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* List View */
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="bg-gradient-to-r from-yellow-500 to-amber-500 text-white p-4">
              <h2 className="text-2xl font-bold">Sales Ranking</h2>
            </div>
            
            {products.map((product, index) => (
              <div key={product.id} className={`flex items-center p-6 border-b hover:bg-gray-50 transition-colors ${index < 3 ? 'bg-yellow-50' : ''}`}>
                {/* Rank */}
                <div className="w-16 text-center">
                  <div className={`text-3xl font-bold ${index < 3 ? 'text-yellow-600' : 'text-gray-400'}`}>
                    {product.badge || product.rank}
                  </div>
                </div>
                
                {/* Product Image */}
                <div className="w-20 h-20 mx-4">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover rounded-lg" />
                </div>
                
                {/* Product Info */}
                <div className="flex-1">
                  <h3 className="font-bold text-lg mb-1">{product.name}</h3>
                  <p className="text-gray-600 text-sm mb-2">{product.description}</p>
                  <div className="flex items-center gap-4 text-sm">
                    <span className="text-green-600 font-medium">{product.salesCount} sold</span>
                    <span className="text-blue-600">+{product.growth}% growth</span>
                    <div className="flex text-yellow-400">★★★★★</div>
                  </div>
                </div>
                
                {/* Price & Action */}
                <div className="text-right">
                  <div className="text-2xl font-bold text-amber-600 mb-2">${product.price}</div>
                  <button
                    onClick={() => handleAddToCart(product)}
                    disabled={product.stock_quantity === 0}
                    className="bg-gradient-to-r from-yellow-500 to-amber-500 text-white px-6 py-2 rounded-lg font-semibold hover:from-yellow-600 hover:to-amber-600 transition-all disabled:bg-gray-300"
                  >
                    {product.stock_quantity === 0 ? 'Out of Stock' : 'Add to Cart'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BestSellers;