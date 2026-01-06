import React, { useState, useEffect } from 'react';
import { 
  DollarSign, 
  CreditCard, 
  TrendingUp, 
  TrendingDown,
  Calendar,
  Search,
  Filter,
  Download,
  Eye,
  CheckCircle,
  AlertCircle,
  Clock,
  Users,
  Receipt,
  PieChart,
  BarChart3
} from 'lucide-react';
import { getStoredStudents } from '../utils/localStorage';
import { studentsData } from '../data/studentsData';

const Payments= () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');
  const [allStudents, setAllStudents] = useState([]);

  // Sample payment history data
  const paymentHistory = [
    {
      id: 1,
      studentId: 1,
      studentName: 'Priya Sharma',
      course: 'IELTS Preparation',
      paymentType: 'Course Fee',
      amount: 5000,
      previousBalance: 10000,
      newBalance: 5000,
      paymentDate: '2024-01-15',
      paymentTime: '10:30 AM',
      method: 'UPI',
      transactionId: 'TXN123456789',
      receivedBy: 'Admin',
      notes: 'Second installment payment'
    },
    {
      id: 2,
      studentId: 2,
      studentName: 'Raj Kumar Singh',
      course: 'Spoken English',
      paymentType: 'Full Payment',
      amount: 8000,
      previousBalance: 8000,
      newBalance: 0,
      paymentDate: '2024-01-14',
      paymentTime: '2:15 PM',
      method: 'Cash',
      transactionId: 'TXN123456788',
      receivedBy: 'Admin',
      notes: 'Complete course fee payment'
    },
    {
      id: 3,
      studentId: 3,
      studentName: 'Anita Gupta',
      course: 'Grammar Basics',
      paymentType: 'Final Payment',
      amount: 2500,
      previousBalance: 2500,
      newBalance: 0,
      paymentDate: '2024-01-13',
      paymentTime: '11:45 AM',
      method: 'Bank Transfer',
      transactionId: 'TXN123456787',
      receivedBy: 'Admin',
      notes: 'Course completion payment'
    },
    {
      id: 4,
      studentId: 4,
      studentName: 'Vikash Yadav',
      course: 'Business English',
      paymentType: 'Partial Payment',
      amount: 8000,
      previousBalance: 18000,
      newBalance: 10000,
      paymentDate: '2024-01-12',
      paymentTime: '4:20 PM',
      method: 'Card',
      transactionId: 'TXN123456786',
      receivedBy: 'Admin',
      notes: 'First installment payment'
    },
    {
      id: 5,
      studentId: 1,
      studentName: 'Priya Sharma',
      course: 'IELTS Preparation',
      paymentType: 'Initial Payment',
      amount: 5000,
      previousBalance: 15000,
      newBalance: 10000,
      paymentDate: '2024-01-10',
      paymentTime: '9:30 AM',
      method: 'UPI',
      transactionId: 'TXN123456785',
      receivedBy: 'Admin',
      notes: 'Registration fee and first installment'
    },
    {
      id: 6,
      studentId: 5,
      studentName: 'Pooja Mishra',
      course: 'IELTS Preparation',
      paymentType: 'Registration Fee',
      amount: 1500,
      previousBalance: 15000,
      newBalance: 13500,
      paymentDate: '2024-01-08',
      paymentTime: '3:15 PM',
      method: 'Cash',
      transactionId: 'TXN123456784',
      receivedBy: 'Admin',
      notes: 'Initial registration payment'
    }
  ];

  // Load students from localStorage on component mount
  useEffect(() => {
    const storedStudents = getStoredStudents();
    const combinedStudents = [...studentsData, ...storedStudents];
    setAllStudents(combinedStudents);
  }, []);

  // Calculate payment statistics
  const paymentStats = {
    totalRevenue: allStudents.reduce((sum, student) => sum + Number(student.paidFees), 0),
    pendingAmount: allStudents.reduce((sum, student) => sum + (Number(student.totalFees) - Number(student.paidFees)), 0),
    totalStudents: allStudents.length,
    paidStudents: allStudents.filter(s => s.paymentStatus === 'Paid').length,
    partialStudents: allStudents.filter(s => s.paymentStatus === 'Partial').length,
    dueStudents: allStudents.filter(s => s.paymentStatus === 'Due').length
  };

  // Sample payment transactions
  const recentTransactions = [
    {
      id: 1,
      studentName: 'Priya Sharma',
      course: 'IELTS Preparation',
      amount: 5000,
      date: '2024-01-15',
      time: '10:30 AM',
      method: 'UPI',
      status: 'Completed',
      transactionId: 'TXN123456789'
    },
    {
      id: 2,
      studentName: 'Raj Kumar Singh',
      course: 'Spoken English',
      amount: 3000,
      date: '2024-01-14',
      time: '2:15 PM',
      method: 'Cash',
      status: 'Completed',
      transactionId: 'TXN123456788'
    },
    {
      id: 3,
      studentName: 'Anita Gupta',
      course: 'Grammar Basics',
      amount: 2500,
      date: '2024-01-13',
      time: '11:45 AM',
      method: 'Bank Transfer',
      status: 'Pending',
      transactionId: 'TXN123456787'
    },
    {
      id: 4,
      studentName: 'Vikash Yadav',
      course: 'Business English',
      amount: 8000,
      date: '2024-01-12',
      time: '4:20 PM',
      method: 'Card',
      status: 'Completed',
      transactionId: 'TXN123456786'
    },
    {
      id: 5,
      studentName: 'Pooja Mishra',
      course: 'IELTS Preparation',
      amount: 1500,
      date: '2024-01-11',
      time: '9:30 AM',
      method: 'UPI',
      status: 'Failed',
      transactionId: 'TXN123456785'
    }
  ];

  const getPaymentStatusBadge = (status) => {
    switch (status.toLowerCase()) {
      case 'paid':
        return 'bg-green-100 text-green-800';
      case 'partial':
        return 'bg-yellow-100 text-yellow-800';
      case 'due':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTransactionStatusBadge = (status) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPaymentMethodIcon = (method) => {
    switch (method.toLowerCase()) {
      case 'upi':
        return <CreditCard className="h-4 w-4 text-blue-600" />;
      case 'cash':
        return <DollarSign className="h-4 w-4 text-green-600" />;
      case 'card':
        return <CreditCard className="h-4 w-4 text-purple-600" />;
      case 'bank transfer':
        return <Receipt className="h-4 w-4 text-orange-600" />;
      default:
        return <DollarSign className="h-4 w-4 text-gray-600" />;
    }
  };

  // Filter students based on search and filters
  const filteredStudents = allStudents.filter(student => {
    const fullName = `${student.firstName} ${student.lastName}`.toLowerCase();
    const matchesSearch = searchTerm === '' || fullName.includes(searchTerm.toLowerCase());
    const matchesStatusFilter = statusFilter === 'all' || student.paymentStatus.toLowerCase() === statusFilter.toLowerCase();
    
    return matchesSearch && matchesStatusFilter;
  });

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'transactions', label: 'Transactions', icon: Receipt },
    { id: 'students', label: 'Student Payments', icon: Users },
    { id: 'history', label: 'Payment History', icon: Clock },
    { id: 'reports', label: 'Reports', icon: PieChart }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Payment Dashboard</h1>
        <p className="text-gray-600">Manage payments, track revenue, and generate financial reports</p>
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
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Payment Statistics */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-green-100 text-sm">Total Revenue</p>
                      <p className="text-2xl font-bold">₹{paymentStats.totalRevenue.toLocaleString()}</p>
                    </div>
                    <TrendingUp className="h-8 w-8 text-green-200" />
                  </div>
                  <div className="mt-4 flex items-center">
                    <TrendingUp className="h-4 w-4 mr-1" />
                    <span className="text-sm">+12% from last month</span>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-red-500 to-red-600 rounded-xl p-6 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-red-100 text-sm">Pending Amount</p>
                      <p className="text-2xl font-bold">₹{paymentStats.pendingAmount.toLocaleString()}</p>
                    </div>
                    <TrendingDown className="h-8 w-8 text-red-200" />
                  </div>
                  <div className="mt-4 flex items-center">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    <span className="text-sm">{paymentStats.dueStudents} students pending</span>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-6 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-blue-100 text-sm">Paid Students</p>
                      <p className="text-2xl font-bold">{paymentStats.paidStudents}</p>
                    </div>
                    <CheckCircle className="h-8 w-8 text-blue-200" />
                  </div>
                  <div className="mt-4 flex items-center">
                    <Users className="h-4 w-4 mr-1" />
                    <span className="text-sm">of {paymentStats.totalStudents} total</span>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-xl p-6 text-white">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-yellow-100 text-sm">Partial Payments</p>
                      <p className="text-2xl font-bold">{paymentStats.partialStudents}</p>
                    </div>
                    <Clock className="h-8 w-8 text-yellow-200" />
                  </div>
                  <div className="mt-4 flex items-center">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    <span className="text-sm">Need follow-up</span>
                  </div>
                </div>
              </div>

              {/* Payment Status Chart */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Status Distribution</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                        <span className="text-gray-700">Paid</span>
                      </div>
                      <div className="text-right">
                        <span className="font-semibold">{paymentStats.paidStudents}</span>
                        <span className="text-gray-500 text-sm ml-2">
                          ({Math.round((paymentStats.paidStudents / paymentStats.totalStudents) * 100)}%)
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
                        <span className="text-gray-700">Partial</span>
                      </div>
                      <div className="text-right">
                        <span className="font-semibold">{paymentStats.partialStudents}</span>
                        <span className="text-gray-500 text-sm ml-2">
                          ({Math.round((paymentStats.partialStudents / paymentStats.totalStudents) * 100)}%)
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                        <span className="text-gray-700">Due</span>
                      </div>
                      <div className="text-right">
                        <span className="font-semibold">{paymentStats.dueStudents}</span>
                        <span className="text-gray-500 text-sm ml-2">
                          ({Math.round((paymentStats.dueStudents / paymentStats.totalStudents) * 100)}%)
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Revenue Trend</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">January 2024</span>
                      <span className="font-semibold text-green-600">₹2,45,000</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">December 2023</span>
                      <span className="font-semibold">₹2,18,000</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">November 2023</span>
                      <span className="font-semibold">₹1,95,000</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">October 2023</span>
                      <span className="font-semibold">₹2,02,000</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'transactions' && (
            <div className="space-y-6">
              {/* Transaction Filters */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search transactions..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy-500 focus:border-transparent"
                  />
                </div>
                
                <div className="flex items-center space-x-4">
                  <select className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-navy-500 focus:border-transparent">
                    <option value="all">All Status</option>
                    <option value="completed">Completed</option>
                    <option value="pending">Pending</option>
                    <option value="failed">Failed</option>
                  </select>
                  
                  <select className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-navy-500 focus:border-transparent">
                    <option value="all">All Methods</option>
                    <option value="upi">UPI</option>
                    <option value="cash">Cash</option>
                    <option value="card">Card</option>
                    <option value="bank">Bank Transfer</option>
                  </select>

                  <button className="px-4 py-2 bg-navy-600 text-white rounded-lg hover:bg-navy-700 transition-colors flex items-center space-x-2">
                    <Download className="h-4 w-4" />
                    <span>Export</span>
                  </button>
                </div>
              </div>

              {/* Transactions Table */}
              <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="text-left py-3 px-6 font-medium text-gray-700">Transaction ID</th>
                        <th className="text-left py-3 px-6 font-medium text-gray-700">Student</th>
                        <th className="text-left py-3 px-6 font-medium text-gray-700">Course</th>
                        <th className="text-left py-3 px-6 font-medium text-gray-700">Amount</th>
                        <th className="text-left py-3 px-6 font-medium text-gray-700">Method</th>
                        <th className="text-left py-3 px-6 font-medium text-gray-700">Date</th>
                        <th className="text-left py-3 px-6 font-medium text-gray-700">Status</th>
                        <th className="text-left py-3 px-6 font-medium text-gray-700">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {recentTransactions.map((transaction) => (
                        <tr key={transaction.id} className="hover:bg-gray-50">
                          <td className="py-4 px-6">
                            <span className="font-mono text-sm text-gray-900">{transaction.transactionId}</span>
                          </td>
                          <td className="py-4 px-6">
                            <span className="font-medium text-gray-900">{transaction.studentName}</span>
                          </td>
                          <td className="py-4 px-6">
                            <span className="text-gray-600">{transaction.course}</span>
                          </td>
                          <td className="py-4 px-6">
                            <span className="font-semibold text-gray-900">₹{transaction.amount.toLocaleString()}</span>
                          </td>
                          <td className="py-4 px-6">
                            <div className="flex items-center space-x-2">
                              {getPaymentMethodIcon(transaction.method)}
                              <span className="text-gray-600">{transaction.method}</span>
                            </div>
                          </td>
                          <td className="py-4 px-6">
                            <div>
                              <span className="text-gray-900">{transaction.date}</span>
                              <br />
                              <span className="text-sm text-gray-500">{transaction.time}</span>
                            </div>
                          </td>
                          <td className="py-4 px-6">
                            <span className={`px-2 py-1 rounded-full text-sm font-medium ${getTransactionStatusBadge(transaction.status)}`}>
                              {transaction.status}
                            </span>
                          </td>
                          <td className="py-4 px-6">
                            <button className="p-1 text-gray-400 hover:text-blue-600 transition-colors">
                              <Eye className="h-4 w-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'students' && (
            <div className="space-y-6">
              {/* Student Payment Filters */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search students..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy-500 focus:border-transparent"
                  />
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <Filter className="h-4 w-4 text-gray-400" />
                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-navy-500 focus:border-transparent"
                    >
                      <option value="all">All Payments</option>
                      <option value="paid">Paid</option>
                      <option value="partial">Partial</option>
                      <option value="due">Due</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Student Payment Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredStudents.map((student) => (
                  <div key={student.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="font-semibold text-gray-900">{student.firstName} {student.lastName}</h3>
                        <p className="text-sm text-gray-600">{student.course}</p>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPaymentStatusBadge(student.paymentStatus)}`}>
                        {student.paymentStatus}
                      </span>
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Total Fees:</span>
                        <span className="font-semibold">₹{Number(student.totalFees).toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Paid Amount:</span>
                        <span className="font-semibold text-green-600">₹{Number(student.paidFees).toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Remaining:</span>
                        <span className="font-semibold text-red-600">
                          ₹{(Number(student.totalFees) - Number(student.paidFees)).toLocaleString()}
                        </span>
                      </div>
                    </div>

                    <div className="mt-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-600">Payment Progress</span>
                        <span className="text-sm font-medium">
                          {Math.round((Number(student.paidFees) / Number(student.totalFees)) * 100)}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-green-500 h-2 rounded-full transition-all"
                          style={{ 
                            width: `${(Number(student.paidFees) / Number(student.totalFees)) * 100}%` 
                          }}
                        />
                      </div>
                    </div>

                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <button className="w-full bg-navy-600 text-white py-2 rounded-lg hover:bg-navy-700 transition-colors">
                        Record Payment
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'history' && (
            <div className="space-y-6">
              {/* Payment History Filters */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search payment history..."
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy-500 focus:border-transparent"
                  />
                </div>
                
                <div className="flex items-center space-x-4">
                  <select className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-navy-500 focus:border-transparent">
                    <option value="all">All Students</option>
                    <option value="priya">Priya Sharma</option>
                    <option value="raj">Raj Kumar Singh</option>
                    <option value="anita">Anita Gupta</option>
                    <option value="vikash">Vikash Yadav</option>
                    <option value="pooja">Pooja Mishra</option>
                  </select>
                  
                  <select className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-navy-500 focus:border-transparent">
                    <option value="all">All Methods</option>
                    <option value="upi">UPI</option>
                    <option value="cash">Cash</option>
                    <option value="card">Card</option>
                    <option value="bank">Bank Transfer</option>
                  </select>

                  <input
                    type="date"
                    className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-navy-500 focus:border-transparent"
                  />

                  <button className="px-4 py-2 bg-navy-600 text-white rounded-lg hover:bg-navy-700 transition-colors flex items-center space-x-2">
                    <Download className="h-4 w-4" />
                    <span>Export</span>
                  </button>
                </div>
              </div>

              {/* Payment History Timeline */}
              <div className="space-y-4">
                {paymentHistory.map((payment) => (
                  <div key={payment.id} className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                          {getPaymentMethodIcon(payment.method)}
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{payment.studentName}</h3>
                          <p className="text-sm text-gray-600">{payment.course}</p>
                          <p className="text-xs text-gray-500 mt-1">{payment.paymentType}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-green-600">₹{payment.amount.toLocaleString()}</p>
                        <p className="text-sm text-gray-500">{payment.paymentDate} at {payment.paymentTime}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                      <div className="bg-gray-50 rounded-lg p-3">
                        <p className="text-xs text-gray-600">Previous Balance</p>
                        <p className="font-semibold text-gray-900">₹{payment.previousBalance.toLocaleString()}</p>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-3">
                        <p className="text-xs text-gray-600">Payment Amount</p>
                        <p className="font-semibold text-green-600">₹{payment.amount.toLocaleString()}</p>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-3">
                        <p className="text-xs text-gray-600">Remaining Balance</p>
                        <p className="font-semibold text-red-600">₹{payment.newBalance.toLocaleString()}</p>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-3">
                        <p className="text-xs text-gray-600">Payment Method</p>
                        <div className="flex items-center space-x-2">
                          {getPaymentMethodIcon(payment.method)}
                          <span className="font-semibold text-gray-900">{payment.method}</span>
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-gray-200 pt-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <span>Transaction ID: <span className="font-mono">{payment.transactionId}</span></span>
                          <span>Received by: <span className="font-medium">{payment.receivedBy}</span></span>
                        </div>
                        <button className="text-navy-600 hover:text-navy-700 text-sm font-medium flex items-center space-x-1">
                          <Eye className="h-4 w-4" />
                          <span>View Receipt</span>
                        </button>
                      </div>
                      {payment.notes && (
                        <div className="mt-2">
                          <p className="text-sm text-gray-600">
                            <span className="font-medium">Notes:</span> {payment.notes}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Payment Summary */}
              <div className="bg-gradient-to-r from-navy-600 to-navy-700 rounded-xl p-6 text-white">
                <h3 className="text-lg font-semibold mb-4">Payment History Summary</h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold">{paymentHistory.length}</p>
                    <p className="text-navy-200 text-sm">Total Payments</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold">₹{paymentHistory.reduce((sum, p) => sum + p.amount, 0).toLocaleString()}</p>
                    <p className="text-navy-200 text-sm">Total Amount</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold">{new Set(paymentHistory.map(p => p.studentId)).size}</p>
                    <p className="text-navy-200 text-sm">Students Paid</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold">₹{Math.round(paymentHistory.reduce((sum, p) => sum + p.amount, 0) / paymentHistory.length).toLocaleString()}</p>
                    <p className="text-navy-200 text-sm">Average Payment</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'reports' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Generate Reports</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Report Type</label>
                      <select className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-navy-500 focus:border-transparent">
                        <option>Payment Summary</option>
                        <option>Student Wise Report</option>
                        <option>Course Wise Revenue</option>
                        <option>Monthly Collection</option>
                        <option>Outstanding Payments</option>
                      </select>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">From Date</label>
                        <input
                          type="date"
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-navy-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">To Date</label>
                        <input
                          type="date"
                          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-navy-500 focus:border-transparent"
                        />
                      </div>
                    </div>

                    <button className="w-full bg-navy-600 text-white py-2 rounded-lg hover:bg-navy-700 transition-colors flex items-center justify-center space-x-2">
                      <Download className="h-4 w-4" />
                      <span>Generate Report</span>
                    </button>
                  </div>
                </div>

                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Stats</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                      <span className="text-green-700">Today's Collection</span>
                      <span className="font-bold text-green-800">₹18,500</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                      <span className="text-blue-700">This Week</span>
                      <span className="font-bold text-blue-800">₹89,200</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                      <span className="text-purple-700">This Month</span>
                      <span className="font-bold text-purple-800">₹2,45,000</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
                      <span className="text-orange-700">Outstanding</span>
                      <span className="font-bold text-orange-800">₹1,23,500</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Payments;