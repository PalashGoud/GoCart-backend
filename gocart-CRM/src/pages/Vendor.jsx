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

    const matchesStatus =
      statusFilter === 'all' || v.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const statusBadge = (status) => {
    const base = "px-2 py-1 rounded-full text-xs text-white";
    if (status === 'approved') return <span className={`${base} bg-green-500`}>Approved</span>;
    if (status === 'rejected') return <span className={`${base} bg-red-500`}>Rejected</span>;
    return <span className={`${base} bg-yellow-500`}>Pending</span>;
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-semibold mb-4 text-gray-800">Vendor Management</h1>

      {/* Filters */}
      <div className="mb-4 flex flex-wrap gap-4 items-center">
        <input
          type="text"
          placeholder="Search by name or city"
          className="w-64 px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <select
          className="px-3 py-2 border rounded shadow-sm"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="all">All Status</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white shadow rounded">
        <table className="w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="text-left px-4 py-2">Shop</th>
              <th className="text-left px-4 py-2">Name</th>
              <th className="text-left px-4 py-2">Mobile</th>
              <th className="text-left px-4 py-2">City</th>
              <th className="text-left px-4 py-2">Status</th>
              <th className="text-left px-4 py-2">Aadhar</th>
              <th className="text-left px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredVendors.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center text-gray-500 py-8">No vendors found</td>
              </tr>
            ) : (
              filteredVendors.map(v => (
                <tr key={v._id} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-2">{v.shopName}</td>
                  <td className="px-4 py-2">{v.name}</td>
                  <td className="px-4 py-2">{v.mobile_number}</td>
                  <td className="px-4 py-2">{v.city}</td>
                  <td className="px-4 py-2">{statusBadge(v.status)}</td>
                  <td className="px-4 py-2 space-x-2">
                    <a href={v.addhar_front_image} target="_blank" rel="noreferrer" className="text-blue-500 underline">Front</a>
                    <a href={v.aadhar_back_image} target="_blank" rel="noreferrer" className="text-blue-500 underline">Back</a>
                  </td>
                  <td className="px-4 py-2 space-x-2">
                    {v.status !== 'approved' && (
                      <button
                        onClick={() => updateStatus(v._id, 'approved')}
                        className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-xs"
                      >
                        Approve
                      </button>
                    )}
                    {v.status !== 'rejected' && (
                      <button
                        onClick={() => updateStatus(v._id, 'rejected')}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs"
                      >
                        Reject
                      </button>
                    )}
                    <button
                      onClick={() => alert(JSON.stringify(v, null, 2))}
                      className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-1 rounded text-xs"
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
