import React from 'react';
import CustomerTopbar from './CustomerTopbar'; // Adjust the import path as needed
import CustomerFooter from './CustomerFooter'; // Adjust the import path as needed
import { Outlet } from 'react-router-dom';

const CustomerLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Topbar */}
      <CustomerTopbar />

      {/* Main content area where nested routes will render */}
      <main className="flex-grow p-4">
        <Outlet />
      </main>

      {/* Footer */}
      <CustomerFooter />
    </div>
  );
};

export default CustomerLayout;
