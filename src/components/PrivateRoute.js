// src/components/PrivateRoute.js
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

export default function PrivateRoute({ children }) {
  const [loading, setLoading] = useState(true);
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";
        const res = await axios.get(`${API_URL}/api/users/profile`, { withCredentials: true });
        if (res.data.user) setIsAuth(true);
      } catch (err) {
        setIsAuth(false);
      } finally {
        setLoading(false);
      }
    };
    checkAuth();
  }, []);

  if (loading) return <p>Loading...</p>; // optional spinner
  if (!isAuth) return <Navigate to="/login" replace />;
  return children;
}
