import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { LoadingState } from "../components/StateBlocks";

/**
 * Wraps the /admin/* route tree. A customer (or anyone not logged in) is
 * redirected away before any admin page or its data ever loads client-side.
 * The server-side requireRole("admin") middleware is the real enforcement —
 * this is just so a customer never even sees the admin UI shell.
 */
export function RequireAdmin() {
  const { user, loading } = useAuth();

  if (loading) return <LoadingState />;
  if (!user) return <Navigate to="/login" replace />;
  if (user.role !== "admin") return <Navigate to="/" replace />;

  return <Outlet />;
}
