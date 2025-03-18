import React from "react";
import { Navigate } from "react-router-dom";

export default function PrivatePart({ children }) {
  const isLoggedIn = !!localStorage.getItem("user_id");
  return isLoggedIn ? children : <Navigate to="/login" replace />;
}
