import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';
import { getImageUrl } from '../../utils/imageUtils';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || !user.isAdmin) {
      navigate('/');
      return;
    }

    fetchProducts();
  }, [user, navigate]);

  const fetchProducts = async () => {
    try {
      const { data } = await axios.get('http://localhost:5000/api/products');
      setProducts(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching products:', error);
      toast.error('Failed to fetch products');
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) {
      return;
    }

    try {
      await axios.delete(`http://localhost:5000/api/products/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      toast.success('Product deleted successfully');
      fetchProducts();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to delete product');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-xl text-gray-600">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-bold text-apple-text">Admin Dashboard</h1>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => navigate('/admin/products/create')}
              className="px-4 py-2 bg-apple-blue text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              + Create Product
            </button>
            <button
              onClick={() => navigate('/')}
              className="px-4 py-2 text-apple-blue hover:underline"
            >
              ← Back to Store
            </button>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-apple-gray">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-apple-text">Image</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-apple-text">Name</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-apple-text">Brand</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-apple-text">Category</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-apple-text">Price</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-apple-text">Stock</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-apple-text">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {products.map((product) => (
                  <tr key={product._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <img
                        src={getImageUrl(product.image)}
                        alt={product.name}
                        className="w-16 h-16 object-contain bg-apple-gray rounded-lg"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-apple-text">{product.name}</div>
                      <div className="text-sm text-gray-500 line-clamp-2 max-w-xs">
                        {product.description}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-600">{product.brand}</td>
                    <td className="px-6 py-4 text-gray-600">{product.category}</td>
                    <td className="px-6 py-4 font-semibold text-apple-text">${product.price}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          product.countInStock > 0
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {product.countInStock}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => navigate(`/admin/products/edit/${product._id}`)}
                          className="px-4 py-2 bg-apple-blue text-white rounded-lg hover:bg-blue-600 transition-colors text-sm"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(product._id)}
                          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {products.length === 0 && (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600">No products found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductList;

