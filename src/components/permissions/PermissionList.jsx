import React from 'react';
import { FilePenLine, Trash, ChevronDown, ChevronUp } from 'lucide-react';

const PermissionsList = ({ permissions, onEdit, onDelete, onToggleExpand, expandedPermission, showImpactLevels }) => {
  const getImpactLevelColor = (impact) => {
    switch (impact) {
      case 'High': return 'bg-red-500 text-white';
      case 'Medium': return 'bg-yellow-500 text-white';
      case 'Low': return 'bg-green-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const groupedPermissions = permissions.reduce((acc, permission) => {
    if (!acc[permission.resourceType]) {
      acc[permission.resourceType] = [];
    }
    acc[permission.resourceType].push(permission);
    return acc;
  }, {});

  return (
    <>
      {Object.entries(groupedPermissions).map(([resourceType, permissions]) => (
        <div key={resourceType} className="mb-6">
          <h3 className="text-lg font-semibold text-white mb-2">{resourceType}</h3>
          <div className="space-y-4">
            {permissions.map((permission) => (
              <div key={permission.id} className="bg-black rounded-lg p-4 hover:bg-gray-900 transition-colors duration-200">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-md font-semibold text-white">{permission.name}</h4>
                    <p className="text-sm text-gray-300 mt-1">{permission.description}</p>
                    {showImpactLevels && (
                      <span className={`text-xs font-medium px-2 py-1 rounded-full ${getImpactLevelColor(permission.impact)} mt-2 inline-block`}>
                        {permission.impact} Impact
                      </span>
                    )}
                  </div>
                  <button
                    onClick={() => onToggleExpand(permission.id)}
                    className="text-blue-400 hover:text-blue-300 transition-colors duration-200"
                  >
                    {expandedPermission === permission.id ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                  </button>
                </div>
                {expandedPermission === permission.id && (
                  <div className="mt-4">
                    <h5 className="text-sm font-semibold text-gray-300 mb-2">Roles with this permission:</h5>
                    <div className="flex flex-wrap gap-2">
                      {permission.roles.map((role, index) => (
                        <span key={index} className={`px-2 py-1 rounded-full text-xs hover:opacity-80 transition-colors duration-200 ${
                          role === 'Admin' ? 'bg-red-600 text-white' :
                          role === 'Manager' ? 'bg-yellow-600 text-white' :
                          'bg-gray-700 text-gray-200'
                        }`}>
                          {role}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                <div className="mt-4 flex justify-end space-x-2">
                  <button
                    onClick={() => onEdit(permission)}
                    className="p-2 text-primary-400 hover:text-primary-200 transition-colors duration-200"
                  >
                    <FilePenLine className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => onDelete(permission.id)}
                    className="p-2 text-red-400 hover:text-red-300 transition-colors duration-200"
                  >
                    <Trash className="h-5 w-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </>
  );
};

export default PermissionsList;