import React, { useEffect } from 'react';
import '../css/Terms.css';

const TermsOfService = () => {
  useEffect(() => {
    document.title = "Terms – MPDB";
  }, []);

  const currentDate = new Date();
  const options = { month: 'long', year: 'numeric' };
  const lastUpdated = currentDate.toLocaleDateString('en-US', options).toUpperCase();

  return (
    <div className="tos-page-container">
      <div className="tos-card">
        
        {/* Header */}
        <header className="tos-header">
            <h1>Terms of Service</h1>
            <p className="subtitle">
                Missouri Playwrights Educational Database
            </p>
        </header>
        
        {/* Introduction */}
        <div className="policy-section">
            <p className="policy-paragraph">
                Welcome to the <strong>Missouri Playwrights Educational Database</strong> ("MPDB," "we," "us," or "our"). These Terms of Service ("Terms") govern your access to and use of the MPDB website and services.
            </p>
            <p className="policy-paragraph">
                Please read these Terms carefully before accessing or using the database. By accessing or using any part of the website, you agree to become bound by the terms and conditions of this agreement. If you do not agree to all the terms and conditions, then you may not access the website or use any services.
            </p>
        </div>

        {/* Key Sections */}
        <section className="policy-section">
            <h2 className="policy-title">1. Acceptance of Terms</h2>
            <p className="policy-paragraph">
                The Services are offered subject to your acceptance without modification of all of the terms and conditions contained herein and all other operating rules, policies (including, without limitation, our <a href="/privacy" className="bold-text">Privacy Policy</a> and <a href="/dmca" className="bold-text">DMCA Policy</a>) and procedures that may be published from time to time by MPDB (collectively, the "Agreement").
            </p>
        </section>

        <section className="policy-section">
            <h2 className="policy-title">2. Use of the MPDB and User Account</h2>
            
            <h3 className="section-subtitle">Eligibility</h3>
            <p className="policy-paragraph">
                The Services are intended for users who are 18 years of age or older. By using the Services, you represent and warrant that you are of legal age to form a binding contract with MPDB.
            </p>

            <h3 className="section-subtitle">Account Responsibility</h3>
            <p className="policy-paragraph">
                If you create an account, you are responsible for maintaining the security of your account, and you are fully responsible for all activities that occur under the account and any other actions taken in connection with the account.
            </p>
        </section>
        
        <section className="policy-section">
            <h2 className="policy-title">3. Prohibited Conduct and Intellectual Property</h2>
            
            <h3 className="section-subtitle">Intellectual Property</h3>
            <p className="policy-paragraph">
                All content provided on the MPDB (excluding user-submitted abstracts) is the property of MPDB or its licensors and protected by copyright and intellectual property laws. You may not copy, reproduce, republish, download, post, broadcast, transmit, or otherwise use the content except for your personal, non-commercial use.
            </p>

            <h3 className="section-subtitle">Acceptable Use Policy</h3>
            <p className="policy-paragraph">
                You agree not to use the Services in a way that is unlawful, harmful, or violates the rights of others. Prohibited activities include:
            </p>
            <ul className="abuse-list">
                <li>Attempting to gain unauthorized access to the Services or related systems or networks.</li>
                <li>Engaging in automated or excessive scraping, data mining, or data harvesting.</li>
                <li>Uploading content that is illegal, defamatory, obscene, or infringes on any third party's rights.</li>
                <li>Introducing viruses, worms, or other malicious code.</li>
            </ul>
        </section>

        <section className="policy-section">
            <h2 className="policy-title">4. User-Submitted Content</h2>
            <p className="policy-paragraph">
                You retain all ownership rights to the abstracts, comments, and other content ("User Content") you submit to the MPDB. By submitting User Content, you grant MPDB a perpetual, worldwide, non-exclusive, royalty-free, transferable license to use, display, reproduce, distribute, and prepare derivative works in connection with the Services and MPDB's business.
            </p>
            <p className="policy-paragraph">
                You represent and warrant that you have the necessary rights to grant the above license and that your User Content does not violate any third-party rights.
            </p>
        </section>

        <section className="policy-section section-highlight-warning">
            <h2 className="policy-title">5. Disclaimers and Limitation of Liability</h2>
            <h3 className="warning-title">Disclaimer of Warranties</h3>
            <p className="policy-paragraph">
                The Services are provided "AS IS." MPDB and its suppliers and licensors disclaim all warranties of any kind, express or implied.
            </p>
            
            <h3 className="warning-title">Limitation of Liability</h3>
            <p className="policy-paragraph">
                MPDB, or its suppliers or licensors, will not be liable for any special, incidental, or consequential damages or interruption of use or loss of data.
            </p>
        </section>

        <section className="policy-section">
            <h2 className="policy-title">6. Termination and Governing Law</h2>
            
            <h3 className="section-subtitle">Termination</h3>
            <p className="policy-paragraph">
                MPDB may terminate your access at any time. You may discontinue using the Services to terminate this Agreement.
            </p>

            <h3 className="section-subtitle">Governing Law and Jurisdiction</h3>
            <p className="policy-paragraph">
                These Terms shall be governed by the laws of the State of <strong className="bold-text">Missouri</strong>, without regard to its conflict of law provisions. Disputes will be subject to the exclusive jurisdiction of courts located in <strong className="bold-text">Greene County</strong>.
            </p>
        </section>

        {/* Footer */}
        <footer className="tos-footer">
            <h3 className="section-subtitle">7. Contact Information</h3>
            <p className="policy-paragraph">
                If you have any questions about these Terms of Service, please contact us at:
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

export default TermsOfService;
