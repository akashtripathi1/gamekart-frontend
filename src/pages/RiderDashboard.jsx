import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getRiderOrders,
  updateDeliveryStatus,
  clearOrderState,
} from "@/store/slice/orderSlice";

// Helper function to format address
const formatAddress = (address) => {
  if (!address) return "Address not available";

  if (typeof address === "string") {
    return address;
  }

  // Handle object-type address
  const parts = [];
  if (address.street) parts.push(address.street);
  if (address.city) parts.push(address.city);
  if (address.state) parts.push(address.state);
  if (address.zipCode) parts.push(address.zipCode);
  if (address.country) parts.push(address.country);

  return parts.join(", ") || "Address not available";
};

// Helper function to format date
const formatDate = (dateString) => {
  if (!dateString) return "Date not available";

  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };

  return new Date(dateString).toLocaleDateString("en-IN", options);
};

// Status Badge Component
const StatusBadge = ({ status }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case "Shipped":
        return "bg-blue-100 text-blue-800";
      case "Delivered":
        return "bg-green-100 text-green-800";
      case "Undelivered":
        return "bg-red-100 text-red-800";
      default:
        return "bg-yellow-100 text-yellow-800";
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

// Stats Cards Component
const StatsCards = ({ assignedOrders }) => {
  const pendingCount = assignedOrders.filter(
    (order) => order.status === "Shipped"
  ).length;
  const completedCount = assignedOrders.filter(
    (order) => order.status === "Delivered"
  ).length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">Assigned Orders</h3>
        <p className="text-3xl font-bold text-blue-600 mt-2">
          {assignedOrders.length}
        </p>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">
          Pending Deliveries
        </h3>
        <p className="text-3xl font-bold text-yellow-600 mt-2">
          {pendingCount}
        </p>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">Completed Today</h3>
        <p className="text-3xl font-bold text-green-600 mt-2">
          {completedCount}
        </p>
      </div>
    </div>
  );
};

// Order Item Component
const OrderItem = ({ item }) => {
  return (
    <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
      <img
        src={item.image}
        alt={item.name}
        className="w-12 h-12 object-cover rounded-lg"
      />
      <div className="flex-1">
        <h5 className="font-medium text-gray-900 text-sm">{item.name}</h5>
        <p className="text-xs text-gray-600">
          {item.color} | {item.size} | Qty: {item.quantity}
        </p>
      </div>
      <div className="text-right">
        <p className="font-semibold text-sm">₹{item.price.toLocaleString()}</p>
      </div>
    </div>
  );
};

// Order Card Component
const OrderCard = ({ order, isExpanded, onToggle, onStatusChange }) => {
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
                  {formatDate(order.createdAt)}
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
                <span>{order.customerInfo?.name || "N/A"}</span>
                <span>•</span>
                <span>
                  {order.items?.length || 0} item
                  {(order.items?.length || 0) > 1 ? "s" : ""}
                </span>
                <span>•</span>
                <span>{order.address?.city || "N/A"}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Expanded Content */}
      {isExpanded && (
        <div className="border-t border-gray-200">
          <div className="p-6">
            {/* Customer Information */}
            <div className="mb-6">
              <h4 className="font-medium text-gray-900 mb-2">
                Customer Information
              </h4>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm">
                  <strong>Name:</strong> {order.customerInfo?.name || "N/A"}
                </p>
                <p className="text-sm">
                  <strong>Email:</strong> {order.customerInfo?.email || "N/A"}
                </p>
                <p className="text-sm">
                  <strong>Phone:</strong> {order.customerInfo?.phone || "N/A"}
                </p>
              </div>
            </div>

            {/* Delivery Address */}
            <div className="mb-6">
              <h4 className="font-medium text-gray-900 mb-2">
                Delivery Address
              </h4>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm">{formatAddress(order.address)}</p>
              </div>
            </div>

            {/* Order Items */}
            <div className="mb-6">
              <h4 className="font-medium text-gray-900 mb-3">
                Items ({order.items?.length || 0})
              </h4>
              <div className="space-y-3">
                {(order.items || []).map((item, index) => (
                  <OrderItem key={`${item.id || index}`} item={item} />
                ))}
              </div>
            </div>

            {/* Order Summary */}
            <div className="border-t pt-4 mb-6">
              <h4 className="font-medium text-gray-900 mb-3">Order Summary</h4>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Subtotal:</span>
                  <span>₹{order.subtotal?.toLocaleString() || "N/A"}</span>
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
                  <span>₹{order.tax?.toLocaleString() || "N/A"}</span>
                </div>
                <div className="flex justify-between text-lg font-semibold border-t pt-2">
                  <span>Total:</span>
                  <span>₹{order.total.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            {order.status === "Shipped" && (
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onStatusChange(order._id, "Delivered");
                  }}
                  className="flex-1 bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition-colors font-medium"
                >
                  Mark as Delivered
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onStatusChange(order._id, "Undelivered");
                  }}
                  className="flex-1 bg-red-600 text-white py-3 px-4 rounded-lg hover:bg-red-700 transition-colors font-medium"
                >
                  Mark as Undelivered
                </button>
              </div>
            )}
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
            d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2 2v-5m16 0h-5m-6 0H4"
          ></path>
        </svg>
      </div>
      <h3 className="text-lg font-medium text-gray-900 mb-2">
        No orders assigned
      </h3>
      <p className="text-gray-600 mb-6">Check back later for new deliveries</p>
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

// Main RiderDashboard Component
const RiderDashboard = () => {
  const dispatch = useDispatch();
  const { loading, error, riderOrders } = useSelector((state) => state.orders);
  const [expandedOrders, setExpandedOrders] = useState(new Set());

  useEffect(() => {
    dispatch(getRiderOrders());
    return () => {
      dispatch(clearOrderState());
    };
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

  const handleStatusChange = (orderId, newStatus) => {
    dispatch(updateDeliveryStatus({ orderId, status: newStatus }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Rider Dashboard</h1>
          <p className="text-gray-600 mt-2">Manage your assigned deliveries</p>
        </div>

        {/* Content */}
        {loading && <LoadingSpinner />}
        {error && <ErrorState error={error} />}
        {!loading && !error && riderOrders.length === 0 && <EmptyState />}
        {!loading && !error && riderOrders.length > 0 && (
          <>
            <StatsCards assignedOrders={riderOrders} />

            <div className="space-y-4">
              {riderOrders.map((order) => (
                <OrderCard
                  key={order._id}
                  order={order}
                  isExpanded={expandedOrders.has(order._id)}
                  onToggle={() => handleToggleExpand(order._id)}
                  onStatusChange={handleStatusChange}
                />
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default RiderDashboard;
