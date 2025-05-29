import React from "react";
import { Outlet } from "react-router-dom";
import AdminTopbar from "./AdminTopbar";
import AdminFooter from "./AdminFooter";

const AdminDashboardLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Admin Topbar */}

      <AdminTopbar />
      {/* Main content area */}
      <main className="flex-grow p-6">
        <Outlet />
      </main>

      {/* Footer */}
      <AdminFooter />
    </div>
  );
};

export default AdminDashboardLayout;
