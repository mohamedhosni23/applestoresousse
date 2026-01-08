import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../context/CartContext';
import toast from 'react-hot-toast';
import { getImageUrl } from '../utils/imageUtils';

const ProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [qty, setQty] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(`http://localhost:5000/api/products/${id}`);
        setProduct(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching product:', error);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    if (product.countInStock === 0) {
      toast.error('Product is out of stock');
      return;
    }

    if (qty > product.countInStock) {
      toast.error(`Only ${product.countInStock} items available`);
      return;
    }

    addToCart(product, qty);
    toast.success('Added to cart!');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-xl text-gray-600">Loading...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-gray-600 mb-4">Product not found</p>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-2 bg-apple-blue text-white rounded-lg hover:bg-blue-600"
          >
            Go Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="text-apple-blue mb-6 hover:underline"
        >
          ← Back
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="bg-apple-gray rounded-2xl p-8">
            <img
              src={getImageUrl(product.image)}
              alt={product.name}
              className="w-full h-full object-contain"
            />
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-4xl font-bold text-apple-text mb-2">
                {product.name}
              </h1>
              <p className="text-gray-600 text-lg">{product.brand}</p>
            </div>

            <div>
              <p className="text-3xl font-bold text-apple-text mb-4">
                ${product.price}
              </p>
              <p className="text-gray-700 leading-relaxed">
                {product.description}
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <span className="text-sm text-gray-600">Category: </span>
                <span className="text-apple-text font-medium">{product.category}</span>
              </div>
              <div>
                <span className="text-sm text-gray-600">Stock: </span>
                <span className={`font-medium ${product.countInStock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {product.countInStock > 0 ? `${product.countInStock} available` : 'Out of Stock'}
                </span>
              </div>
            </div>

            {product.countInStock > 0 && (
              <div className="flex items-center space-x-4">
                <label className="text-sm font-medium text-gray-700">Quantity:</label>
                <select
                  value={qty}
                  onChange={(e) => setQty(Number(e.target.value))}
                  className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-apple-blue"
                >
                  {[...Array(Math.min(product.countInStock, 10))].map((_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <button
              onClick={handleAddToCart}
              disabled={product.countInStock === 0}
              className={`w-full py-4 rounded-lg font-semibold text-white transition-colors ${
                product.countInStock === 0
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-apple-blue hover:bg-blue-600'
              }`}
            >
              {product.countInStock === 0 ? 'Out of Stock' : 'Add to Cart'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;





