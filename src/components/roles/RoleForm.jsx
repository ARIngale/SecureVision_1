import React, { useState, useEffect } from 'react';
import { X, Plus } from 'lucide-react';

const RolesForm = ({ onClose, onSave, editingRole }) => {
  const [role, setRole] = useState(editingRole || { name: '', description: '', permissions: [], riskLevel: 'Low' });

  useEffect(() => {
    if (editingRole) {
      setRole(editingRole);
    }
  }, [editingRole]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRole(prevRole => ({ ...prevRole, [name]: value }));
  };

  const togglePermission = (permission) => {
    setRole(prevRole => ({
      ...prevRole,
      permissions: prevRole.permissions.includes(permission)
        ? prevRole.permissions.filter(p => p !== permission)
        : [...prevRole.permissions, permission]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(role);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 text-white rounded-lg p-6 w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-gray-700 text-gray-300 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
        >
          <X className="h-5 w-5" />
        </button>
        <h3 className="text-lg font-semibold mb-4">{editingRole ? 'Edit Role' : 'Add New Role'}</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-300">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={role.name}
              onChange={handleChange}
              className="mt-1 block w-full bg-gray-800 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-300">Description</label>
            <textarea
              id="description"
              name="description"
              rows="3"
              value={role.description}
              onChange={handleChange}
              className="mt-1 block w-full bg-gray-800 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            ></textarea>
          </div>
          <div>
            <label htmlFor="riskLevel" className="block text-sm font-medium text-gray-300">Risk Level</label>
            <select
              id="riskLevel"
              name="riskLevel"
              value={role.riskLevel}
              onChange={handleChange}
              className="mt-1 block w-full bg-gray-800 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Permissions</label>
            <div className="grid grid-cols-2 gap-2">
              {['Create', 'Read', 'Update', 'Delete', 'Approve', 'Reject', 'Export', 'Import'].map((permission) => (
                <button
                  key={permission}
                  type="button"
                  onClick={() => togglePermission(permission)}
                  className={`px-3 py-2 rounded-md text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200 ${
                    role.permissions.includes(permission)
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : 'bg-gray-800 text-gray-200 hover:bg-gray-600'
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
              onClick={onClose}
              className="px-4 py-2 border border-gray-600 rounded-md text-sm font-medium text-gray-300 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
            >
              {editingRole ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RolesForm;