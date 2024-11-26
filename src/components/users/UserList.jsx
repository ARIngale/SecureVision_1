import React from 'react';
import { ChevronUp, ChevronDown, FilePenLine, Trash } from 'lucide-react';

const UserList = ({ users, onEdit, onDelete, sortConfig, onSort }) => {
  return (
    <div className="overflow-x-auto bg-black rounded-lg shadow-lg">
      <table className="min-w-full divide-y divide-gray-700">
        <thead className="bg-gray-800">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider cursor-pointer" onClick={() => onSort('name')}>
              <div className="flex items-center">
                Name
                {sortConfig.key === 'name' && (
                  sortConfig.direction === 'ascending' ? (
                    <ChevronUp className="ml-1 h-4 w-4" />
                  ) : (
                    <ChevronDown className="ml-1 h-4 w-4" />
                  )
                )}
              </div>
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider cursor-pointer hidden lg:table-cell" onClick={() => onSort('email')}>
              <div className="flex items-center">
                Email
                {sortConfig.key === 'email' && (
                  sortConfig.direction === 'ascending' ? (
                    <ChevronUp className="ml-1 h-4 w-4" />
                  ) : (
                    <ChevronDown className="ml-1 h-4 w-4" />
                  )
                )}
              </div>
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider cursor-pointer hidden lg:table-cell" onClick={() => onSort('role')}>
              <div className="flex items-center">
                Role
                {sortConfig.key === 'role' && (
                  sortConfig.direction === 'ascending' ? (
                    <ChevronUp className="ml-1 h-4 w-4" />
                  ) : (
                    <ChevronDown className="ml-1 h-4 w-4" />
                  )
                )}
              </div>
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider cursor-pointer hidden lg:table-cell" onClick={() => onSort('status')}>
              <div className="flex items-center">
                Status
                {sortConfig.key === 'status' && (
                  sortConfig.direction === 'ascending' ? (
                    <ChevronUp className="ml-1 h-4 w-4" />
                  ) : (
                    <ChevronDown className="ml-1 h-4 w-4" />
                  )
                )}
              </div>
            </th>
            <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider hidden lg:table-cell">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-black divide-y divide-gray-700">
          {users.map((user) => (
            <tr key={user.id} className="hover:bg-gray-700 transition-colors duration-150">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="text-sm font-medium text-white">{user.name}</div>
                  <span className="lg:hidden ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-opacity-10 text-opacity-80 bg-gray-400 text-gray-300">
                    {user.status}
                  </span>
                </div>
                <div className="text-sm text-gray-400 lg:hidden">{user.email}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap hidden lg:table-cell">
                <div className="text-sm text-gray-400">{user.email}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap hidden lg:table-cell">
                <div className="text-sm text-gray-400">{user.role}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap hidden lg:table-cell">
                <span
                  className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    user.status === 'Active'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}
                >
                  {user.status}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium hidden lg:table-cell">
                <button
                  onClick={() => onEdit(user)}
                  className="text-primary-400 hover:text-primary-200 mr-2 transition-colors duration-150"
                >
                  <FilePenLine className="h-5 w-5" />
                </button>
                <button
                  onClick={() => onDelete(user.id)}
                  className="text-red-500 hover:text-red-400 transition-colors duration-150"
                >
                  <Trash className="h-5 w-5" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;