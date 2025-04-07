import React, { useEffect, useState } from 'react';
import axios from 'axios';

function VendorManagement() {
  const [vendors, setVendors] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const fetchVendors = async () => {
    try {
      const res = await axios.get('https://gocart-gqbi.onrender.com/vendors');
      setVendors(res.data.data);
    } catch (error) {
      console.error('Error fetching vendors:', error);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await axios.put(`https://gocart-gqbi.onrender.com/vendors/${id}`, { status });
      fetchVendors();
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  useEffect(() => {
    fetchVendors();
  }, []);

  const filteredVendors = vendors.filter(v => {
    const matchesSearch =
      v.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      v.city?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || v.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const statusBadge = (status) => {
    const base = "px-2 py-1 rounded-full text-xs text-white";
    if (status === 'approved') return <span className={`${base} bg-green-600`}>Approved</span>;
    if (status === 'rejected') return <span className={`${base} bg-red-600`}>Rejected</span>;
    return <span className={`${base} bg-yellow-500 text-black`}>Pending</span>;
  };

  return (
    <div className="p-6 bg-gray-900 text-white min-h-screen">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
        <h1 className="text-2xl font-semibold text-white">Vendor Management</h1>

        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Search by name or city..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-3 py-2 bg-gray-800 text-white border border-gray-700 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-400"
          />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 bg-gray-800 text-white border border-gray-700 rounded-md shadow-sm"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto bg-gray-800 border border-gray-700 shadow rounded">
        <table className="w-full text-sm text-gray-300">
          <thead className="bg-gray-700 text-gray-200">
            <tr>
              <th className="px-4 py-2 text-left">Shop</th>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Mobile</th>
              <th className="px-4 py-2 text-left">City</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left">Aadhar</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredVendors.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center text-gray-400 py-8">No vendors found</td>
              </tr>
            ) : (
              filteredVendors.map(v => (
                <tr key={v._id} className="border-t border-gray-700 hover:bg-gray-700">
                  <td className="px-4 py-2">{v.shopName}</td>
                  <td className="px-4 py-2">{v.name}</td>
                  <td className="px-4 py-2">{v.mobile_number}</td>
                  <td className="px-4 py-2">{v.city}</td>
                  <td className="px-4 py-2">{statusBadge(v.status)}</td>
                  <td className="px-4 py-2 space-x-2">
                    <a href={v.addhar_front_image} target="_blank" rel="noreferrer" className="text-blue-400 underline">Front</a>
                    <a href={v.aadhar_back_image} target="_blank" rel="noreferrer" className="text-blue-400 underline">Back</a>
                  </td>
                  <td className="px-4 py-2 space-x-2">
                    {v.status !== 'approved' && (
                      <button
                        onClick={() => updateStatus(v._id, 'approved')}
                        className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-xs"
                      >
                        Approve
                      </button>
                    )}
                    {v.status !== 'rejected' && (
                      <button
                        onClick={() => updateStatus(v._id, 'rejected')}
                        className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-xs"
                      >
                        Reject
                      </button>
                    )}
                    <button
                      onClick={() => alert(JSON.stringify(v, null, 2))}
                      className="bg-gray-600 hover:bg-gray-700 text-white px-3 py-1 rounded text-xs"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default VendorManagement;
