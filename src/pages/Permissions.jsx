import React, { useState } from 'react';
import { Lock, Plus, Search } from 'lucide-react';
import PermissionsForm from '../components/permissions/PermissionForm';
import PermissionsList from '../components/permissions/PermissionList';

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

  const handleSave = (permission) => {
    if (permission.id) {
      setPermissions(permissions.map(p => p.id === permission.id ? permission : p));
    } else {
      setPermissions([...permissions, { ...permission, id: Date.now() }]);
    }
    setShowForm(false);
  };

  const togglePermissionExpansion = (permissionId) => {
    setExpandedPermission(expandedPermission === permissionId ? null : permissionId);
  };

  const filteredPermissions = permissions.filter(permission =>
    permission.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    permission.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    permission.resourceType.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 p-4 md:p-6 min-h-screen">
      <div className="bg-transparent shadow-md rounded-lg overflow-hidden">
        <div className="p-4 bg-transparent text-white flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center space-x-4">
            <Lock className="h-8 w-8 text-blue-400" />
            <h1 className="text-2xl md:text-3xl font-bold text-white">Permission Management</h1>
          </div>
          <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4 w-full md:w-auto">
            <div className="relative w-full md:w-auto">
              <input
                type="text"
                placeholder="Search permissions..."
                className="w-full md:w-64 pl-10 pr-4 py-2 bg-black text-white placeholder-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-800"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
            <button
              onClick={() => setShowImpactLevels(!showImpactLevels)}
              className="flex items-center justify-center px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 w-full md:w-auto transition-colors duration-200"
            >
              {showImpactLevels ? 'Hide' : 'Show'} Impact Levels
            </button>
          </div>
        </div>
        <div className="p-4">
          <PermissionsList
            permissions={filteredPermissions}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onToggleExpand={togglePermissionExpansion}
            expandedPermission={expandedPermission}
            showImpactLevels={showImpactLevels}
          />
        </div>
      </div>

      <div className="mt-6 flex justify-center">
        <button
          onClick={handleAddNew}
          className="flex items-center justify-center px-4 py-2 bg-black text-white rounded-md hover:bg-gray-700 transition-colors duration-200 w-full sm:w-auto"
        >
          <Plus className="h-5 w-5 mr-2" />
          <span>Add New Permission</span>
        </button>
      </div>

      {showForm && (
        <PermissionsForm
          onClose={() => setShowForm(false)}
          onSave={handleSave}
          editingPermission={editingPermission}
        />
      )}
    </div>
  );
}