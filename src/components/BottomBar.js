import React from "react";
import { Link } from "react-router-dom";
import "../App.css"; // adjust if your CSS path differs

export default function BottomBar() {
  return (
    <footer className="bottom-bar-wrapper">
      <div className="bottom-bar-bg"></div>
      <div className="bottom-bar">
        <div className="bottom-bar-content">
          {/* Left */}
          <div className="bottom-bar-left">
            <a href="/dmca" className="footer-link">DMCA</a>
            <a href="/terms" className="footer-link">Terms</a>
          </div>

          {/* Center */}
          <div className="bottom-bar-center">
            <Link to="/plays">
              <img src="/favicon.png" alt="Favicon" className="bottom-bar-favicon" />
            </Link>
            <div className="bottom-bar-center-text">
              <span>© 2025 MPDB</span>
              <a href="/contact" className="contact-link">Contact Us</a>
            </div>
          </div>

          {/* Right */}
          <div className="bottom-bar-right">
            <a href="/privacy" className="footer-link">Privacy</a>
            <a href="/cookies" className="footer-link">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
