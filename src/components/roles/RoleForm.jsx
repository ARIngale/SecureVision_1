import { useState } from 'react';

export default function RoleForm() {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    permissions: [],
  });

  const allPermissions = [
    { id: 'read_users', name: 'Read Users' },
    { id: 'write_users', name: 'Write Users' },
    { id: 'delete_users', name: 'Delete Users' },
    { id: 'manage_roles', name: 'Manage Roles' },
    { id: 'manage_permissions', name: 'Manage Permissions' },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handlePermissionChange = (permissionId) => {
    setFormData(prevState => ({
      ...prevState,
      permissions: prevState.permissions.includes(permissionId)
        ? prevState.permissions.filter(id => id !== permissionId)
        : [...prevState.permissions, permissionId]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Here you would typically send the data to your backend
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4">
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
          Role Name
        </label>
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="name"
          type="text"
          placeholder="Role Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
          Description
        </label>
        <textarea
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="description"
          placeholder="Role Description"
          rows="3"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
        ></textarea>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Permissions
        </label>
        <div className="grid grid-cols-2 gap-4">
          {allPermissions.map((permission) => (
            <label key={permission.id} className="inline-flex items-center">
              <input
                type="checkbox"
                className="form-checkbox text-teal-600"
                checked={formData.permissions.includes(permission.id)}
                onChange={() => handlePermissionChange(permission.id)}
              />
              <span className="ml-2">{permission.name}</span>
            </label>
          ))}
        </div>
      </div>
      <div className="flex items-center justify-between">
        <button
          className="bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors duration-200"
          type="submit"
        >
          Add Role
        </button>
      </div>
    </form>
  );
}