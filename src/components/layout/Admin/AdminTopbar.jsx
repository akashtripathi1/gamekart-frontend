import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectCurrentUser, logout as logoutAction } from "@/store/slice/authSlice";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const AdminTopbar = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectCurrentUser);
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutAction());
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Branding */}
          <div className="flex flex-col justify-center">
            <h1 className="text-2xl font-bold text-blue-600">GameKart</h1>
            <span className="text-sm text-gray-500 font-medium">Admin Dashboard</span>
          </div>

          {/* Navigation and Profile */}
          <div className="flex items-center gap-5">
            <nav className="hidden md:flex items-center space-x-6">
              <Link to="/admin/dashboard" className="text-gray-700 hover:text-blue-600 font-medium">
                Dashboard
              </Link>
              <Link to="/admin/products" className="text-gray-700 hover:text-blue-600 font-medium">
                Products
              </Link>
              <Link to="/admin/orders" className="text-gray-700 hover:text-blue-600 font-medium">
                Orders
              </Link>
              <Link to="/admin/users" className="text-gray-700 hover:text-blue-600 font-medium">
                Users
              </Link>
            </nav>

            <DropdownMenu>
              <DropdownMenuTrigger>
                <button className="flex items-center gap-2 p-0 border-none bg-transparent cursor-pointer">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user?.photoURL} alt={user?.name} />
                    <AvatarFallback>{user?.name?.[0] || "A"}</AvatarFallback>
                  </Avatar>
                  <span className="text-sm font-medium text-gray-700 hidden sm:inline">
                    {user?.name?.split(" ")[0]}
                  </span>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>{user?.email}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate("/admin/profile")}>
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout}>
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminTopbar;
