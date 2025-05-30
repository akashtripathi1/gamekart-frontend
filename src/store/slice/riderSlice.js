// src/store/slice/riderSlice.js
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { makeRequest } from "@/hooks/useAxios";

export const fetchRiders = createAsyncThunk(
  "riders/fetchRiders",
  async (_, { rejectWithValue }) => {
    try {
      const response = await makeRequest.get("/api/admin/riders");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error || "Failed to fetch riders");
    }
  }
);

const riderSlice = createSlice({
  name: "riders",
  initialState: {
    riders: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRiders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRiders.fulfilled, (state, action) => {
        state.riders = action.payload;
        state.loading = false;
      })
      .addCase(fetchRiders.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export default riderSlice.reducer;