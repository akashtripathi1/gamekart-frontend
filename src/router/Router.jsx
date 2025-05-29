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

  // New /customer route with nested routes
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
        element: <Homepage />, // Default /customer route shows Homepage
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

  // {
  //   path: "/home",
  //   element: (
  //     <ProtectedRoute roles={["customer"]}>
  //       <Homepage />
  //     </ProtectedRoute>
  //   ),
  // },
  // {
  //   path: "/cart",
  //   element: (
  //     <ProtectedRoute roles={["customer"]}>
  //       <CartPage />
  //     </ProtectedRoute>
  //   ),
  // },
  // {
  //   path: "/products/:id",
  //   element: (
  //     <ProtectedRoute roles={["customer"]}>
  //       <ProductDetail />
  //     </ProtectedRoute>
  //   ),
  // },

  {
    path: "/admin",
    element: (
      <ProtectedRoute roles={["admin"]}>
        <AdminDashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: "/rider",
    element: (
      <ProtectedRoute roles={["rider"]}>
        <RiderDashboard />
      </ProtectedRoute>
    ),
  },

  { path: "*", element: <PageNotFound /> },
]);

export default router;
