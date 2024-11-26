import React, { useState } from 'react';
import { Key, Plus, FilePenLine, Trash, Search, Copy } from 'lucide-react';

export default function ApiKeys() {
  const [apiKeys, setApiKeys] = useState([
    { id: 1, name: 'Production API Key', key: 'prod_api_key_123456', createdAt: '2023-06-01', lastUsed: '2023-06-15' },
    { id: 2, name: 'Development API Key', key: 'dev_api_key_789012', createdAt: '2023-06-10', lastUsed: '2023-06-14' },
  ]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingKey, setEditingKey] = useState(null);

  const handleAddNew = () => {
    setShowForm(true);
    setEditingKey(null);
  };

  const handleEdit = (apiKey) => {
    setEditingKey(apiKey);
    setShowForm(true);
  };

  const handleDelete = (keyId) => {
    if (window.confirm('Are you sure you want to delete this API key?')) {
      setApiKeys(apiKeys.filter(key => key.id !== keyId));
    }
  };

  const filteredKeys = apiKeys.filter(key =>
    key.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 p-6 min-h-screen">
      <div className="bg-transparent shadow-md rounded-lg overflow-hidden">
        <div className="p-4 bg-transparent text-white flex flex-col lg:flex-row justify-between items-center">
          <div className="flex items-center space-x-4">
            <Key className="h-8 w-8 text-blue-400" />
            <h1 className="text-3xl font-bold text-white">API Keys</h1>
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
          </div>
        </div>

        <div className="p-4">
          {filteredKeys.length > 0 ? (
            <div className="space-y-4">
              {filteredKeys.map((apiKey) => (
                <div key={apiKey.id} className="bg-black rounded-lg p-4 hover:opacity-70 transition-colors duration-150">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-semibold text-white">{apiKey.name}</h3>
                      <p className="text-sm text-gray-400 mt-1">Created: {apiKey.createdAt}</p>
                      <p className="text-sm text-gray-400">Last used: {apiKey.lastUsed}</p>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEdit(apiKey)}
                        className="p-2 text-primary-400 hover:text-primary-200 transition-colors duration-150"
                      >
                        <FilePenLine className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(apiKey.id)}
                        className="p-2 text-red-400 hover:text-red-300 transition-colors duration-150"
                      >
                        <Trash className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                  <div className="mt-2 flex items-center">
                    <input
                      type="text"
                      value={apiKey.key}
                      readOnly
                      className="bg-gray-700 text-gray-300 px-3 py-1 rounded flex-grow mr-2"
                    />
                    <button
                      onClick={() => navigator.clipboard.writeText(apiKey.key)}
                      className="p-2 bg-transparent text-blue-400 rounded hover:text-blue-300 transition-colors duration-150"
                    >
                      <Copy className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center h-64">
              <div className="text-center">
                <Key className="mx-auto h-12 w-12 text-blue-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-300">No API Keys</h3>
                <p className="mt-1 text-sm text-gray-400">Get started by creating a new API key.</p>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="mt-6 flex justify-center">
        <button
          onClick={handleAddNew}
          className="flex items-center justify-center px-4 py-2 bg-black text-white rounded-md hover:bg-gray-700 transition-colors duration-150"
        >
          <Plus className="h-5 w-5 mr-2" />
          <span>Add New API Key</span>
        </button>
      </div>
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-900 rounded-lg p-6 w-full max-w-md">
            <h3 className="text-lg font-semibold text-white mb-4">{editingKey ? 'Edit API Key' : 'Add New API Key'}</h3>
            <form className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent"
                  defaultValue={editingKey?.name}
                />
              </div>
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-4 py-2 border border-gray-600 rounded-md text-sm font-medium text-gray-300 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  {editingKey ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}