import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  // ❌ Not logged in
  if (!token || !user) {
    return <Navigate to="/auth" />;
  }

  // ❌ Not admin
  if (user.role !== "admin") {
    return <Navigate to="/" />;
  }

  // ✅ Allow access
  return children;
};

export default ProtectedRoute;