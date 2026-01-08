import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import { getImageUrl } from '../utils/imageUtils';

const CartPage = () => {
  const { cartItems, removeFromCart, updateQty, clearCart, getCartTotal } = useCart();
  const { user } = useAuth();

  const handleCheckout = () => {
    if (!user) {
      toast.error('Please login to checkout');
      return;
    }

    if (cartItems.length === 0) {
      toast.error('Your cart is empty');
      return;
    }

    clearCart();
    toast.success('Order placed successfully!');
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-white py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-apple-text mb-4">Your Cart</h1>
          <p className="text-xl text-gray-600 mb-8">Your cart is empty</p>
          <Link
            to="/"
            className="inline-block px-6 py-3 bg-apple-blue text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-apple-text mb-8">Your Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <div
                key={item._id}
                className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 flex flex-col md:flex-row gap-6"
              >
                <div className="w-full md:w-32 h-32 bg-apple-gray rounded-lg overflow-hidden flex-shrink-0">
                  <img
                    src={getImageUrl(item.image)}
                    alt={item.name}
                    className="w-full h-full object-contain p-2"
                  />
                </div>

                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <Link
                      to={`/product/${item._id}`}
                      className="text-xl font-semibold text-apple-text hover:text-apple-blue"
                    >
                      {item.name}
                    </Link>
                    <p className="text-gray-600 text-sm mt-1">{item.brand}</p>
                  </div>

                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center space-x-3">
                      <label className="text-sm text-gray-600">Qty:</label>
                      <select
                        value={item.qty}
                        onChange={(e) => updateQty(item._id, Number(e.target.value))}
                        className="border border-gray-300 rounded-lg px-3 py-1 focus:outline-none focus:ring-2 focus:ring-apple-blue"
                      >
                        {[...Array(Math.min(item.countInStock, 10))].map((_, i) => (
                          <option key={i + 1} value={i + 1}>
                            {i + 1}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="text-right">
                      <p className="text-xl font-bold text-apple-text">
                        ${(item.price * item.qty).toFixed(2)}
                      </p>
                      <button
                        onClick={() => removeFromCart(item._id)}
                        className="text-sm text-red-600 hover:underline mt-1"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-apple-gray rounded-2xl p-6 sticky top-24">
              <h2 className="text-2xl font-bold text-apple-text mb-6">Order Summary</h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>${getCartTotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                <div className="border-t border-gray-300 pt-4 flex justify-between text-xl font-bold text-apple-text">
                  <span>Total</span>
                  <span>${getCartTotal().toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                className="w-full py-4 bg-apple-blue text-white rounded-lg font-semibold hover:bg-blue-600 transition-colors mb-4"
              >
                Checkout
              </button>

              <Link
                to="/"
                className="block text-center text-apple-blue hover:underline"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;





