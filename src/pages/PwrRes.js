// src/pages/ResetPassword.js
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../App.css";

export default function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();

  const [inputs, setInputs] = useState({ newPassword: "", confirmPassword: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.title = "Reset Password – MPDB";
  }, []);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setInputs((prev) => ({ ...prev, [id]: value }));
  };

  const isFormValid = () => {
    return inputs.newPassword.length >= 6 && inputs.newPassword === inputs.confirmPassword;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid()) {
      setError("Passwords must match and be at least 6 characters.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch(`https://moplaysdatabase.onrender.com/api/auth/reset-password/${token}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // <--- allow cookies like Login.js
        body: JSON.stringify({ newPassword: inputs.newPassword }),
      });

      const data = await res.json();

      if (res.ok) {
        // Redirect to login page after successful reset
        navigate("/login");
      } else {
        setError(data.message || `Error ${res.status}: Something went wrong.`);
      }
    } catch (err) {
      console.error(err);
      setError("Server error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container login-container">
      <div className="form-box">
        <form onSubmit={handleSubmit} noValidate>
          {/* New Password */}
          <div className="input-group">
            <input
              id="newPassword"
              type="password"
              placeholder=" "
              value={inputs.newPassword}
              onChange={handleChange}
              required
            />
            <label htmlFor="newPassword">
              New Password<span className="required-star">*</span>
            </label>
          </div>

          {/* Confirm Password */}
          <div className="input-group">
            <input
              id="confirmPassword"
              type="password"
              placeholder=" "
              value={inputs.confirmPassword}
              onChange={handleChange}
              required
            />
            <label htmlFor="confirmPassword">
              Confirm Password<span className="required-star">*</span>
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
            {loading ? "Resetting..." : "RESET PASSWORD"}
          </button>
        </form>
      </div>
    </div>
  );
}
