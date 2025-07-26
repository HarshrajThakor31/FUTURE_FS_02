import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

import axios from 'axios';

const ProductGrid = ({ filters }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const { addToCart } = useCart();
  const { user } = useAuth();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:8001/api/products');
      console.log('Fetched products:', response.data.length);
      setProducts(response.data || []);
    } catch (error) {
      console.error('Error fetching products:', error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async (product) => {
    if (!user) {
      alert('Please sign in to add items to cart');
      return;
    }
    try {
      await addToCart(product.id);
      alert('Added to cart!');
    } catch (error) {
      alert('Failed to add item to cart. Please try again.');
    }
  };

  const displayProducts = products.filter(product => {
    // Only apply search filter if there's a search query
    const searchMatch = !filters?.searchQuery || 
      product.name.toLowerCase().includes(filters.searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(filters.searchQuery.toLowerCase());
    
    return searchMatch;
  });
  
  console.log('Total products:', products.length, 'Display products:', displayProducts.length);
  
  if (products.length === 0 && !loading) {
    return <div className="text-center py-8">No products available</div>;
  }

  if (loading) return <div className="text-center py-8">Loading products...</div>;

  return (
    <div className="container mx-auto px-4 py-6">


      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {displayProducts.length === 0 ? (
          <div className="col-span-full text-center py-8 text-gray-500">
            {filters?.searchQuery ? 'No products found matching your search' : 'No products available'}
          </div>
        ) : (
          displayProducts.map((product) => (
          <div key={product.id} className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow p-4">
            <div className="relative mb-4">
              <img 
                src={product.image} 
                alt={product.name} 
                className="w-full h-48 object-cover rounded"
                onError={(e) => {
                  e.target.src = `https://via.placeholder.com/400x300/4F46E5/FFFFFF?text=${encodeURIComponent(product.name)}`;
                }}
              />
              {product.category === 'popular' && (
                <span className="absolute top-2 left-2 bg-orange-500 text-white px-2 py-1 text-xs rounded">
                  Popular
                </span>
              )}

            </div>
            
            <h3 className="font-semibold text-lg mb-2 line-clamp-2">{product.name}</h3>
            <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
            
            <div className="flex items-center mb-3">
              <div className="flex text-yellow-400">
                ★★★★☆
              </div>
              <span className="text-gray-500 text-sm ml-2">(127)</span>
            </div>
            
            <div className="flex items-center justify-between mb-4">
              <div>
                <span className="text-2xl font-bold text-red-600">${product.price}</span>
                <div className="text-sm text-gray-500">Stock: {product.stock_quantity}</div>
              </div>
            </div>
            
            <button
              onClick={() => handleAddToCart(product)}
              disabled={product.stock_quantity === 0}
              className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-2 px-4 rounded disabled:bg-gray-300 disabled:cursor-not-allowed"
            >
              {product.stock_quantity === 0 ? 'Out of Stock' : 'Add to Cart'}
            </button>
            
            <div className="mt-2 text-xs text-gray-500">
              FREE delivery tomorrow
            </div>
          </div>
        ))
        )}
      </div>
    </div>
  );
};

export default ProductGrid;