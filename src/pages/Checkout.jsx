import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Checkout = () => {
  const navigate = useNavigate();
  const [address, setAddress] = useState({
    address: '',
    city: '',
    postalCode: '',
    country: 'India'
  });
  const [paymentMethod, setPaymentMethod] = useState('Cash on Delivery');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const pendingOrder = sessionStorage.getItem('pendingOrder');

    if (!pendingOrder) {
      alert('No order data found. Please go back to product.');
      navigate('/shop');
      return;
    }

    const orderData = {
      ...JSON.parse(pendingOrder),
      shippingAddress: address,
      paymentMethod
    };

    try {
      setLoading(true);

      const token = localStorage.getItem('userToken');

      // 🔥 FIXED API URL (IMPORTANT)
      const { data } = await axios.post(
        "https://moti-jewellery-backend.onrender.com/api/orders",
        orderData,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      alert('Order placed successfully!');
      sessionStorage.removeItem('pendingOrder');
      navigate('/my-orders');

    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || 'Order failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-20 min-h-screen bg-pinkBg">
      <div className="max-w-2xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-playfair font-bold mb-6 text-secondary">Checkout</h1>

        <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-xl shadow">

          <div>
            <label className="block text-sm font-medium mb-1">Address</label>
            <input
              type="text"
              name="address"
              value={address.address}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">City</label>
            <input
              type="text"
              name="city"
              value={address.city}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Postal Code</label>
            <input
              type="text"
              name="postalCode"
              value={address.postalCode}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Country</label>
            <input
              type="text"
              name="country"
              value={address.country}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Payment Method</label>
            <select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="Cash on Delivery">Cash on Delivery</option>
              <option value="Online Payment">Online Payment</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-secondary hover:bg-primary text-white py-3 rounded-lg font-semibold disabled:opacity-50"
          >
            {loading ? 'Placing Order...' : 'Confirm Order'}
          </button>

        </form>
      </div>
    </div>
  );
};

export default Checkout;