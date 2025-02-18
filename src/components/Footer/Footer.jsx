import React from "react";
import "./Footer.css";
import logo from '/assets/know_logo.png';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
      <div className="footer-logo">
          <img src={logo} alt="Logo" className="logo" />
        </div>
        <div className="footer-text">&copy; {new Date().getFullYear()} KNOW. All rights reserved.</div>
        <div className="footer-links">
          <a href="/terms">Terms of Use</a>
          <a href="/about">About</a>
          <a href="/privacy">Privacy Policy</a>
          <a href="/contact">Contact</a>
          <a href="/help">Help</a>
          <a href="/signin">Sign In</a>
          <a href="/register">Register</a>
          <a href="/author">Author</a>
          <a href="/admin">Admin</a>
        </div>

      </div>
    </footer>
  );
};

export default Footer;