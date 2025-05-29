import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cartItems: [],
  status: 'idle',
  error: null,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const existingItemIndex = state.cartItems.findIndex(cartItem => cartItem.id === item.id);

      if (existingItemIndex >= 0) {
        // Update existing item
        state.cartItems[existingItemIndex].quantity += item.quantity || 1;
      } else {
        // Add new item
        state.cartItems.push({ ...item, quantity: item.quantity || 1 });
      }
    },
    removeFromCart: (state, action) => {
      const id = action.payload;
      state.cartItems = state.cartItems.filter(item => item.id !== id);
    },
    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      state.cartItems = state.cartItems.map(item =>
        item.id === id
          ? { ...item, quantity }
          : item
      );
    },
    clearCart: (state) => {
      state.cartItems = [];
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;

// Selectors
export const selectCartItems = (state) => state.cart.cartItems;
export const selectCartItemById = (state, id) => 
  state.cart.cartItems.find(item => item.id === id);
export const selectCartTotal = (state) => 
  state.cart.cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

export default cartSlice.reducer;