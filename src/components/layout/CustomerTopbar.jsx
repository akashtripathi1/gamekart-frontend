import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Label } from "../ui/label";
import {
  selectCurrentUser,
  logout as logoutAction,
} from "@/store/slice/authSlice";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { ShoppingCart } from "lucide-react";


const CustomerTopbar = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectCurrentUser);
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logoutAction());
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-blue-600">GameKart</h1>
          </div>

          <div className="flex items-center gap-3">
            <nav className="hidden md:flex items-center space-x-6">
              <Link
                to="/home/cart"
                className="space-x-2 border-1 p-2  text-gray-600 hover:text-gray-900 flex items-center"
                aria-label="View Cart"
              >
                <ShoppingCart className="w-5 h-5" />
                <Label> View Cart</Label>
              </Link>
            </nav>
            <span className="hidden md:inline text-gray-700 font-medium">
              Hi {user?.name?.split(" ")[0] || "User"},
            </span>

            <DropdownMenu>
              <DropdownMenuTrigger>
                <button className="p-0 border-none bg-transparent cursor-pointer">
                  <Avatar>
                    <AvatarImage src={user?.photoURL} alt={user?.name} />
                    <AvatarFallback>{user?.name?.[0]}</AvatarFallback>
                  </Avatar>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>{user?.email}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => navigate('/home/my-orders')}
                  className=""
                >
                  My Orders
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={handleLogout}
                  className=""
                >
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

export default CustomerTopbar
