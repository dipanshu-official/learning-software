import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import {
  User,
  Calendar,
  Phone,
  Mail,
  MapPin,
  Upload,
  Save,
  ArrowLeft,
  Camera,
  FileText,
  CloudSnow,
} from "lucide-react";
import { studentsData } from "../data/studentsData";
import { updateStudent } from "../store/globalAction";

import { currentStudentDataSelector } from "../store/globalSelctor";
import { getCurrentStudent } from "../store/globalAction";

const StudentEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    gender: "",
    course: "",
    fatherName: "",
    motherName: "",
    studentContact: "",
    parentContact: "",
    email: "",
    aadhaarNumber: "",
    permanentAddress: "",
    currentAddress: "",
    city: "",
    state: "",
    pincode: "",
    totalFees: "",
    paidFees: "",
  });

  const [photos, setPhotos] = useState({
    passportPhoto: null,
    aadhaarPhoto: null,
  });

  const [sameAsPermament, setSameAsPermanent] = useState(false);

  // First check localStorage, then fallback to dummy data

  const student = useSelector(currentStudentDataSelector);
  console.log(student);

  // Load student data on component mount
  useEffect(() => {
    if (id) {
      dispatch(getCurrentStudent(id));
    }

   

    if (student) {
      setFormData({
        firstName: student.firstName,
        lastName: student.lastName,
        dateOfBirth: student.dateOfBirth,
        gender: student.gender,
        course: student.course,
        fatherName: student.fatherName,
        motherName: student.motherName,
        studentContact: student.studentContact,
        parentContact: student.parentContact,
        email: student.email,
        aadhaarNumber: student.aadhaarNumber,
        permanentAddress: student.permanentAddress,
        currentAddress: student.currentAddress,
        city: student.city,
        state: student.state,
        pincode: student.pincode,
        totalFees: student.totalFees,
        paidFees: student.paidFees,
      });

      setSameAsPermanent(student.permanentAddress === student.currentAddress);
    }
  }, [dispatch, studentsData, id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePhotoUpload = (type, file) => {
    setPhotos((prev) => ({
      ...prev,
      [type]: file,
    }));
  };

  const handleSameAddressChange = (checked) => {
    setSameAsPermanent(checked);
    if (checked) {
      setFormData((prev) => ({
        ...prev,
        currentAddress: prev.permanentAddress,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!id) return;

    if (id) {
      console.log("edit succesfully");
    }

    try {
      const resultAction = await dispatch(
        updateStudent({
          studentId: id,
          updatedData: formData,
        })
      );
        toast.success("Student updated successfully!")
        navigate(`/students/${id}`);


      
    } catch (error) {
      console.error("Error updating student:", error);
      toast.error("Error updating student. Please try again.");
    }
  };

  if (!id) {
    return (
      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate("/students")}
            className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <button
          onClick={() => navigate(`/students/${id}`)}
          className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Edit Student</h1>
          <p className="text-gray-600">Update student information</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Student Information */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-2 mb-6">
            <User className="h-5 w-5 text-navy-600" />
            <h2 className="text-lg font-semibold text-gray-900">
              Basic Student Information
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                First Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy-500 focus:border-transparent"
                placeholder="Enter first name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Last Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy-500 focus:border-transparent"
                placeholder="Enter last name"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date of Birth <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="date"
                  name="dateOfBirth"
                  value={formData.dateOfBirth?.split("T")[0] || ""}

                  onChange={handleInputChange}
                  required
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy-500 focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Gender <span className="text-red-500">*</span>
              </label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy-500 focus:border-transparent"
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>

          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Course <span className="text-red-500">*</span>
            </label>
            <select
              name="course"
              value={formData.course}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy-500 focus:border-transparent"
            >
              <option value="">Select Course</option>
              <option value="IELTS Preparation">IELTS Preparation</option>
              <option value="Spoken English Mastery">
                Spoken English Mastery
              </option>
              <option value="Business English">Business English</option>
              <option value="Grammar Fundamentals">Grammar Fundamentals</option>
              <option value="TOEFL Preparation">TOEFL Preparation</option>
              <option value="English for Beginners">
                English for Beginners
              </option>
              <option value="Advanced English Communication">
                Advanced English Communication
              </option>
              <option value="English Writing Skills">
                English Writing Skills
              </option>
            </select>
          </div>

          {/* Photo Upload Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Passport-size Photo
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-navy-400 transition-colors">
                <Camera className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600 mb-2">
                  Upload new passport-size photo
                </p>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    handlePhotoUpload(
                      "passportPhoto",
                      e.target.files?.[0] || null
                    )
                  }
                  className="hidden"
                  id="passport-photo-edit"
                />
                <label
                  htmlFor="passport-photo-edit"
                  className="inline-flex items-center px-4 py-2 bg-navy-600 text-white rounded-lg hover:bg-navy-700 cursor-pointer transition-colors"
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Choose File
                </label>
                {photos.passportPhoto && (
                  <p className="text-sm text-green-600 mt-2">
                    {photos.passportPhoto.name}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Aadhaar Card Photo
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-navy-400 transition-colors">
                <FileText className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600 mb-2">
                  Upload new Aadhaar card photo
                </p>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    handlePhotoUpload(
                      "aadhaarPhoto",
                      e.target.files?.[0] || null
                    )
                  }
                  className="hidden"
                  id="aadhaar-photo-edit"
                />
                <label
                  htmlFor="aadhaar-photo-edit"
                  className="inline-flex items-center px-4 py-2 bg-navy-600 text-white rounded-lg hover:bg-navy-700 cursor-pointer transition-colors"
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Choose File
                </label>
                {photos.aadhaarPhoto && (
                  <p className="text-sm text-green-600 mt-2">
                    {photos.aadhaarPhoto.name}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Aadhaar Number <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="aadhaarNumber"
              value={formData.aadhaarNumber}
              onChange={handleInputChange}
              required
              maxLength={12}
              pattern="[0-9]{12}"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy-500 focus:border-transparent"
              placeholder="Enter 12-digit Aadhaar number"
            />
          </div>
        </div>

        {/* Parent/Guardian Information */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">
            Parent/Guardian Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Father's Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="fatherName"
                value={formData.fatherName}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy-500 focus:border-transparent"
                placeholder="Enter father's name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mother's Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="motherName"
                value={formData.motherName}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy-500 focus:border-transparent"
                placeholder="Enter mother's name"
              />
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-2 mb-6">
            <Phone className="h-5 w-5 text-navy-600" />
            <h2 className="text-lg font-semibold text-gray-900">
              Contact Information
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Student Contact Number <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                name="studentContact"
                value={formData.studentContact}
                onChange={handleInputChange}
                required
                pattern="[0-9]{10}"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy-500 focus:border-transparent"
                placeholder="Enter 10-digit mobile number"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Parent/Guardian Contact <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                name="parentContact"
                value={formData.parentContact}
                onChange={handleInputChange}
                required
                pattern="[0-9]{10}"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy-500 focus:border-transparent"
                placeholder="Enter 10-digit mobile number"
              />
            </div>
          </div>

          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email ID <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy-500 focus:border-transparent"
                placeholder="Enter email address"
              />
            </div>
          </div>
        </div>

        {/* Address Details */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-2 mb-6">
            <MapPin className="h-5 w-5 text-navy-600" />
            <h2 className="text-lg font-semibold text-gray-900">
              Address Details
            </h2>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Permanent Address <span className="text-red-500">*</span>
              </label>
              <textarea
                name="permanentAddress"
                value={formData.permanentAddress}
                onChange={handleInputChange}
                required
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy-500 focus:border-transparent"
                placeholder="Enter permanent address"
              />
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="sameAddress"
                checked={sameAsPermament}
                onChange={(e) => handleSameAddressChange(e.target.checked)}
                className="h-4 w-4 text-navy-600 focus:ring-navy-500 border-gray-300 rounded"
              />
              <label htmlFor="sameAddress" className="text-sm text-gray-700">
                Current address is same as permanent address
              </label>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Current Address <span className="text-red-500">*</span>
              </label>
              <textarea
                name="currentAddress"
                value={formData.currentAddress}
                onChange={handleInputChange}
                required
                rows={3}
                disabled={sameAsPermament}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy-500 focus:border-transparent disabled:bg-gray-100"
                placeholder="Enter current address"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  City <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy-500 focus:border-transparent"
                  placeholder="Enter city"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  State <span className="text-red-500">*</span>
                </label>
                <select
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy-500 focus:border-transparent"
                >
                  <option value="">Select State</option>
                  <option value="bihar">Bihar</option>
                  <option value="delhi">Delhi</option>
                  <option value="maharashtra">Maharashtra</option>
                  <option value="uttar-pradesh">Uttar Pradesh</option>
                  <option value="west-bengal">West Bengal</option>
                  {/* Add more states as needed */}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Pincode <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleInputChange}
                  required
                  pattern="[0-9]{6}"
                  maxLength={6}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy-500 focus:border-transparent"
                  placeholder="Enter 6-digit pincode"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Fees Information */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-2 mb-6">
            <div className="w-5 h-5 bg-gold-500 rounded flex items-center justify-center">
              <span className="text-white text-xs">₹</span>
            </div>
            <h2 className="text-lg font-semibold text-gray-900">
              Fees Information
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Total Course Fees <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                  ₹
                </span>
                <input
                  type="number"
                  name="totalFees"
                  value={formData.totalFees}
                  onChange={handleInputChange}
                  required
                  min="0"
                  className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy-500 focus:border-transparent"
                  placeholder="Enter total fees amount"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Paid Fees <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                  ₹
                </span>
                <input
                  type="number"
                  name="paidFees"
                  value={formData.paidFees}
                  onChange={handleInputChange}
                  required
                  min="0"
                  max={formData.totalFees || undefined}
                  className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy-500 focus:border-transparent"
                  placeholder="Enter paid amount"
                />
              </div>
            </div>
          </div>

          {/* Fees Summary */}
          {formData.totalFees && formData.paidFees && (
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-sm text-gray-600">Total Fees</p>
                  <p className="text-lg font-bold text-navy-600">
                    ₹{Number(formData.totalFees).toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Paid Amount</p>
                  <p className="text-lg font-bold text-green-600">
                    ₹{Number(formData.paidFees).toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Remaining Balance</p>
                  <p className="text-lg font-bold text-red-600">
                    ₹
                    {(
                      Number(formData.totalFees) - Number(formData.paidFees)
                    ).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Submit Buttons */}
        <div className="flex justify-end space-x-4 pt-6">
          <button
            type="button"
            onClick={() => navigate(`/students/${id}`)}
            className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-navy-600 text-white rounded-lg hover:bg-navy-700 transition-colors flex items-center space-x-2"
          >
            <Save className="h-4 w-4" />
            <span >
              Update Student
            </span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default StudentEdit;
