import React from "react";

const RiderFooter = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4">GameKart Rider</h3>
            <p className="text-gray-300 text-sm">
              Delivery management system for GameKart riders.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="/rider/dashboard"
                  className="text-gray-300 hover:text-white"
                >
                  Dashboard
                </a>
              </li>
              <li>
                <a
                  href="/rider/orders"
                  className="text-gray-300 hover:text-white"
                >
                  My Orders
                </a>
              </li>
              <li>
                <a
                  href="/rider/availability"
                  className="text-gray-300 hover:text-white"
                >
                  Availability
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-300 text-sm">
            © 2025 GameKart Rider. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default RiderFooter;
