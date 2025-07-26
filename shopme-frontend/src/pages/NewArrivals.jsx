import React, { useState, useEffect } from 'react';
import ExtraordinaryHeader from '../components/ExtraordinaryHeader';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const NewArrivals = () => {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const { addToCart } = useCart();
  const { user } = useAuth();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:8001/api/products');
      const newArrivals = response.data.map(item => ({
        ...item,
        isNew: true,
        arrivalDate: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000),
        preOrder: Math.random() > 0.8
      })).sort((a, b) => b.arrivalDate - a.arrivalDate);
      setProducts(newArrivals);
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

  const getDaysAgo = (date) => {
    const days = Math.floor((new Date() - date) / (1000 * 60 * 60 * 24));
    return days === 0 ? 'Today' : `${days} days ago`;
  };

  const categories = ['all', 'popular', 'product'];
  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-teal-50">
      <ExtraordinaryHeader />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-600 to-teal-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">✨ New Arrivals</h1>
          <p className="text-xl mb-8">Fresh products just landed!</p>
          
          {/* Category Pills */}
          <div className="flex justify-center gap-3 flex-wrap">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full font-medium transition-all ${
                  selectedCategory === category
                    ? 'bg-white text-green-600'
                    : 'bg-white/20 hover:bg-white/30'
                }`}
              >
                {category === 'all' ? 'All New' : category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Timeline View */}
      <div className="container mx-auto px-4 py-12">
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-green-400 to-teal-400 h-full"></div>
          
          {filteredProducts.map((product, index) => (
            <div key={product.id} className={`flex items-center mb-12 ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
              {/* Timeline Dot */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-green-500 rounded-full border-4 border-white shadow-lg z-10"></div>
              
              {/* Product Card */}
              <div className={`w-5/12 ${index % 2 === 0 ? 'pr-8' : 'pl-8'}`}>
                <div className="bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden">
                  <div className="relative">
                    <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
                    
                    {/* New Badge */}
                    <div className="absolute top-3 left-3 bg-gradient-to-r from-green-400 to-teal-400 text-white px-3 py-1 rounded-full text-sm font-bold animate-pulse">
                      NEW
                    </div>
                    
                    {product.preOrder && (
                      <div className="absolute top-3 right-3 bg-yellow-400 text-black px-3 py-1 rounded-full text-sm font-bold">
                        PRE-ORDER
                      </div>
                    )}
                  </div>
                  
                  <div className="p-6">
                    <div className="text-sm text-green-600 font-medium mb-2">
                      Added {getDaysAgo(product.arrivalDate)}
                    </div>
                    
                    <h3 className="font-bold text-xl mb-2">{product.name}</h3>
                    <p className="text-gray-600 text-sm mb-4">{product.description}</p>
                    
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-2xl font-bold text-green-600">${product.price}</span>
                      <div className="text-sm text-gray-500">Stock: {product.stock_quantity}</div>
                    </div>
                    
                    <button
                      onClick={() => handleAddToCart(product)}
                      disabled={product.stock_quantity === 0}
                      className="w-full bg-gradient-to-r from-green-500 to-teal-500 text-white py-3 px-4 rounded-xl font-semibold hover:from-green-600 hover:to-teal-600 transition-all disabled:bg-gray-300"
                    >
                      {product.preOrder ? 'Pre-Order Now' : product.stock_quantity === 0 ? 'Out of Stock' : 'Add to Cart'}
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Date Label */}
              <div className={`w-5/12 ${index % 2 === 0 ? 'pl-8 text-left' : 'pr-8 text-right'}`}>
                <div className="text-gray-500 font-medium">
                  {product.arrivalDate.toLocaleDateString()}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewArrivals;