import React, { useState } from 'react';
import { Save } from 'lucide-react';

export default function Settings() {
  const [settings, setSettings] = useState({
    siteName: 'RBAC Admin',
    siteDescription: 'Role-Based Access Control Dashboard',
    allowRegistration: true,
    emailNotifications: true,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings(prevSettings => ({
      ...prevSettings,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Settings saved:', settings);
  };

  return (
    <div className="space-y-6 p-6 min-h-screen">
      <div className="flex items-center space-x-4">
        <Save className="h-8 w-8 text-gray-400" />
        <h1 className="text-3xl font-bold text-white">Settings</h1>
      </div>
      <div className="bg-black shadow-md rounded-lg p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="siteName" className="block text-sm font-medium text-gray-300">
              Site Name
            </label>
            <input
              type="text"
              name="siteName"
              id="siteName"
              value={settings.siteName}
              onChange={handleChange}
              className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="siteDescription" className="block text-sm font-medium text-gray-300">
              Site Description
            </label>
            <textarea
              name="siteDescription"
              id="siteDescription"
              rows="3"
              value={settings.siteDescription}
              onChange={handleChange}
              className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent sm:text-sm"
            ></textarea>
          </div>
          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                id="allowRegistration"
                name="allowRegistration"
                type="checkbox"
                checked={settings.allowRegistration}
                onChange={handleChange}
                className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-500 rounded bg-gray-700"
              />
            </div>
            <div className="ml-3 text-sm">
              <label htmlFor="allowRegistration" className="font-medium text-gray-300">
                Allow Registration
              </label>
              <p className="text-gray-400">Allow new users to register themselves</p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                id="emailNotifications"
                name="emailNotifications"
                type="checkbox"
                checked={settings.emailNotifications}
                onChange={handleChange}
                className="focus:ring-blue-500 h-4 w-4 text-blue-600 border-gray-500 rounded bg-gray-700"
              />
            </div>
            <div className="ml-3 text-sm">
              <label htmlFor="emailNotifications" className="font-medium text-gray-300">
                Email Notifications
              </label>
              <p className="text-gray-400">Receive email notifications for important events</p>
            </div>
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <Save className="h-5 w-5 mr-2" />
              Save Settings
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
