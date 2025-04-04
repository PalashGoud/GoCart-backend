import React, { useEffect, useState } from 'react';
import axios from 'axios';

function UserManagement() {
  const [users, setUsers] = useState([]);
  const [editingUserId, setEditingUserId] = useState(null);
  const [editedUser, setEditedUser] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('all');

  const fetchUsers = async () => {
    try {
      const res = await axios.get('https://gocart-gqbi.onrender.com/users');
      setUsers(res.data.data);
    } catch (err) {
      console.error('Error fetching users:', err);
    }
  };

  const handleEditClick = (user) => {
    setEditingUserId(user._id);
    setEditedUser({ ...user });
  };

  const handleUpdate = async (id) => {
    try {
      await axios.put(`https://gocart-gqbi.onrender.com/users/${id}`, editedUser);
      setEditingUserId(null);
      fetchUsers();
    } catch (err) {
      console.error('Update error:', err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://gocart-gqbi.onrender.com/users/${id}`);
      fetchUsers();
    } catch (err) {
      console.error('Delete error:', err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const filteredUsers = users.filter(user => {
    const matchesName = user.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = selectedRole === 'all' || user.role === selectedRole;
    return matchesName && matchesRole;
  });

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
        <h1 className="text-2xl font-semibold text-gray-800">User Management</h1>

        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Search by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
          />
          <select
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          >
            <option value="all">All Roles</option>
            <option value="consumer">Consumer</option>
            <option value="vendor">Vendor</option>
            <option value="transporter">Transporter</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto bg-white shadow rounded">
        <table className="w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-left">Role</th>
              <th className="px-4 py-2 text-left">Address</th>
              <th className="px-4 py-2 text-left">Created</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center text-gray-500 py-8">No users found</td>
              </tr>
            ) : (
              filteredUsers.map(user => (
                <tr key={user._id} className="border-t hover:bg-gray-50">
                  <td className="px-4 py-2">
                    {editingUserId === user._id ? (
                      <input
                        value={editedUser.name}
                        onChange={(e) => setEditedUser({ ...editedUser, name: e.target.value })}
                        className="border rounded px-2 py-1 w-full"
                      />
                    ) : (
                      user.name
                    )}
                  </td>
                  <td className="px-4 py-2">{user.email}</td>
                  <td className="px-4 py-2 capitalize">
                    {editingUserId === user._id ? (
                      <select
                        value={editedUser.role}
                        onChange={(e) => setEditedUser({ ...editedUser, role: e.target.value })}
                        className="border rounded px-2 py-1"
                      >
                        <option value="consumer">Consumer</option>
                        <option value="vendor">Vendor</option>
                        <option value="transporter">Transporter</option>
                      </select>
                    ) : (
                      user.role
                    )}
                  </td>
                  <td className="px-4 py-2">
                    {editingUserId === user._id ? (
                      <input
                        value={editedUser.Address}
                        onChange={(e) => setEditedUser({ ...editedUser, Address: e.target.value })}
                        className="border rounded px-2 py-1 w-full"
                      />
                    ) : (
                      user.Address || '—'
                    )}
                  </td>
                  <td className="px-4 py-2">{new Date(user.createdAt).toLocaleDateString()}</td>
                  <td className="px-4 py-2 space-x-2">
                    {editingUserId === user._id ? (
                      <button
                        onClick={() => handleUpdate(user._id)}
                        className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-xs"
                      >
                        Save
                      </button>
                    ) : (
                      <button
                        onClick={() => handleEditClick(user)}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-xs"
                      >
                        Edit
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(user._id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs"
                    >
                      Delete
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

export default UserManagement;
