// features/order/orderSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { makeRequest } from "@/hooks/useAxios";

// Create a new order
export const createOrder = createAsyncThunk(
  "orders/createOrder",
  async (orderData, { rejectWithValue }) => {
    try {
      const res = await makeRequest.post("/api/orders", orderData);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Order creation failed");
    }
  }
);

// Get current user's orders
export const getMyOrders = createAsyncThunk(
  "orders/getMyOrders",
  async (_, { rejectWithValue }) => {
    try {
      const res = await makeRequest.get("/api/orders/my");
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Fetching orders failed");
    }
  }
);

// Get specific order by ID
export const getOrderById = createAsyncThunk(
  "orders/getOrderById",
  async (orderId, { rejectWithValue }) => {
    try {
      const res = await makeRequest.get(`/api/orders/${orderId}`);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Fetching order failed");
    }
  }
);

const orderSlice = createSlice({
  name: "orders",
  initialState: {
    loading: false,
    error: null,
    orders: [],
    selectedOrder: null,
    newOrder: null,
  },
  reducers: {
    clearOrderState: (state) => {
      state.loading = false;
      state.error = null;
      state.selectedOrder = null;
      state.newOrder = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.newOrder = action.payload;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(getMyOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getMyOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(getMyOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(getOrderById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getOrderById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedOrder = action.payload;
      })
      .addCase(getOrderById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearOrderState } = orderSlice.actions;
export default orderSlice.reducer;
