import {
  getAllStudent,
  adminLogin,
  loginPrinciple,
  getAllTeacher,
  deleteStudent,
  getUserProfile,
  getCurrentStudent,
} from "./globalAction";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userprofile: [],
  token: localStorage.getItem("token") || null,
  studentData: null,
  currentstudent: null,
  delstudent: [],
  delteacher: [],
  loading: false,
  teacherData: null,
  allTeacher: [],
  allStudent: [],
};

const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    // Synchronous actions
    clearError: (state) => {
      state.error = null;
    },
    showLoader: (state) => {
      state.loading = true;
    },
    hideLoader: (state) => {
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    // Handle asynchronous actions
    builder.addCase(getAllStudent.fulfilled, (state, action) => {
      state.allStudent = action.payload.data;
    });
    builder.addCase(getCurrentStudent.fulfilled, (state, action) => {
      state.currentstudent = action.payload;
    });
    builder.addCase(deleteStudent.fulfilled, (state, action) => {
      const deletedId = action.payload.id;
      state.delstudent = state.delstudent.filter(
        (student) => student._id !== deletedId
      );
    });

    builder.addCase(adminLogin.fulfilled, (state, action) => {
      state.token = action.payload.token; // ✅ we know it’s { token: ... }
      localStorage.setItem("token", action.payload.token);
    });

    builder.addCase(loginPrinciple.fulfilled, (state, action) => {
      state.principleData = action.payload;
    });

    builder.addCase(getAllTeacher.fulfilled, (state, action) => {
      state.allTeacher = action.payload.data;
    });

    // chat section
    builder.addCase(getUserProfile.fulfilled, (state, action) => {
      state.userprofile = action.payload.data;
    });
  },
});

export const { clearError, showLoader, hideLoader } = globalSlice.actions;

export default globalSlice.reducer;
