import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { 
  BookOpen, 
  Upload, 
  Save, 
  ArrowLeft,
  Video,
  FileText,
  Image,
  Clock,
  Users,
  Star,
  DollarSign
} from 'lucide-react';
import { saveCourse } from '../utils/localStorage';

const CourseCreate = () => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    instructor: '',
    duration: '',
    level: '',
    price: '',
    maxStudents: '',
    category: '',
    prerequisites: '',
    objectives: '',
    syllabus: ''
  });

  const [media, setMedia] = useState({
    thumbnail: null,
    introVideo: null,
    courseVideos: [],
    materials: []
  });

  const [uploadProgress, setUploadProgress] = useState({
    thumbnail: 0,
    introVideo: 0,
    courseVideos: 0,
    materials: 0
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileUpload = (type, files) => {
    if (!files) return;

    if (type === 'courseVideos' || type === 'materials') {
      const fileArray = Array.from(files);
      setMedia(prev => ({
        ...prev,
        [type]: [...prev[type], ...fileArray]
      }));
    } else {
      setMedia(prev => ({
        ...prev,
        [type]: files[0]
      }));
    }

    // Simulate upload progress
    setUploadProgress(prev => ({ ...prev, [type]: 0 }));
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        const newProgress = prev[type] + 10;
        if (newProgress >= 100) {
          clearInterval(interval);
          return { ...prev, [type]: 100 };
        }
        return { ...prev, [type]: newProgress };
      });
    }, 200);
  };

  const removeFile = (type, index) => {
    setMedia(prev => ({
      ...prev,
      [type]: prev[type].filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    try {
      // Prepare course data for saving
      const courseData = {
        ...formData,
        price: Number(formData.price),
        maxStudents: Number(formData.maxStudents) || 30,
        hasIntroVideo: !!media.introVideo,
        videoCount: media.courseVideos.length,
        materialCount: media.materials.length,
        thumbnail: media.thumbnail ? 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg' : 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg'
      };
      
      // Save course to localStorage
      const savedCourse = saveCourse(courseData);
      console.log('Course saved successfully:', savedCourse);
      
      // Show success message
      toast.success('Course created successfully!');
      
      // Navigate back to courses list after successful submission
      navigate('/courses');
    } catch (error) {
      console.error('Error saving course:', error);
      toast.error('Error creating course. Please try again.');
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Create New Course</h1>
          <p className="text-gray-600">Add a new course with video content and materials</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Course Information */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-2 mb-6">
            <BookOpen className="h-5 w-5 text-navy-600" />
            <h2 className="text-lg font-semibold text-gray-900">Course Information</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Course Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy-500 focus:border-transparent"
                placeholder="Enter course title"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Course Description <span className="text-red-500">*</span>
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                required
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy-500 focus:border-transparent"
                placeholder="Describe what students will learn in this course"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Instructor <span className="text-red-500">*</span>
              </label>
              <select
                name="instructor"
                value={formData.instructor}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy-500 focus:border-transparent"
              >
                <option value="">Select Instructor</option>
                <option value="Dr. Priya Gupta">Dr. Priya Gupta</option>
                <option value="Mr. Rajesh Sharma">Mr. Rajesh Sharma</option>
                <option value="Ms. Anita Singh">Ms. Anita Singh</option>
                <option value="Dr. Vikash Kumar">Dr. Vikash Kumar</option>
                <option value="Ms. Pooja Mishra">Ms. Pooja Mishra</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Duration <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  name="duration"
                  value={formData.duration}
                  onChange={handleInputChange}
                  required
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy-500 focus:border-transparent"
                  placeholder="e.g., 3 months, 12 weeks"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Level <span className="text-red-500">*</span>
              </label>
              <select
                name="level"
                value={formData.level}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy-500 focus:border-transparent"
              >
                <option value="">Select Level</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Price <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  required
                  min="0"
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy-500 focus:border-transparent"
                  placeholder="Course price in ₹"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Maximum Students
              </label>
              <div className="relative">
                <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="number"
                  name="maxStudents"
                  value={formData.maxStudents}
                  onChange={handleInputChange}
                  min="1"
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy-500 focus:border-transparent"
                  placeholder="Maximum enrollment"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category <span className="text-red-500">*</span>
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy-500 focus:border-transparent"
              >
                <option value="">Select Category</option>
                <option value="IELTS">IELTS Preparation</option>
                <option value="TOEFL">TOEFL Preparation</option>
                <option value="Spoken English">Spoken English</option>
                <option value="Business English">Business English</option>
                <option value="Grammar">Grammar & Writing</option>
                <option value="General English">General English</option>
              </select>
            </div>
          </div>

          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Prerequisites
            </label>
            <textarea
              name="prerequisites"
              value={formData.prerequisites}
              onChange={handleInputChange}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy-500 focus:border-transparent"
              placeholder="What should students know before taking this course?"
            />
          </div>

          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Learning Objectives
            </label>
            <textarea
              name="objectives"
              value={formData.objectives}
              onChange={handleInputChange}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy-500 focus:border-transparent"
              placeholder="What will students achieve after completing this course?"
            />
          </div>

          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Course Syllabus
            </label>
            <textarea
              name="syllabus"
              value={formData.syllabus}
              onChange={handleInputChange}
              rows={6}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy-500 focus:border-transparent"
              placeholder="Detailed course outline and topics covered"
            />
          </div>
        </div>

        {/* Media Upload Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-2 mb-6">
            <Video className="h-5 w-5 text-navy-600" />
            <h2 className="text-lg font-semibold text-gray-900">Course Media</h2>
          </div>

          {/* Course Thumbnail */}
          <div className="mb-8">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Course Thumbnail <span className="text-red-500">*</span>
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-navy-400 transition-colors">
              <Image className="h-8 w-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-600 mb-2">Upload course thumbnail image</p>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleFileUpload('thumbnail', e.target.files)}
                className="hidden"
                id="thumbnail-upload"
              />
              <label
                htmlFor="thumbnail-upload"
                className="inline-flex items-center px-4 py-2 bg-navy-600 text-white rounded-lg hover:bg-navy-700 cursor-pointer transition-colors"
              >
                <Upload className="h-4 w-4 mr-2" />
                Choose Image
              </label>
              {media.thumbnail && (
                <div className="mt-4">
                  <p className="text-sm text-green-600">{media.thumbnail.name}</p>
                  {uploadProgress.thumbnail > 0 && uploadProgress.thumbnail < 100 && (
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                      <div
                        className="bg-navy-600 h-2 rounded-full transition-all"
                        style={{ width: `${uploadProgress.thumbnail}%` }}
                      />
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Introduction Video */}
          <div className="mb-8">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Introduction Video
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-navy-400 transition-colors">
              <Video className="h-8 w-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-600 mb-2">Upload course introduction video</p>
              <input
                type="file"
                accept="video/*"
                onChange={(e) => handleFileUpload('introVideo', e.target.files)}
                className="hidden"
                id="intro-video-upload"
              />
              <label
                htmlFor="intro-video-upload"
                className="inline-flex items-center px-4 py-2 bg-navy-600 text-white rounded-lg hover:bg-navy-700 cursor-pointer transition-colors"
              >
                <Upload className="h-4 w-4 mr-2" />
                Choose Video
              </label>
              {media.introVideo && (
                <div className="mt-4">
                  <p className="text-sm text-green-600">{media.introVideo.name}</p>
                  <p className="text-xs text-gray-500">{formatFileSize(media.introVideo.size)}</p>
                  {uploadProgress.introVideo > 0 && uploadProgress.introVideo < 100 && (
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                      <div
                        className="bg-navy-600 h-2 rounded-full transition-all"
                        style={{ width: `${uploadProgress.introVideo}%` }}
                      />
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Course Videos */}
          <div className="mb-8">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Course Videos <span className="text-red-500">*</span>
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-navy-400 transition-colors">
              <Video className="h-8 w-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-600 mb-2">Upload course lesson videos</p>
              <input
                type="file"
                accept="video/*"
                multiple
                onChange={(e) => handleFileUpload('courseVideos', e.target.files)}
                className="hidden"
                id="course-videos-upload"
              />
              <label
                htmlFor="course-videos-upload"
                className="inline-flex items-center px-4 py-2 bg-navy-600 text-white rounded-lg hover:bg-navy-700 cursor-pointer transition-colors"
              >
                <Upload className="h-4 w-4 mr-2" />
                Choose Videos
              </label>
            </div>
            
            {media.courseVideos.length > 0 && (
              <div className="mt-4 space-y-2">
                <h4 className="text-sm font-medium text-gray-700">Uploaded Videos:</h4>
                {media.courseVideos.map((video, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Video className="h-4 w-4 text-gray-400" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">{video.name}</p>
                        <p className="text-xs text-gray-500">{formatFileSize(video.size)}</p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeFile('courseVideos', index)}
                      className="text-red-600 hover:text-red-800 text-sm"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Course Materials */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Course Materials
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-navy-400 transition-colors">
              <FileText className="h-8 w-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-600 mb-2">Upload PDFs, documents, and other materials</p>
              <input
                type="file"
                accept=".pdf,.doc,.docx,.ppt,.pptx,.txt"
                multiple
                onChange={(e) => handleFileUpload('materials', e.target.files)}
                className="hidden"
                id="materials-upload"
              />
              <label
                htmlFor="materials-upload"
                className="inline-flex items-center px-4 py-2 bg-navy-600 text-white rounded-lg hover:bg-navy-700 cursor-pointer transition-colors"
              >
                <Upload className="h-4 w-4 mr-2" />
                Choose Files
              </label>
            </div>
            
            {media.materials.length > 0 && (
              <div className="mt-4 space-y-2">
                <h4 className="text-sm font-medium text-gray-700">Uploaded Materials:</h4>
                {media.materials.map((material, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <FileText className="h-4 w-4 text-gray-400" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">{material.name}</p>
                        <p className="text-xs text-gray-500">{formatFileSize(material.size)}</p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeFile('materials', index)}
                      className="text-red-600 hover:text-red-800 text-sm"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Submit Buttons */}
        <div className="flex justify-end space-x-4 pt-6">
          <button
            type="button"
            onClick={() => navigate('/courses')}
            className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-navy-600 text-white rounded-lg hover:bg-navy-700 transition-colors flex items-center space-x-2"
          >
            <Save className="h-4 w-4" />
            <span>Create Course</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default CourseCreate;