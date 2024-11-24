import { useState, useEffect, useRef } from 'react';
import { X, Plus, Edit2, Trash2, Search, Shield, ChevronDown, ChevronUp, Users, Lock, Eye, AlertTriangle } from 'lucide-react';

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
  const formRef = useRef(null);
  const [showRiskLevels, setShowRiskLevels] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (formRef.current && !formRef.current.contains(event.target)) {
        setShowForm(false);
        setEditingRole(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

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

  const toggleRoleExpansion = (roleId) => {
    setExpandedRole(expandedRole === roleId ? null : roleId);
  };

  const filteredRoles = roles.filter(role =>
    role.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    role.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getRiskLevelColor = (riskLevel) => {
    switch (riskLevel) {
      case 'High': return 'bg-red-100 text-red-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6 relative bg-transparent p-6 rounded-lg">
      <div className="bg-transparent shadow-md rounded-lg overflow-hidden">
        <div className="p-4 bg-transparent text-white flex justify-between items-center">
   
            <div className="flex items-center space-x-4">
        <Shield className="h-8 w-8 text-gray-400" />
        <h1 className="text-3xl font-bold text-white">Role Management</h1>
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
              onClick={() => setShowRiskLevels(!showRiskLevels)}
              className="flex items-center justify-center px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 w-full sm:w-auto"
              >
              {showRiskLevels ? 'Hide' : 'Show'} Risk Levels
            </button>
          </div>
        </div>

        <div className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRoles.map((role) => (
              <div key={role.id} className="bg-black rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow duration-300">
                <div className="p-4 bg-black flex justify-between items-center border-b border-white">
                  <h3 className="text-lg font-semibold text-gray-300">{role.name}</h3>
                  <button
                    onClick={() => toggleRoleExpansion(role.id)}
                    className="text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-500 rounded-full p-1"
                  >
                    {expandedRole === role.id ? <ChevronUp /> : <ChevronDown />}
                  </button>
                </div>
                <div className="p-4">
                  <p className="text-sm text-gray-600 mb-2">{role.description}</p>
                  <div className="flex items-center text-sm text-gray-500 mb-2">
                    <Users className="h-4 w-4 mr-1" />
                    <span>{role.userCount} users</span>
                  </div>
                  {showRiskLevels && (
                    <div className={`text-sm font-medium px-2 py-1 rounded-full inline-block ${getRiskLevelColor(role.riskLevel)}`}>
                      {role.riskLevel} Risk
                    </div>
                  )}
                  {expandedRole === role.id && (
                    <div className="mt-4">
                      <h4 className="text-sm font-semibold text-gray-700 mb-2">Permissions:</h4>
                      <div className="flex flex-wrap gap-2">
                        {role.permissions.map((permission, index) => (
                          <span key={index} className="px-2 py-1 bg-primary-100 text-primary-800 rounded-full text-xs">
                            {permission}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                <div className="px-4 py-3 bg-black flex justify-end space-x-2 border-t border-gray-200">
                  <button
                    onClick={() => handleEdit(role)}
                    className="p-2 text-primary-600 hover:text-primary-800 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-primary-500 rounded-full"
                  >
                    <Edit2 className="h-5 w-5" />
                  </button>

                  <button
                    onClick={() => handleDelete(role.id)}
                    className="p-2 text-red-600 hover:text-red-800 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-red-500 rounded-full"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 flex justify-center">
      <button
            onClick={handleAddNew}
            className="flex items-center justify-center px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800 w-full sm:w-auto"
          >
            <Plus className="h-5 w-5 mr-2" />
            <span>Add New Role</span>
          </button>
      </div>
      

      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div ref={formRef} className="bg-gray-800 text-white rounded-lg p-6 w-full max-w-md">
            <button
              onClick={() => setShowForm(false)}
              className="absolute top-4 right-4 p-2 rounded-full bg-gray-700 text-gray-300 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-150"
            >
              <X className="h-5 w-5" />
            </button>
            <h3 className="text-lg font-semibold mb-4">{editingRole ? 'Edit Role' : 'Add New Role'}</h3>
            <form className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  defaultValue={editingRole?.name}
                />
              </div>
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-300">Description</label>
                <textarea
                  id="description"
                  name="description"
                  rows="3"
                  className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  defaultValue={editingRole?.description}
                ></textarea>
              </div>
              <div>
                <label htmlFor="riskLevel" className="block text-sm font-medium text-gray-300">Risk Level</label>
                <select
                  id="riskLevel"
                  name="riskLevel"
                  className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  defaultValue={editingRole?.riskLevel || 'Low'}
                >
                  <option>Low</option>
                  <option>Medium</option>
                  <option>High</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Permissions</label>
                <div className="grid grid-cols-2 gap-4">
                  {['Create', 'Read', 'Update',
'Delete', 'Approve', 'Reject', 'Export', 'Import'].map((permission) => (
                    <button
                      key={permission}
                      type="button"
                      className={`px-4 py-2 rounded-md text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-150 ${
                        editingRole?.permissions.includes(permission)
                          ? 'bg-blue-600 text-white hover:bg-blue-700'
                          : 'bg-gray-700 text-gray-200 hover:bg-gray-600'
                      }`}
                    >
                      {permission}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-4 py-2 border border-gray-600 rounded-md text-sm font-medium text-gray-300 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
                >
                  Save Draft
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  {editingRole ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
