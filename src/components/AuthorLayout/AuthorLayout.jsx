import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./AuthorLayout.css";
import Footer from "../Footer/Footer";

const Layout = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="layout">
      {/* Top Bar */}
      <div className="top-bar">
        <div className="menu-icon" onClick={() => setIsOpen(!isOpen)}>
          ☰
        </div>
        <img src="./src/assets/know_logo.png" alt="Logo" className="logo-img" />
      </div>

      {/* Side Menu */}
      <div className={`sidemenu ${isOpen ? "open" : ""}`}>
        <nav>
          <Link to="/home" className={location.pathname === "/home" ? "active" : ""}>Home</Link>
          <Link to="/create" className={location.pathname === "/create" ? "active" : ""}>Create</Link>
          <Link to="/articles" className={location.pathname === "/articles" ? "active" : ""}>Your Articles</Link>
          <Link to="/analytics" className={location.pathname === "/analytics" ? "active" : ""}>Analytics</Link>
          <Link to="/author-settings" className={location.pathname === "/author-settings" ? "active" : ""}>Settings</Link>
        </nav>
      </div>

      {/* Page Content */}
      <div className="content">{children}</div>

      <Footer/>
    </div>
  );
};

export default Layout;