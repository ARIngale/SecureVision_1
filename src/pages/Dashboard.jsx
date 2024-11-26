import { React,useState } from 'react';
import {Home, ChevronLeft,ChevronRight,Users, UserPlus, Shield, Key,RefreshCw } from 'lucide-react';

const StatCard = ({ title, value, icon: Icon, color, description }) => (
  <div className="bg-black rounded-lg p-6 w-full md:w-full shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out">
    <div className={`flex items-center justify-between mb-4`}>
      <div>
        <p className="text-gray-400 text-sm">{title}</p>
        <h3 className="text-2xl font-bold mt-1 text-white">{value}</h3>
        {description && (
          <p className="text-gray-500 text-xs mt-3">{description}</p>
        )}
      </div>
      <div
        className={`p-3 rounded-lg ${color
          .replace('text-', 'bg-')
          .replace('400', '400/20')}`}
      >
        <Icon className={`h-6 w-6 ${color}`} />
      </div>
    </div>
  </div>
);

const CalendarComponent = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const currentDay = currentDate.getDate();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth + 1, 1));
  };

  return (
    <div className="bg-black rounded-lg p-6 w-full h-full shadow-lg">
         
      <div className="flex items-center justify-between mb-2">
        <button
          onClick={handlePrevMonth}
          className="text-gray-400 bg-slate-900 hover:bg-blue-600 hover:text-white w-10 h-10 flex items-center justify-center rounded-full transition-all duration-300 ease-in-out"
        >
          <ChevronLeft/>
        </button>

        <h3 className="text-lg font-semibold text-white">
          {months[currentMonth]} {currentYear}
        </h3>

        <button
          onClick={handleNextMonth}
          className="text-gray-400 bg-slate-900 hover:bg-blue-600 hover:text-white w-10 h-10 flex items-center justify-center rounded-full transition-all duration-300 ease-in-out"
        >
         <ChevronRight/>
        </button>
      </div>
      <div className="grid grid-cols-7 gap-1 mb-4">
        {days.map((day) => (
          <div key={day} className="text-center text-sm font-medium text-gray-400">
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-2">
        {Array.from({ length: firstDayOfMonth }).map((_, index) => (
          <div key={`empty-${index}`} className="h-8" />
        ))}
        {Array.from({ length: daysInMonth }).map((_, index) => {
          const day = index + 1;
          const isPast = day < currentDay;
          const isToday = day === currentDay;

          return (
            <div
              key={day}
              className={`h-10 flex items-center justify-center rounded-lg text-sm
                ${isToday ? 'bg-blue-600 text-white font-bold' : ''}
                ${isPast ? ' text-gray-600' : 'text-gray-300'}
                ${isPast ? 'bg-opacity-20' : ''}
                hover:bg-gray-700 cursor-pointer transition-all duration-300 ease-in-out transform hover:scale-105`}
            >
              {day}
            </div>
          );
        })}
      </div>
    </div>
  );
};

const RecentActivity = () => {
  const activities = [
    { user: 'John Doe', role: 'Admin', action: 'Created new user', type: 'User', time: '2 hours ago' },
    { user: 'Jane Smith', role: 'Editor', action: 'Updated article', type: 'Content', time: '4 hours ago' },
    { user: 'Mike Johnson', role: 'Viewer', action: 'Logged in', type: 'Auth', time: '1 day ago' },
  ];

  return (
    <div className="bg-black rounded-lg p-6">
      <h3 className="text-lg font-semibold text-white mb-4">Recent Activity</h3>
      <div className="space-y-4">
        {activities.map((activity, index) => (
          <div key={index} className="flex items-center justify-between py-3 border-b border-gray-700 last:border-0">
            <div className="flex items-center space-x-4">
              <div className="w-2 h-2 rounded-full bg-primary-500" />
              <div>
                <p className="text-sm text-white">{activity.action}</p>
                <p className="text-xs text-gray-400">by {activity.user} • {activity.role}</p>
              </div>
            </div>
            <span className="text-xs text-gray-400">{activity.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
};


const RBACAdminCard = () => {
  const roles = [
    { role: 'Admin', users: 5 },
    { role: 'Manager', users: 12 },
    { role: 'Editor', users: 8 },
    { role: 'Viewer', users: 35 },
    { role: 'Guest', users: 10 }
  ];

  return (
    <div className="bg-black rounded-lg p-6 w-full h-full shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white">Role Assignments Overview</h3>
        <RefreshCw className="h-5 w-5 text-gray-400" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-0">
        {roles.map((role, index) => (
          <div
            key={index}
            className="bg-gray-800 rounded-lg p-4 flex flex-col items-center shadow-md hover:shadow-xl transition-all duration-300 ease-in-out"
          >
            <div className="mb-2">
              <Shield className="h-6 w-6 text-blue-400" />
            </div>
            <h4 className="text-xl font-semibold text-white">{role.role}</h4>
            <p className="text-sm text-gray-400">{role.users} users</p>
          </div>
        ))}

        <div
          className="bg-gray-800 rounded-lg p-4 flex flex-col items-center justify-center shadow-md hover:shadow-xl transition-all duration-300 ease-in-out cursor-pointer"
          style={{ height: "150px", width: "100%" }}
        >
          <button className="bg-transparent text-blue-600 w-20 h-20 flex items-center justify-center text-4xl">
            +
          </button>
          {/* <p className="mt-2 text-sm text-gray-400">View All Roles</p> */}
        </div>
      </div>
    </div>
  );
};

const Dashboard = () => {
  return (
    <div className="space-y-6">
       <div className="flex items-center space-x-4">
          <Home className="h-8 w-8 text-blue-400" />
          <h1 className="text-3xl font-bold text-white">Dashboard</h1>
      </div>
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 w-full">
        <StatCard
      title="Total Users"
      value="1,234"
      icon={Users}
      color="text-blue-400"
      description="The total number of registered users on the platform."
    />

    <StatCard
      title="Active Roles"
      value="15"
      icon={UserPlus}
      color="text-green-400"
      description="Roles actively assigned to users."
    />

    <StatCard
      title="Permissions"
      value="56"
      icon={Shield}
      color="text-yellow-400"
      description="Different types of permissions available for customization."
    />

    <StatCard
      title="API Keys"
      value="8"
      icon={Key}
      color="text-purple-400"
      description="API keys currently generated for system integration."
    />

        </div>
        <div className="w-full lg:w-3/4">
        <RBACAdminCard />
        </div>
        <div className="w-full lg:w-3/5">
          <CalendarComponent />
        </div>
      </div>

      <RecentActivity />
    </div>

  );
};

export default Dashboard;