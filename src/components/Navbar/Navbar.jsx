import React, { useState, useEffect } from "react";
import "./Navbar.css";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import logo from '/know_logo.png';

const Navbar = () => {
  const { user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const categories = [
    "home", "world", "politics", "business", "sports",
    "health", "environment", "travel", "entertainment", "science"
  ];

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const toggleProfileMenu = () => setIsProfileMenuOpen((prev) => !prev);

  const today = new Date();
  const formattedDate = today.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
  const dayOfWeek = today.toLocaleDateString('en-GB', { weekday: 'long' });

  const handleSignOut = () => {
    logout();
    navigate("/signin"); // Redirect to sign-in page
  };

  return (
    <nav className="navbar">
      {/* First Row */}
      <div className="navbar-row first-row">
        <div className="left-section">
          <button className="menu-btn" onClick={toggleMenu}>
            <img
              src={isMenuOpen ? "./src/assets/close.png" : "./src/assets/menu.png"}
              alt={isMenuOpen ? "Close" : "Menu"}
            />
          </button>
          <button className="search-btn" onClick={() => navigate("/search")}>
            <img src="./src/assets/search.png" alt="Search" />
          </button>
        </div>
        <div className="logo">
          <img src={logo} alt="Logo" />
        </div>
        <div className="right-section">
          {/* Show profile button only if logged in as "user" */}
          {user && user.role === "user" ? (
            <div className="profile-menu">
              <button className="profile-btn" onClick={toggleProfileMenu}>
                <img src="./src/assets/profile.png" alt="Profile" />
              </button>
              {isProfileMenuOpen && (
                <div className="profile-dropdown">
                  <button onClick={() => navigate("/saved")}>Saved</button>
                  <button onClick={() => navigate("/settings")}>Settings</button>
                  <button onClick={handleSignOut}>Sign Out</button>
                </div>
              )}
            </div>
          ) : (
            // Show Sign In and Register buttons only if no user is logged in
            !user && (
              <>
                <button className="signin-btn" onClick={() => navigate("/signin")}>
                  Sign In
                </button>
                <button className="register-btn" onClick={() => navigate("/register")}>
                  Register
                </button>
              </>
            )
          )}
        </div>
      </div>

      {/* Second Row */}
      <div className="navbar-row second-row">
        <div className="date-container">
          <div className="day-container">
            <p>{dayOfWeek}</p>
          </div>
          <div className="date-container">
            <p>{formattedDate}</p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="categories">
          {categories.map((category) => (
            <NavLink
              key={category}
              to={`/${category === "home" ? "" : category}`}
              className={({ isActive }) =>
                `category-tab ${isActive ? "active-tab" : ""}`
              }
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </NavLink>
          ))}
        </div>
      </div>

      {/* Side Menu */}
      {isMenuOpen && (
        <>
          <div className="overlay" onClick={toggleMenu}></div>
          <div className="side-menu">
            {categories.map((category) => (
              <NavLink
                key={category}
                to={`/${category === "home" ? "" : category}`}
                className={({ isActive }) =>
                  `menu-category-tab ${isActive ? "active-tab" : ""}`
                }
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </NavLink>
            ))}
          </div>
        </>
      )}
    </nav>
  );
};

export default Navbar;