import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { 
  Bell, 
  Send, 
  Users, 
  User, 
  MessageSquare, 
  Calendar,
  CheckCircle,
  AlertCircle,
  Info,
  Mail,
  Phone,
  Filter,
  Search
} from 'lucide-react';

const Notifications = () => {
  const [activeTab, setActiveTab] = useState('send');
  const [notificationData, setNotificationData] = useState({
    title: '',
    message: '',
    type: 'info',
    recipients: 'all',
    specificRecipients: [],
    scheduleDate: '',
    scheduleTime: '',
    sendVia: ['app']
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStudents, setSelectedStudents] = useState([]);

  // Sample students data for recipient selection
  const students = [
    { id: 1, name: 'Priya Sharma', email: 'priya.sharma@email.com', phone: '+91 98765 43210', course: 'IELTS Preparation' },
    { id: 2, name: 'Raj Kumar Singh', email: 'raj.kumar@email.com', phone: '+91 87654 32109', course: 'Spoken English' },
    { id: 3, name: 'Anita Gupta', email: 'anita.gupta@email.com', phone: '+91 76543 21098', course: 'Grammar Basics' },
    { id: 4, name: 'Vikash Yadav', email: 'vikash.yadav@email.com', phone: '+91 65432 10987', course: 'Business English' },
    { id: 5, name: 'Pooja Mishra', email: 'pooja.mishra@email.com', phone: '+91 54321 09876', course: 'IELTS Preparation' }
  ];

  // Sample notification history
  const notificationHistory = [
    {
      id: 1,
      title: 'Class Schedule Update',
      message: 'Tomorrow\'s IELTS class has been rescheduled to 3:00 PM',
      type: 'info',
      recipients: 'IELTS Students',
      sentDate: '2024-01-15',
      sentTime: '10:30 AM',
      status: 'Delivered',
      readCount: 25,
      totalRecipients: 28
    },
    {
      id: 2,
      title: 'Fee Payment Reminder',
      message: 'Your course fee payment is due in 3 days. Please make the payment to avoid interruption.',
      type: 'warning',
      recipients: 'Pending Payment Students',
      sentDate: '2024-01-14',
      sentTime: '2:15 PM',
      status: 'Delivered',
      readCount: 12,
      totalRecipients: 15
    },
    {
      id: 3,
      title: 'New Course Available',
      message: 'We are excited to announce our new Advanced English Communication course starting next month.',
      type: 'success',
      recipients: 'All Students',
      sentDate: '2024-01-13',
      sentTime: '11:00 AM',
      status: 'Delivered',
      readCount: 156,
      totalRecipients: 180
    }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNotificationData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSendViaChange = (method) => {
    setNotificationData(prev => ({
      ...prev,
      sendVia: prev.sendVia.includes(method)
        ? prev.sendVia.filter(m => m !== method)
        : [...prev.sendVia, method]
    }));
  };

  const handleStudentSelection = (studentId) => {
    setSelectedStudents(prev =>
      prev.includes(studentId)
        ? prev.filter(id => id !== studentId)
        : [...prev, studentId]
    );
  };

  const handleSendNotification = (e) => {
    e.preventDefault();
    
    // Here you would implement the actual notification sending logic
    console.log('Sending notification:', notificationData);
    console.log('Selected students:', selectedStudents);
    
    toast.success('Notification sent successfully!');
    
    // Reset form
    setNotificationData({
      title: '',
      message: '',
      type: 'info',
      recipients: 'all',
      specificRecipients: [],
      scheduleDate: '',
      scheduleTime: '',
      sendVia: ['app']
    });
    setSelectedStudents([]);
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'warning':
        return <AlertCircle className="h-5 w-5 text-yellow-600" />;
      case 'error':
        return <AlertCircle className="h-5 w-5 text-red-600" />;
      default:
        return <Info className="h-5 w-5 text-blue-600" />;
    }
  };

  const getTypeBadge = (type) => {
    const styles = {
      success: 'bg-green-100 text-green-800',
      warning: 'bg-yellow-100 text-yellow-800',
      error: 'bg-red-100 text-red-800',
      info: 'bg-blue-100 text-blue-800'
    };
    return styles[type] || styles.info;
  };

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.course.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const tabs = [
    { id: 'send', label: 'Send Notification', icon: Send },
    { id: 'history', label: 'Notification History', icon: Bell }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
        <p className="text-gray-600">Send notifications and manage communication with students</p>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-navy-500 text-navy-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'send' ? (
            <form onSubmit={handleSendNotification} className="space-y-6">
              {/* Notification Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Notification Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={notificationData.title}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy-500 focus:border-transparent"
                    placeholder="Enter notification title"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Notification Type <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="type"
                    value={notificationData.type}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy-500 focus:border-transparent"
                  >
                    <option value="info">Information</option>
                    <option value="success">Success</option>
                    <option value="warning">Warning</option>
                    <option value="error">Error</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="message"
                  value={notificationData.message}
                  onChange={handleInputChange}
                  required
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy-500 focus:border-transparent"
                  placeholder="Enter your notification message"
                />
              </div>

              {/* Recipients Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Recipients <span className="text-red-500">*</span>
                </label>
                <div className="space-y-3">
                  <div className="flex items-center space-x-4">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="recipients"
                        value="all"
                        checked={notificationData.recipients === 'all'}
                        onChange={handleInputChange}
                        className="h-4 w-4 text-navy-600 focus:ring-navy-500 border-gray-300"
                      />
                      <span className="ml-2 text-sm text-gray-700">All Students</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="recipients"
                        value="course"
                        checked={notificationData.recipients === 'course'}
                        onChange={handleInputChange}
                        className="h-4 w-4 text-navy-600 focus:ring-navy-500 border-gray-300"
                      />
                      <span className="ml-2 text-sm text-gray-700">By Course</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="recipients"
                        value="specific"
                        checked={notificationData.recipients === 'specific'}
                        onChange={handleInputChange}
                        className="h-4 w-4 text-navy-600 focus:ring-navy-500 border-gray-300"
                      />
                      <span className="ml-2 text-sm text-gray-700">Specific Students</span>
                    </label>
                  </div>

                  {notificationData.recipients === 'course' && (
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy-500 focus:border-transparent">
                      <option value="">Select Course</option>
                      <option value="ielts">IELTS Preparation</option>
                      <option value="spoken">Spoken English</option>
                      <option value="business">Business English</option>
                      <option value="grammar">Grammar Basics</option>
                    </select>
                  )}

                  {notificationData.recipients === 'specific' && (
                    <div className="border border-gray-300 rounded-lg p-4 max-h-60 overflow-y-auto">
                      <div className="mb-3">
                        <div className="relative">
                          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                          <input
                            type="text"
                            placeholder="Search students..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy-500 focus:border-transparent"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        {filteredStudents.map((student) => (
                          <label key={student.id} className="flex items-center p-2 hover:bg-gray-50 rounded">
                            <input
                              type="checkbox"
                              checked={selectedStudents.includes(student.id)}
                              onChange={() => handleStudentSelection(student.id)}
                              className="h-4 w-4 text-navy-600 focus:ring-navy-500 border-gray-300 rounded"
                            />
                            <div className="ml-3 flex-1">
                              <p className="text-sm font-medium text-gray-900">{student.name}</p>
                              <p className="text-xs text-gray-500">{student.course}</p>
                            </div>
                          </label>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Send Via Options */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Send Via <span className="text-red-500">*</span>
                </label>
                <div className="flex items-center space-x-6">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={notificationData.sendVia.includes('app')}
                      onChange={() => handleSendViaChange('app')}
                      className="h-4 w-4 text-navy-600 focus:ring-navy-500 border-gray-300 rounded"
                    />
                    <Bell className="ml-2 h-4 w-4 text-gray-500" />
                    <span className="ml-1 text-sm text-gray-700">In-App</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={notificationData.sendVia.includes('email')}
                      onChange={() => handleSendViaChange('email')}
                      className="h-4 w-4 text-navy-600 focus:ring-navy-500 border-gray-300 rounded"
                    />
                    <Mail className="ml-2 h-4 w-4 text-gray-500" />
                    <span className="ml-1 text-sm text-gray-700">Email</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={notificationData.sendVia.includes('sms')}
                      onChange={() => handleSendViaChange('sms')}
                      className="h-4 w-4 text-navy-600 focus:ring-navy-500 border-gray-300 rounded"
                    />
                    <Phone className="ml-2 h-4 w-4 text-gray-500" />
                    <span className="ml-1 text-sm text-gray-700">SMS</span>
                  </label>
                </div>
              </div>

              {/* Schedule Options */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Schedule (Optional)
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">Date</label>
                    <input
                      type="date"
                      name="scheduleDate"
                      value={notificationData.scheduleDate}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">Time</label>
                    <input
                      type="time"
                      name="scheduleTime"
                      value={notificationData.scheduleTime}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
                <button
                  type="button"
                  className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Save as Draft
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-navy-600 text-white rounded-lg hover:bg-navy-700 transition-colors flex items-center space-x-2"
                >
                  <Send className="h-4 w-4" />
                  <span>Send Notification</span>
                </button>
              </div>
            </form>
          ) : (
            /* Notification History */
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Recent Notifications</h3>
                <div className="flex items-center space-x-4">
                  <select className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-navy-500 focus:border-transparent">
                    <option value="all">All Types</option>
                    <option value="info">Information</option>
                    <option value="success">Success</option>
                    <option value="warning">Warning</option>
                    <option value="error">Error</option>
                  </select>
                </div>
              </div>

              <div className="space-y-4">
                {notificationHistory.map((notification) => (
                  <div key={notification.id} className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start space-x-3">
                        {getTypeIcon(notification.type)}
                        <div>
                          <h4 className="font-semibold text-gray-900">{notification.title}</h4>
                          <p className="text-gray-600 mt-1">{notification.message}</p>
                        </div>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getTypeBadge(notification.type)}`}>
                        {notification.type.charAt(0).toUpperCase() + notification.type.slice(1)}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="text-gray-600">Recipients</p>
                        <p className="font-medium text-gray-900">{notification.recipients}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Sent Date</p>
                        <p className="font-medium text-gray-900">{notification.sentDate} at {notification.sentTime}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Status</p>
                        <p className="font-medium text-green-600">{notification.status}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">Read Rate</p>
                        <p className="font-medium text-gray-900">
                          {notification.readCount}/{notification.totalRecipients} 
                          <span className="text-gray-500 ml-1">
                            ({Math.round((notification.readCount / notification.totalRecipients) * 100)}%)
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Notifications;