import "./footer.css";
import { Link } from "react-router-dom";
import { GrFacebookOption, GrTwitter, GrInstagram, GrLinkedin } from "react-icons/gr";
import React from "react";

export function Footer() {
  return (
    <footer className="footer-container">
      <div className="footer-top">
        <div className="footer-brand">
          <div className="footer-logo">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="logo-icon">
              <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
            </svg>
            <span className="logo-text">FURNITURE HOME</span>
          </div>
          <p className="brand-description">
            We provide the best furniture for your home. Made with love and passion to create the best living space.
          </p>
        </div>

        <div className="footer-links-group">
          <ul className="footer-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/ProductPage">Shop</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li><Link to="/distributors">Distributors</Link></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="social-icons">
          <a href="/"><GrFacebookOption /></a>
          <a href="/"><GrTwitter /></a>
          <a href="/"><GrInstagram /></a>
          <a href="/"><GrLinkedin /></a>
        </div>
        <div className="copyright">
          © {new Date().getFullYear()} Furniture Home. All rights reserved.
        </div>
        <div className="legal-links">
          <Link to="/">Privacy Policy</Link>
          <Link to="/">Terms of Service</Link>
        </div>
      </div>
    </footer>
  );
}