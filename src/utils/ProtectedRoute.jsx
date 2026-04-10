import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useUserStore } from "../contextGlobal/userStore";

const ProtectedRoute = ({ redirectTo = "/" }) => {
  const isAuthenticated = useUserStore((state) => state.isAuthenticated);
  const token = sessionStorage.getItem("token") || localStorage.getItem("token");

  if (!isAuthenticated || !token) {
    return <Navigate to={redirectTo} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;