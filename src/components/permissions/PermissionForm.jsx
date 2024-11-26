import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

const PermissionsForm = ({ onClose, onSave, editingPermission }) => {
  const [permission, setPermission] = useState(editingPermission || { name: '', description: '', roles: [], resourceType: '', impact: 'Low' });

  useEffect(() => {
    if (editingPermission) {
      setPermission(editingPermission);
    }
  }, [editingPermission]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPermission(prevPermission => ({ ...prevPermission, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(permission);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 rounded-lg p-6 w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-gray-700 text-gray-300 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
        >
          <X className="h-5 w-5" />
        </button>
        <h3 className="text-lg font-semibold text-white mb-4">{editingPermission ? 'Edit Permission' : 'Add New Permission'}</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-300">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={permission.name}
              onChange={handleChange}
              className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-300">Description</label>
            <textarea
              id="description"
              name="description"
              rows="3"
              value={permission.description}
              onChange={handleChange}
              className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            ></textarea>
          </div>
          <div>
            <label htmlFor="resourceType" className="block text-sm font-medium text-gray-300">Resource Type</label>
            <input
              type="text"
              id="resourceType"
              name="resourceType"
              value={permission.resourceType}
              onChange={handleChange}
              className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div>
            <label htmlFor="impact" className="block text-sm font-medium text-gray-300">Impact Level</label>
            <select
              id="impact"
              name="impact"
              value={permission.impact}
              onChange={handleChange}
              className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-700 text-white rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-colors duration-200"
            >
              {editingPermission ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PermissionsForm;