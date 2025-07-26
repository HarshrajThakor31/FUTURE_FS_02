import React, { createContext, useContext, useReducer, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';

const WishlistContext = createContext();

const wishlistReducer = (state, action) => {
  switch (action.type) {
    case 'SET_WISHLIST':
      return { ...state, items: action.payload, loading: false };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'CLEAR_WISHLIST':
      return { ...state, items: [] };
    default:
      return state;
  }
};

export const WishlistProvider = ({ children }) => {
  const [state, dispatch] = useReducer(wishlistReducer, {
    items: [],
    loading: false
  });
  
  const { user, token } = useAuth();

  const fetchWishlist = async () => {
    if (!token) {
      dispatch({ type: 'CLEAR_WISHLIST' });
      return;
    }
    
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const response = await axios.get('http://localhost:8001/api/wishlist', {
        headers: { Authorization: `Bearer ${token}` }
      });
      dispatch({ type: 'SET_WISHLIST', payload: response.data || [] });
    } catch (error) {
      console.error('Error fetching wishlist:', error);
      dispatch({ type: 'SET_WISHLIST', payload: [] });
    }
  };

  const addToWishlist = async (productId) => {
    if (!token) return;
    
    try {
      await axios.post('http://localhost:8001/api/wishlist/add', 
        { product_id: productId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      await fetchWishlist();
    } catch (error) {
      console.error('Error adding to wishlist:', error);
    }
  };

  const removeFromWishlist = async (productId) => {
    if (!token) return;
    
    try {
      await axios.delete(`http://localhost:8001/api/wishlist/remove/${productId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      await fetchWishlist();
    } catch (error) {
      console.error('Error removing from wishlist:', error);
    }
  };

  const isInWishlist = (productId) => {
    if (!state.items || !Array.isArray(state.items)) return false;
    return state.items.some(item => item.id === parseInt(productId));
  };

  useEffect(() => {
    if (user && token) {
      fetchWishlist();
    } else {
      dispatch({ type: 'CLEAR_WISHLIST' });
    }
  }, [user, token]);

  return (
    <WishlistContext.Provider value={{
      ...state,
      addToWishlist,
      removeFromWishlist,
      isInWishlist,
      fetchWishlist
    }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};