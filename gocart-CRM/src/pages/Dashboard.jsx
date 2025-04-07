import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Dashboard() {
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalVendors, setTotalVendors] = useState(0);
  const [orders, setOrders] = useState(0);
  const [transportBookings, setTransportBookings] = useState(0);
  const [totalEarnings, setTotalEarnings] = useState(0);

  useEffect(() => {
    axios.get('https://gocart-gqbi.onrender.com/users')
      .then(response => setTotalUsers(response.data.data.length))
      .catch(error => console.error('Error fetching users:', error));

    axios.get('https://gocart-gqbi.onrender.com/vendors')
      .then(response => setTotalVendors(response.data.data.length))
      .catch(error => console.error('Error fetching vendors:', error));

    axios.get('https://gocart-gqbi.onrender.com/orders')
      .then(response => {
        setOrders(response.data.data.length);
        const earnings = response.data.data.reduce((sum, order) => sum + order.amount, 0);
        setTotalEarnings(earnings);
      })
      .catch(error => console.error('Error fetching orders:', error));

    axios.get('https://gocart-gqbi.onrender.com/transportbookings')
      .then(response => setTransportBookings(response.data.data.length))
      .catch(error => console.error('Error fetching transport bookings:', error));
  }, []);

  return (
    <div className="p-6 bg-[#161928] min-h-screen">
      {/* Header */}
      <div className="bg-[#1A1E30] text-white p-6 rounded-lg shadow-md mb-6">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="text-sm text-gray-400">Manage users, orders, transport, and more.</p>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-6">
        <div className="bg-[#1A1E30] text-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-gray-400">Total Users</h2>
          <p className="text-2xl font-bold text-blue-600">{totalUsers}</p>
        </div>
        <div className="bg-[#18221E] text-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-gray-400">Total Vendors</h2>
          <p className="text-2xl font-bold text-green-400">{totalVendors}</p>
        </div>
        <div className="bg-[#212317] text-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-gray-400">Orders</h2>
          <p className="text-2xl font-bold text-yellow-600">{orders}</p>
        </div>
        <div className="bg-[#211622] text-white p-6 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold text-gray-400">Transport Bookings</h2>
          <p className="text-2xl font-bold text-purple-400">{transportBookings}</p>
        </div>
        <div className="bg-[#403159] text-white p-6 rounded-lg shadow-md md:col-span-2 lg:col-span-1">
          <h2 className="text-lg font-semibold text-gray-400">Total Earnings</h2>
          <p className="text-2xl font-bold text-green-400">${totalEarnings.toFixed(2)}</p>
        </div>
      </div>

      {/* Add more sections here if needed */}
    </div>
  );
}

export default Dashboard;
