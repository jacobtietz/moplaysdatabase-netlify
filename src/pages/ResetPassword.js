// src/pages/ResetPassword.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../css/Pwr.css';

const ResetPassword = () => {
    const [email, setEmail] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submissionStatus, setSubmissionStatus] = useState(null);
    const [errorMsg, setErrorMsg] = useState('');

    useEffect(() => {
        document.title = "Password Reset – MPDB";
    }, []);

    const handleChange = (e) => {
        setEmail(e.target.value);
        setErrorMsg('');
        setSubmissionStatus(null);
    };

    const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!isValidEmail(email)) {
            setErrorMsg('Please enter a valid email address.');
            setSubmissionStatus('error');
            return;
        }

        setIsSubmitting(true);

        try {
            const response = await fetch('https://moplaysdatabase.onrender.com/api/auth/forgot-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });

            const data = await response.json();

            if (response.ok) {
                setSubmissionStatus('success');
                setEmail('');
            } else {
                setSubmissionStatus('error');
                setErrorMsg(data.message || data.msg || 'Something went wrong. Please try again.');
            }
        } catch (err) {
            console.error(err);
            setSubmissionStatus('error');
            setErrorMsg('Server error. Please try again later.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="auth-page-container">
            <div className="auth-card">
                <header className="auth-header">
                    <h1>Password Reset</h1>
                    <p className="subtitle">
                        Enter your email to receive a password reset link.
                    </p>
                </header>

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="emailAddress" className="form-label">Email Address</label>
                        <input
                            id="emailAddress"
                            type="email"
                            value={email}
                            onChange={handleChange}
                            className="form-input"
                            required
                            placeholder="name@example.com"
                        />
                    </div>

                    {errorMsg && <div className="status-message error">{errorMsg}</div>}

                    <button 
                        type="submit" 
                        className="submit-button" 
                        disabled={!isValidEmail(email) || isSubmitting}
                    >
                        {isSubmitting ? 'Sending Link...' : 'Send Reset Link'}
                    </button>

                    {submissionStatus === 'success' && (
                        <div className="status-message success">
                            Success! If an account exists for this email, a password reset link has been sent. Check your inbox.
                        </div>
                    )}
                </form>

                {/* Cancel button */}
                <div className="bottom-links">
                    <Link to="/login" className="bottom-link">Cancel</Link>
                </div>
            </div>
        </div>
    );
};

export default ResetPassword;
