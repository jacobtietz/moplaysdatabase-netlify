import React, { useEffect } from 'react';
import '../css/DMCA.css'; // <-- Import the dedicated CSS file

const DMCA = () => {
  useEffect(() => {
    // Setting the document title using a React hook
    document.title = "DMCA – MPDB";
  }, []);

  // Dynamic Date for 'Last Updated'
  const currentDate = new Date();
  const options = { month: 'long', year: 'numeric' };
  const lastUpdated = currentDate.toLocaleDateString('en-US', options).toUpperCase();

  return (
    <div className="dmca-page-container">
      <div className="dmca-card">
        
        {/* Header */}
        <header className="dmca-header">
            <h1>DMCA & Copyright Policy</h1>
            <p className="subtitle">
                Missouri Playwrights Educational Database
            </p>
        </header>
        
        {/* Copyright Statement */}
        <div className="section-highlight-gray">
            <h2>
                Copyright Statement
            </h2>
            <p>
                The content, organization, gathering, compilation, magnetic translation, digital conversion, and other matters related to the <strong className="bold-text">Missouri Playwrights Educational Database</strong> are protected under applicable copyrights, trademarks, and other proprietary (including but not limited to intellectual property) rights. The copying, redistribution, use, or publication by you of any such matters or any part of the site is strictly prohibited.
            </p>
        </div>

        {/* DMCA Policy Section */}
        <section className="policy-section">
            <h2 className="policy-title">
                DMCA Compliance & Takedown Procedure
            </h2>

            <p className="policy-paragraph">
                The <strong className="bold-text">Missouri Playwrights Educational Database</strong> respects the intellectual property rights of others and is committed to complying with U.S. copyright law, including the Digital Millennium Copyright Act (<strong className="bold-text">DMCA</strong>). We will respond promptly to clear notices of alleged copyright infringement that comply with the DMCA.
            </p>

            <h3 className="section-subtitle">
                How to File a Takedown Notice with Us (For Copyright Holders)
            </h3>
            <p className="policy-paragraph">
                If you believe that your work has been copied in a way that constitutes copyright infringement and is accessible on this site, please notify our Designated Copyright Agent, providing the information set forth below.
            </p>

            {/* Required DMCA Notice Elements */}
            <div className="section-highlight-blue">
                <p className="highlight-title">
                    Your Takedown Notice MUST include the following elements:
                </p>
                <ol className="dmca-list">
                    <li>A physical or electronic signature of a person authorized to act on behalf of the owner of an exclusive right that is allegedly infringed.</li>
                    <li>Identification of the copyrighted work claimed to have been infringed, or, if multiple copyrighted works are covered by a single notification, a representative list of such works.</li>
                    <li>Identification of the material that is claimed to be infringing or to be the subject of infringing activity and that is to be removed or access to which is to be disabled, and information reasonably sufficient to permit us to locate the material (e.g., the URL on our website).</li>
                    <li>Information reasonably sufficient to permit us to contact the complaining party, such as an address, telephone number, and, if available, an electronic mail address.</li>
                    <li>A statement that the complaining party has a good faith belief that use of the material in the manner complained of is not authorized by the copyright owner, its agent, or the law.</li>
                    <li>A statement that the information in the notification is accurate, and under penalty of perjury, that the complaining party is authorized to act on behalf of the owner of an exclusive right that is allegedly infringed.</li>
                </ol>
            </div>
        </section>
        
        {/* Designated Agent Section - FILL IN YOUR CONTACT DETAILS */}
        <section className="agent-section section-highlight-green">
            <h2 className="agent-title">
                Copyright Contact Information
            </h2>
            <p className="agent-intro">
                Please direct all official DMCA Takedown Notices to this individual:
            </p>
            <ul className="agent-details-list">
                <li className="agent-detail-item">
                    <span className="agent-label">Name:</span> 
                    <span className="agent-value">Katie Mizell</span>
                </li>
                <li className="agent-detail-item">
                    <span className="agent-label">Email:</span> 
                    <span className="agent-value email-link">
                        <a href="mailto:moplaysdatabase@gmail.com">moplaysdatabase@gmail.com</a>
                    </span>
                </li>
            </ul>
        </section>
        
        {/* Counter-Notice Warning */}
        <footer className="dmca-footer">
            <h3 className="section-subtitle">
                Misrepresentations and Counter-Notice
            </h3>
            <p className="policy-paragraph small-print">
                Pursuant to Section 512(f) of the DMCA, any person who knowingly materially misrepresents that material or activity is infringing, or that material or activity was removed or disabled by mistake or misidentification, shall be liable for any damages, including costs and attorneys' fees, incurred by the alleged infringer, by any copyright owner or copyright owner's authorized licensee, or by a service provider, who is injured by such misrepresentation.
            </p>
            <p className="last-updated">
                Last Updated: {lastUpdated}
            </p>
        </footer>
      </div>
    </div>
  );
};

export default DMCA;
