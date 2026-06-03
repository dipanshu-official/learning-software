import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:5000/api/institutes";

export const fetchInstitutes = createAsyncThunk(
  "institutes/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(API_URL);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const createInstitute = createAsyncThunk(
  "institutes/create",
  async (instituteData, { rejectWithValue }) => {
    try {
      const response = await axios.post(API_URL, instituteData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const updateInstitute = createAsyncThunk(
  "institutes/update",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${API_URL}/${id}`, data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const deleteInstitute = createAsyncThunk(
  "institutes/delete",
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

const instituteSlice = createSlice({
  name: "institutes",
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch
      .addCase(fetchInstitutes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchInstitutes.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchInstitutes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Create
      .addCase(createInstitute.pending, (state) => {
        state.error = null;
      })
      .addCase(createInstitute.fulfilled, (state, action) => {
        state.list.unshift(action.payload);
      })
      .addCase(createInstitute.rejected, (state, action) => {
        state.error = action.payload;
      })
      // Update
      .addCase(updateInstitute.pending, (state) => {
        state.error = null;
      })
      .addCase(updateInstitute.fulfilled, (state, action) => {
        const index = state.list.findIndex((i) => i._id === action.payload._id);
        if (index !== -1) {
          state.list[index] = action.payload;
        }
      })
      .addCase(updateInstitute.rejected, (state, action) => {
        state.error = action.payload;
      })
      // Delete
      .addCase(deleteInstitute.pending, (state) => {
        state.error = null;
      })
      .addCase(deleteInstitute.fulfilled, (state, action) => {
        state.list = state.list.filter((i) => i._id !== action.payload);
      })
      .addCase(deleteInstitute.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export default instituteSlice.reducer;
