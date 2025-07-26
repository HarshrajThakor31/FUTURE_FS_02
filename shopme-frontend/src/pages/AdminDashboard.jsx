import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AdminDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [activeTab, setActiveTab] = useState('orders');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/admin/login');
      return;
    }
    fetchData();
  }, [navigate]);

  const fetchData = async () => {
    try {
      const [ordersRes, productsRes] = await Promise.all([
        axios.get('https://your-backend-url.herokuapp.com/api/simple-admin/orders'),
        axios.get('https://your-backend-url.herokuapp.com/api/simple-admin/products')
      ]);
      setOrders(ordersRes.data || []);
      setProducts(productsRes.data || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (orderId, status) => {
    try {
      await axios.put(`https://your-backend-url.herokuapp.com/api/simple-admin/orders/${orderId}/status`, 
        { status }
      );
      fetchData();
    } catch (error) {
      console.error('Error updating order:', error);
    }
  };

  const updateProduct = async (productId, productData) => {
    try {
      await axios.put(`https://your-backend-url.herokuapp.com/api/simple-admin/products/${productId}`, 
        productData
      );
      fetchData();
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  if (loading) return <div className="p-8">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
            <button
              onClick={() => {
                localStorage.removeItem('token');
                navigate('/admin/login');
              }}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <nav className="flex space-x-8">
            <button
              onClick={() => setActiveTab('orders')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'orders'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Orders ({orders.length})
            </button>
            <button
              onClick={() => setActiveTab('products')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'products'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Products ({products.length})
            </button>
          </nav>
        </div>

        {activeTab === 'orders' && (
          <div className="space-y-6">
            {orders.map((order) => (
              <div key={order.id} className="bg-white shadow rounded-lg p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Order #{order.id}</h3>
                    <p className="text-sm text-gray-600">Customer: {order.user_name}</p>
                    <p className="text-sm text-gray-600">Email: {order.user_email}</p>
                    <p className="text-sm text-gray-600">Date: {new Date(order.created_at).toLocaleDateString()}</p>
                  </div>
                  <div className="text-right">
                    <p className={`px-3 py-1 rounded-full text-sm font-medium mb-2 ${
                      order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                      order.status === 'confirmed' ? 'bg-blue-100 text-blue-800' :
                      order.status === 'preparing' ? 'bg-orange-100 text-orange-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </p>
                    <p className="text-lg font-bold text-gray-900">${order.total_amount}</p>
                  </div>
                </div>
                
                {/* Order Items */}
                <div className="border-t pt-4 mb-4">
                  <h4 className="font-medium text-gray-900 mb-3">Items Ordered:</h4>
                  <div className="space-y-2">
                    {order.items && order.items.map((item, index) => (
                      <div key={index} className="flex justify-between items-center py-2 px-3 bg-gray-50 rounded">
                        <div>
                          <span className="font-medium">{item.product_name}</span>
                          <span className="text-gray-600 ml-2">x{item.quantity}</span>
                        </div>
                        <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Shipping Details */}
                {(order.shipping_address || order.phone) && (
                  <div className="border-t pt-4 mb-4">
                    <h4 className="font-medium text-gray-900 mb-2">Shipping Details:</h4>
                    {order.shipping_address && (
                      <p className="text-sm text-gray-600 mb-1">
                        <span className="font-medium">Address:</span> {order.shipping_address}
                      </p>
                    )}
                    {order.phone && (
                      <p className="text-sm text-gray-600">
                        <span className="font-medium">Phone:</span> {order.phone}
                      </p>
                    )}
                  </div>
                )}
                
                {/* Status Update */}
                <div className="border-t pt-4">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-gray-900">Update Status:</span>
                    <select
                      value={order.status}
                      onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                      className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="pending">Pending</option>
                      <option value="confirmed">Confirmed</option>
                      <option value="preparing">Preparing</option>
                      <option value="delivered">Delivered</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'products' && (
          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 p-6">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onUpdate={updateProduct}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const ProductCard = ({ product, onUpdate }) => {
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: product.name,
    price: product.price,
    description: product.description,
    stock_quantity: product.stock_quantity,
    is_active: product.is_active
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(product.id, formData);
    setEditing(false);
  };

  return (
    <div className="border rounded-lg p-4">
      {editing ? (
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            className="w-full p-2 border rounded"
            placeholder="Product name"
          />
          <input
            type="number"
            step="0.01"
            value={formData.price}
            onChange={(e) => setFormData({...formData, price: e.target.value})}
            className="w-full p-2 border rounded"
            placeholder="Price"
          />
          <input
            type="number"
            value={formData.stock_quantity}
            onChange={(e) => setFormData({...formData, stock_quantity: e.target.value})}
            className="w-full p-2 border rounded"
            placeholder="Stock"
          />
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={formData.is_active}
              onChange={(e) => setFormData({...formData, is_active: e.target.checked})}
              className="mr-2"
            />
            Active
          </label>
          <div className="flex gap-2">
            <button type="submit" className="bg-blue-600 text-white px-3 py-1 rounded">Save</button>
            <button type="button" onClick={() => setEditing(false)} className="bg-gray-300 px-3 py-1 rounded">Cancel</button>
          </div>
        </form>
      ) : (
        <div>
          <h3 className="font-semibold">{product.name}</h3>
          <p className="text-gray-600">${product.price}</p>
          <p className="text-sm text-gray-500">Stock: {product.stock_quantity}</p>
          <p className={`text-sm ${product.is_active ? 'text-green-600' : 'text-red-600'}`}>
            {product.is_active ? 'Active' : 'Inactive'}
          </p>
          <button
            onClick={() => setEditing(true)}
            className="mt-2 bg-blue-600 text-white px-3 py-1 rounded text-sm"
          >
            Edit
          </button>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;