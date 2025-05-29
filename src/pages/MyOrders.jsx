import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMyOrders } from "@/store/slice/orderSlice";

// Order Status Badge Component
const StatusBadge = ({ status }) => {
  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "paid":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      case "delivered":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
        status
      )}`}
    >
      {status}
    </span>
  );
};

// Order Item Component
const OrderItem = ({ item }) => {
  return (
    <div className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
      <img
        src={item.image}
        alt={item.name}
        className="w-16 h-16 object-cover rounded-lg"
      />
      <div className="flex-1">
        <h4 className="font-medium text-gray-900">{item.name}</h4>
        <div className="text-sm text-gray-600">
          <p>
            Color: {item.color} | Size: {item.size}
          </p>
          <p>Quantity: {item.quantity}</p>
        </div>
      </div>
      <div className="text-right">
        <p className="font-semibold">₹{item.price.toLocaleString()}</p>
        <p className="text-sm text-gray-600">each</p>
      </div>
    </div>
  );
};

// Order Card Component
const OrderCard = ({ order, isExpanded, onToggle }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      {/* Order Header - Always Visible */}
      <div
        className="px-6 py-4 cursor-pointer hover:bg-gray-50 transition-colors"
        onClick={onToggle}
      >
        <div className="flex justify-between items-center">
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Order #{order._id.slice(-8)}
                </h3>
                <p className="text-sm text-gray-600">
                  {new Date(order.createdAt).toLocaleDateString("en-IN", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <p className="text-lg font-semibold">
                    ₹{order.total.toLocaleString()}
                  </p>
                  <StatusBadge status={order.status} />
                </div>
                <div className="flex items-center">
                  <svg
                    className={`w-5 h-5 text-gray-400 transition-transform ${
                      isExpanded ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    ></path>
                  </svg>
                </div>
              </div>
            </div>

            {/* Quick Preview - Only when collapsed */}
            {!isExpanded && (
              <div className="mt-2 flex items-center space-x-4 text-sm text-gray-600">
                <span>
                  {order.items.length} item{order.items.length > 1 ? "s" : ""}
                </span>
                <span>•</span>
                <span>
                  {order.address.city}, {order.address.state}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Expanded Content */}
      {isExpanded && (
        <div className="border-t border-gray-200">
          <div className="p-6">
            {/* Customer Info */}
            <div className="mb-6">
              <h4 className="font-medium text-gray-900 mb-2">
                Customer Information
              </h4>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm">
                  <strong>Name:</strong> {order.customerInfo.name}
                </p>
                <p className="text-sm">
                  <strong>Email:</strong> {order.customerInfo.email}
                </p>
                {order.customerInfo.phone && (
                  <p className="text-sm">
                    <strong>Phone:</strong> {order.customerInfo.phone}
                  </p>
                )}
              </div>
            </div>

            {/* Shipping Address */}
            <div className="mb-6">
              <h4 className="font-medium text-gray-900 mb-2">
                Shipping Address
              </h4>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm">{order.address.street}</p>
                <p className="text-sm">
                  {order.address.city}, {order.address.state}
                </p>
              </div>
            </div>

            {/* Order Items */}
            <div className="mb-6">
              <h4 className="font-medium text-gray-900 mb-3">
                Items ({order.items.length})
              </h4>
              <div className="space-y-3">
                {order.items.map((item, index) => (
                  <OrderItem key={`${item.id}-${index}`} item={item} />
                ))}
              </div>
            </div>

            {/* Order Summary */}
            <div className="border-t pt-4">
              <h4 className="font-medium text-gray-900 mb-3">Order Summary</h4>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Subtotal:</span>
                  <span>₹{order.subtotal.toLocaleString()}</span>
                </div>
                {order.shipping > 0 && (
                  <div className="flex justify-between text-sm">
                    <span>Shipping:</span>
                    <span>₹{order.shipping.toLocaleString()}</span>
                  </div>
                )}
                {order.shipping === 0 && (
                  <div className="flex justify-between text-sm text-green-600">
                    <span>Shipping:</span>
                    <span>Free</span>
                  </div>
                )}
                <div className="flex justify-between text-sm">
                  <span>Tax:</span>
                  <span>₹{order.tax.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-lg font-semibold border-t pt-2">
                  <span>Total:</span>
                  <span>₹{order.total.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Loading Component
const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center min-h-96">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      <p className="ml-4 text-gray-600">Loading your orders...</p>
    </div>
  );
};

// Empty State Component
const EmptyState = () => {
  return (
    <div className="text-center py-12">
      <div className="bg-gray-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
        <svg
          className="w-8 h-8 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
          ></path>
        </svg>
      </div>
      <h3 className="text-lg font-medium text-gray-900 mb-2">
        No orders found
      </h3>
      <p className="text-gray-600 mb-6">You haven't placed any orders yet.</p>
      <a
        href="/"
        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
      >
        Start Shopping
      </a>
    </div>
  );
};

// Error Component
const ErrorState = ({ error }) => {
  return (
    <div className="text-center py-12">
      <div className="bg-red-100 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
        <svg
          className="w-8 h-8 text-red-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          ></path>
        </svg>
      </div>
      <h3 className="text-lg font-medium text-gray-900 mb-2">
        Error loading orders
      </h3>
      <p className="text-red-600 mb-6">{error}</p>
      <button
        onClick={() => window.location.reload()}
        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
      >
        Try Again
      </button>
    </div>
  );
};

// Footer Component
const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 py-8 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-gray-600">
            © 2025 TechStore. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

// Main MyOrders Component
const MyOrders = () => {
  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector((state) => state.orders);
  const [expandedOrders, setExpandedOrders] = useState(new Set());

  useEffect(() => {
    dispatch(getMyOrders());
  }, [dispatch]);

  const handleToggleExpand = (orderId) => {
    setExpandedOrders((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(orderId)) {
        newSet.delete(orderId);
      } else {
        newSet.add(orderId);
      }
      return newSet;
    });
  };

  const handleLogout = () => {
    // Implement logout logic here
    console.log("Logout clicked");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Orders</h1>
          <p className="text-gray-600 mt-2">
            Track and manage your order history
          </p>
        </div>

        {/* Content */}
        {loading && <LoadingSpinner />}
        {error && <ErrorState error={error} />}
        {!loading && !error && orders.length === 0 && <EmptyState />}
        {!loading && !error && orders.length > 0 && (
          <div className="space-y-4">
            {orders.map((order) => (
              <OrderCard
                key={order._id}
                order={order}
                isExpanded={expandedOrders.has(order._id)}
                onToggle={() => handleToggleExpand(order._id)}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default MyOrders;
