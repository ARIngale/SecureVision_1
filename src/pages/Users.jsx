import React, { useState } from 'react';
import { UsersRound, Plus, Search, Filter, FilterX } from 'lucide-react';
import UserForm from '../components/users/UserForm';
import UserList from '../components/users/UserList';

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

  const handleSave = (userData) => {
    if (editingUser) {
      setUsers(users.map(user => user.id === editingUser.id ? { ...user, ...userData } : user));
    } else {
      setUsers([...users, { ...userData, id: Date.now() }]);
    }
    setShowForm(false);
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
        <UsersRound className="h-8 w-8 text-blue-400" />
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

      <UserList
        users={sortedUsers}
        onEdit={handleEdit}
        onDelete={handleDelete}
        sortConfig={sortConfig}
        onSort={handleSort}
      />

      {showForm && (
        <UserForm
          onClose={handleCloseForm}
          onSave={handleSave}
          editingUser={editingUser}
        />
      )}
    </div>
  );
}