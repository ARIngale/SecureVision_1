import React from 'react';
import { Users, ChevronDown, ChevronUp,FilePenLine, Trash } from 'lucide-react';

const RolesList = ({ roles, onEdit, onDelete, onToggleExpand, expandedRole, showRiskLevels }) => {
  const getRiskLevelColor = (riskLevel) => {
    switch (riskLevel) {
      case 'High': return 'bg-red-100 text-red-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
      {roles.map((role) => (
        <div key={role.id} className="bg-black rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow duration-300">
          <div className="p-4 bg-black flex justify-between items-center border-b border-white">
            <h3 className="text-lg font-semibold text-gray-300">{role.name}</h3>
            <button
              onClick={() => onToggleExpand(role.id)}
              className="text-gray-500 hover:text-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 rounded-full p-1 transition-colors duration-200"
            >
              {expandedRole === role.id ? <ChevronUp /> : <ChevronDown />}
            </button>
          </div>
          <div className="p-4">
            <p className="text-sm text-gray-400 mb-2">{role.description}</p>
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
                <h4 className="text-sm font-semibold text-gray-400 mb-2">Permissions:</h4>
                <div className="flex flex-wrap gap-2">
                  {role.permissions.map((permission, index) => (
                    <span key={index} className="px-2 py-1 bg-gray-700 text-gray-200 rounded-full text-xs hover:bg-gray-600 transition-colors duration-200">
                      {permission}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
          <div className="px-4 py-3 bg-black flex justify-end space-x-2 border-t border-gray-700">
            <button
              onClick={() => onEdit(role)}
              className="p-2 text-primary-400 hover:text-primary-300 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500 rounded-full"
            >
              <FilePenLine className="h-5 w-5" />
            </button>
            <button
              onClick={() => onDelete(role.id)}
              className="p-2 text-red-400 hover:text-red-300 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 rounded-full"
            >
              <Trash className="h-5 w-5" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RolesList;