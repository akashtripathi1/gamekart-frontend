// src/pages/CartPage.jsx

import React, { useState, useEffect } from "react";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectCartItems, clearCart } from "@/store/slice/cartSlice";

const CartPage = () => {
  const reduxCart = useSelector(selectCartItems);
  const dispatch = useDispatch();
  const isMobile = useMediaQuery("(max-width: 768px)");

  // Local UI state for quantities & items
  const [items, setItems] = useState([]);

  // Seed from Redux once on mount (or whenever reduxCart changes)
  useEffect(() => {
    setItems(reduxCart.map((item) => ({ ...item })));
  }, [reduxCart]);

  // Handle local quantity updates
  const handleUpdateQuantity = (id, newQty) => {
    if (newQty < 1) return;
    setItems((current) =>
      current.map((item) =>
        item.id === id ? { ...item, quantity: newQty } : item
      )
    );
  };

  // Remove item locally
  const handleRemoveItem = (id) => {
    setItems((current) => current.filter((item) => item.id !== id));
  };

  // Compute summary from local state
  const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const shipping = items.length > 0 ? (subtotal > 100 ? 0 : 9.99) : 0;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  // On checkout: submit then clear both local and Redux carts
  const handleCheckout = () => {
    const orderData = {
      items,
      subtotal,
      shipping,
      tax,
      total,
    };
    console.log("Submitting order:", orderData);
    // TODO: call your API here

    // Clear cart
    dispatch(clearCart());
    setItems([]);
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          {/* ... empty state as before ... */}
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">
            Your cart is empty
          </h2>
          <Link to="/home">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-lg">
              Continue Shopping
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1
          className={`font-bold text-gray-900 mb-8 ${
            isMobile ? "text-2xl" : "text-3xl"
          }`}
        >
          Shopping Cart ({items.length} items)
        </h1>

        <div
          className={`grid ${
            isMobile ? "grid-cols-1" : "lg:grid-cols-3"
          } gap-8`}
        >
          {/* Cart Items */}
          <div
            className={`${isMobile ? "col-span-1" : "lg:col-span-2"} space-y-4`}
          >
            {items.map((item) => (
              <div key={item.id} className="bg-white rounded-lg p-6 shadow-sm">
                <div
                  className={`flex ${isMobile ? "flex-col" : "flex-row"} gap-4`}
                >
                  {/* Image placeholder */}
                  <div
                    className={`${
                      isMobile ? "w-full h-32" : "w-24 h-24"
                    } bg-gray-200 rounded-lg flex items-center justify-center`}
                  >
                    <span className="text-gray-400 text-xs">Image</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-gray-900">
                        {item.name}
                      </h3>
                      <button
                        onClick={() => handleRemoveItem(item.id)}
                        className="text-gray-400 hover:text-red-500 p-1"
                      >
                        &times;
                      </button>
                    </div>
                    <p className="text-sm text-gray-600">Color: {item.color}</p>
                    <p className="text-sm text-gray-600">Size: {item.size}</p>
                    <div
                      className={`flex ${
                        isMobile
                          ? "flex-col space-y-3"
                          : "justify-between items-center"
                      } mt-4`}
                    >
                      <div className="flex items-center space-x-3">
                        <span className="text-sm text-gray-600">Qty:</span>
                        <button
                          onClick={() =>
                            handleUpdateQuantity(item.id, item.quantity - 1)
                          }
                          className="w-8 h-8 border border-gray-300 rounded-md flex items-center justify-center hover:bg-gray-50"
                        >
                          –
                        </button>
                        <span className="font-medium text-gray-900 w-8 text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            handleUpdateQuantity(item.id, item.quantity + 1)
                          }
                          className="w-8 h-8 border border-gray-300 rounded-md flex items-center justify-center hover:bg-gray-50"
                        >
                          +
                        </button>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center space-x-2">
                          <span className="font-semibold text-gray-900">
                            ₹{(item.price * item.quantity).toFixed(2)}
                          </span>
                          {item.originalPrice && (
                            <span className="text-sm text-gray-500 line-through">
                              ₹{(item.originalPrice * item.quantity).toFixed(2)}
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-600">
                          ₹{item.price} each
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Continue Shopping */}
            <div className="flex justify-between items-center pt-4">
              <Link to="/home">
                <button className="text-blue-600 hover:text-blue-700 font-medium flex items-center">
                  ← Continue Shopping
                </button>
              </Link>
            </div>
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-4">
                Order Summary
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">₹{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium">
                    {shipping === 0 ? "Free" : `₹${shipping.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Tax</span>
                  <span className="font-medium">₹{tax.toFixed(2)}</span>
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between">
                    <span className="font-semibold text-gray-900">Total</span>
                    <span className="font-semibold text-gray-900 text-lg">
                      ₹{total.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
              <button
                onClick={handleCheckout}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg mt-6"
              >
                Proceed to Checkout
              </button>
              {shipping > 0 && (
                <p className="text-sm text-gray-600 mt-3 text-center">
                  Free shipping on orders over ₹100
                </p>
              )}
            </div>

            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="flex items-center space-x-2">
                <svg
                  className="w-5 h-5 text-green-500"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-sm text-gray-600">Secure checkout</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
