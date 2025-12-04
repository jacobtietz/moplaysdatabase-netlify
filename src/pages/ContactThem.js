// src/pages/ContactThem.js
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../css/Contact.css";
import axios from "axios";

const ContactThem = () => {
  const { id } = useParams(); // ID of the user you're contacting

  const [targetUser, setTargetUser] = useState(null);
  const [currentUser, setCurrentUser] = useState(null); // logged-in user
  const [message, setMessage] = useState("");
  const [submissionStatus, setSubmissionStatus] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");

  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

  // Fetch target user
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/users/${id}`, { withCredentials: true });
        setTargetUser(res.data.user || null);
      } catch (err) {
        console.error("Failed to load target user:", err);
        setTargetUser(null);
      }
    };
    fetchUser();
  }, [id, API_URL]);

  // Fetch logged-in user
  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/users/profile`, { withCredentials: true });
        setCurrentUser(res.data.user || null);
      } catch (err) {
        console.error("Failed to load current user:", err);
        setCurrentUser(null);
      }
    };
    fetchCurrentUser();
  }, [API_URL]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmissionStatus(null);
    setErrorMsg("");

    if (!message.trim()) {
      setErrorMsg("Please enter a message.");
      setSubmissionStatus("error");
      return;
    }

    if (!currentUser) {
      setErrorMsg("You must be logged in to send a message.");
      setSubmissionStatus("error");
      return;
    }

    try {
      // Only send the message; backend will use req.user info
      await axios.post(
        `${API_URL}/api/contact/user/${id}`,
        { message },
        { withCredentials: true }
      );

      setSubmissionStatus("success");
      setMessage("");
    } catch (err) {
      console.error(err);
      setSubmissionStatus("error");
      setErrorMsg(err.response?.data?.message || "Server error. Please try again later.");
    }
  };

  useEffect(() => {
    document.title = "Contact User – MPDB";
  }, []);

  if (!targetUser) return <p>Loading user...</p>;
  if (!currentUser) return <p>Loading your info...</p>;

  return (
    <div className="contact-page-container">
      <div className="contact-card">
        <header className="contact-header">
          <h1>Contact {targetUser.firstName} {targetUser.lastName}</h1>
          <p className="subtitle">
            Your name, email, and phone number will be sent automatically.
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
              Message delivered!
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
