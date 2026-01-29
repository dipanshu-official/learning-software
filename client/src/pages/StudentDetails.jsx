import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import {
  ArrowLeft,
  User,
  Users,
  Phone,
  MapPin,
  BookOpen,
  Mail,
  Edit3,
  DownloadCloud,
} from "lucide-react";
// import { studentsData } from "../data/studentsData";
import { useSelector, useDispatch } from "react-redux";
import { currentStudentDataSelector } from "../store/globalSelctor";
import { getCurrentStudent } from "../store/globalAction";

const StudentDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    if (id) {
      dispatch(getCurrentStudent(id));
    }
  }, [dispatch, id]);

  // First check localStorage, then fallback to dummy data
  const student = useSelector(currentStudentDataSelector);
  console.log("student=> ",student)
  

  if (!student) {
    return (
      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <Link
            to="/students"
            className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Student Not Found
            </h1>
            <p className="text-gray-600">
              The requested student could not be found.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const getStatusBadge = (status) => {
    switch (status.toLowerCase()) {
      case "active":
        return "bg-green-100 text-green-800";
      case "inactive":
        return "bg-red-100 text-red-800";
      case "completed":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getProgressColor = (progress) => {
    if (progress >= 80) {
      return "bg-green-500";
    } else if (progress >= 50) {
      return "bg-yellow-500";
    } else {
      return "bg-red-500";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header with Back Button */}
      <div className="flex items-center space-x-4">
        <Link
          to="/students"
          className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {student.firstName} {student.lastName}
          </h1>
          <p className="text-gray-600">Student Details</p>
        </div>
      </div>

      {/* Student Details Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Basic Information */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <User className="h-5 w-5 text-navy-600 mr-2" />
            Basic Information
          </h3>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">First Name</p>
                <p className="font-medium text-gray-900">{student.firstName}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Last Name</p>
                <p className="font-medium text-gray-900">{student.lastName}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Date of Birth</p>
                <p className="font-medium text-gray-900">
                  {new Date(student.dateOfBirth).toLocaleDateString()}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Gender</p>
                <p className="font-medium text-gray-900">{student.gender}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Aadhaar Number</p>
                <p className="font-medium text-gray-900">
                  {student.aadhaarNumber}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Join Date</p>
                <p className="font-medium text-gray-900">{student.joinDate}</p>
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-600">Course</p>
              <span className="inline-block bg-gold-100 text-gold-800 px-3 py-1 rounded-full text-sm font-medium mt-1">
                {student.course}
              </span>
            </div>
          </div>
        </div>

        {/* Parent Information */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Users className="h-5 w-5 text-navy-600 mr-2" />
            Parent/Guardian Information
          </h3>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-600">Father's Name</p>
              <p className="font-medium text-gray-900">{student.fatherName}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Mother's Name</p>
              <p className="font-medium text-gray-900">{student.motherName}</p>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Phone className="h-5 w-5 text-navy-600 mr-2" />
            Contact Information
          </h3>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-600">Student Contact</p>
              <p className="font-medium text-gray-900">
                {student.studentContact}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Parent Contact</p>
              <p className="font-medium text-gray-900">
                {student.parentContact}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Email</p>
              <p className="font-medium text-gray-900">{student.email}</p>
            </div>
          </div>
        </div>

        {/* Address Information */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <MapPin className="h-5 w-5 text-navy-600 mr-2" />
            Address Information
          </h3>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-600">Permanent Address</p>
              <p className="font-medium text-gray-900">
                {student.permanentAddress}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Current Address</p>
              <p className="font-medium text-gray-900">
                {student.currentAddress}
              </p>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <p className="text-sm text-gray-600">City</p>
                <p className="font-medium text-gray-900">{student.city}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">State</p>
                <p className="font-medium text-gray-900">{student.state}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Pincode</p>
                <p className="font-medium text-gray-900">{student.pincode}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Fees and Progress Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Fees Information */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <div className="w-5 h-5 bg-gold-500 rounded flex items-center justify-center mr-2">
              <span className="text-white text-xs">₹</span>
            </div>
            Fees Information
          </h3>
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="text-center p-4 bg-navy-50 rounded-lg">
              <p className="text-sm text-gray-600">Total Fees</p>
              <p className="text-xl font-bold text-navy-600">
                ₹{Number(student.totalFees).toLocaleString()}
              </p>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <p className="text-sm text-gray-600">Paid Amount</p>
              <p className="text-xl font-bold text-green-600">
                ₹{Number(student.paidFees).toLocaleString()}
              </p>
            </div>
            <div className="text-center p-4 bg-red-50 rounded-lg">
              <p className="text-sm text-gray-600">Remaining Balance</p>
              <p className="text-xl font-bold text-red-600">
                ₹
                {(
                  Number(student.totalFees) - Number(student.paidFees)
                ).toLocaleString()}
              </p>
            </div>
          </div>

          {/* Payment Progress */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Payment Progress</span>
              <span className="text-sm font-medium text-gray-900">
                {Math.round(
                  (Number(student.paidFees) / Number(student.totalFees)) * 100
                )}
                %
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-green-500 h-3 rounded-full transition-all"
                style={{
                  width: `${
                    (Number(student.paidFees) / Number(student.totalFees)) * 100
                  }%`,
                }}
              />
            </div>
          </div>
        </div>

        {/* Course Progress */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <BookOpen className="h-5 w-5 text-navy-600 mr-2" />
            Course Progress
          </h3>
          <div className="space-y-6">
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">Overall Progress</p>
              <p className="text-3xl font-bold text-navy-600">
                {student.progress}%
              </p>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">Course Completion</span>
                <span className="text-sm font-medium text-gray-900">
                  {student.progress}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className={`h-3 rounded-full transition-all ${getProgressColor(
                    student.progress
                  )}`}
                  style={{ width: `${student.progress}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end space-x-4">
        <Link
          to={`/students/${id}/invoice`}
         className="px-6 py-2 bg-navy-600 text-white rounded-lg hover:bg-navy-700 transition-colors flex items-center space-x-2">
          <DownloadCloud className="h-4 w-4" />
          <span>Invoice</span>
        </Link>
        <Link
          to={`/students/${id}/certificate`}
          className="px-6 py-2 bg-navy-600 text-white rounded-lg hover:bg-navy-700 transition-colors flex items-center space-x-2"
        >
          <DownloadCloud className="h-4 w-4" />
          <span>Certificate</span>
        </Link>
        <Link
          to={`/students/${id}/edit`}
          className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors flex items-center space-x-2"
        >
          <Edit3 className="h-4 w-4" />
          <span>Edit Student</span>
        </Link>

        <button className="px-6 py-2 bg-navy-600 text-white rounded-lg hover:bg-navy-700 transition-colors flex items-center space-x-2">
          <Mail className="h-4 w-4" />
          <span>Send Message</span>
        </button>
      </div>
    </div>
  );
};

export default StudentDetails;
