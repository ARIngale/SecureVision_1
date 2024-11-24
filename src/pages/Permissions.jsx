import React, { useState } from 'react';
import { Lock, Plus, Edit2, Trash2, Search, ChevronDown, ChevronUp } from 'lucide-react';

export default function Permissions() {
  const [permissions, setPermissions] = useState([
    { id: 1, name: 'Create User', description: 'Allows creating new users', roles: ['Admin', 'Manager'], resourceType: 'User Management', impact: 'High' },
    { id: 2, name: 'Edit Content', description: 'Allows editing existing content', roles: ['Admin', 'Editor'], resourceType: 'Content Management', impact: 'Medium' },
    { id: 3, name: 'Delete Article', description: 'Allows deleting articles', roles: ['Admin'], resourceType: 'Content Management', impact: 'High' },
  ]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingPermission, setEditingPermission] = useState(null);
  const [expandedPermission, setExpandedPermission] = useState(null);
  const [showImpactLevels, setShowImpactLevels] = useState(false);

  const handleAddNew = () => {
    setShowForm(true);
    setEditingPermission(null);
  };

  const handleEdit = (permission) => {
    setEditingPermission(permission);
    setShowForm(true);
  };

  const handleDelete = (permissionId) => {
    if (window.confirm('Are you sure you want to delete this permission?')) {
      setPermissions(permissions.filter(permission => permission.id !== permissionId));
    }
  };

  const togglePermissionExpansion = (permissionId) => {
    setExpandedPermission(expandedPermission === permissionId ? null : permissionId);
  };

  const filteredPermissions = permissions.filter(permission =>
    permission.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    permission.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    permission.resourceType.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const groupedPermissions = filteredPermissions.reduce((acc, permission) => {
    if (!acc[permission.resourceType]) {
      acc[permission.resourceType] = [];
    }
    acc[permission.resourceType].push(permission);
    return acc;
  }, {});

  const getImpactLevelColor = (impact) => {
    switch (impact) {
      case 'High': return 'bg-red-500 text-white';
      case 'Medium': return 'bg-yellow-500 text-white';
      case 'Low': return 'bg-green-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  return (
    <div className="space-y-6 p-6 min-h-screen">
      <div className="bg-transparent shadow-md rounded-lg overflow-hidden">
        <div className="p-4 bg-transparent text-white flex justify-between items-center">
          <div className="flex items-center space-x-4">
        <Lock className="h-8 w-8 text-gray-400" />
        <h1 className="text-3xl font-bold text-white">Permission Management</h1>
      </div>
          <div className="flex items-center space-x-4">
          <div className="relative">
              
              <input
            type="text"
            placeholder="Search users..."
            className="w-full pl-10 pr-4 py-2 bg-black text-white placeholder-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-800"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
            <button
              onClick={() => setShowImpactLevels(!showImpactLevels)}
              className="flex items-center justify-center px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 w-full sm:w-auto"
            >
              {showImpactLevels ? 'Hide' : 'Show'} Impact Levels
            </button>
          </div>
        </div>
        <div className="p-4">
          {Object.entries(groupedPermissions).map(([resourceType, permissions]) => (
            <div key={resourceType} className="mb-6">
              <h3 className="text-lg font-semibold text-white mb-2">{resourceType}</h3>
              <div className="space-y-4">
                {permissions.map((permission) => (
                  <div key={permission.id} className="bg-black rounded-lg p-4 hover:opacity-70 transition-colors duration-150">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="text-md font-semibold text-white">{permission.name}</h4>
                        <p className="text-sm text-gray-300 mt-1">{permission.description}</p>
                        {showImpactLevels && (
                          <span className={`text-xs font-medium px-2 py-1 rounded-full ${getImpactLevelColor(permission.impact)} mt-2 inline-block`}>
                            {permission.impact} Impact
                          </span>
                        )}
                      </div>
                      <button
                        onClick={() => togglePermissionExpansion(permission.id)}
                        className="text-gray-400 hover:text-white transition-colors duration-150"
                      >
                        {expandedPermission === permission.id ? <ChevronUp /> : <ChevronDown />}
                      </button>
                    </div>
                    {expandedPermission === permission.id && (
                      <div className="mt-4">
                        <h5 className="text-sm font-semibold text-gray-300 mb-2">Roles with this permission:</h5>
                        <div className="flex flex-wrap gap-2">
                          {permission.roles.map((role, index) => (
                            <span key={index} className="px-2 py-1 bg-gray-600 text-gray-200 rounded-full text-xs">
                              {role}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    <div className="mt-4 flex justify-end space-x-2">
                      <button
                        onClick={() => handleEdit(permission)}
                        className="p-2 text-gray-400 hover:text-white transition-colors duration-150"
                      >
                        <Edit2 className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(permission.id)}
                        className="p-2 text-gray-400 hover:text-white transition-colors duration-150"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 flex justify-center">
        <button
          onClick={handleAddNew}
          className="flex items-center justify-center px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition-colors duration-150"
        >
          <Plus className="h-5 w-5 mr-2" />
          <span>Add New API Key</span>
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold text-white mb-4">{editingPermission ? 'Edit Permission' : 'Add New Permission'}</h3>
            <form className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300">Name</label>
                <input
                  type="text"
                  id="name"
                  className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  defaultValue={editingPermission?.name}
                />
              </div>
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-300">Description</label>
                <textarea
                  id="description"
                  rows="3"
                  className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  defaultValue={editingPermission?.description}
                ></textarea>
              </div>
              <div>
                <label htmlFor="impact" className="block text-sm font-medium text-gray-300">Impact Level</label>
                <select
                  id="impact"
                  className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  defaultValue={editingPermission?.impact || 'Low'}
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800"
                >
                  {editingPermission ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

