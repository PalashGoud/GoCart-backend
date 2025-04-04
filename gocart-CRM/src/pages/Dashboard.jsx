import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Dashboard() {
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalVendors, setTotalVendors] = useState(0);
  const [orders, setOrders] = useState(0);
  const [transportBookings, setTransportBookings] = useState(0);
  const [totalEarnings, setTotalEarnings] = useState(0);

  useEffect(() => {
    // Fetch total users
    axios.get('https://gocart-gqbi.onrender.com/users')
      .then(response => setTotalUsers(response.data.data.length))
      .catch(error => console.error('Error fetching users:', error));

    // Fetch total vendors
    axios.get('https://gocart-gqbi.onrender.com/vendors')
      .then(response => setTotalVendors(response.data.data.length))
      .catch(error => console.error('Error fetching vendors:', error));

    // Fetch orders, transport bookings, and total earnings
    // Replace the URLs below with the actual endpoints when available
    axios.get('https://gocart-gqbi.onrender.com/orders')
      .then(response => {
        setOrders(response.data.data.length);
        // Assuming each order has an 'amount' field
        const earnings = response.data.data.reduce((sum, order) => sum + order.amount, 0);
        setTotalEarnings(earnings);
      })
      .catch(error => console.error('Error fetching orders:', error));

    axios.get('https://gocart-gqbi.onrender.com/transportbookings')
      .then(response => setTransportBookings(response.data.data.length))
      .catch(error => console.error('Error fetching transport bookings:', error));
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-6 rounded-lg shadow-md mb-6">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="text-sm">Manage users, orders, transport, and more.</p>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-6">
        {[
          { title: 'Total Users', count: totalUsers, color: 'bg-blue-500' },
          { title: 'Total Vendors', count: totalVendors, color: 'bg-green-500' },
          { title: 'Orders', count: orders, color: 'bg-yellow-500' },
          { title: 'Transport Bookings', count: transportBookings, color: 'bg-purple-500' },
          { title: 'Total Earnings', count: `$${totalEarnings.toFixed(2)}`, color: 'bg-indigo-500' },
        ].map((item, index) => (
          <div
            key={index}
            className={`${item.color} text-white p-6 rounded-lg shadow-md transform transition duration-300 hover:scale-105`}
          >
            <h2 className="text-lg font-semibold">{item.title}</h2>
            <p className="text-2xl font-bold">{item.count}</p>
          </div>
        ))}
      </div>

      {/* Additional sections like tables for User Management, Orders, etc., can be added here */}
    </div>
  );
}

export default Dashboard;
