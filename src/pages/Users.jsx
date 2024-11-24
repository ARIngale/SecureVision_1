import React, { useState } from 'react';
import {Home, X, Plus, Edit2, Trash2, Search, ChevronDown, ChevronUp, Filter, FilterX } from 'lucide-react';

export default function Users() {
  const [showForm, setShowForm] = useState(false);
  const [isFilter, setFilter] = useState(false);
  const [users, setUsers] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Editor', status: 'Active' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Viewer', status: 'Inactive' },
  ]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
  const [editingUser, setEditingUser] = useState(null);
  const [filterCriteria, setFilterCriteria] = useState({ role: '', status: '' });

  const toggleFilter = () => setFilter(!isFilter);

  const handleAddNew = () => {
    setShowForm(true);
    setEditingUser(null);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingUser(null);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setShowForm(true);
  };

  const handleDelete = (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      setUsers(users.filter((user) => user.id !== userId));
    }
  };

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilterCriteria(prev => ({ ...prev, [name]: value }));
  };

  const filteredUsers = users.filter(
    (user) =>
      (user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.role.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (filterCriteria.role === '' || user.role === filterCriteria.role) &&
      (filterCriteria.status === '' || user.status === filterCriteria.status)
  );

  const sortedUsers = [...filteredUsers].sort((a, b) => {
    if (sortConfig.key) {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];
      if (aValue < bValue) {
        return sortConfig.direction === 'ascending' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === 'ascending' ? 1 : -1;
      }
    }
    return 0;
  });

  return (
    <div className="space-y-6 relative text-white p-4 sm:p-6">
      <div className="flex items-center space-x-4">
          <Home className="h-8 w-8 text-gray-400" />
          <h1 className="text-3xl font-bold text-white">User</h1>
      </div>
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center space-y-4 lg:space-y-0">

      
        <div className="w-full lg:w-64">
          <div className="relative">
            <input
              type="text"
              placeholder="Search users..."
              className="w-full pl-10 pr-4 py-2 bg-black text-white placeholder-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-800"
              value={searchTerm}
              onChange={handleSearch}
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
        </div>
        <div className='flex flex-col sm:flex-row gap-4 w-full lg:w-auto'>
          <button
            className='flex items-center justify-center px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 w-full sm:w-auto'
            onClick={toggleFilter}
          >
            {!isFilter ? <Filter className="h-5 w-5 mr-2" /> : <FilterX className="h-5 w-5 mr-2" />}
            <span>Filter</span>
          </button>
          <button
            onClick={handleAddNew}
            className="flex items-center justify-center px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 w-full sm:w-auto"
          >
            <Plus className="h-5 w-5 mr-2" />
            <span>Add New User</span>
          </button>
        </div>
      </div>

      {isFilter && (
        <div className="bg-transparent p-4 rounded-lg mt-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="roleFilter" className="block text-sm font-medium text-gray-400 mb-1">Role</label>
              <select
                id="roleFilter"
                name="role"
                className="w-full bg-black text-white rounded-md p-2"
                value={filterCriteria.role}
                onChange={handleFilterChange}
              >
                <option value="">All Roles</option>
                <option value="Admin">Admin</option>
                <option value="Editor">Editor</option>
                <option value="Viewer">Viewer</option>
              </select>
            </div>
            <div>
              <label htmlFor="statusFilter" className="block text-sm font-medium text-gray-400 mb-1">Status</label>
              <select
                id="statusFilter"
                name="status"
                className="w-full bg-black text-white rounded-md p-2"
                value={filterCriteria.status}
                onChange={handleFilterChange}
              >
                <option value="">All Statuses</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>
        </div>
      )}

      <div className="overflow-x-auto bg-black rounded-lg shadow-lg">
        <table className="min-w-full divide-y divide-gray-700">
          <thead className="bg-gray-800">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('name')}>
                <div className="flex items-center">
                  Name
                  {sortConfig.key === 'name' && (
                    sortConfig.direction === 'ascending' ? (
                      <ChevronUp className="ml-1 h-4 w-4" />
                    ) : (
                      <ChevronDown className="ml-1 h-4 w-4" />
                    )
                  )}
                </div>
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider cursor-pointer hidden lg:table-cell" onClick={() => handleSort('email')}>
                <div className="flex items-center">
                  Email
                  {sortConfig.key === 'email' && (
                    sortConfig.direction === 'ascending' ? (
                      <ChevronUp className="ml-1 h-4 w-4" />
                    ) : (
                      <ChevronDown className="ml-1 h-4 w-4" />
                    )
                  )}
                </div>
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider cursor-pointer hidden lg:table-cell" onClick={() => handleSort('role')}>
                <div className="flex items-center">
                  Role
                  {sortConfig.key === 'role' && (
                    sortConfig.direction === 'ascending' ? (
                      <ChevronUp className="ml-1 h-4 w-4" />
                    ) : (
                      <ChevronDown className="ml-1 h-4 w-4" />
                    )
                  )}
                </div>
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider cursor-pointer hidden lg:table-cell" onClick={() => handleSort('status')}>
                <div className="flex items-center">
                  Status
                  {sortConfig.key === 'status' && (
                    sortConfig.direction === 'ascending' ? (
                      <ChevronUp className="ml-1 h-4 w-4" />
                    ) : (
                      <ChevronDown className="ml-1 h-4 w-4" />
                    )
                  )}
                </div>
              </th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider hidden lg:table-cell">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-black divide-y divide-gray-700">
            {sortedUsers.map((user) => (
              <tr key={user.id} className="hover:bg-gray-700 transition-colors duration-150">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="text-sm font-medium text-white">{user.name}</div>
                    <span className="lg:hidden ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-opacity-10 text-opacity-80 bg-gray-400 text-gray-300">
                      {user.status}
                    </span>
                  </div>
                  <div className="text-sm text-gray-400 lg:hidden">{user.email}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap hidden lg:table-cell">
                  <div className="text-sm text-gray-400">{user.email}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap hidden lg:table-cell">
                  <div className="text-sm text-gray-400">{user.role}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap hidden lg:table-cell">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      user.status === 'Active'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {user.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium hidden lg:table-cell">
                  <button
                    onClick={() => handleEdit(user)}
                    className="text-primary-400 hover:text-primary-200 mr-2 transition-colors duration-150"
                  >
                    <Edit2 className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="text-red-500 hover:text-red-400 transition-colors duration-150"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 text-gray-200 rounded-lg p-6 w-full max-w-md relative shadow-lg">
            <button
              onClick={handleCloseForm}
              className="absolute top-4 right-4 p-2 rounded-full bg-gray-700 text-gray-200 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors duration-150"
            >
              <X className="h-5 w-5" />
            </button>
            <h3 className="text-xl font-bold mb-4">{editingUser ? 'Edit User Details' : 'Add New User'}</h3>
            <form className="space-y-5">
              <div>
                <label htmlFor="name" className="block text-sm font-medium">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="mt-1 block w-full border border-gray-700 rounded-md shadow-sm py-2 px-3 bg-gray-800 text-gray-200 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                  defaultValue={editingUser?.name}
                  placeholder="Enter user name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="mt-1 block w-full border border-gray-700 rounded-md shadow-sm py-2 px-3 bg-gray-800 text-gray-200 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                  defaultValue={editingUser?.email}
                  placeholder="Enter user email"
                />
              </div>
              <div>
                <label htmlFor="role" className="block text-sm font-medium">Role</label>
                <select
                  id="role"
                  name="role"
                  className="mt-1 block w-full border border-gray-700 rounded-md shadow-sm py-2 px-3 bg-gray-800 text-gray-200 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                  defaultValue={editingUser?.role}
                >
                  <option value="Admin">Admin</option>
                  <option value="Editor">Editor</option>
                  <option value="Viewer">Viewer</option>
                </select>
              </div>
              <div>
                <label htmlFor="status" className="block text-sm font-medium">Status</label>
                <select
                  id="status"
                  name="status"
                  className="mt-1 block w-full border border-gray-700 rounded-md shadow-sm py-2 px-3 bg-gray-800 text-gray-200 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                  defaultValue={editingUser?.status}
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={handleCloseForm}
                  className="px-4 py-2 border border-gray-600 rounded-md text-sm font-medium text-gray-300 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-500 hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                  {editingUser ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}