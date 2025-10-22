import React, { useEffect } from 'react';
import '../css/Cookies.css'; // <-- Importing the external CSS file as requested

const CookiePolicy = () => {
  useEffect(() => {
    // Setting the document title using a React hook
    document.title = "Cookies – MPDB";
  }, []);

  // Dynamic Date for 'Last Updated'
  const currentDate = new Date();
  const options = { month: 'long', year: 'numeric' };
  const lastUpdated = currentDate.toLocaleDateString('en-US', options).toUpperCase();

  return (
    <div className="cookie-page-container">
      <div className="cookie-card">
        
        {/* Header */}
        <header className="cookie-header">
            <h1>Cookies Policy</h1>
            <p className="subtitle">
                Missouri Playwrights Educational Database
            </p>
        </header>
        
        {/* Introduction */}
        <div className="policy-section">
            <h2 className="policy-title">
                What are Cookies?
            </h2>
            <p className="policy-paragraph">
                Cookies are small pieces of data stored on your device (computer, tablet, or mobile phone) when you visit a website. They are widely used to make websites work more efficiently, as well as to provide information to the owners of the site.
            </p>
            <p className="policy-paragraph">
                This policy applies to the <strong className="bold-text">Missouri Playwrights Educational Database</strong> and explains how we use cookies and how you can control them.
            </p>
        </div>

        {/* How We Use Cookies */}
        <section className="policy-section">
            <h2 className="policy-title">
                How We Use Cookies
            </h2>

            <p className="policy-paragraph">
                We use cookies for several reasons, including enhancing your user experience, recognizing you when you return, and analyzing traffic and usage patterns on our website.
            </p>

            <h3 className="section-subtitle">
                Categories of Cookies Used
            </h3>
            
            <div className="section-highlight-light">
              <ul className="cookie-list-description">
                  <li className="cookie-list-item">
                      <span className="cookie-name">1. Essential (Strictly Necessary) Cookies</span>
                      <span className="cookie-description">These cookies are mandatory for the website to perform its basic functions. They enable core services like user authentication, session management, and security features. The website cannot function properly without these cookies.</span>
                  </li>
                  <li className="cookie-list-item">
                      <span className="cookie-name">2. Analytical/Performance Cookies</span>
                      <span className="cookie-description">These cookies allow us to count visits and traffic sources so we can measure and improve the performance of our site. They help us know which pages are the most and least popular and see how visitors move around the site.</span>
                  </li>
                  <li className="cookie-list-item">
                      <span className="cookie-name">3. Functionality Cookies</span>
                      <span className="cookie-description">These are used to recognize you when you return to our website. This enables us to personalize our content for you and remember your preferences (for example, your user ID or display settings).</span>
                  </li>
              </ul>
            </div>
        </section>
        
        {/* Your Choices Section */}
        <section className="policy-section">
            <h2 className="policy-title">
                Managing Your Cookie Preferences
            </h2>
            <p className="policy-paragraph">
                You have the right to decide whether to accept or reject cookies. You can exercise your preferences by instructing your browser to refuse or accept cookies.
            </p>

            <h3 className="section-subtitle">
                Browser Controls
            </h3>
            <p className="policy-paragraph">
                Most web browsers allow you to control cookies through their settings. If you use your browser settings to block all cookies (including essential cookies), you may not be able to access all or parts of our site. The way to disable cookies may vary by browser, but is usually found in the 'Options' or 'Preferences' menu.
            </p>
            
            <p className="policy-paragraph">
                Please consult the help menu of your browser for more information.
            </p>
        </section>

        {/* Contact Information */}
        <footer className="cookie-footer">
            <h3 className="section-subtitle">
                Contact Us
            </h3>
            <p className="policy-paragraph">
                If you have any questions about our use of cookies or this policy, please contact us at: <a href="mailto:moplaysdatabase@gmail.com">moplaysdatabase@gmail.com</a>
            </p>
            <p className="last-updated">
                Last Updated: {lastUpdated}
            </p>
        </footer>
      </div>
    </div>
  );
};

export default CookiePolicy;
