import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
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

const RiderTopbar = () => {
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
            <span className="text-sm text-gray-500 font-medium">
              Rider Dashboard
            </span>
          </div>

          {/* Navigation & Profile */}
          <div className="flex items-center gap-5">
            {/* User Avatar & Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger>
                <button className="flex items-center gap-2 p-0 border-none bg-transparent cursor-pointer">
                  <span className="text-sm font-medium text-gray-700 hidden sm:inline">
                    Hi {user?.name?.split(" ")[0]}
                  </span>
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user?.photoURL} alt={user?.name} />
                    <AvatarFallback>{user?.name?.[0] || "R"}</AvatarFallback>
                  </Avatar>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>{user?.email}</DropdownMenuLabel>
                <DropdownMenuSeparator />
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

export default RiderTopbar;
