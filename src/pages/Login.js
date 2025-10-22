// src/pages/Login.js
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Popup from "../components/Popup";
import "../App.css";

export default function Login() {
  const [inputs, setInputs] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false); // <-- popup state
  const navigate = useNavigate();

  // Check login status & show popup if redirected after signup
  useEffect(() => {
    document.title = "Login – MPDB";

    const checkLoginStatus = async () => {
      try {
        const res = await fetch("https://moplaysdatabase.onrender.com/api/auth/check", {
          method: "GET",
          credentials: "include",
        });

        if (res.ok) {
          const data = await res.json();
          if (data.user) navigate("/plays");
        }
      } catch (err) {
        console.log("User not logged in yet.");
      }
    };

    checkLoginStatus();

    // Show popup if coming from account creation
    if (localStorage.getItem("accountCreated") === "true") {
      setShowPopup(true);
      localStorage.removeItem("accountCreated");
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setInputs((prev) => ({ ...prev, [id]: value }));
  };

  const isFormValid = () => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inputs.email) && inputs.password.length > 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid()) return;

    setLoading(true);
    setError("");

    try {
      const res = await fetch("https://moplaysdatabase.onrender.com/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(inputs),
      });

      const data = await res.json();

      if (res.ok) {
        navigate("/plays");
      } else {
        setError(data.message || "Invalid email or password");
      }
    } catch (err) {
      console.error(err);
      setError("Server error, please try again later");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container login-container">
      <div className="form-box">
        <form onSubmit={handleSubmit} noValidate>
          {/* Email */}
          <div className="input-group">
            <input
              id="email"
              type="email"
              placeholder=" "
              value={inputs.email}
              onChange={handleChange}
              required
            />
            <label htmlFor="email">
              Email Address<span className="required-star">*</span>
            </label>
          </div>

          {/* Password */}
          <div className="input-group">
            <input
              id="password"
              type="password"
              placeholder=" "
              value={inputs.password}
              onChange={handleChange}
              required
            />
            <label htmlFor="password">
              Password<span className="required-star">*</span>
            </label>
          </div>

          {/* Error message */}
          {error && <div className="error-msg">{error}</div>}

          {/* Submit */}
          <button
            type="submit"
            className={`btn ${!isFormValid() ? "btn-disabled" : ""}`}
            disabled={!isFormValid() || loading}
          >
            {loading ? "Logging in..." : "LOGIN"}
          </button>
        </form>

        <div className="bottom-links">
          <Link to="/signup" className="bottom-link">Sign Up</Link>
          <span className="separator">|</span>
          <Link to="/forgot-password" className="bottom-link">Forgot Password</Link>
        </div>
      </div>

      {/* Popup for account creation */}
      {showPopup && (
        <Popup
          message="Your account will be verified within the next 24 hours. We thank you for your patience!"
          onClose={() => setShowPopup(false)}
        />
      )}
    </div>
  );
}
