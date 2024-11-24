import { useState } from 'react';
import { Edit2, Trash2, MoreVertical, Plus } from 'lucide-react';

export default function PermissionList({ onAddNew }) {
  const [permissions] = useState([
    { id: 1, name: 'Read Users', description: 'Can view user information' },
    { id: 2, name: 'Write Users', description: 'Can create and edit user information' },
    { id: 3, name: 'Delete Users', description: 'Can delete user accounts' },
    { id: 4, name: 'Manage Roles', description: 'Can create, edit, and delete roles' },
    { id: 5, name: 'Assign Permissions', description: 'Can assign permissions to roles' },
  ]);

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">Description</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            <tr className="hover:bg-gray-50 transition-colors duration-200 cursor-pointer" onClick={onAddNew}>
              <td colSpan="3" className="px-4 py-4 whitespace-nowrap">
                <div className="flex items-center text-primary-500 hover:text-primary-600">
                  <Plus size={18} className="mr-2" />
                  <span className="text-sm font-medium">Add New Permission</span>
                </div>
              </td>
            </tr>
            {permissions.map((permission) => (
              <tr key={permission.id} className="hover:bg-gray-50 transition-colors duration-200">
                <td className="px-4 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{permission.name}</div>
                </td>
                <td className="px-4 py-4 whitespace-nowrap hidden sm:table-cell">
                  <div className="text-sm text-gray-500">{permission.description}</div>
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm font-medium">
                  <button className="text-primary-600 hover:text-primary-900 mr-2 transition-colors duration-200">
                    <Edit2 size={18} />
                  </button>
                  <button className="text-red-600 hover:text-red-900 mr-2 transition-colors duration-200">
                    <Trash2 size={18} />
                  </button>
                  <button className="text-gray-600 hover:text-gray-900 transition-colors duration-200">
                    <MoreVertical size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}