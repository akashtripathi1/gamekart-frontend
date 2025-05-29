import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4">GameKart</h3>
            <p className="text-gray-300 text-sm">
              Your trusted partner for all gaming needs. Quality products, fast
              delivery.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-gray-300 hover:text-white">
                  Products
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white">
                  Cart
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white">
                  Orders
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <p className="text-gray-300 text-sm">
              Email: support@gamekart.com
              <br />
              Phone: +1 (555) 123-4567
            </p>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-300 text-sm">
            © 2025 GameKart. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;