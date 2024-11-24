import { useState } from 'react';
import { Edit2, Trash2, MoreVertical, Plus } from 'lucide-react';

export default function UserList({ onAddNew }) {
  const [users] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Editor', status: 'Active' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'Viewer', status: 'Inactive' },
  ]);

  const [showAlert, setShowAlert] = useState(false);

  const handleAddNew = () => {
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
      onAddNew();
    }, 2000);
  };

  return (
    <div className="space-y-4">
    {showAlert && (
      <div className="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4 mb-4" role="alert">
        <div className="flex">
          <div className="flex-shrink-0">
            <AlertCircle className="h-5 w-5 text-blue-500" />
          </div>
          <div className="ml-3">
            <p className="text-sm">Preparing to add a new user. Please wait...</p>
          </div>
        </div>
      </div>
    )}
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">Email</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">Role</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">Status</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            <tr className="hover:bg-gray-50 transition-colors duration-200 cursor-pointer" onClick={onAddNew}>
              <td colSpan="5" className="px-4 py-4 whitespace-nowrap">
                <div className="flex items-center text-primary-500 hover:text-primary-600">
                  <Plus size={18} className="mr-2" />
                  <span className="text-sm font-medium">Add New User</span>
                </div>
              </td>
            </tr>
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50 transition-colors duration-200">
                <td className="px-4 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10">
                      <img className="h-10 w-10 rounded-full" src={`https://ui-avatars.com/api/?name=${user.name}&background=random`} alt="" />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{user.name}</div>
                      <div className="text-sm text-gray-500 sm:hidden">{user.email}</div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-4 whitespace-nowrap hidden sm:table-cell">
                  <div className="text-sm text-gray-900">{user.email}</div>
                </td>
                <td className="px-4 py-4 whitespace-nowrap hidden md:table-cell">
                  <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-primary-100 text-primary-800">
                    {user.role}
                  </span>
                </td>
                <td className="px-4 py-4 whitespace-nowrap hidden lg:table-cell">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    user.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {user.status}
                  </span>
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
    </div>
  );
}