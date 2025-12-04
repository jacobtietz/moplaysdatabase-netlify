// src/pages/ContactThem.js
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../css/Contact.css";

const ContactThem = () => {
  const { id } = useParams(); // ID of the user you're contacting

  const [targetUser, setTargetUser] = useState(null);
  const [message, setMessage] = useState("");
  const [submissionStatus, setSubmissionStatus] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");

  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:5000";

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`${BACKEND_URL}/api/users/${id}`);
        const data = await res.json();
        setTargetUser(data.user || null);
      } catch (err) {
        console.error("Failed to load user:", err);
        setTargetUser(null);
      }
    };

    fetchUser();
  }, [id, BACKEND_URL]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmissionStatus(null);
    setErrorMsg("");

    if (!message.trim()) {
      setErrorMsg("Please enter a message.");
      setSubmissionStatus("error");
      return;
    }

    try {
      const response = await fetch(`${BACKEND_URL}/api/contact/user/${id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });

      const text = await response.text();
      let data;
      try {
        data = JSON.parse(text);
      } catch {
        data = { message: text };
      }

      if (!response.ok) throw new Error(data.message || "Failed to send message");

      setSubmissionStatus("success");
      setMessage("");
    } catch (err) {
      console.error(err);
      setSubmissionStatus("error");
      setErrorMsg(err.message || "Server error. Please try again later.");
    }
  };

  useEffect(() => {
    document.title = "Contact User – MPDB";
  }, []);

  if (!targetUser) return <p>Loading user...</p>;

  return (
    <div className="contact-page-container">
      <div className="contact-card">
        <header className="contact-header">
          <h1>Contact {targetUser.firstName} {targetUser.lastName}</h1>
          <p className="subtitle">
            Send an anonymous message directly to this user.
          </p>
        </header>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="message">Your Message</label>
            <textarea
              id="message"
              name="message"
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
                setSubmissionStatus(null);
                setErrorMsg("");
              }}
              required
            />
          </div>

          <button type="submit" disabled={!message.trim()}>
            Send Message
          </button>

          {submissionStatus === "success" && (
            <div className="status-message success">
              Message delivered anonymously!
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

export default ContactThem;
