import React from 'react';
import { useLocation } from 'react-router-dom';



const Header= ({ setSidebarOpen }) => {
  const location = useLocation();
  
  const getPageTitle = () => {
    const path = location.pathname;
    if (path === '/' || path === '/dashboard') return 'Dashboard';
    if (path === '/students') return 'Students';
    if (path === '/students/new') return 'New Registration';
    if (path.startsWith('/students/')) return 'Student Details';
    if (path === '/courses') return 'Courses';
    if (path === '/teachers') return 'Teachers';
    if (path === '/settings') return 'Settings';
    return 'Dashboard';
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 px-4 py-4 sm:px-6 lg:px-8 sticky top-0 z-10">
      <div className="flex items-center justify-between">
        <button
          onClick={() => setSidebarOpen(true)}
          className="lg:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-navy-500"
        >
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        
        <h1 className="text-xl sm:text-2xl font-bold text-navy-800 truncate">
          {getPageTitle()}
        </h1>
        
        <div className="flex items-center space-x-2 sm:space-x-4">
          <button className="p-2 rounded-full text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-navy-500">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5-5 5-5h-5m-6 10v-5a3 3 0 00-3-3H5" />
            </svg>
          </button>
          <div className="h-8 w-8 bg-navy-600 rounded-full flex items-center justify-center shadow-sm">
            <span className="text-white text-sm font-medium">A</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;