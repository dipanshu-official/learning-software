// Utility functions for localStorage operations

// Student localStorage functions
export const getStoredStudents = () => {
  try {
    const stored = localStorage.getItem("students");
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error("Error reading students from localStorage:", error);
    return [];
  }
};

export const saveStudent = (student) => {
  try {
    const existingStudents = getStoredStudents();
    const newId =
      existingStudents.length > 0
        ? Math.max(...existingStudents.map((s) => s.id)) + 1
        : 1;

    // Calculate payment status
    const totalFees = Number(student.totalFees);
    const paidFees = Number(student.paidFees);
    let paymentStatus;

    if (paidFees >= totalFees) {
      paymentStatus = "Paid";
    } else if (paidFees > 0) {
      paymentStatus = "Partial";
    } else {
      paymentStatus = "Due";
    }

    const newStudent = {
      ...student,
      id: newId,
      joinDate: new Date().toISOString().split("T")[0],
      status: "Active",
      progress: 0,
      paymentStatus,
    };

    const updatedStudents = [...existingStudents, newStudent];
    localStorage.setItem("students", JSON.stringify(updatedStudents));

    return newStudent;
  } catch (error) {
    console.error("Error saving student to localStorage:", error);
    throw error;
  }
};

export const updateStudent = (id, updatedData) => {
  try {
    const existingStudents = getStoredStudents();
    const studentIndex = existingStudents.findIndex((s) => s.id === id);

    if (studentIndex === -1) {
      return null;
    }

    // Recalculate payment status if fees are updated
    if (updatedData.totalFees || updatedData.paidFees) {
      const totalFees = Number(
        updatedData.totalFees || existingStudents[studentIndex].totalFees
      );
      const paidFees = Number(
        updatedData.paidFees || existingStudents[studentIndex].paidFees
      );

      if (paidFees >= totalFees) {
        updatedData.paymentStatus = "Paid";
      } else if (paidFees > 0) {
        updatedData.paymentStatus = "Partial";
      } else {
        updatedData.paymentStatus = "Due";
      }
    }

    const updatedStudent = {
      ...existingStudents[studentIndex],
      ...updatedData,
    };
    existingStudents[studentIndex] = updatedStudent;

    localStorage.setItem("students", JSON.stringify(existingStudents));
    return updatedStudent;
  } catch (error) {
    console.error("Error updating student in localStorage:", error);
    return null;
  }
};

// Course localStorage functions
export const getStoredCourses = () => {
  try {
    const stored = localStorage.getItem("courses");
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error("Error reading courses from localStorage:", error);
    return [];
  }
};

export const saveCourse = (course) => {
  try {
    const existingCourses = getStoredCourses();
    const newId =
      existingCourses.length > 0
        ? Math.max(...existingCourses.map((c) => c.id)) + 1
        : 1;

    const newCourse = {
      ...course,
      id: newId,
      status: "Active",
      rating: 0,
      enrolledStudents: 0,
      createdAt: new Date().toISOString(),
    };

    const updatedCourses = [...existingCourses, newCourse];
    localStorage.setItem("courses", JSON.stringify(updatedCourses));

    return newCourse;
  } catch (error) {
    console.error("Error saving course to localStorage:", error);
    throw error;
  }
};

export const updateCourse = (id, updatedData) => {
  try {
    const existingCourses = getStoredCourses();
    const courseIndex = existingCourses.findIndex((c) => c.id === id);

    if (courseIndex === -1) {
      return null;
    }

    const updatedCourse = { ...existingCourses[courseIndex], ...updatedData };
    existingCourses[courseIndex] = updatedCourse;

    localStorage.setItem("courses", JSON.stringify(existingCourses));
    return updatedCourse;
  } catch (error) {
    console.error("Error updating course in localStorage:", error);
    return null;
  }
};

export const deleteCourse = (id) => {
  try {
    const existingCourses = getStoredCourses();
    const courseIndex = existingCourses.findIndex((c) => c.id === id);

    if (courseIndex === -1) {
      return false;
    }

    existingCourses.splice(courseIndex, 1);
    localStorage.setItem("courses", JSON.stringify(existingCourses));
    return true;
  } catch (error) {
    console.error("Error deleting course from localStorage:", error);
    return false;
  }
};

export const getCourseById = (id) => {
  try {
    const existingCourses = getStoredCourses();
    return existingCourses.find((c) => c.id === id) || null;
  } catch (error) {
    console.error("Error getting course by ID from localStorage:", error);
    return null;
  }
};

// Initialize with default data if localStorage is empty
export const initializeDefaultData = () => {
  const existingStudents = getStoredStudents();
  const existingCourses = getStoredCourses();

  // Only initialize if localStorage is empty
  if (existingStudents.length === 0) {
    // Initialize with some default students if needed
    console.log("Initialized empty student storage");
  }

  if (existingCourses.length === 0) {
    // Initialize with some default courses if needed
    console.log("Initialized empty course storage");
  }
};
