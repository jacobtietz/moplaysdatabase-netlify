// src/pages/Contact.js
import React, { useState, useEffect } from "react";
import "../css/Contact.css";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    mobileNo: "",
    emailAddress: "",
    message: "",
  });
  const [submissionStatus, setSubmissionStatus] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");

  // Use environment variable or fallback
  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:5000";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrorMsg("");
    setSubmissionStatus(null);
  };

  const isEmailValid = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

  const isFormValid = () =>
    formData.firstName.trim() !== "" &&
    formData.lastName.trim() !== "" &&
    isEmailValid(formData.emailAddress) &&
    formData.message.trim() !== "";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmissionStatus(null);
    setErrorMsg("");

    if (!isFormValid()) {
      setErrorMsg("Please fill all required fields correctly.");
      setSubmissionStatus("error");
      return;
    }

    try {
      const response = await fetch(`${BACKEND_URL}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.message || "Failed to send message.");

      setSubmissionStatus("success");
      setFormData({
        firstName: "",
        lastName: "",
        mobileNo: "",
        emailAddress: "",
        message: "",
      });
    } catch (err) {
      console.error(err);
      setSubmissionStatus("error");
      setErrorMsg(err.message || "Server error. Please try again later.");
    }
  };

  useEffect(() => {
    document.title = "Contact – MPDB";
  }, []);

  return (
    <div className="contact-page-container">
      <div className="contact-card">
        <header className="contact-header">
          <h1>Contact Us</h1>
          <p className="subtitle">We’d love to hear from you. Send us a message!</p>
        </header>

        <form onSubmit={handleSubmit}>
          <div className="form-grid two-cols">
            <div className="form-group">
              <label htmlFor="firstName">First Name</label>
              <input
                id="firstName"
                name="firstName"
                type="text"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="lastName">Last Name</label>
              <input
                id="lastName"
                name="lastName"
                type="text"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-grid two-cols">
            <div className="form-group">
              <label htmlFor="emailAddress">Email Address</label>
              <input
                id="emailAddress"
                name="emailAddress"
                type="email"
                value={formData.emailAddress}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="mobileNo">Mobile Number (optional)</label>
              <input
                id="mobileNo"
                name="mobileNo"
                type="tel"
                value={formData.mobileNo}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" disabled={!isFormValid()}>
            Send Message
          </button>

          {submissionStatus === "success" && (
            <div className="status-message success">
              Thank you! Your message has been sent successfully.
            </div>
          )}
          {submissionStatus === "error" && (
            <div className="status-message error">{errorMsg}</div>
          )}
        </form>
      </div>
    </div>
  );
};

export default ContactUs;
