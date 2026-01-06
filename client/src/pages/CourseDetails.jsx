import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { 
  ArrowLeft, 
  BookOpen, 
  Users, 
  Clock, 
  Star, 
  Edit3, 
  Trash2,
  Play,
  FileText,
  User,
  Calendar,
  DollarSign,
  Award,
  Target,
  CheckCircle,
  AlertTriangle
} from 'lucide-react';
import { getStoredCourses, deleteCourse } from '../utils/localStorage';

const CourseDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    if (id) {
      // First check localStorage, then fallback to dummy data
      const storedCourses = getStoredCourses();
      let foundCourse = storedCourses.find(c => c.id === Number(id));
      
      if (!foundCourse) {
        // Fallback to dummy data
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
            enrolledStudents: 28,
            syllabus: 'Module 1: Reading Skills\nModule 2: Writing Tasks\nModule 3: Listening Practice\nModule 4: Speaking Confidence'
          }
          // Add other dummy courses as needed
        ];
        foundCourse = dummyCourses.find(c => c.id === Number(id));
      }
      
      setCourse(foundCourse);
    }
  }, [id]);

  const handleDeleteCourse = () => {
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (course) {
      const success = deleteCourse(course.id);
      if (success) {
        toast.success('Course deleted successfully!');
        navigate('/courses');
      } else {
        toast.error('Error deleting course. Please try again.');
      }
    }
    setShowDeleteModal(false);
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
  };

  const getStatusBadge = (status) => {
    const statusStyles = {
      Active: 'bg-green-100 text-green-800',
      Draft: 'bg-yellow-100 text-yellow-800',
      Inactive: 'bg-red-100 text-red-800'
    };

    return statusStyles[status] || 'bg-gray-100 text-gray-800';
  };

  const getLevelBadge = (level) => {
    const levelStyles = {
      Beginner: 'bg-blue-100 text-blue-800',
      Intermediate: 'bg-orange-100 text-orange-800',
      Advanced: 'bg-purple-100 text-purple-800'
    };

    return levelStyles[level] || 'bg-gray-100 text-gray-800';
  };

  if (!course) {
    return (
      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <Link
            to="/courses"
            className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Course Not Found</h1>
            <p className="text-gray-600">The requested course could not be found.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with Back Button */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Link
            to="/courses"
            className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{course.title}</h1>
            <p className="text-gray-600">Course Details</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <Link
            to={`/courses/${id}/edit`}
            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors flex items-center space-x-2"
          >
            <Edit3 className="h-4 w-4" />
            <span>Edit Course</span>
          </Link>
          <button
            onClick={handleDeleteCourse}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center space-x-2"
          >
            <Trash2 className="h-4 w-4" />
            <span>Delete Course</span>
          </button>
        </div>
      </div>

      {/* Course Hero Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="h-64 bg-gray-200 overflow-hidden">
          <img 
            src={course.thumbnail} 
            alt={course.title}
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-2">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusBadge(course.status)}`}>
                  {course.status}
                </span>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getLevelBadge(course.level)}`}>
                  {course.level}
                </span>
              </div>
              <p className="text-gray-600 text-lg">{course.description}</p>
            </div>
            <div className="flex items-center space-x-1 ml-6">
              <Star className="h-5 w-5 text-gold-500" />
              <span className="text-lg font-semibold text-gray-900">{course.rating}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <User className="h-6 w-6 text-gray-600 mx-auto mb-2" />
              <p className="text-sm text-gray-600">Instructor</p>
              <p className="font-semibold text-gray-900">{course.instructor}</p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <Clock className="h-6 w-6 text-gray-600 mx-auto mb-2" />
              <p className="text-sm text-gray-600">Duration</p>
              <p className="font-semibold text-gray-900">{course.duration}</p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <Users className="h-6 w-6 text-gray-600 mx-auto mb-2" />
              <p className="text-sm text-gray-600">Enrolled</p>
              <p className="font-semibold text-gray-900">{course.enrolledStudents}/{course.maxStudents}</p>
            </div>
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <DollarSign className="h-6 w-6 text-gray-600 mx-auto mb-2" />
              <p className="text-sm text-gray-600">Price</p>
              <p className="font-semibold text-gray-900">₹{course.price.toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Course Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Course Content */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <BookOpen className="h-5 w-5 text-navy-600 mr-2" />
            Course Content
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <Play className="h-5 w-5 text-blue-600" />
                <span className="font-medium">Video Lessons</span>
              </div>
              <span className="text-gray-600">{course.videoCount} videos</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <FileText className="h-5 w-5 text-green-600" />
                <span className="font-medium">Course Materials</span>
              </div>
              <span className="text-gray-600">{course.materialCount} files</span>
            </div>
            {course.hasIntroVideo && (
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Play className="h-5 w-5 text-blue-600" />
                  <span className="font-medium">Introduction Video</span>
                </div>
                <CheckCircle className="h-5 w-5 text-blue-600" />
              </div>
            )}
          </div>
        </div>

        {/* Prerequisites & Objectives */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Target className="h-5 w-5 text-navy-600 mr-2" />
            Prerequisites & Objectives
          </h3>
          <div className="space-y-4">
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Prerequisites</h4>
              <p className="text-gray-600">{course.prerequisites}</p>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Learning Objectives</h4>
              <p className="text-gray-600">{course.objectives}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Course Syllabus */}
      {course.syllabus && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Award className="h-5 w-5 text-navy-600 mr-2" />
            Course Syllabus
          </h3>
          <div className="prose max-w-none">
            <pre className="whitespace-pre-wrap text-gray-600 font-sans">{course.syllabus}</pre>
          </div>
        </div>
      )}

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
                <span className="font-semibold">"{course.title}"</span>?
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

export default CourseDetails;