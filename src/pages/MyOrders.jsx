import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem('userToken');
        const { data } = await axios.get('/api/orders', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setOrders(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  if (loading) return <div className="pt-20 text-center">Loading...</div>;

  return (
    <div className="pt-20 min-h-screen bg-pinkBg px-4">
      <div className="max-w-4xl mx-auto py-12">
        <h1 className="text-3xl font-playfair font-bold mb-6 text-secondary">My Orders</h1>
        {orders.length === 0 ? (
          <p>You haven't placed any orders yet.</p>
        ) : (
          <div className="space-y-6">
            {orders.map(order => (
              <div key={order._id} className="bg-white p-4 rounded-xl shadow">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-500">Order #{order._id.slice(-6)}</span>
                  <span className={`px-2 py-1 rounded text-xs ${
                    order.orderStatus === 'Delivered' ? 'bg-green-100 text-green-800' :
                    order.orderStatus === 'Shipped' ? 'bg-blue-100 text-blue-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {order.orderStatus}
                  </span>
                </div>
                <p className="text-sm">Placed on: {new Date(order.createdAt).toLocaleDateString()}</p>
                <p className="font-bold mt-2">Total: ₹{order.totalAmount}</p>
                <Link to={`/order/${order._id}`} className="text-secondary hover:underline text-sm mt-2 inline-block">
                  View Details
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyOrders;