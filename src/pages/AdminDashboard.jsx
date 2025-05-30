// pages/AdminDashboard.jsx
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { makeRequest } from "@/hooks/useAxios";
import {
  getAllOrders,
  shipOrder,
  clearOrderState,
} from "@/store/slice/orderSlice";
import { fetchRiders } from "@/store/slice/riderSlice";
import toast from "react-hot-toast";

// Stats Cards Component
const StatsCards = ({ orders, riders }) => {
  const paidCount = orders.filter((o) => o.status === "Paid").length;
  const shippedCount = orders.filter((o) => o.status === "Shipped").length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <Card title="Total Orders" value={orders.length} color="blue" />
      <Card title="Paid Orders" value={paidCount} color="yellow" />
      <Card title="Shipped Orders" value={shippedCount} color="green" />
      <Card title="Active Riders" value={riders.length} color="purple" />
    </div>
  );
};

const Card = ({ title, value, color }) => (
  <div className={`bg-white p-6 rounded-lg shadow-md`}>
    <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
    <p className={`text-3xl font-bold text-${color}-600`}>{value}</p>
  </div>
);

// Orders Table Component
const OrdersTable = ({ orders, onShip }) => {
  const statusClass = {
    Paid: "bg-blue-100 text-blue-800",
    Shipped: "bg-green-100 text-green-800",
    Delivered: "bg-gray-100 text-gray-800",
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
      <div className="px-6 py-4 border-b">
        <h2 className="text-xl font-semibold text-gray-800">All Orders</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              {[
                "ID",
                "Customer",
                "Products",
                "Total",
                "Status",
                "Date",
                "Actions",
              ].map((h) => (
                <th
                  key={h}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {(orders || []).map((order) => (
              <tr key={order._id} className="hover:bg-gray-50">
                <td className="px-6 py-4 text-sm font-medium text-gray-900">
                  {order._id.substring(0, 8)}...
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  {order.customerInfo.name} <br />
                  <span className="text-gray-500 text-xs">
                    {order.customerInfo.email}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  {(order.items || []).map((p, i) => (
                    <div key={i} className="mb-1">
                      {p.name} x{p.quantity}
                      <div className="text-xs text-gray-500">
                        {p.color}, {p.size}
                      </div>
                    </div>
                  ))}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  ₹{order.total.toFixed(2)}
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      statusClass[order.status] ||
                      "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {new Date(order.createdAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 text-sm">
                  {order.status === "Paid" ? (
                    <button
                      onClick={() => onShip(order._id)}
                      className="bg-green-600 text-white px-3 py-1 rounded-md text-xs hover:bg-green-700"
                    >
                      Ship Order
                    </button>
                  ) : (
                    <span className="text-gray-500 text-xs">—</span>
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
const RiderAssignmentModal = ({ orderId, riders, onAssign, onCancel }) => {
  const [riderId, setRiderId] = useState("");
  if (!orderId) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h3 className="text-lg font-semibold mb-4">Assign Rider</h3>
        <select
          value={riderId}
          onChange={(e) => setRiderId(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md mb-4"
        >
          <option value="">Select a rider</option>
          {(riders || []).map((r) => (
            <option key={r._id} value={r._id}>
              {r.name} (Username: {r.username})
            </option>
          ))}
        </select>
        <div className="flex gap-2">
          <button
            onClick={() => onAssign(orderId, riderId)}
            disabled={!riderId}
            className="flex-1 bg-green-600 text-white py-2 rounded-md disabled:bg-gray-300"
          >
            Assign & Ship
          </button>
          <button
            onClick={onCancel}
            className="flex-1 bg-gray-500 text-white py-2 rounded-md"
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
  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector((s) => s.orders);
  // Get riders from Redux store
  const {
    riders,
    loading: ridersLoading,
    error: ridersError,
  } = useSelector((s) => s.riders);
  const [modalOrder, setModalOrder] = useState(null);
  console.log(riders);
  useEffect(() => {
    dispatch(getAllOrders());
    dispatch(fetchRiders()); // Dispatch the rider fetch action

    return () => {
      dispatch(clearOrderState());
    };
  }, [dispatch]);

  const openShipModal = (orderId) => setModalOrder(orderId);

  const handleAssign = async (orderId, riderId) => {
    try {
      await dispatch(shipOrder({ orderId, riderId })).unwrap();
      toast.success(`Order successfully assigned to rider!`);
      setModalOrder(null);
      dispatch(getAllOrders());
    } catch (error) {
      toast.error(error.message || "Failed to assign order to rider");
      setModalOrder(null);
    }
  };

  if (loading) return <p className="p-6">Loading orders…</p>;
  if (error) return <p className="p-6 text-red-500">{error}</p>;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <StatsCards orders={orders} riders={riders} />
        <OrdersTable orders={orders} onShip={openShipModal} />
        <RiderAssignmentModal
          orderId={modalOrder}
          riders={riders}
          onAssign={handleAssign}
          onCancel={() => setModalOrder(null)}
        />
      </div>
    </div>
  );
};

export default AdminDashboard;
