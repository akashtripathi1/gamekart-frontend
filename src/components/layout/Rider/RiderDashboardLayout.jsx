import React from 'react';
import { Outlet } from 'react-router-dom';
import RiderTopbar from './RiderTopbar';
import RiderFooter from './RiderFooter';

const RiderDashboardLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Rider Topbar */}
      <RiderTopbar />
      {/* Main content area */}
      <main className="flex-grow p-4">
        <Outlet />
      </main>

      {/* Footer */}
      <RiderFooter />
    </div>
  );
};

export default RiderDashboardLayout;