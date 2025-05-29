import React, { useState } from "react";

// Header Component
const Header = ({ onLogout }) => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-blue-600">
              Admin Dashboard
            </h1>
          </div>

          <nav className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-gray-600 hover:text-gray-900">
              Orders
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-900">
              Riders
            </a>
            <a href="#" className="text-gray-600 hover:text-gray-900">
              Analytics
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
const StatsCards = ({ orders, riders }) => {
  const paidCount = orders.filter((order) => order.status === "Paid").length;
  const shippedCount = orders.filter(
    (order) => order.status === "Shipped"
  ).length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold text-gray-700">Total Orders</h3>
        <p className="text-3xl font-bold text-blue-600">{orders.length}</p>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold text-gray-700">Paid Orders</h3>
        <p className="text-3xl font-bold text-yellow-600">{paidCount}</p>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold text-gray-700">Shipped Orders</h3>
        <p className="text-3xl font-bold text-green-600">{shippedCount}</p>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold text-gray-700">Active Riders</h3>
        <p className="text-3xl font-bold text-purple-600">{riders.length}</p>
      </div>
    </div>
  );
};

// Orders Table Component
const OrdersTable = ({ orders, riders, onStatusChange }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case "Paid":
        return "bg-blue-100 text-blue-800";
      case "Shipped":
        return "bg-green-100 text-green-800";
      case "Delivered":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-yellow-100 text-yellow-800";
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="px-6 py-4 border-b">
        <h2 className="text-xl font-semibold text-gray-800">All Orders</h2>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Order ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Customer
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Products
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Total
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {orders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {order.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {order.customerName}
                  </div>
                  <div className="text-sm text-gray-500">
                    {order.customerEmail}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900">
                    {order.products.map((product, index) => (
                      <div key={index} className="mb-1">
                        {product.name} ({product.color}, {product.size}) x
                        {product.quantity}
                      </div>
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  ${order.totalAmount}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(
                      order.status
                    )}`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {order.orderDate}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  {order.status === "Paid" && (
                    <button
                      onClick={() => onStatusChange(order.id, "Shipped")}
                      className="bg-green-600 text-white px-3 py-1 rounded-md text-xs hover:bg-green-700"
                    >
                      Ship Order
                    </button>
                  )}
                  {order.status === "Shipped" && (
                    <span className="text-green-600 text-xs">
                      Rider:{" "}
                      {riders.find((r) => r.id === order.assignedRider)?.name}
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Rider Assignment Modal Component
const RiderAssignmentModal = ({
  selectedOrder,
  riders,
  selectedRider,
  onRiderChange,
  onAssign,
  onCancel,
}) => {
  if (!selectedOrder) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h3 className="text-lg font-semibold mb-4">Assign Rider</h3>
        <p className="text-gray-600 mb-4">
          Select a rider to assign for order {selectedOrder}
        </p>

        <select
          value={selectedRider}
          onChange={(e) => onRiderChange(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md mb-4 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="">Select a rider</option>
          {riders.map((rider) => (
            <option key={rider.id} value={rider.id}>
              {rider.name} - {rider.phone}
            </option>
          ))}
        </select>

        <div className="flex gap-2">
          <button
            onClick={onAssign}
            disabled={!selectedRider}
            className="flex-1 bg-green-600 text-white py-2 px-4 rounded-md disabled:bg-gray-300 hover:bg-green-700 disabled:cursor-not-allowed"
          >
            Assign & Ship
          </button>
          <button
            onClick={onCancel}
            className="flex-1 bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

// Main AdminDashboard Component
const AdminDashboard = () => {
  const handleLogout = () => {
    window.location.href = `${
      import.meta.env.VITE_BACKEND_URL
    }/api/auth/logout`;
  };

  // Mock data for orders
  const [orders, setOrders] = useState([
    {
      id: "ORD001",
      customerName: "John Doe",
      customerEmail: "john@example.com",
      products: [
        {
          name: "PS5 Console",
          color: "White",
          size: "Standard",
          quantity: 1,
          price: 499,
        },
      ],
      totalAmount: 499,
      status: "Paid",
      orderDate: "2025-05-25",
      address: "123 Gaming Street, Tech City",
    },
    {
      id: "ORD002",
      customerName: "Jane Smith",
      customerEmail: "jane@example.com",
      products: [
        {
          name: "Xbox Series X Controller",
          color: "Black",
          size: "Regular",
          quantity: 2,
          price: 59,
        },
      ],
      totalAmount: 118,
      status: "Paid",
      orderDate: "2025-05-24",
      address: "456 Console Ave, Game Town",
    },
    {
      id: "ORD003",
      customerName: "Mike Johnson",
      customerEmail: "mike@example.com",
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
      address: "789 Nintendo Lane, Switch City",
      assignedRider: "rider001",
    },
  ]);

  // Mock riders data
  const [riders] = useState([
    {
      id: "rider001",
      name: "Alex Wilson",
      email: "alex@riders.com",
      phone: "+1234567890",
    },
    {
      id: "rider002",
      name: "Sarah Davis",
      email: "sarah@riders.com",
      phone: "+1234567891",
    },
    {
      id: "rider003",
      name: "Tom Brown",
      email: "tom@riders.com",
      phone: "+1234567892",
    },
  ]);

  const [selectedOrder, setSelectedOrder] = useState(null);
  const [selectedRider, setSelectedRider] = useState("");

  const handleStatusChange = (orderId, newStatus) => {
    if (newStatus === "Shipped") {
      setSelectedOrder(orderId);
    } else {
      setOrders(
        orders.map((order) =>
          order.id === orderId ? { ...order, status: newStatus } : order
        )
      );
    }
  };

  const assignRiderAndShip = () => {
    if (selectedOrder && selectedRider) {
      setOrders(
        orders.map((order) =>
          order.id === selectedOrder
            ? { ...order, status: "Shipped", assignedRider: selectedRider }
            : order
        )
      );
      setSelectedOrder(null);
      setSelectedRider("");
    }
  };

  const cancelAssignment = () => {
    setSelectedOrder(null);
    setSelectedRider("");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <p className="text-gray-600">Manage orders and riders</p>
        </div>

        <StatsCards orders={orders} riders={riders} />

        <OrdersTable
          orders={orders}
          riders={riders}
          onStatusChange={handleStatusChange}
        />

        <RiderAssignmentModal
          selectedOrder={selectedOrder}
          riders={riders}
          selectedRider={selectedRider}
          onRiderChange={setSelectedRider}
          onAssign={assignRiderAndShip}
          onCancel={cancelAssignment}
        />
      </div>
    </div>
  );
};

export default AdminDashboard;
