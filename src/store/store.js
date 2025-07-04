// store.js
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slice/authSlice";
import productReducer from "./slice/productSlice"
import cartReducer from "./slice/cartSlice";
import orderReducer from "./slice/orderSlice";
import riderReducer from "./slice/riderSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    products: productReducer,
    cart: cartReducer,
    orders: orderReducer,
    riders: riderReducer,
  },
});

export default store;
