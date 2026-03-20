import { useCart } from '../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';

const Cart = () => {
  const { cartItems, removeFromCart, clearCart } = useCart();
  const navigate = useNavigate();

  const total = cartItems.reduce(
    (sum, item) => sum + (item.product.price || 0) * item.quantity,
    0
  );

  const handleCheckout = () => {
    // Transform cart items into order format
    const orderItems = cartItems.map(item => ({
      product: item.product._id,
      quantity: item.quantity,
      customization: item.customization
    }));
    sessionStorage.setItem('pendingOrder', JSON.stringify({ items: orderItems, totalAmount: total }));
    navigate('/checkout');
  };

  if (cartItems.length === 0) {
    return <div className="pt-20 text-center">Your cart is empty.</div>;
  }

  return (
    <div className="pt-20 min-h-screen bg-pinkBg px-4">
      <div className="max-w-4xl mx-auto py-12">
        <h1 className="text-3xl font-playfair font-bold mb-6 text-secondary">Shopping Cart</h1>
        {cartItems.map(item => (
          <div key={item.product._id} className="flex items-center gap-4 border-b py-4">
            <img src={item.product.images[0]} alt={item.product.name} className="w-20 h-20 object-cover" />
            <div className="flex-1">
              <h3 className="font-semibold">{item.product.name}</h3>
              <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
              {item.customization.metal && <p className="text-sm">Metal: {item.customization.metal}</p>}
            </div>
            <button onClick={() => removeFromCart(item.product._id)} className="text-red-500">Remove</button>
          </div>
        ))}
        <div className="mt-6 text-right">
          <p className="text-xl font-bold">Total: ₹{total}</p>
          <button
            onClick={handleCheckout}
            className="mt-4 bg-secondary hover:bg-primary text-white px-6 py-2 rounded-lg"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;