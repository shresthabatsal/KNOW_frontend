import React from "react";
import "./AuthorLogin.css";

const AuthorLogin = () => {
  return (
    <div className="author-login-container">
        {/* Logo in Top Left */}
        <a href="/" className="know-logo">
            <img src="./src/assets/know_logo.png" alt="Logo" />
        </a>
        
      {/* Left Half with Image */}
      <div className="left-half">
        <img src="./src/assets/authorlogin.jpg" alt="Background" className="background" />
      </div>

      {/* Right Half with Login Form */}
      <div className="right-half">

        {/* Login Box */}
        <div className="login-box">
          <h2>Author</h2>
          <form>
            <div className="input-group">x
              <label>Email</label>
              <input type="email" placeholder=" Enter your email" required />
            </div>
            <div className="input-group">
              <label>Password</label>
              <input type="password" placeholder=" Enter your password" required />
            </div>
            <button type="submit" className="login-btn">Login</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AuthorLogin;
