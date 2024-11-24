import React, { useState } from 'react';
import { Bell, MessageSquare, User, Menu, X } from 'lucide-react';

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

  return (
    <header className="bg-black border-b border-gray-800 text-white z-10">
      <div className="flex flex-col px-4 py-3">
        <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3 ml-16 lg:ml-64">
          <div className="flex-shrink-0 w-8 h-8 bg-primary-500 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold">R</span>
          </div>
          <span className={`text-lg font-semibold text-white transition-opacity duration-200 `}>
            RBAC Admin
          </span>
        </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleSidebar}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-800 text-gray-400 hover:text-white transition-colors"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
              >
                <path d="M8.85719 3H15.1428C16.2266 2.99999 17.1007 2.99998 17.8086 3.05782C18.5375 3.11737 19.1777 3.24318 19.77 3.54497C20.7108 4.02433 21.4757 4.78924 21.955 5.73005C22.2568 6.32234 22.3826 6.96253 22.4422 7.69138C22.5 8.39925 22.5 9.27339 22.5 10.3572V13.6428C22.5 14.7266 22.5 15.6008 22.4422 16.3086C22.3826 17.0375 22.2568 17.6777 21.955 18.27C21.4757 19.2108 20.7108 19.9757 19.77 20.455C19.1777 20.7568 18.5375 20.8826 17.8086 20.9422C17.1008 21 16.2266 21 15.1428 21H8.85717C7.77339 21 6.89925 21 6.19138 20.9422C5.46253 20.8826 4.82234 20.7568 4.23005 20.455C3.28924 19.9757 2.52433 19.2108 2.04497 18.27C1.74318 17.6777 1.61737 17.0375 1.55782 16.3086C1.49998 15.6007 1.49999 14.7266 1.5 13.6428V10.3572C1.49999 9.27341 1.49998 8.39926 1.55782 7.69138C1.61737 6.96253 1.74318 6.32234 2.04497 5.73005C2.52433 4.78924 3.28924 4.02433 4.23005 3.54497C4.82234 3.24318 5.46253 3.11737 6.19138 3.05782C6.89926 2.99998 7.77341 2.99999 8.85719 3ZM6.35424 5.05118C5.74907 5.10062 5.40138 5.19279 5.13803 5.32698C4.57354 5.6146 4.1146 6.07354 3.82698 6.63803C3.69279 6.90138 3.60062 7.24907 3.55118 7.85424C3.50078 8.47108 3.5 9.26339 3.5 10.4V13.6C3.5 14.7366 3.50078 15.5289 3.55118 16.1458C3.60062 16.7509 3.69279 17.0986 3.82698 17.362C4.1146 17.9265 4.57354 18.3854 5.13803 18.673C5.40138 18.8072 5.74907 18.8994 6.35424 18.9488C6.97108 18.9992 7.76339 19 8.9 19H9.5V5H8.9C7.76339 5 6.97108 5.00078 6.35424 5.05118ZM11.5 5V19H15.1C16.2366 19 17.0289 18.9992 17.6458 18.9488C18.2509 18.8994 18.5986 18.8072 18.862 18.673C19.4265 18.3854 19.8854 17.9265 20.173 17.362C20.3072 17.0986 20.3994 16.7509 20.4488 16.1458C20.4992 15.5289 20.5 14.7366 20.5 13.6V10.4C20.5 9.26339 20.4992 8.47108 20.4488 7.85424C20.3994 7.24907 20.3072 6.90138 20.173 6.63803C19.8854 6.07354 19.4265 5.6146 18.862 5.32698C18.5986 5.19279 18.2509 5.10062 17.6458 5.05118C17.0289 5.00078 16.2366 5 15.1 5H11.5ZM5 8.5C5 7.94772 5.44772 7.5 6 7.5H7C7.55229 7.5 8 7.94772 8 8.5C8 9.05229 7.55229 9.5 7 9.5H6C5.44772 9.5 5 9.05229 5 8.5ZM5 12C5 11.4477 5.44772 11 6 11H7C7.55229 11 8 11.4477 8 12C8 12.5523 7.55229 13 7 13H6C5.44772 13 5 12.5523 5 12Z" fill="currentColor" />
              </svg>
            </button>
          </div>

          <div className="hidden lg:flex items-center space-x-4">
            <div className="relative">
              <button 
                onClick={() => {
                  setShowMessages(!showMessages);
                  setShowNotifications(false);
                }}
                className="p-2 rounded-lg hover:bg-gray-800 text-gray-400 hover:text-white transition-colors relative"
              >
                <MessageSquare className="h-6 w-6" />
                <span className="absolute top-0 right-0 h-4 w-4 bg-primary-500 rounded-full text-xs flex items-center justify-center text-white">
                  2
                </span>
              </button>
              {showMessages && (
                <div className="absolute right-0 mt-2 w-80 rounded-lg bg-gray-800 border border-gray-700 shadow-lg py-1 divide-y divide-gray-700 z-50">
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
                onClick={() => {
                  setShowNotifications(!showNotifications);
                  setShowMessages(false);
                }}
                className="p-2 rounded-lg hover:bg-gray-800 text-gray-400 hover:text-white transition-colors relative"
              >
                <Bell className="h-6 w-6" />
                <span className="absolute top-0 right-0 h-4 w-4 bg-red-500 rounded-full text-xs flex items-center justify-center text-white">
                  3
                </span>
              </button>
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 rounded-lg bg-gray-800 border border-gray-700 shadow-lg py-1 divide-y divide-gray-700 z-50">
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
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-800 transition-colors"
              >
                <div className="w-8 h-8 rounded-full overflow-hidden">
                  <img
                    src="/placeholder.svg"
                    alt="User avatar"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="text-left">
                  <p className="text-sm font-medium text-white">John Doe</p>
                  <p className="text-xs text-gray-400">Administrator</p>
                </div>
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

        {/* Mobile view icons */}
        <div className="flex items-center justify-end space-x-4 mt-2 lg:hidden">
          <button className="p-2 rounded-lg hover:bg-gray-800 text-gray-400 hover:text-white transition-colors relative">
            <MessageSquare className="h-6 w-6" />
            <span className="absolute top-0 right-0 h-4 w-4 bg-primary-500 rounded-full text-xs flex items-center justify-center text-white">
              2
            </span>
          </button>
          <button className="p-2 rounded-lg hover:bg-gray-800 text-gray-400 hover:text-white transition-colors relative">
            <Bell className="h-6 w-6" />
            <span className="absolute top-0 right-0 h-4 w-4 bg-red-500 rounded-full text-xs flex items-center justify-center text-white">
              3
            </span>
          </button>
          <button className="p-2 rounded-lg hover:bg-gray-800 text-gray-400 hover:text-white transition-colors">
            <User className="h-6 w-6" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
