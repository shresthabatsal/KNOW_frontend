import React from "react";
import "./Signin.css";

const SignIn = () => {
  return (
    <div className="signin-container">
      <a href="/" className="logoo">
          <img src="./src/assets/know_logo.png" alt="Logo" />
        </a>

      {/* Left Half with Image */}
      <div className="left-half">
        <img src="./src/assets/signin.jpg" alt="Background" className="bg-image" />
        {/* Logo in Top Left */}
      </div>

      {/* Right Half with Sign-In Form */}
      <div className="right-half">
        {/* Login Box */}
        <div className="login-box">
          <h2>Sign In</h2>
          <form>
            <div className="input-group">
              <label>Email</label>
              <input type="email" placeholder=" Enter your email" required />
            </div>
            <div className="input-group">
              <label>Password</label>
              <input type="password" placeholder=" Enter your password" required />
            </div>
            <button type="submit" className="login-btn">Login</button>
          </form>
          <p className="signup-text">
            Don't have an account? <a href="/signup">Create one.</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;