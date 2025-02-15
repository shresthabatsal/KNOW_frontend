import React, { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Layout from "/src/components/AuthorLayout/AuthorLayout";
import "./AuthorHome.css";

const AuthorHome = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/author"); // Redirect to login if no token is found
    }
  }, [navigate]);

  return (
    <Layout>
      <div className="container">
        <div className="welcome-section">
          <h2>Welcome, Author!</h2>
          <p>Get started by creating content, managing your articles, and analyzing your progress.</p>
        </div>

        <div className="nav-buttons">
          <Link to="/create" className="nav-btn">✍️ Create Article</Link>
          <Link to="/articles" className="nav-btn">📄 Your Articles</Link>
          <Link to="/analytics" className="nav-btn">📊 View Analytics</Link>
          <Link to="/settings" className="nav-btn">⚙️ Settings</Link>
        </div>
      </div>
    </Layout>
  );
};

export default AuthorHome;