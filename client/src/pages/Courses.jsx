import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Search, Plus, Filter, Edit3, Trash2, Eye, Users, Clock, Star, AlertTriangle } from 'lucide-react';
import { getStoredCourses, deleteCourse } from '../utils/localStorage';

const Courses = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [allCourses, setAllCourses] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [courseToDelete, setCourseToDelete] = useState(null);

  // Load courses from localStorage on component mount
  useEffect(() => {
    const storedCourses = getStoredCourses();
    // Combine stored courses with dummy data
    const dummyCourses = [
    {
      id: 1,
      title: 'IELTS Preparation',
      description: 'Comprehensive IELTS preparation course covering all four skills: Reading, Writing, Listening, and Speaking. Includes practice tests and personalized feedback.',
      instructor: 'Dr. Priya Gupta',
      duration: '3 months',
      level: 'Intermediate',
      price: 15000,
      maxStudents: 30,
      category: 'IELTS',
      students: 245,
      rating: 4.9,
      status: 'Active',
      thumbnail: 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg',
      hasIntroVideo: true,
      videoCount: 24,
      materialCount: 15,
      prerequisites: 'Basic English knowledge',
      objectives: 'Achieve band 7+ in IELTS exam',
      enrolledStudents: 28
    },
    {
      id: 2,
      title: 'Spoken English Mastery',
      description: 'Build confidence in spoken English through interactive sessions, pronunciation practice, and real-world conversation scenarios.',
      instructor: 'Mr. Rajesh Sharma',
      duration: '2 months',
      level: 'Beginner',
      price: 8000,
      maxStudents: 25,
      category: 'Spoken English',
      students: 189,
      rating: 4.8,
      status: 'Active',
      thumbnail: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg',
      hasIntroVideo: true,
      videoCount: 16,
      materialCount: 8,
      prerequisites: 'None',
      objectives: 'Speak English fluently and confidently',
      enrolledStudents: 22
    },
    {
      id: 3,
      title: 'Business English',
      description: 'Master professional English for workplace communication, presentations, meetings, and business correspondence.',
      instructor: 'Ms. Anita Singh',
      duration: '4 months',
      level: 'Advanced',
      price: 18000,
      maxStudents: 20,
      category: 'Business English',
      students: 156,
      rating: 4.7,
      status: 'Active',
      thumbnail: 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg',
      hasIntroVideo: true,
      videoCount: 32,
      materialCount: 25,
      prerequisites: 'Intermediate English level',
      objectives: 'Excel in professional English communication',
      enrolledStudents: 18
    },
    {
      id: 4,
      title: 'Grammar Fundamentals',
      description: 'Complete grammar course covering all essential English grammar rules with practical exercises and real-world applications.',
      instructor: 'Dr. Vikash Kumar',
      duration: '6 weeks',
      level: 'Beginner',
      price: 5000,
      maxStudents: 40,
      category: 'Grammar',
      students: 312,
      rating: 4.6,
      status: 'Active',
      thumbnail: 'https://images.pexels.com/photos/301926/pexels-photo-301926.jpeg',
      hasIntroVideo: false,
      videoCount: 12,
      materialCount: 20,
      prerequisites: 'Basic reading ability',
      objectives: 'Master English grammar rules',
      enrolledStudents: 35
    },
    {
      id: 5,
      title: 'TOEFL Preparation',
      description: 'Comprehensive TOEFL preparation with practice tests, strategies, and personalized coaching for high scores.',
      instructor: 'Ms. Pooja Mishra',
      duration: '3 months',
      level: 'Intermediate',
      price: 16000,
      maxStudents: 25,
      category: 'TOEFL',
      students: 87,
      rating: 4.8,
      status: 'Draft',
      thumbnail: 'https://images.pexels.com/photos/159844/cellular-education-classroom-159844.jpeg',
      hasIntroVideo: true,
      videoCount: 28,
      materialCount: 18,
      prerequisites: 'Intermediate English proficiency',
      objectives: 'Score 100+ in TOEFL iBT',
      enrolledStudents: 0
    },
    {
      id: 6,
      title: 'English Writing Skills',
      description: 'Develop professional writing skills for essays, reports, and creative writing with detailed feedback and improvement strategies.',
      instructor: 'Dr. Priya Gupta',
      duration: '8 weeks',
      level: 'Intermediate',
      price: 7000,
      maxStudents: 30,
      category: 'Writing',
      students: 124,
      rating: 4.5,
      status: 'Active',
      thumbnail: 'https://images.pexels.com/photos/261763/pexels-photo-261763.jpeg',
      hasIntroVideo: true,
      videoCount: 14,
      materialCount: 12,
      prerequisites: 'Basic writing skills',
      objectives: 'Write clear, effective English content',
      enrolledStudents: 26
    },
    {
      id: 7,
      title: 'English for Beginners',
      description: 'Start your English learning journey with basic vocabulary, simple grammar, and everyday conversation skills.',
      instructor: 'Mr. Rajesh Sharma',
      duration: '4 months',
      level: 'Beginner',
      price: 6000,
      maxStudents: 35,
      category: 'General English',
      students: 298,
      rating: 4.4,
      status: 'Active',
      thumbnail: 'https://images.pexels.com/photos/256541/pexels-photo-256541.jpeg',
      hasIntroVideo: true,
      videoCount: 20,
      materialCount: 10,
      prerequisites: 'None',
      objectives: 'Build foundation in English language',
      enrolledStudents: 32
    },
    {
      id: 8,
      title: 'Advanced English Communication',
      description: 'Master advanced English communication skills including debates, presentations, and complex discussions.',
      instructor: 'Ms. Anita Singh',
      duration: '3 months',
      level: 'Advanced',
      price: 12000,
      maxStudents: 15,
      category: 'Advanced English',
      students: 67,
      rating: 4.9,
      status: 'Active',
      thumbnail: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg',
      hasIntroVideo: true,
      videoCount: 18,
      materialCount: 22,
      prerequisites: 'Upper-intermediate English level',
      objectives: 'Achieve native-like fluency',
      enrolledStudents: 14
    }
  ];
    
    const combinedCourses = [...dummyCourses, ...storedCourses];
    setAllCourses(combinedCourses);
  }, []);

  const getStatusBadge = (status  ) => {
    const statusStyles = {
      Active: 'bg-green-100 text-green-800',
      Draft: 'bg-yellow-100 text-yellow-800',
      Inactive: 'bg-red-100 text-red-800'
    };
    
    return statusStyles[status ] || 'bg-gray-100 text-gray-800';
  };

  const getLevelBadge = (level) => {
    const levelStyles = {
      Beginner: 'bg-blue-100 text-blue-800',
      Intermediate: 'bg-orange-100 text-orange-800',
      Advanced: 'bg-purple-100 text-purple-800'
    };
    
    return levelStyles[level ] || 'bg-gray-100 text-gray-800';
  };

  // Get unique categories for filter dropdown
  const uniqueCategories = [...new Set(allCourses.map(course => course.category))];

  // Filter courses based on search term and filters
  const filteredCourses = allCourses.filter(course => {
    const matchesSearch = searchTerm === '' || course.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         course.instructor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatusFilter = selectedFilter === 'all' || course.status.toLowerCase() === selectedFilter.toLowerCase();
    const matchesCategoryFilter = categoryFilter === 'all' || course.category === categoryFilter;
    
    return matchesSearch && matchesStatusFilter && matchesCategoryFilter;
  });

  const handleDeleteCourse = (course) => {
    setCourseToDelete(course);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (courseToDelete) {
      const success = deleteCourse(courseToDelete.id);
      if (success) {
        // Refresh courses list
        const storedCourses = getStoredCourses();
        const dummyCourses = [
          // ... existing dummy courses data
        ];
        const combinedCourses = [...dummyCourses, ...storedCourses];
        setAllCourses(combinedCourses);
        
        toast.success('Course deleted successfully!');
      } else {
        toast.error('Error deleting course. Please try again.');
      }
    }
    setShowDeleteModal(false);
    setCourseToDelete(null);
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
    setCourseToDelete(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Course Management</h1>
          <p className="text-gray-600">Create and manage your English courses</p>
        </div>
     
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search courses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy-500 focus:border-transparent"
            />
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Filter className="h-4 w-4 text-gray-400" />
              <select
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-navy-500 focus:border-transparent"
              >
                <option value="all">All Courses</option>
                <option value="active">Active</option>
                <option value="draft">Draft</option>
              </select>
            </div>
            
            <div className="flex items-center space-x-2">
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-navy-500 focus:border-transparent"
              >
                <option value="all">All Categories</option>
                {uniqueCategories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Course Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {filteredCourses.map((course, index) => (
          <div key={course.id || `course-${index}`} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
            {/* Course Thumbnail */}
            <div className="h-40 sm:h-48 bg-gray-200 overflow-hidden">
              <img 
                src={course.thumbnail} 
                alt={course.title}
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="p-4 sm:p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">{course.title}</h3>
                  <p className="text-gray-600 text-sm line-clamp-2">{course.description}</p>
                </div>
                <div className="flex items-center space-x-1">
                  <Star className="h-4 w-4 text-gold-500" />
                  <span className="text-sm font-medium text-gray-900">{course.rating}</span>
                </div>
              </div>

              <div className="flex items-center justify-between mb-4">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadge(course.status)}`}>
                  {course.status}
                </span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getLevelBadge(course.level)}`}>
                  {course.level}
                </span>
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Instructor:</span>
                  <span className="font-medium text-gray-900">{course.instructor}</span>
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Category:</span>
                  <span className="font-medium text-gray-900">{course.category}</span>
                </div>
                
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-600">{course.duration}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-600">{course.enrolledStudents}/{course.maxStudents}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Content:</span>
                  <span className="text-gray-600">{course.videoCount} videos, {course.materialCount} materials</span>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Price:</span>
                  <span className="font-bold text-navy-600">₹{course.price.toLocaleString()}</span>
                </div>
                
                {course.hasIntroVideo && (
                  <div className="flex items-center text-sm text-green-600">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                    <span>Has intro video</span>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <div className="flex items-center space-x-2">
                  <Link 
                    to={`/courses/${course.id}`}
                    className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                  >
                    <Eye className="h-4 w-4" />
                  </Link>
                  <Link 
                    to={`/courses/${course.id}/edit`}
                    className="p-2 text-gray-400 hover:text-green-600 transition-colors"
                  >
                    <Edit3 className="h-4 w-4" />
                  </Link>
                  <button 
                    onClick={() => handleDeleteCourse(course)}
                    className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
                <Link 
                  to={`/courses/${course.id}`}
                  className="text-navy-600 hover:text-navy-700 text-sm font-medium"
                >
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 text-center">
          <p className="text-2xl font-bold text-navy-600">{allCourses.length}</p>
          <p className="text-gray-600 text-sm">Total Courses</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 text-center">
          <p className="text-2xl font-bold text-green-600">{allCourses.filter(c => c.status === 'Active').length}</p>
          <p className="text-gray-600 text-sm">Active Courses</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 text-center">
          <p className="text-2xl font-bold text-gold-600">{allCourses.length > 0 ? (allCourses.reduce((acc, c) => acc + (c.rating || 0), 0) / allCourses.length).toFixed(1) : '0.0'}</p>
          <p className="text-gray-600 text-sm">Average Rating</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 text-center">
          <p className="text-2xl font-bold text-purple-600">{allCourses.reduce((acc, c) => acc + (c.enrolledStudents || 0), 0)}</p>
          <p className="text-gray-600 text-sm">Total Students</p>
        </div>
      </div>
      
      {/* Results Summary */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-600">
          Showing {filteredCourses.length} of {allCourses.length} courses
          {(searchTerm || selectedFilter !== 'all' || categoryFilter !== 'all') && (
            <span className="ml-2 text-navy-600">
              (filtered)
            </span>
          )}
        </p>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                <AlertTriangle className="h-6 w-6 text-red-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Delete Course</h3>
                <p className="text-gray-600">This action cannot be undone</p>
              </div>
            </div>
            
            <div className="mb-6">
              <p className="text-gray-700">
                Are you sure you want to delete the course{' '}
                <span className="font-semibold">"{courseToDelete?.title}"</span>?
              </p>
              <p className="text-sm text-gray-500 mt-2">
                This will permanently remove the course and all associated data.
              </p>
            </div>
            
            <div className="flex justify-end space-x-4">
              <button
                onClick={cancelDelete}
                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Delete Course
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Courses;