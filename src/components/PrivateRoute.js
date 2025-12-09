// src/components/PrivateRoute.js
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

/**
 * PrivateRoute component:
 * - Protects routes that require login
 * - If adminOnly={true} is passed, only users with account level 4 can access
 */
export default function PrivateRoute({ children, adminOnly = false }) {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null); // store user info

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";
        const res = await axios.get(`${API_URL}/api/users/profile`, { withCredentials: true });
        if (res.data.user) setUser(res.data.user);
      } catch (err) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  if (loading) return <p>Loading...</p>; // optional spinner while checking auth
  if (!user) return <Navigate to="/login" replace />; // not logged in

  // If route is admin-only and user is not admin, redirect
  if (adminOnly && user.account !== 4) return <Navigate to="/login" replace />;

  // Authenticated (and authorized for admin if needed)
  return children;
}
