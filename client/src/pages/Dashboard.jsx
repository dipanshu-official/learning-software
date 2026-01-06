import React from 'react';
import { Users, BookOpen, GraduationCap, TrendingUp, Calendar, Star } from 'lucide-react';

const Dashboard = () => {
  const stats = [
    {
      title: 'Total Students',
      value: '1,247',
      change: '+12%',
      icon: Users,
      color: 'bg-blue-500'
    },
    {
      title: 'Active Courses',
      value: '24',
      change: '+3%',
      icon: BookOpen,
      color: 'bg-green-500'
    },
    {
      title: 'Teachers',
      value: '18',
      change: '+2',
      icon: GraduationCap,
      color: 'bg-purple-500'
    },
    {
      title: 'Revenue',
      value: '₹2.4L',
      change: '+18%',
      icon: TrendingUp,
      color: 'bg-gold-500'
    }
  ];

  const recentActivities = [
    { action: 'New student enrolled', user: 'Priya Sharma', time: '2 hours ago' },
    { action: 'Course completed', user: 'Raj Kumar', time: '4 hours ago' },
    { action: 'Payment received', user: 'Anita Singh', time: '6 hours ago' },
    { action: 'New course published', user: 'Teacher: Dr. Gupta', time: '1 day ago' },
  ];

  const upcomingClasses = [
    { course: 'IELTS Preparation', teacher: 'Ms. Priya', time: '10:00 AM', students: 25 },
    { course: 'Spoken English', teacher: 'Mr. Sharma', time: '2:00 PM', students: 18 },
    { course: 'Grammar Basics', teacher: 'Dr. Gupta', time: '4:00 PM', students: 22 },
  ];

  return (
    <div className="space-y-6 lg:space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-4">
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <span className="text-green-600 text-sm font-medium">{stat.change}</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</h3>
              <p className="text-gray-600 text-sm">{stat.title}</p>
            </div>
          );
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
        {/* Recent Activities */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-900">Recent Activities</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                  <div className="w-2 h-2 bg-navy-600 rounded-full mt-2"></div>
                  <div className="flex-1">
                    <p className="text-gray-900 font-medium">{activity.action}</p>
                    <p className="text-gray-600 text-sm">{activity.user}</p>
                    <p className="text-gray-400 text-xs mt-1">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Upcoming Classes */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-navy-600" />
              <h2 className="text-xl font-bold text-gray-900">Today's Classes</h2>
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {upcomingClasses.map((cls, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-gray-900">{cls.course}</h3>
                    <span className="text-navy-600 font-medium">{cls.time}</span>
                  </div>
                  <p className="text-gray-600 text-sm mb-2">{cls.teacher}</p>
                  <div className="flex items-center space-x-2">
                    <Users className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-500 text-xs">{cls.students} students</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Performance Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Course Performance</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">IELTS Preparation</span>
              <div className="flex items-center space-x-2">
                <Star className="h-4 w-4 text-gold-500" />
                <span className="text-gold-600 font-medium">4.9</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Spoken English</span>
              <div className="flex items-center space-x-2">
                <Star className="h-4 w-4 text-gold-500" />
                <span className="text-gold-600 font-medium">4.8</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Grammar Basics</span>
              <div className="flex items-center space-x-2">
                <Star className="h-4 w-4 text-gold-500" />
                <span className="text-gold-600 font-medium">4.7</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-4">
            <button className="p-4 bg-navy-50 hover:bg-navy-100 rounded-lg text-left transition-colors">
              <Users className="h-6 w-6 text-navy-600 mb-2" />
              <p className="font-medium text-navy-800">Add Student</p>
            </button>
            <button className="p-4 bg-gold-50 hover:bg-gold-100 rounded-lg text-left transition-colors">
              <BookOpen className="h-6 w-6 text-gold-600 mb-2" />
              <p className="font-medium text-gold-800">New Course</p>
            </button>
            <button className="p-4 bg-green-50 hover:bg-green-100 rounded-lg text-left transition-colors">
              <Calendar className="h-6 w-6 text-green-600 mb-2" />
              <p className="font-medium text-green-800">Schedule Class</p>
            </button>
            <button className="p-4 bg-purple-50 hover:bg-purple-100 rounded-lg text-left transition-colors">
              <GraduationCap className="h-6 w-6 text-purple-600 mb-2" />
              <p className="font-medium text-purple-800">Add Teacher</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;