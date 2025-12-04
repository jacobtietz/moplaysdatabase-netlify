// src/pages/Contact.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/Contact.css';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    mobileNo: '',
    emailAddress: '',
    message: ''
  });

  const [submissionStatus, setSubmissionStatus] = useState(null); // 'success' or 'error'
  const [isValid, setIsValid] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const valid =
      formData.firstName.trim() &&
      formData.lastName.trim() &&
      formData.mobileNo.trim() &&
      emailRegex.test(formData.emailAddress) &&
      formData.message.trim();
    setIsValid(valid);
  }, [formData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValid) {
      setSubmissionStatus('error');
      return;
    }

    try {
      await axios.post("/api/contact", formData);
      setSubmissionStatus("success");
      setFormData({ firstName: '', lastName: '', mobileNo: '', emailAddress: '', message: '' });
    } catch (err) {
      console.error(err);
      setSubmissionStatus("error");
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
        </header>

        <form onSubmit={handleSubmit}>
          <div className="form-grid two-cols">
            <div className="form-group">
              <label>First Name</label>
              <input name="firstName" value={formData.firstName} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Last Name</label>
              <input name="lastName" value={formData.lastName} onChange={handleChange} required />
            </div>
          </div>

          <div className="form-grid two-cols">
            <div className="form-group">
              <label>Email Address</label>
              <input type="email" name="emailAddress" value={formData.emailAddress} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Mobile Number</label>
              <input type="tel" name="mobileNo" value={formData.mobileNo} onChange={handleChange} />
            </div>
          </div>

          <div className="form-group">
            <label>Message</label>
            <textarea name="message" value={formData.message} onChange={handleChange} required />
          </div>

          <button type="submit" disabled={!isValid}>Send Message</button>

          {submissionStatus === 'success' && <div className="status-message success">Thank you! Your message has been sent successfully.</div>}
          {submissionStatus === 'error' && <div className="status-message error">Please fill out all fields correctly.</div>}
        </form>
      </div>
    </div>
  );
};

export default ContactUs;
