import React, { useEffect, useState } from 'react';
import axios from 'axios';

function VendorListWithProducts() {
  const [vendors, setVendors] = useState([]);
  const [selectedVendorId, setSelectedVendorId] = useState(null);
  const [products, setProducts] = useState([]);

  const fetchVendors = async () => {
    try {
      const res = await axios.get('https://gocart-gqbi.onrender.com/vendors');
      setVendors(res.data.data);
    } catch (error) {
      console.error('Error fetching vendors:', error);
    }
  };

  const fetchVendorProducts = async (vendorId) => {
    try {
      const res = await axios.get(`https://gocart-gqbi.onrender.com/products?vendorId=${vendorId}`);
      setProducts(res.data.data || []);
      setSelectedVendorId(vendorId);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  useEffect(() => {
    fetchVendors();
  }, []);

  return (
    <div className="bg-gray-900 text-white min-h-screen p-6">
      <h1 className="text-3xl font-bold mb-6 text-white">Vendor List</h1>

      <div className="overflow-x-auto bg-gray-800 rounded shadow mb-8">
        <table className="w-full text-sm">
          <thead className="bg-gray-700 text-gray-200">
            <tr>
              <th className="text-left px-4 py-2">Shop</th>
              <th className="text-left px-4 py-2">Name</th>
              <th className="text-left px-4 py-2">Mobile</th>
              <th className="text-left px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {vendors.map(v => (
              <tr key={v._id} className="border-t border-gray-700 hover:bg-gray-700">
                <td className="px-4 py-2">{v.shopName}</td>
                <td className="px-4 py-2">{v.name}</td>
                <td className="px-4 py-2">{v.mobile_number}</td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => fetchVendorProducts(v._id)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-xs"
                  >
                    View Products
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Product section */}
      {selectedVendorId && (
        <div>
          <h2 className="text-2xl font-semibold mb-4">Products</h2>
          {products.length === 0 ? (
            <p className="text-gray-400">No products found for this vendor.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {products.map(p => (
                <div key={p._id} className="bg-gray-800 p-4 rounded shadow">
                  <h3 className="text-lg font-semibold mb-1">{p.product_name}</h3>
                  <p className="text-gray-400 mb-1">Price: ₹{p.product_price}</p>
                  <p className="text-gray-400 mb-1">Category: {p.product_category}</p>
                  {p.product_image && (
                    <img
                      src={p.product_image}
                      alt={p.product_name}
                      className="w-full h-40 object-cover rounded mt-2"
                    />
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default VendorListWithProducts;
