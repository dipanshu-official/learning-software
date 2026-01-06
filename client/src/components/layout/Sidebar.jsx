import React from 'react';
import { NavLink } from 'react-router-dom';
import { getUserSession, clearUserSession } from '../../utils/auth';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { 
  Home, 
  Users, 
  BookOpen, 
  GraduationCap, 
  Settings,
  LogOut,
  X,
  UserPlus,
  Bell,
  DollarSign
} from 'lucide-react';


const Sidebar = ({ 
  sidebarOpen, 
  setSidebarOpen 
}) => {
  const userSession = getUserSession();
  const navigate = useNavigate();

  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home, path: '/dashboard' },
    { id: 'registration', label: 'New Registration', icon: UserPlus, path: '/new-registration' },
    { id: 'students', label: 'Students', icon: Users, path: '/students' },
    { id: 'new-course', label: 'Create Course', icon: BookOpen, path: '/create-course' },
    { id: 'courses', label: 'Courses', icon: BookOpen, path: '/courses' },
    { id: 'notifications', label: 'Send Notifications', icon: Bell, path: '/notifications' },
    { id: 'payments', label: 'Payment Dashboard', icon: DollarSign, path: '/payments' },
    { id: 'settings', label: 'Settings', icon: Settings, path: '/settings' },
  ];

  const handleLogout = () => {
   localStorage.removeItem('token');
   navigate('/login');
    toast.success('Logged out successfully');
   
  };

  const handleMenuClick = () => {
    setSidebarOpen(false);
  };

  return (
    <>
      <div className={`fixed inset-y-0 left-0 z-30 w-64 bg-navy-900 shadow-xl transform ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } transition-transform duration-300 ease-in-out lg:translate-x-0`}>
        
        <div className="flex items-center justify-between h-16 px-6 bg-navy-800">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gold-500 rounded-lg flex items-center justify-center">
              <span className="text-navy-900 font-bold text-lg">S</span>
            </div>
            <div className="flex flex-col">
              <span className="text-white font-bold text-sm">LMS</span>
              <span className="text-gold-400 text-xs">Learning Management System</span>
              {userSession && (
                <span className="text-navy-300 text-xs mt-1">{userSession.role}</span>
              )}
            </div>
          </div>
          
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-1 rounded-md text-gray-400 hover:text-white transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="mt-8 px-4 pb-20">
          <div className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              
              return (
                <NavLink
                  key={item.id}
                  to={item.path}
                  onClick={handleMenuClick}
                  className={({ isActive }) =>
                    `w-full flex items-center px-4 py-3 text-left rounded-lg transition-all duration-200 ${
                      isActive
                        ? 'bg-gold-500 text-navy-900 shadow-lg'
                        : 'text-gray-300 hover:bg-navy-800 hover:text-white'
                    }`
                  }
                >
                  <Icon className="h-5 w-5 mr-3" />
                  <span className="font-medium">{item.label}</span>
                </NavLink>
              );
            })}
          </div>

          <div className="mt-8 pt-8 border-t border-navy-700">
            <button 
              onClick={handleLogout}
              className="w-full flex items-center px-4 py-3 text-gray-300 hover:bg-navy-800 hover:text-white rounded-lg transition-all duration-200"
            >
              <LogOut className="h-5 w-5 mr-3" />
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </nav>

        <div className="absolute bottom-4 left-4 right-4">
          <div className="bg-navy-800 rounded-lg p-4 text-center">
            <p className="text-gold-400 text-sm font-medium">Jagdevpath, Patna</p>
            <p className="text-gray-400 text-xs mt-1">
              Admin Panel v1.0
              {userSession && (
                <span className="block mt-1">Welcome, {userSession.email}</span>
              )}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;