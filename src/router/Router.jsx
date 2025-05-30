// src/router/Router.jsx
import React from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import PageNotFound from "@/components/CustomComponents/PageNotFound";
import SignInPage from "@/pages/Auth/SigninPage";
import Homepage from "@/pages/Homepage";
import CartPage from "@/pages/CartPage";
import MyOrders from "@/pages/MyOrders";
import ProductDetail from "@/pages/ProductDetailsPage";
import AdminDashboard from "@/pages/AdminDashboard";
import RiderDashboard from "@/pages/RiderDashboard";
import CustomerLayout from "@/components/layout/CustomerLayout";
import RefetchLayer from "./RefetchLayer";
import AdminDashboardLayout from "@/components/layout/Admin/AdminDashboardLayout";
import RiderDashboardLayout from "@/components/layout/Rider/RiderDashboardLayout";

// Determine default path by role
const defaultPathForRole = (role) => {
  if (role === "admin") return "/admin";
  if (role === "rider") return "/rider";
  return "/home";
};

// ProtectedRoute that reads from Redux
const ProtectedRoute = ({ children, roles }) => {
  const { isAuthenticated, user, isLoading } = useSelector(
    (state) => state.auth
  );
  if (isLoading) return <div>Loading...</div>;

  if (!isAuthenticated) {
    return <Navigate to="/signin" replace />;
  }

  // If roles supplied, enforce them
  if (roles && (!user || !roles.includes(user.role))) {
    // Redirect to user's default
    return <Navigate to={defaultPathForRole(user?.role)} replace />;
  }

  return children;
};

// Only for the signin page: redirect authenticated users based on role
const AuthRoute = ({ children }) => {
  const { isAuthenticated, isLoading, user } = useSelector(
    (state) => state.auth
  );
  if (isLoading) return <div>Loading...</div>;

  if (isAuthenticated) {
    return <Navigate to={defaultPathForRole(user?.role)} replace />;
  }

  return children;
};

// On root, send to signin or role-based default
const RootRedirect = () => {
  const { isAuthenticated, isLoading, user } = useSelector(
    (state) => state.auth
  );
  if (isLoading) return <div>Loading...</div>;

  if (!isAuthenticated) return <Navigate to="/signin" replace />;
  return <Navigate to={defaultPathForRole(user?.role)} replace />;
};

const router = createBrowserRouter([
  { path: "/", element: <RootRedirect /> },
  {
    path: "/signin",
    element: (
      <AuthRoute>
        <SignInPage />
      </AuthRoute>
    ),
  },

  
  {
    path: "/home",
    element: (
      <ProtectedRoute roles={["customer"]}>
        <RefetchLayer>
          <CustomerLayout />
        </RefetchLayer>
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <Homepage />, // Default /home route shows Homepage
      },
      {
        path: "cart",
        element: <CartPage />,
      },
      {
        path: "products/:id",
        element: <ProductDetail />,
      },
      {
        path: "my-orders",
        element: <MyOrders />,
      },
    ],
  },

  {
    path: "/admin",
    element: (
      <ProtectedRoute roles={["admin"]}>
        <RefetchLayer>
          <AdminDashboardLayout />
        </RefetchLayer>
      </ProtectedRoute>
    ), 
    children: [
      {
        index: true,
        element: <AdminDashboard />, 
      },
    ],
  },
  {
    path: "/rider",
    element: (
      <ProtectedRoute roles={["rider"]}>
        <RefetchLayer>
          <RiderDashboardLayout />
        </RefetchLayer>
      </ProtectedRoute>
    ), 
    children: [
      {
        index: true,
        element: <RiderDashboard />, 
      },
    ],
  },

  { path: "*", element: <PageNotFound /> },
]);

export default router;
