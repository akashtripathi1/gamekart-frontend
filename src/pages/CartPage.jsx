import React, { useState, useEffect } from "react";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectCartItems, clearCart } from "@/store/slice/cartSlice";
import { createOrder } from "@/store/slice/orderSlice";
import AddressForm from "@/components/forms/AddressForm";
import { Button } from "@/components/ui/button";

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

  // Add state for address
  const [shippingAddress, setShippingAddress] = useState(null);

  // Remove item locally
  const handleRemoveItem = (id) => {
    setItems((current) => current.filter((item) => item.id !== id));
  };

  // Compute summary from local state
  const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const shipping = items.length > 0 ? (subtotal > 10000 ? 0 : 99) : 0;
  const tax = subtotal * 0.18; // 18% GST
  const total = subtotal + shipping + tax;

const handleCheckout = async () => {
  if (!shippingAddress) {
    alert("Please add a shipping address");
    return;
  }

  const orderData = {
    items,
    subtotal,
    shipping,
    tax,
    total,
    address: shippingAddress,
  };

  try {
    console.log("Submitting order:", orderData);
    await dispatch(createOrder(orderData)).unwrap(); // waits for async action
    dispatch(clearCart());
    setItems([]);
    setShippingAddress(null);
    alert("Order placed successfully!");
  } catch (err) {
    console.error("Order failed:", err);
    alert("Failed to place order.");
  }
};

  // Add address submission handler
  const handleAddressSubmit = (address) => {
    console.log("Address submitted:", address);
    setShippingAddress(address);
  };
  const handleImageError = (e) => {
    e.target.src = "https://via.placeholder.com/300?text=Image+Not+Available";
    e.target.onerror = null;
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md p-6 bg-white rounded-lg shadow-sm">
          <svg
            className="w-16 h-16 mx-auto text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
          <h2 className="text-2xl font-semibold text-gray-900 mb-2 mt-4">
            Your cart is empty
          </h2>
          <p className="text-gray-600 mb-6">
            Looks like you haven't added anything to your cart yet.
          </p>
          <Link to="/home">
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-lg transition-colors">
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
          Shopping Cart ({items.length} {items.length === 1 ? "item" : "items"})
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
              <div
                key={item.id}
                className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <div
                  className={`flex ${isMobile ? "flex-col" : "flex-row"} gap-4`}
                >
                  {/* Product Image */}
                  <div
                    className={`${
                      isMobile ? "w-full h-48" : "w-32 h-32"
                    } bg-gray-100 rounded-lg overflow-hidden flex-shrink-0`}
                  >
                    {item.image ? (
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-contain"
                        onError={handleImageError}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-200">
                        <span className="text-gray-400 text-sm">
                          No Image Available
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <Link to={`/home/products/${item.productId}`}>
                        <h3 className="font-semibold text-gray-900 hover:text-blue-600">
                          {item.name}
                        </h3>
                      </Link>
                      <button
                        onClick={() => handleRemoveItem(item.id)}
                        className="text-gray-400 hover:text-red-500 p-1 transition-colors"
                        aria-label="Remove item"
                      >
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      </button>
                    </div>

                    {/* Variant details */}
                    <div className="space-y-1 mb-3">
                      {item.color && (
                        <p className="text-sm text-gray-600">
                          <span className="font-medium">Color:</span>{" "}
                          {item.color}
                        </p>
                      )}
                      {item.size && (
                        <p className="text-sm text-gray-600">
                          <span className="font-medium">Size:</span> {item.size}
                        </p>
                      )}
                    </div>

                    {/* Quantity and Price */}
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
                          className="w-8 h-8 border border-gray-300 rounded-md flex items-center justify-center hover:bg-gray-50 transition-colors"
                          aria-label="Decrease quantity"
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
                          className="w-8 h-8 border border-gray-300 rounded-md flex items-center justify-center hover:bg-gray-50 transition-colors"
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center justify-end space-x-2">
                          <span className="font-semibold text-gray-900">
                            ₹
                            {(item.price * item.quantity).toLocaleString(
                              "en-IN"
                            )}
                          </span>
                          {item.originalPrice && (
                            <span className="text-sm text-gray-500 line-through">
                              ₹
                              {(
                                item.originalPrice * item.quantity
                              ).toLocaleString("en-IN")}
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-600">
                          ₹{item.price.toLocaleString("en-IN")} each
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
                <button className="text-blue-600 hover:text-blue-700 font-medium flex items-center transition-colors">
                  <svg
                    className="w-4 h-4 mr-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 19l-7-7m0 0l7-7m-7 7h18"
                    />
                  </svg>
                  Continue Shopping
                </button>
              </Link>
              <button
                onClick={() => {
                  dispatch(clearCart());
                  setItems([]);
                }}
                className="text-red-600 hover:text-red-700 font-medium flex items-center transition-colors"
              >
                Clear Cart
                <svg
                  className="w-4 h-4 ml-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
              </button>
            </div>
          </div>
          <div className="space-y-6">
            {/* Shipping Address */}
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <h4 className="font-medium text-gray-900 mb-2">
                Shipping Address
              </h4>
              {shippingAddress ? (
                <div className="text-sm text-gray-600">
                  <p>{shippingAddress.name}</p>
                  <p>{shippingAddress.street}</p>
                  <p>
                    {shippingAddress.city}, {shippingAddress.state}{" "}
                    {shippingAddress.zip}
                  </p>
                  <p>Phone: {shippingAddress.phone}</p>
                  <Button
                    variant="link"
                    className="text-blue-600 mt-2 p-0 h-auto"
                    onClick={() => setShippingAddress(null)}
                  >
                    Change Address
                  </Button>
                </div>
              ) : (
                <AddressForm onAddressSubmit={handleAddressSubmit} />
              )}
            </div>
            {/* Order Summary */}
            <div className="space-y-6">
              <div className="bg-white rounded-lg p-6 shadow-sm">
                <h3 className="font-semibold text-gray-900 mb-4 text-lg">
                  Order Summary
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">
                      ₹
                      {subtotal.toLocaleString("en-IN", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-medium">
                      {shipping === 0 ? (
                        "Free"
                      ) : (
                        <>₹{shipping.toLocaleString("en-IN")}</>
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tax (18% GST)</span>
                    <span className="font-medium">
                      ₹
                      {tax.toLocaleString("en-IN", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </span>
                  </div>
                  <div className="border-t border-gray-200 pt-3">
                    <div className="flex justify-between">
                      <span className="font-semibold text-gray-900">Total</span>
                      <span className="font-semibold text-gray-900 text-lg">
                        ₹
                        {total.toLocaleString("en-IN", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}
                      </span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={handleCheckout}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg mt-6 transition-colors"
                >
                  Proceed to Checkout
                </button>
                {subtotal < 10000 && (
                  <p className="text-sm text-gray-600 mt-3 text-center">
                    Add ₹
                    {(10000 - subtotal).toLocaleString("en-IN", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}{" "}
                    more for free shipping
                  </p>
                )}
              </div>

              {/* Secure Checkout Badge */}
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <div className="flex items-center justify-center space-x-2">
                  <svg
                    className="w-5 h-5 text-green-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-sm text-gray-600">Secure checkout</span>
                </div>
              </div>

              {/* Payment Methods */}
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <h4 className="font-medium text-gray-900 mb-2 text-sm">
                  We accept:
                </h4>
                <div className="flex flex-wrap gap-2">
                  {["Visa", "Mastercard", "Rupay", "UPI", "Net Banking"].map(
                    (method) => (
                      <div
                        key={method}
                        className="text-xs bg-gray-100 px-2 py-1 rounded text-gray-600"
                      >
                        {method}
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
