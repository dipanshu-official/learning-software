import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  Edit3,
  Trash2,
  Eye,
  Mail,
  Phone,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { getAllStudent, deleteStudent } from "../store/globalAction";
import { allstudentDataSelector } from "../store/globalSelctor";
import DeleteConfirmModal from "../components/modals/DeleteConfirmModal";

const Students = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [studentToDelete, setStudentToDelete] = useState(null);
  const [paymentFilter, setPaymentFilter] = useState("all");

  const dispatch = useDispatch();
  const studentstate = useSelector(allstudentDataSelector);
  console.log("student state", studentstate);

  useEffect(() => {
    dispatch(getAllStudent());
  }, [dispatch]);

  // Open delete confirmation modal
  const handleDeleteClick = (studentId, studentName) => {
    setStudentToDelete({ id: studentId, name: studentName });
    setShowDeleteModal(true);
  };

  // Confirm and execute deletion
  const confirmDelete = () => {
    dispatch(deleteStudent(studentToDelete.id))
      .unwrap()
      .then(() => {
        dispatch(getAllStudent());
        setShowDeleteModal(false);
        setStudentToDelete(null);
      })
      .catch((error) => {
        console.error("Failed to delete student:", error);
        setShowDeleteModal(false);
        setStudentToDelete(null);
      });
  };

  // Cancel deletion
  const cancelDelete = () => {
    setShowDeleteModal(false);
    setStudentToDelete(null);
  };

  const getPaymentStatusBadge = (paymentStatus = "") => {
    switch (paymentStatus.toLowerCase()) {
      case "paid":
        return "bg-green-100 text-green-800";
      case "dues":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Filter students based on search term and payment filter
  const filteredStudents = studentstate.filter((student) => {
    const fullName = `${student.firstName} ${student.lastName}`.toLowerCase();
    const matchesSearch =
      searchTerm === "" || fullName.includes(searchTerm.toLowerCase());
    const matchesPaymentFilter =
      paymentFilter === "all" ||
      student.paymentStatus.toLowerCase() === paymentFilter.toLowerCase();

    return matchesSearch && matchesPaymentFilter;
  });
  console.log("filteredStudents", filteredStudents);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Students Management
          </h1>
          <p className="text-gray-600">Manage and track student progress</p>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
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
            <select
              value={paymentFilter}
              onChange={(e) => setPaymentFilter(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-navy-500 focus:border-transparent"
            >
              <option value="all">All Payments</option>
              <option value="paid">Paid</option>
              <option value="dues">Dues</option>
            </select>
          </div>
        </div>
      </div>

      {/* Students Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="overflow-x-auto -mx-4 sm:mx-0">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left py-3 px-4 sm:px-6 font-medium text-gray-700 min-w-[200px]">
                  Student
                </th>
                <th className="text-left py-3 px-4 sm:px-6 font-medium text-gray-700 min-w-[180px] hidden sm:table-cell">
                  Contact
                </th>
                <th className="text-left py-3 px-4 sm:px-6 font-medium text-gray-700 min-w-[150px]">
                  Course
                </th>
                <th className="text-left py-3 px-4 sm:px-6 font-medium text-gray-700 min-w-[120px] hidden md:table-cell">
                  Fees
                </th>
                <th className="text-left py-3 px-4 sm:px-6 font-medium text-gray-700 min-w-[100px] hidden lg:table-cell">
                  Father
                </th>
                <th className="text-left py-3 px-4 sm:px-6 font-medium text-gray-700 min-w-[100px] hidden sm:table-cell">
                  Payment
                </th>
                <th className="text-left py-3 px-4 sm:px-6 font-medium text-gray-700 min-w-[120px]">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredStudents.map((student) => (
                <tr
                  key={student._id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="py-4 px-4 sm:px-6">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-navy-100 rounded-full flex items-center justify-center">
                        <span className="text-navy-600 font-medium text-sm">
                          {student.firstName[0]}
                          {student.lastName[0]}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">
                          {student.firstName} {student.lastName}
                        </p>
                        <p className="text-sm text-gray-500 sm:hidden">
                          {student.course}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4 sm:px-6 hidden sm:table-cell">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <Mail className="h-4 w-4 text-gray-400" />
                        <span className="text-sm text-gray-600">
                          {student.email}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Phone className="h-4 w-4 text-gray-400" />
                        <span className="text-sm text-gray-600">
                          {student.studentContact}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4 sm:px-6">
                    <span className="bg-gold-100 text-gold-800 px-2 py-1 rounded-full text-xs sm:text-sm font-medium">
                      {student.course}
                    </span>
                  </td>
                  <td className="py-4 px-4 sm:px-6 hidden md:table-cell">
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-gray-900">
                        ₹{Number(student.paidFees).toLocaleString()} / ₹
                        {Number(student.totalFees).toLocaleString()}
                      </p>
                      <p className="text-xs text-gray-500">
                        Due: ₹
                        {(
                          Number(student.totalFees) - Number(student.paidFees)
                        ).toLocaleString()}
                      </p>
                    </div>
                  </td>
                  <td className="py-4 px-4 sm:px-6 hidden lg:table-cell">
                    <span className="text-sm text-gray-600">
                      {student.fatherName}
                    </span>
                  </td>
                  <td className="py-4 px-4 sm:px-6 hidden sm:table-cell">
                    <span
                      className={`px-2 py-1 rounded-full text-sm font-medium ${getPaymentStatusBadge(
                        student.paymentStatus
                      )}`}
                    >
                      {student.paymentStatus}
                    </span>
                  </td>
                  <td className="py-4 px-4 sm:px-6">
                    <div className="flex items-center space-x-1 sm:space-x-2">
                      <Link
                        to={`/students/${student._id}`}
                        className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
                      >
                        <Eye className="h-4 w-4" />
                      </Link>
                      <Link
                        to={`/students/${student._id}/edit`}
                        className="p-1 text-gray-400 hover:text-green-600 transition-colors"
                      >
                        <Edit3 className="h-4 w-4" />
                      </Link>
                      <button
                        onClick={() =>
                          handleDeleteClick(
                            student._id,
                            `${student.firstName} ${student.lastName}`
                          )
                        }
                        className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={showDeleteModal}
        onClose={cancelDelete}
        onConfirm={confirmDelete}
        studentName={studentToDelete?.name}
      />

      {/* Pagination Info */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-600">
          Showing {filteredStudents.length} of {studentstate.length} students
          {(searchTerm || paymentFilter !== "all") && (
            <span className="ml-2 text-navy-600">(filtered)</span>
          )}
        </p>
      </div>
    </div>
  );
};

export default Students;