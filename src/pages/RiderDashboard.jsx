import React, { useState } from "react";

// Header Component
const Header = ({ onLogout }) => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-blue-600">
              Rider Dashboard
            </h1>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-gray-600 hover:text-gray-900">
              Orders
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-900">
              Profile
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-900">
              History
            </a>
          </nav>

          <button
            onClick={onLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
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
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold text-gray-700">Assigned Orders</h3>
        <p className="text-3xl font-bold text-blue-600">
          {assignedOrders.length}
        </p>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold text-gray-700">
          Pending Deliveries
        </h3>
        <p className="text-3xl font-bold text-yellow-600">{pendingCount}</p>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold text-gray-700">Completed Today</h3>
        <p className="text-3xl font-bold text-green-600">{completedCount}</p>
      </div>
    </div>
  );
};

// Order Card Component
const OrderCard = ({ order, onViewDetails, onStatusChange }) => {
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
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-4 mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Order #{order.id}
              </h3>
              <span
                className={`px-3 py-1 text-sm font-semibold rounded-full ${getStatusColor(
                  order.status
                )}`}
              >
                {order.status}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <h4 className="font-semibold text-gray-700 mb-2">
                  Customer Details
                </h4>
                <p className="text-sm text-gray-600">{order.customerName}</p>
                <p className="text-sm text-gray-600">{order.customerEmail}</p>
                <p className="text-sm text-gray-600">{order.customerPhone}</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-700 mb-2">
                  Delivery Address
                </h4>
                <p className="text-sm text-gray-600">{order.address}</p>
              </div>
            </div>

            <div className="mb-4">
              <h4 className="font-semibold text-gray-700 mb-2">Products</h4>
              {order.products.map((product, index) => (
                <div key={index} className="text-sm text-gray-600 mb-1">
                  {product.name} ({product.color}, {product.size}) x
                  {product.quantity} - ${product.price}
                </div>
              ))}
              <p className="font-semibold text-gray-800 mt-2">
                Total: ${order.totalAmount}
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-2 mt-4 md:mt-0 md:ml-6">
            <button
              onClick={() => onViewDetails(order)}
              className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700"
            >
              View Details
            </button>
            {order.status === "Shipped" && (
              <>
                <button
                  onClick={() => onStatusChange(order.id, "Delivered")}
                  className="bg-green-600 text-white px-4 py-2 rounded-md text-sm hover:bg-green-700"
                >
                  Mark Delivered
                </button>
                <button
                  onClick={() => onStatusChange(order.id, "Undelivered")}
                  className="bg-red-600 text-white px-4 py-2 rounded-md text-sm hover:bg-red-700"
                >
                  Mark Undelivered
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Order Details Modal Component
const OrderDetailsModal = ({ order, onClose, onStatusChange }) => {
  const [deliveryNotes, setDeliveryNotes] = useState("");

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

  if (!order) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold">Order Details - #{order.id}</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl"
          >
            ×
          </button>
        </div>

        <div className="space-y-6">
          {/* Customer Information */}
          <div>
            <h4 className="font-semibold text-gray-800 mb-3">
              Customer Information
            </h4>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p>
                <span className="font-medium">Name:</span> {order.customerName}
              </p>
              <p>
                <span className="font-medium">Email:</span>{" "}
                {order.customerEmail}
              </p>
              <p>
                <span className="font-medium">Phone:</span>{" "}
                {order.customerPhone}
              </p>
            </div>
          </div>

          {/* Delivery Address */}
          <div>
            <h4 className="font-semibold text-gray-800 mb-3">
              Delivery Address
            </h4>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p>{order.address}</p>
            </div>
          </div>

          {/* Products */}
          <div>
            <h4 className="font-semibold text-gray-800 mb-3">Products</h4>
            <div className="bg-gray-50 p-4 rounded-lg">
              {order.products.map((product, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center py-2 border-b last:border-b-0"
                >
                  <div>
                    <p className="font-medium">{product.name}</p>
                    <p className="text-sm text-gray-600">
                      Color: {product.color}, Size: {product.size}
                    </p>
                  </div>
                  <div className="text-right">
                    <p>Qty: {product.quantity}</p>
                    <p className="font-medium">${product.price}</p>
                  </div>
                </div>
              ))}
              <div className="flex justify-between items-center pt-3 font-bold">
                <span>Total Amount:</span>
                <span>${order.totalAmount}</span>
              </div>
            </div>
          </div>

          {/* Order Status */}
          <div>
            <h4 className="font-semibold text-gray-800 mb-3">Order Status</h4>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center justify-between">
                <span>Current Status:</span>
                <span
                  className={`px-3 py-1 text-sm font-semibold rounded-full ${getStatusColor(
                    order.status
                  )}`}
                >
                  {order.status}
                </span>
              </div>
              <p className="text-sm text-gray-600 mt-2">
                Order Date: {order.orderDate}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          {order.status === "Shipped" && (
            <div className="flex gap-4">
              <button
                onClick={() => {
                  onStatusChange(order.id, "Delivered", deliveryNotes);
                  onClose();
                }}
                className="flex-1 bg-green-600 text-white py-3 px-4 rounded-md hover:bg-green-700"
              >
                Mark as Delivered
              </button>
              <button
                onClick={() => {
                  onStatusChange(order.id, "Undelivered", deliveryNotes);
                  onClose();
                }}
                className="flex-1 bg-red-600 text-white py-3 px-4 rounded-md hover:bg-red-700"
              >
                Mark as Undelivered
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Empty State Component
const EmptyState = () => {
  return (
    <div className="bg-white rounded-lg shadow-md p-8 text-center">
      <h3 className="text-lg font-semibold text-gray-600">
        No orders assigned
      </h3>
      <p className="text-gray-500 mt-2">Check back later for new deliveries</p>
    </div>
  );
};

// Main RiderDashboard Component
const RiderDashboard = () => {
  const handleLogout = () => {
    window.location.href = `${
      import.meta.env.VITE_BACKEND_URL
    }/api/auth/logout`;
  };

  // Mock assigned orders for the current rider
  const [assignedOrders, setAssignedOrders] = useState([
    {
      id: "ORD003",
      customerName: "Mike Johnson",
      customerEmail: "mike@example.com",
      customerPhone: "+1234567890",
      products: [
        {
          name: "Nintendo Switch",
          color: "Red/Blue",
          size: "OLED",
          quantity: 1,
          price: 349,
        },
      ],
      totalAmount: 349,
      status: "Shipped",
      orderDate: "2025-05-23",
      address: "789 Nintendo Lane, Switch City, SC 12345",
      assignedRider: "rider001",
    },
    {
      id: "ORD005",
      customerName: "Lisa Chen",
      customerEmail: "lisa@example.com",
      customerPhone: "+1234567891",
      products: [
        {
          name: "PS5 DualSense Controller",
          color: "White",
          size: "Standard",
          quantity: 2,
          price: 69,
        },
      ],
      totalAmount: 138,
      status: "Shipped",
      orderDate: "2025-05-26",
      address: "456 Gaming Blvd, Console City, CC 54321",
      assignedRider: "rider001",
    },
  ]);

  const [selectedOrder, setSelectedOrder] = useState(null);

  const handleStatusChange = (orderId, newStatus, notes = "") => {
    setAssignedOrders(
      assignedOrders.map((order) =>
        order.id === orderId
          ? { ...order, status: newStatus, deliveryNotes: notes }
          : order
      )
    );
  };

  const openOrderDetails = (order) => {
    setSelectedOrder(order);
  };

  const closeOrderDetails = () => {
    setSelectedOrder(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onLogout={handleLogout} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <p className="text-gray-600">Manage your assigned deliveries</p>
        </div>

        <StatsCards assignedOrders={assignedOrders} />

        <div className="space-y-4">
          {assignedOrders.length === 0 ? (
            <EmptyState />
          ) : (
            assignedOrders.map((order) => (
              <OrderCard
                key={order.id}
                order={order}
                onViewDetails={openOrderDetails}
                onStatusChange={handleStatusChange}
              />
            ))
          )}
        </div>

        <OrderDetailsModal
          order={selectedOrder}
          onClose={closeOrderDetails}
          onStatusChange={handleStatusChange}
        />
      </div>
    </div>
  );
};

export default RiderDashboard;
