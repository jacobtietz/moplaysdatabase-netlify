import React, { useEffect } from 'react';
import '../css/Privacy.css';

const PrivacyPolicy = () => {
  useEffect(() => {
    document.title = "Privacy – MPDB";
  }, []);

  const currentDate = new Date();
  const options = { month: 'long', year: 'numeric' };
  const lastUpdated = currentDate.toLocaleDateString('en-US', options).toUpperCase();

  return (
    <div className="privacy-page-container">
      <div className="privacy-card">

        {/* Header */}
        <header className="privacy-header">
          <h1>Privacy Policy</h1>
          <p className="subtitle">
            Missouri Playwright Educational Database
          </p>
        </header>

        {/* Introduction */}
        <div className="policy-section">
          <p className="policy-paragraph">
            This Privacy Policy describes how the <strong>Missouri Playwright Educational Database</strong> ("MPDB," "we," "us," or "our") collects, uses, and discloses information when you use our website and services. By accessing or using the MPDB, you agree to the terms of this policy.
          </p>
          <p className="policy-paragraph">
            We are committed to protecting your privacy and handling your data in an open and transparent manner.
          </p>
        </div>

        {/* Information We Collect */}
        <section className="policy-section">
          <h2 className="policy-title">1. Information We Collect</h2>
          <p className="policy-paragraph">
            We collect information to provide and improve our services to you. The types of data we collect fall into two primary categories:
          </p>

          <h3 className="section-subtitle">Information You Directly Provide to Us</h3>
          <p className="policy-paragraph">
            This includes personal data you submit when creating an account, contributing abstracts, or contacting us:
          </p>
          <ul className="data-list">
            <li><strong>Contact Data:</strong> Your name, email address, and any other contact details provided during registration or communication.</li>
            <li><strong>Contribution Data:</strong> Any content you submit to the database, such as play abstracts, metadata, or profile information.</li>
            <li><strong>Communication Data:</strong> Information contained in any communication you send to us, such as support requests or feedback.</li>
          </ul>

          <h3 className="section-subtitle">Information Collected Automatically</h3>
          <p className="policy-paragraph">
            When you visit the MPDB, we automatically collect certain data about your device and browsing activity:
          </p>
          <ul className="data-list">
            <li><strong>Usage Data:</strong> Information about how you use the website, including pages viewed, time spent on pages, links clicked, and search queries.</li>
            <li><strong>Technical Data:</strong> Your IP address, browser type, operating system, and unique device identifiers.</li>
            <li><strong>Tracking Data:</strong> Data collected through cookies and similar tracking technologies (see our separate Cookie Policy for more details).</li>
          </ul>
        </section>

        {/* How We Use Your Information */}
        <section className="policy-section">
          <h2 className="policy-title">2. How We Use Your Information</h2>
          <p className="policy-paragraph">We use the information we collect for the following purposes:</p>
          <ul className="data-list">
            <li><strong>To Provide and Maintain the Database:</strong> To operate, maintain, and improve the functionality of the MPDB and its abstract search features.</li>
            <li><strong>To Personalize Your Experience:</strong> To remember your preferences and customize the content you see.</li>
            <li><strong>For Communication:</strong> To respond to your inquiries, send you technical notices, updates, and support messages.</li>
            <li><strong>For Security:</strong> To identify and prevent fraudulent transactions and secure the integrity of the database.</li>
            <li><strong>For Analytics:</strong> To monitor and analyze trends, usage, and activities in connection with our services to improve the user experience.</li>
          </ul>
        </section>

        {/* Data Sharing and Disclosure */}
        <section className="policy-section">
          <h2 className="policy-title">3. Sharing and Disclosure of Your Information</h2>
          <p className="policy-paragraph">
            We do not sell your personal data. We may share your information in the following circumstances:
          </p>
          <ul className="data-list">
            <li><strong>With Your Consent:</strong> We may share information with third parties when you give us explicit consent to do so.</li>
            <li><strong>Service Providers:</strong> We may share data with third-party vendors, consultants, and service providers who perform services for us (e.g., hosting, data analysis). These parties are obligated to protect your data.</li>
            <li><strong>Legal Requirements:</strong> We may disclose your information if required to do so by law or in response to valid requests by public authorities (e.g., a court order or government agency).</li>
            <li><strong>Publicly Available Content:</strong> Any content you voluntarily submit to the MPDB (like abstract summaries or author names) may become publicly visible to other users.</li>
          </ul>
        </section>

        {/* Data Security and Retention */}
        <section className="policy-section">
          <h2 className="policy-title">4. Data Security and Retention</h2>
          <p className="policy-paragraph">
            We employ technical and organizational measures designed to protect your information from unauthorized access, use, or disclosure. However, no security measures are 100% infallible.
          </p>
          <p className="policy-paragraph">
            We retain your personal data only for as long as necessary to fulfill the purposes for which we collected it, including for the purposes of satisfying any legal, accounting, or reporting requirements.
          </p>
        </section>

        {/* Your Rights */}
        <section className="policy-section section-highlight-light">
          <h2 className="policy-title">5. Your Data Protection Rights</h2>
          <p className="highlight-title">
            Depending on your location, you may have the following rights regarding your personal data:
          </p>
          <ul className="rights-list">
            <li><strong>The Right to Access:</strong> You have the right to request copies of your personal data.</li>
            <li><strong>The Right to Rectification:</strong> You have the right to request that we correct any information you believe is inaccurate or incomplete.</li>
            <li><strong>The Right to Erasure:</strong> You have the right to request that we erase your personal data, under certain conditions.</li>
            <li><strong>The Right to Restrict Processing:</strong> You have the right to request that we restrict the processing of your personal data, under certain conditions.</li>
            <li><strong>The Right to Object to Processing:</strong> You have the right to object to our processing of your personal data, under certain conditions.</li>
          </ul>
          <p className="policy-paragraph">
            To exercise any of these rights, please contact us using the details provided below.
          </p>
        </section>

        {/* Changes to the Policy */}
        <section className="policy-section">
          <h2 className="policy-title">6. Changes to this Privacy Policy</h2>
          <p className="policy-paragraph">
            We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page and updating the "Last Updated" date. You are advised to review this Privacy Policy periodically for any changes.
          </p>
        </section>

        {/* Contact Information */}
        <footer className="privacy-footer">
          <h3 className="section-subtitle">Contact Us</h3>
          <p className="policy-paragraph">
            If you have any questions or concerns about this Privacy Policy or our data practices, please contact us at:
          </p>
          <p className="policy-paragraph">
            <a href="mailto:moplaysdatabase@gmail.com">moplaysdatabase@gmail.com</a>
          </p>
          <p className="last-updated">Last Updated: {lastUpdated}</p>
        </footer>

      </div>
    </div>
  );
};

export default PrivacyPolicy;
