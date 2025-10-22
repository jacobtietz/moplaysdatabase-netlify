import React from "react";
import { Link } from "react-router-dom";
import "../App.css"; // adjust if your CSS path differs

export default function TopBar() {
  return (
    <div className="top-bar">
      <Link to="/plays">
        <img src="/mainlogo.png" alt="Main Logo" className="top-bar-logo" />
      </Link>
    </div>
  );
}
