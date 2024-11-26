import React, { useState, useRef, useEffect } from 'react';
import { Bell, MessageSquare, Menu, ChevronDown } from 'lucide-react';
import Avatar from '../../assets/Avatar1.png'

const NotificationItem = ({ title, message, time, isNew }) => (
  <div className="px-4 py-3 hover:bg-gray-700/50 cursor-pointer">
    <div className="flex items-center justify-between">
      <span className="text-sm font-medium text-gray-200">{title}</span>
      <span className="text-xs text-gray-400">{time}</span>
    </div>
    <p className="text-sm text-gray-400 mt-1">{message}</p>
    {isNew && (
      <span className="inline-flex items-center mt-2 px-2 py-0.5 rounded text-xs font-medium bg-primary-500 text-white">
        New
      </span>
    )}
  </div>
);

const MessageItem = ({ user, message, time, isOnline }) => (
  <div className="px-4 py-3 hover:bg-gray-700/50 cursor-pointer">
    <div className="flex items-center space-x-3">
      <div className="relative">
        <div className="w-10 h-10 rounded-full bg-gray-700" />
        {isOnline && (
          <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
        )}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-200">{user}</span>
          <span className="text-xs text-gray-400">{time}</span>
        </div>
        <p className="text-sm text-gray-400 truncate">{message}</p>
      </div>
    </div>
  </div>
);

const Header = ({ isOpen, toggleSidebar }) => {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showMessages, setShowMessages] = useState(false);
  const dropdownRef = useRef(null);

  const notifications = [
    {
      title: "New Role Created",
      message: "Admin role has been created successfully",
      time: "2 min ago",
      isNew: true
    },
    {
      title: "Permission Updated",
      message: "User permissions have been modified",
      time: "1 hour ago",
      isNew: true
    },
    {
      title: "System Update",
      message: "System maintenance scheduled for tonight",
      time: "2 hours ago",
      isNew: false
    }
  ];

  const messages = [
    {
      user: "Sarah Connor",
      message: "Can you review the new permissions?",
      time: "5 min ago",
      isOnline: true
    },
    {
      user: "John Doe",
      message: "The new role structure looks great!",
      time: "30 min ago",
      isOnline: true
    },
    {
      user: "Alice Smith",
      message: "When can we discuss the updates?",
      time: "1 hour ago",
      isOnline: false
    }
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowUserMenu(false);
        setShowNotifications(false);
        setShowMessages(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleDropdown = (setter) => {
    setShowUserMenu(false);
    setShowNotifications(false);
    setShowMessages(false);
    setter((prev) => !prev);
  };

  return (
    <header className="bg-black border-b border-gray-800 text-white z-10">
      <div className="px-4 py-3">
        <div className={`flex items-center justify-between ml-0 ${isOpen ? "lg:ml-64" : "lg:ml-20"}`}>
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleSidebar}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-800 text-gray-400 hover:text-white transition-colors"
            >
              <Menu className="h-6 w-6" />
            </button>

            <div className={`flex items-center space-x-3 ml-0 ${isOpen ? "lg:ml-64" : "lg:ml-20"}`}>
              <div className="flex-shrink-0 w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">R</span>
              </div>
              <span className="text-lg font-semibold text-white transition-opacity duration-200">
                RBAC Admin
              </span>
            </div>
          </div>

          <div className="flex items-center space-x-2 sm:space-x-4" ref={dropdownRef}>
            <div className="relative">
              <button 
                onClick={() => toggleDropdown(setShowMessages)}
                className="p-2 rounded-lg hover:bg-gray-800 text-gray-400 hover:text-white transition-colors relative"
              >
                <MessageSquare className="h-6 w-6" />
                <span className="absolute top-0 right-0 h-4 w-4 bg-primary-500 rounded-full text-xs flex items-center justify-center text-white">
                  2
                </span>
              </button>
              {showMessages && (
                <div className="absolute right-0 mt-2 w-64 sm:w-80 rounded-lg bg-gray-800 border border-gray-700 shadow-lg py-1 divide-y divide-gray-700 z-50 max-h-[60vh] overflow-y-auto">
                  <div className="px-4 py-2 border-b border-gray-700">
                    <h3 className="text-sm font-semibold">Messages</h3>
                  </div>
                  {messages.map((message, index) => (
                    <MessageItem key={index} {...message} />
                  ))}
                  <div className="px-4 py-2 text-center">
                    <button className="text-sm text-primary-500 hover:text-primary-400">
                      View all messages
                    </button>
                  </div>
                </div>
              )}
            </div>
            
            <div className="relative">
              <button 
                onClick={() => toggleDropdown(setShowNotifications)}
                className="p-2 rounded-lg hover:bg-gray-800 text-gray-400 hover:text-white transition-colors relative"
              >
                <Bell className="h-6 w-6" />
                <span className="absolute top-0 right-0 h-4 w-4 bg-red-500 rounded-full text-xs flex items-center justify-center text-white">
                  3
                </span>
              </button>
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-64 sm:w-80 rounded-lg bg-gray-800 border border-gray-700 shadow-lg py-1 divide-y divide-gray-700 z-50 max-h-[60vh] overflow-y-auto">
                  <div className="px-4 py-2 border-b border-gray-700">
                    <h3 className="text-sm font-semibold">Notifications</h3>
                  </div>
                  {notifications.map((notification, index) => (
                    <NotificationItem key={index} {...notification} />
                  ))}
                  <div className="px-4 py-2 text-center">
                    <button className="text-sm text-primary-500 hover:text-primary-400">
                      View all notifications
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className="relative">
              <button
                onClick={() => toggleDropdown(setShowUserMenu)}
                className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-800 transition-colors"
              >
                <div className="w-8 h-8 rounded-full overflow-hidden">
                  <img
                    src={Avatar}
                    alt="User avatar"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="hidden sm:block text-left">
                  <p className="text-sm font-medium text-white">Atharva Ingle</p>
                  <p className="text-xs text-gray-400">Administrator</p>
                </div>
                <ChevronDown className="h-4 w-4 text-gray-400" />
              </button>

              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-48 rounded-lg bg-gray-800 border border-gray-700 shadow-lg py-1 z-50">
                  <a href="#" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700">Profile</a>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700">Settings</a>
                  <div className="border-t border-gray-700"></div>
                  <a href="#" className="block px-4 py-2 text-sm text-red-400 hover:bg-gray-700">Sign out</a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;