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
    <div className="p-6 bg-[#161928] min-h-screen text-white">
      <h1 className="text-3xl font-bold mb-4">User Management</h1>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-4">
        <input
          type="text"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 border border-gray-300 rounded bg-[#1f2432] text-white placeholder:text-gray-400"
        />
        <select
          value={selectedRole}
          onChange={(e) => setSelectedRole(e.target.value)}
          className="p-2 border border-gray-300 rounded bg-[#1f2432] text-white"
        >
          <option value="all">All Roles</option>
          <option value="consumer">Consumer</option>
          <option value="vendor">Vendor</option>
          <option value="transporter">Transporter</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-[#26322d] rounded-lg shadow-lg">
          <thead className="bg-[#19221E] text-left">
            <tr>
              <th className="py-3 px-4">Name</th>
              <th className="py-3 px-4">Email</th>
              <th className="py-3 px-4">Role</th>
              <th className="py-3 px-4">Address</th>
              <th className="py-3 px-4">Created</th>
              <th className="py-3 px-4">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#446c5a]">
            {filteredUsers.length === 0 ? (
              <tr>
                <td colSpan="6" className="text-center text-gray-400 py-8">No users found</td>
              </tr>
            ) : (
              filteredUsers.map(user => (
                <tr key={user._id} className="hover:bg-[#1c232e]">
                  <td className="py-2 px-4">
                    {editingUserId === user._id ? (
                      <input
                        value={editedUser.name}
                        onChange={(e) => setEditedUser({ ...editedUser, name: e.target.value })}
                        className="bg-[#1f2432] border border-gray-500 text-white px-2 py-1 rounded w-full"
                      />
                    ) : (
                      user.name
                    )}
                  </td>
                  <td className="py-2 px-4">{user.email}</td>
                  <td className="py-2 px-4 capitalize">
                    {editingUserId === user._id ? (
                      <select
                        value={editedUser.role}
                        onChange={(e) => setEditedUser({ ...editedUser, role: e.target.value })}
                        className="bg-[#1f2432] border border-gray-500 text-white px-2 py-1 rounded"
                      >
                        <option value="consumer">Consumer</option>
                        <option value="vendor">Vendor</option>
                        <option value="transporter">Transporter</option>
                      </select>
                    ) : (
                      user.role
                    )}
                  </td>
                  <td className="py-2 px-4">
                    {editingUserId === user._id ? (
                      <input
                        value={editedUser.Address}
                        onChange={(e) => setEditedUser({ ...editedUser, Address: e.target.value })}
                        className="bg-[#1f2432] border border-gray-500 text-white px-2 py-1 rounded w-full"
                      />
                    ) : (
                      user.Address || '—'
                    )}
                  </td>
                  <td className="py-2 px-4">{new Date(user.createdAt).toLocaleDateString()}</td>
                  <td className="py-2 px-4 space-x-2">
                    {editingUserId === user._id ? (
                      <button
                        onClick={() => handleUpdate(user._id)}
                        className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm"
                      >
                        Save
                      </button>
                    ) : (
                      <button
                        onClick={() => handleEditClick(user)}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm"
                      >
                        Edit
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(user._id)}
                      className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm"
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
