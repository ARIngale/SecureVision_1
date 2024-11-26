import React, { useState, useEffect } from 'react';
import { Shield, Search, Plus } from 'lucide-react';
import RolesForm from '../components/roles/RoleForm';
import RolesList from '../components/roles/RoleList';

export default function Roles() {
  const [showForm, setShowForm] = useState(false);
  const [roles, setRoles] = useState([
    { id: 1, name: 'Admin', description: 'Full access to all features', permissions: ['Create', 'Read', 'Update', 'Delete'], userCount: 5, riskLevel: 'High' },
    { id: 2, name: 'Editor', description: 'Can edit and publish content', permissions: ['Read', 'Update'], userCount: 12, riskLevel: 'Medium' },
    { id: 3, name: 'Viewer', description: 'Can view content only', permissions: ['Read'], userCount: 30, riskLevel: 'Low' },
  ]);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingRole, setEditingRole] = useState(null);
  const [expandedRole, setExpandedRole] = useState(null);
  const [showRiskLevels, setShowRiskLevels] = useState(false);

  const handleAddNew = () => {
    setShowForm(true);
    setEditingRole(null);
  };

  const handleEdit = (role) => {
    setEditingRole(role);
    setShowForm(true);
  };

  const handleDelete = (roleId) => {
    if (window.confirm('Are you sure you want to delete this role?')) {
      setRoles(roles.filter(role => role.id !== roleId));
    }
  };

  const handleSave = (role) => {
    if (role.id) {
      setRoles(roles.map(r => r.id === role.id ? role : r));
    } else {
      setRoles([...roles, { ...role, id: Date.now() }]);
    }
    setShowForm(false);
  };

  const toggleRoleExpansion = (roleId) => {
    setExpandedRole(expandedRole === roleId ? null : roleId);
  };

  const filteredRoles = roles.filter(role =>
    role.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    role.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 relative bg-transparent p-4 md:p-6 rounded-lg">
      <div className="bg-transparent shadow-md rounded-lg overflow-hidden">
        <div className="p-4 bg-transparent text-white flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center space-x-4">
            <Shield className="h-8 w-8 text-blue-400" />
            <h1 className="text-2xl md:text-3xl font-bold text-white">Role Management</h1>
          </div>
          <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4 w-full md:w-auto">
            <div className="relative w-full md:w-auto">
              <input
                type="text"
                placeholder="Search roles..."
                className="w-full md:w-64 pl-10 pr-4 py-2 bg-black text-white placeholder-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-800"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
            <button
              onClick={() => setShowRiskLevels(!showRiskLevels)}
              className="flex items-center justify-center px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 w-full md:w-auto"
            >
              {showRiskLevels ? 'Hide' : 'Show'} Risk Levels
            </button>
          </div>
        </div>

        <div className="p-4">
          <RolesList
            roles={filteredRoles}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onToggleExpand={toggleRoleExpansion}
            expandedRole={expandedRole}
            showRiskLevels={showRiskLevels}
          />
        </div>
      </div>

      <div className="mt-6 flex justify-center">
        <button
          onClick={handleAddNew}
          className="flex items-center justify-center px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 w-full sm:w-auto transition-colors duration-200"
        >
          <Plus className="h-5 w-5 mr-2" />
          <span>Add New Role</span>
        </button>
      </div>

      {showForm && (
        <RolesForm
          onClose={() => setShowForm(false)}
          onSave={handleSave}
          editingRole={editingRole}
        />
      )}
    </div>
  );
}