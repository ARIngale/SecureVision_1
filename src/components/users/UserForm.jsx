import React from 'react';
import { X } from 'lucide-react';

const UserForm = ({ onClose, onSave, editingUser }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const userData = Object.fromEntries(formData.entries());
    onSave(userData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 text-gray-200 rounded-lg p-6 w-full max-w-md relative shadow-lg">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-gray-700 text-gray-200 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors duration-150"
        >
          <X className="h-5 w-5" />
        </button>
        <h3 className="text-xl font-bold mb-4">{editingUser ? 'Edit User Details' : 'Add New User'}</h3>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="name" className="block text-sm font-medium">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              className="mt-1 block w-full border border-gray-700 rounded-md shadow-sm py-2 px-3 bg-gray-800 text-gray-200 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
              defaultValue={editingUser?.name}
              placeholder="Enter user name"
              required
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
              required
            />
          </div>
          <div>
            <label htmlFor="role" className="block text-sm font-medium">Role</label>
            <select
              id="role"
              name="role"
              className="mt-1 block w-full border border-gray-700 rounded-md shadow-sm py-2 px-3 bg-gray-800 text-gray-200 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
              defaultValue={editingUser?.role}
              required
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
              required
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
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
  );
};

export default UserForm;