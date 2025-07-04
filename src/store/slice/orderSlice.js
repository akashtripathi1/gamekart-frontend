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

// Admin: fetch all orders
export const getAllOrders = createAsyncThunk(
  "orders/getAllOrders",
  async (_, { rejectWithValue }) => {
    try {
      const res = await makeRequest.get("/api/orders");
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data || "Fetching all orders failed"
      );
    }
  }
);

// Admin: mark an order as shipped
export const shipOrder = createAsyncThunk(
  "orders/shipOrder",
  async ({ orderId, riderId }, { rejectWithValue }) => {
    try {
      const res = await makeRequest.patch(`/api/orders/${orderId}/ship`, {
        riderId,
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || "Shipping order failed");
    }
  }
);

// Rider: get assigned orders
export const getRiderOrders = createAsyncThunk(
  "orders/getRiderOrders",
  async (_, { rejectWithValue }) => {
    try {
      const res = await makeRequest.get("/api/orders/rider/orders");
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data || "Fetching rider orders failed"
      );
    }
  }
);

// Rider: update delivery status
export const updateDeliveryStatus = createAsyncThunk(
  "orders/updateDeliveryStatus",
  async ({ orderId, status }, { rejectWithValue }) => {
    try {
      const res = await makeRequest.patch(`/api/orders/${orderId}/deliver`, {
        status,
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data || "Updating delivery status failed"
      );
    }
  }
);

const orderSlice = createSlice({
  name: "orders",
  initialState: {
    loading: false,
    error: null,
    orders: [], // for admin: getAllOrders
    myOrders: [], // for customer: getMyOrders
    riderOrders: [], // for rider: getRiderOrders
    selectedOrder: null, // for getOrderById
    newOrder: null, // for createOrder
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
    // createOrder
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
      });

    // getMyOrders
    builder
      .addCase(getMyOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getMyOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.myOrders = action.payload;
      })
      .addCase(getMyOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // getOrderById
    builder
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

    // getAllOrders (admin)
    builder
      .addCase(getAllOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(getAllOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // shipOrder (admin)
    builder
      .addCase(shipOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(shipOrder.fulfilled, (state, action) => {
        state.loading = false;
        const idx = state.orders.findIndex((o) => o._id === action.payload._id);
        if (idx !== -1) state.orders[idx] = action.payload;
      })
      .addCase(shipOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // getRiderOrders (rider)
    builder
      .addCase(getRiderOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getRiderOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.riderOrders = action.payload;
      })
      .addCase(getRiderOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // updateDeliveryStatus (rider)
    builder
      .addCase(updateDeliveryStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateDeliveryStatus.fulfilled, (state, action) => {
        state.loading = false;
        const idx = state.riderOrders.findIndex(
          (o) => o._id === action.payload._id
        );
        if (idx !== -1) state.riderOrders[idx] = action.payload;
      })
      .addCase(updateDeliveryStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearOrderState } = orderSlice.actions;
export default orderSlice.reducer;
