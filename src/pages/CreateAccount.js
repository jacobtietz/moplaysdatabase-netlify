// src/pages/CreateAccount.js
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../App.css";

export default function CreateAccount() {
  const [inputs, setInputs] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    account: 0,
    contact: 0,
    schoolName: "",
    over18: 0,
  });

  const [error, setError] = useState("");
  const [nameErrors, setNameErrors] = useState({ firstName: "", lastName: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Signup – MPDB";
  }, []);

  const handleChange = (e) => {
    const { id, value, type, checked } = e.target;

    if (type === "checkbox") {
      setInputs(prev => ({ ...prev, [id]: checked ? 1 : 0 }));
    } else {
      let newValue = value;

      // Handle firstName / lastName
      if (id === "firstName" || id === "lastName") {
        newValue = newValue.replace(/\s+/g, "");
        newValue = newValue.replace(/[^A-Za-z'-]/g, "");
        if (newValue.length > 0) newValue = newValue.charAt(0).toUpperCase() + newValue.slice(1);
        if (newValue.length > 50) newValue = newValue.slice(0, 50);
      }

      if (id === "email") newValue = newValue.replace(/\s+/g, "");
      if (id === "phone") newValue = newValue.replace(/\D/g, "").slice(0, 15);
      if (id === "password") newValue = newValue.replace(/\s+/g, "");

      setInputs(prev => ({ ...prev, [id]: newValue }));

      if (id === "firstName") setNameErrors(prev => ({
        ...prev,
        firstName: newValue === "" ? "First name cannot be empty" : ""
      }));

      if (id === "lastName") setNameErrors(prev => ({
        ...prev,
        lastName: newValue === "" ? "Last name cannot be empty" : ""
      }));
    }
  };

  const isFormValid = () => {
    const nameRegex = /^[A-Za-z'-]+$/;
    const firstValid = nameRegex.test(inputs.firstName);
    const lastValid = nameRegex.test(inputs.lastName);
    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inputs.email);
    const phoneValid = /^\d{10,15}$/.test(inputs.phone);
    const passwordValid = inputs.password.length >= 8;
    let roleValid = true;
    if (inputs.account === 0) roleValid = inputs.schoolName.trim() !== "";
    if (inputs.account === 1) roleValid = inputs.over18 === 1; // REQUIRED

    return firstValid && lastValid && emailValid && phoneValid && passwordValid && roleValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid()) return;

    setLoading(true);
    setError("");

    try {
      const payload = { ...inputs };
      if (inputs.account === 0 && payload.schoolName.trim() === "") {
        setError("Please enter your school/university name");
        setLoading(false);
        return;
      }

      const res = await fetch("https://moplaysdatabase.onrender.com/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (res.ok) {
        localStorage.setItem("accountCreated", "true");
        navigate("/login");
      } else {
        setError(data.msg || "Something went wrong");
      }
    } catch (err) {
      console.error(err);
      setError("Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="form-box">
        <form onSubmit={handleSubmit} noValidate>
          <div className="input-group">
            <input
              id="firstName"
              type="text"
              placeholder=" "
              value={inputs.firstName}
              onChange={handleChange}
              required
            />
            <label htmlFor="firstName">First Name<span className="required-star">*</span></label>
            {nameErrors.firstName && <div className="error-msg">{nameErrors.firstName}</div>}
          </div>

          <div className="input-group">
            <input
              id="lastName"
              type="text"
              placeholder=" "
              value={inputs.lastName}
              onChange={handleChange}
              required
            />
            <label htmlFor="lastName">Last Name<span className="required-star">*</span></label>
            {nameErrors.lastName && <div className="error-msg">{nameErrors.lastName}</div>}
          </div>

          <div className="input-group">
            <input
              id="email"
              type="email"
              placeholder=" "
              value={inputs.email}
              onChange={handleChange}
              required
            />
            <label htmlFor="email">Email Address<span className="required-star">*</span></label>
          </div>

          <div className="input-group">
            <input
              id="phone"
              type="tel"
              placeholder=" "
              value={inputs.phone}
              onChange={handleChange}
              required
            />
            <label htmlFor="phone">Phone Number<span className="required-star">*</span></label>
          </div>

          <div className="input-group">
            <input
              id="password"
              type="password"
              placeholder=" "
              value={inputs.password}
              onChange={handleChange}
              required
            />
            <label htmlFor="password">Password<span className="required-star">*</span></label>
          </div>

          <div className="radio-group">
            <input
              type="radio"
              id="account-educator"
              name="account"
              value={0}
              checked={inputs.account === 0}
              onChange={(e) => setInputs(prev => ({ ...prev, account: Number(e.target.value) }))}
            />
            <label htmlFor="account-educator">Educator</label>

            <input
              type="radio"
              id="account-playwright"
              name="account"
              value={1}
              checked={inputs.account === 1}
              onChange={(e) => setInputs(prev => ({ ...prev, account: Number(e.target.value) }))}
            />
            <label htmlFor="account-playwright">Playwright</label>
          </div>

          {inputs.account === 0 && (
            <div className="input-group">
              <input
                id="schoolName"
                type="text"
                placeholder=" "
                value={inputs.schoolName}
                onChange={handleChange}
                required
              />
              <label htmlFor="schoolName">School/University<span className="required-star">*</span></label>
            </div>
          )}

          {inputs.account === 1 && (
            <div className="checkbox-group">

              {/* PLAYWRIGHT CHECKBOX */}
              <label className="checkbox-item playwright-checkbox">
                <input
                  type="checkbox"
                  id="contact"
                  checked={inputs.contact === 1}
                  onChange={handleChange}
                />
                Are you a playwright?

                {/* Info icon */}
                <span className="info-icon" title="Selecting this is the path to allowing you to post your works on our website. After selecting it, your account will be verified within ~24 hours. Once verified, you may publish your works. Users may contact you using our personal contact form (your actual email stays hidden unless you choose otherwise). You may disable contact entirely in your account settings at any time.">
                  ⓘ
                </span>
              </label>

              <p className="info-text">
                When selected, we will verify your account within 24 hours.  
                After verification, you can post your works on our site.  
                Users will be able to contact you through our personal contact form,  
                which hides your email unless you choose otherwise.  
                You can disable all contact anytime in your account settings.
              </p>

              {/* 18+ CHECKBOX (Required) */}
              <label className="checkbox-item">
                <input
                  type="checkbox"
                  id="over18"
                  checked={inputs.over18 === 1}
                  onChange={handleChange}
                />
                Are you 18 or older? <span className="required-star">*</span>
              </label>

            </div>
          )}

          {error && <div className="error-msg">{error}</div>}

          <button
            type="submit"
            className={`btn ${!isFormValid() ? "btn-disabled" : ""}`}
            disabled={!isFormValid() || loading}
          >
            {loading ? "Creating..." : "CREATE ACCOUNT"}
          </button>
        </form>

        <p className="login-link">
          <Link to="/login">Already have an account?</Link>
        </p>
      </div>
    </div>
  );
}
