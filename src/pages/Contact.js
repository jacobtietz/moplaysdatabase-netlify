import React, { useState, useEffect } from 'react';
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

    // Validation state
    const [isValid, setIsValid] = useState(false);

    // Handlers
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // Validate all fields
    useEffect(() => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isFormValid =
            formData.firstName.trim() !== '' &&
            formData.lastName.trim() !== '' &&
            formData.mobileNo.trim() !== '' &&
            emailRegex.test(formData.emailAddress) &&
            formData.message.trim() !== '';
        setIsValid(isFormValid);
    }, [formData]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!isValid) {
            setSubmissionStatus('error');
            return;
        }

        setSubmissionStatus(null);

        // Simulate API call
        setTimeout(() => {
            console.log("Form Submitted:", formData);
            setSubmissionStatus('success');
            setFormData({ firstName: '', lastName: '', mobileNo: '', emailAddress: '', message: '' });
        }, 1500);
    };

    useEffect(() => {
        document.title = "Contact – MPDB";
    }, []);

    return (
        <div className="contact-page-container">
            <div className="contact-card">
                
                {/* Header */}
                <header className="contact-header">
                    <h1>Contact Us</h1>
                    <p className="subtitle">
                    </p>
                </header>
                
                {/* Contact Form */}
                <form onSubmit={handleSubmit}>
                    
                    <div className="form-grid two-cols">
                        <div className="form-group">
                            <label htmlFor="firstName" className="form-label">First Name</label>
                            <input 
                                id="firstName"
                                type="text"
                                name="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                                className="form-input"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="lastName" className="form-label">Last Name</label>
                            <input 
                                id="lastName"
                                type="text"
                                name="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                                className="form-input"
                                required
                            />
                        </div>
                    </div>

                    <div className="form-grid two-cols">
                        <div className="form-group">
                            <label htmlFor="emailAddress" className="form-label">Email Address</label>
                            <input 
                                id="emailAddress"
                                type="email"
                                name="emailAddress"
                                value={formData.emailAddress}
                                onChange={handleChange}
                                className="form-input"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="mobileNo" className="form-label">Mobile Number</label>
                            <input 
                                id="mobileNo"
                                type="tel"
                                name="mobileNo"
                                value={formData.mobileNo}
                                onChange={handleChange}
                                className="form-input"
                                required
                            />
                        </div>
                    </div>

                    <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                        <label htmlFor="message" className="form-label">Message</label>
                        <textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            className="form-textarea"
                            required
                        />
                    </div>

                    <button 
                        type="submit" 
                        className="submit-button"
                        disabled={!isValid}
                    >
                        {submissionStatus === null && !isValid ? 'Send Message' : 'Send Message'}
                    </button>

                    {submissionStatus === 'success' && (
                        <div className="status-message success">
                            Thank you! Your message has been sent successfully. We will be in touch soon.
                        </div>
                    )}
                    {submissionStatus === 'error' && (
                        <div className="status-message error">
                            Please ensure all fields are filled out correctly with a valid email.
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
};

export default ContactUs;
