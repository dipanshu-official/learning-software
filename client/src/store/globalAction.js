import axiosInstance from "../api/axiosInstance";

// Utility for setting auth headers
// const getAuthHeaders = () => {
//   const token = localStorage.getItem("authToken");
//   return `Bearer ${token}`;
// };

//  student api section
import { createAsyncThunk } from "@reduxjs/toolkit";

export const newRegistration = createAsyncThunk(
  "student/newRegistration",
  async (studentData, { rejectWithValue }) => {
    console.log("student add call");
    try {
      const {
        firstName,
        lastName,
        dateOfBirth,
        gender,
        fatherName,
        motherName,
        studentContact,
        parentContact,
        email,
        aadhaarNumber,
        permanentAddress,
        currentAddress,
        city,
        state,
        pincode,
        totalFees,
        paidFees,
        paymentStatus, // optional, will auto-calc from schema if not sent
        course,
        joinDate,
        enrollmentId,
        batch,
        notes,
      } = studentData;

      const response = await axiosInstance.post("/students/create", {
        firstName,
        lastName,
        dateOfBirth,
        gender,
        fatherName,
        motherName,
        studentContact,
        parentContact,
        email,
        aadhaarNumber,
        permanentAddress,
        currentAddress,
        city,
        state,
        pincode,
        totalFees,
        paidFees,
        paymentStatus,
        course,
        joinDate,
        enrollmentId,
        batch,
        notes,
      });

      return response.data;
    } catch (error) {
      console.log("err =>", error);
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to add student";
      return rejectWithValue(errorMessage);
    }
  }
);

export const getAllStudent = createAsyncThunk(
  "getAllStudent/allstudent",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/students/allstudents");
      console.log("response from getAllStudent =>", response.data);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch students"
      );
    }
  }
);
export const getCurrentStudent = createAsyncThunk(
  "getCurrentStudent/currentstudent",
  async (studentId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/students/getstudent/${studentId}`);
      console.log("response from getCurrentStudent =>", response.data);
      return response.data;
      
    } catch (error) {
      console.trace(error);
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch teachers"
      );
    }
  }
);
export const updateStudent = createAsyncThunk(
  "updateStudent/updatestudent",
  async ({ studentId, updatedData }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(
        `/students/update/${studentId}`,
        updatedData,
       
      );
      return response.data;
    } catch (error) {
      console.log(error);
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to update student";
      return rejectWithValue(errorMessage);
    }
  }
);
export const deleteStudent = createAsyncThunk(
  "deleteStudent/deletestudent",
  async (studentId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(
        `/students/delete/${studentId}`,
      );
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete"
      );
    }
  }
);
export const userLogin = createAsyncThunk(
  'auth/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post('api/auth/login', { email, password });

      console.log('Login response:', data); // should show { token: "..." }

      // Return as an object so the structure is predictable everywhere
      return { token: data.token };
    } catch (err) {
      return rejectWithValue(err.response?.data?.error || 'Login failed');
    }
  }
);
export const userRegister = createAsyncThunk(
  'auth/register',
  async ({ name, email, instituteName, password }, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post('/api/auth/register', {
        name,
        email,
        instituteName,
        password,
      });

      console.log('Register response:', data); // should show { token: "..." }

      return { token: data.token };
    } catch (err) {
      return rejectWithValue(err.response?.data?.error || 'Registration failed');
    }
  }
);






// Teacher api section
export const addTeacher = createAsyncThunk(
  "teacher/register",
  async (teacherData, { rejectWithValue }) => {
    try {
      const {
        firstName,
        lastName,
        email,
        password,
        phone,
        department,
        subjects,
        address,
      } = teacherData;

      const response = await axiosInstance.post(
        "/register",
        {
          firstName,
          lastName,
          email,
          password,
          phone,
          department,
          subjects,
          address,
        },
        {
          headers: getAuthHeaders(),
        }
      );
      return response.data;
    } catch (error) {
      console.log("err =>", error);
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to add student";
      return rejectWithValue(errorMessage);
    }
  }
);

export const getAllTeacher = createAsyncThunk(
  "teacher/teachers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/teachers", {
        headers: {
          Authorization: getAuthHeaders(),
        },
      });
      return response.data;
    } catch (error) {
      console.trace(error);
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch teachers"
      );
    }
  }
);



// principal api section
export const loginPrinciple = createAsyncThunk(
  "loginPrinciple/login-principle",
  async (principleData, { rejectWithValue }) => {
    try {
      const { email, password, role } = principleData;
      console.log("loginPrincipal =>", email, password, role);

      const response = await axiosInstance.post("/login-principle", {
        email,
        password,
        role,
      });

      if (response.data.data.token) {
        localStorage.setItem("authToken", response.data.data.token);
        localStorage.setItem("role", role);
      }

      return response.data;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || error.message || "Login failed";
      return rejectWithValue(errorMessage);
    }
  }
);



export const getUserProfile = createAsyncThunk(
  "getUserProfile/teachers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/user/profile", {
        headers: {
          Authorization: getAuthHeaders(),
        },
      });
      return response.data;
    } catch (error) {
      console.trace(error);
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch teachers"
      );
    }
  }
);

export const getSendMessage = createAsyncThunk(
  "getSendMessage/send",
  async ({ senderId, receiverId, message }, thunkAPI) => {
    try {
      const response = await axios.post(
        `/send${receiverId}`,
        { message },
        {
          headers: {
            Authorization: getAuthHeaders(),
          },
        }
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
