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
import { getAllTeacher } from "../store/globalAction";
import DeleteConfirmModal from "../components/modals/DeleteConfirmModal";

const EMPTY_ARRAY = [];

const Teacher = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [teacherToDelete, setTeacherToDelete] = useState(null);

  const dispatch = useDispatch();
  
  // Select the correct allTeacher list from global state
  const teacherstate = useSelector((state) => state.global?.allTeacher || EMPTY_ARRAY);

  useEffect(() => {
    dispatch(getAllTeacher());
  }, [dispatch]);

  const handleDeleteClick = (teacherId, teacherName) => {
    setTeacherToDelete({ id: teacherId, name: teacherName });
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    // /* If you have a deleteTeacher API
    // dispatch(deleteTeacher(teacherToDelete.id))
    //   .unwrap()
    //   .then(() => {
    //     dispatch(getAllTeacher());
    //     setShowDeleteModal(false);
    //     setTeacherToDelete(null);
    //   })
    //   .catch((error) => console.error(error));
    // */
    setShowDeleteModal(false);
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
    setTeacherToDelete(null);
  };

  const filteredTeachers = teacherstate.filter((teacher) => {
    const fullName = `${teacher.firstName} ${teacher.lastName}`.toLowerCase();
    const departmentName = (teacher.department || "").toLowerCase();
    return (
      searchTerm === "" || 
      fullName.includes(searchTerm.toLowerCase()) ||
      departmentName.includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Teachers Management
          </h1>
          <p className="text-gray-600">Manage institution staff</p>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search teachers by name or department..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-navy-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>

      {/* Teachers Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="overflow-x-auto -mx-4 sm:mx-0">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left py-3 px-4 sm:px-6 font-medium text-gray-700 min-w-[200px]">
                  Teacher
                </th>
                <th className="text-left py-3 px-4 sm:px-6 font-medium text-gray-700 min-w-[180px] hidden sm:table-cell">
                  Contact
                </th>
                <th className="text-left py-3 px-4 sm:px-6 font-medium text-gray-700 min-w-[150px]">
                  Department
                </th>
                <th className="text-left py-3 px-4 sm:px-6 font-medium text-gray-700 min-w-[120px] hidden lg:table-cell">
                  Subjects
                </th>
                <th className="text-left py-3 px-4 sm:px-6 font-medium text-gray-700 min-w-[120px]">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredTeachers.map((teacher) => (
                <tr
                  key={teacher._id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="py-4 px-4 sm:px-6">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-navy-100 rounded-full flex items-center justify-center">
                        <span className="text-navy-600 font-medium text-sm">
                          {teacher.firstName?.[0]}
                          {teacher.lastName?.[0]}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">
                          {teacher.firstName} {teacher.lastName}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4 sm:px-6 hidden sm:table-cell">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <Mail className="h-4 w-4 text-gray-400" />
                        <span className="text-sm text-gray-600">
                          {teacher.email}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Phone className="h-4 w-4 text-gray-400" />
                        <span className="text-sm text-gray-600">
                          {teacher.phone}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4 sm:px-6">
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs sm:text-sm font-medium">
                      {teacher.department}
                    </span>
                  </td>
                  <td className="py-4 px-4 sm:px-6 hidden lg:table-cell">
                    <span className="text-sm text-gray-600">
                      {teacher.subjects}
                    </span>
                  </td>
                  <td className="py-4 px-4 sm:px-6">
                    <div className="flex items-center space-x-1 sm:space-x-2">
                      <button
                        onClick={() =>
                          handleDeleteClick(
                            teacher._id,
                            `${teacher.firstName} ${teacher.lastName}`
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
              {filteredTeachers.length === 0 && (
                 <tr>
                    <td colSpan="5" className="py-4 px-4 text-center text-gray-500">
                        No teachers found.
                    </td>
                 </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <DeleteConfirmModal
        isOpen={showDeleteModal}
        onClose={cancelDelete}
        onConfirm={confirmDelete}
        studentName={teacherToDelete?.name} // We can reuse the modal logic if needed
      />

      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-600">
          Showing {filteredTeachers.length} of {teacherstate.length} teachers
          {searchTerm && (
            <span className="ml-2 text-navy-600">(filtered)</span>
          )}
        </p>
      </div>
    </div>
  );
};

export default Teacher;