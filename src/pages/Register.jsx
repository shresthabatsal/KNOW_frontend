import React from "react";
import "./Register.css";

const Register = () => {
  return (
    <div className="register-container">
      {/* Logo in Top Left */}
      <a href="/" className="logooo">
          <img src="./src/assets/know_logo.png" alt="Logo" />
        </a>
      {/* Left Half with Image */}
      <div className="left-half">
        <img src="./src/assets/login.jpg" alt="Background" className="bg_image" />
      </div>

      {/* Right Half with Registration Form */}
      <div className="right-half">

        {/* Registration Box */}
        <div className="register-box">
          <h2>Create an Account</h2>
          <form>
            <div className="input-group">
              <label>Name</label>
              <input type="text" placeholder=" Enter your name" required />
            </div>
            <div className="input-group">
              <label>Email</label>
              <input type="email" placeholder=" Enter your email" required />
            </div>
            <div className="input-group">
              <label>Password</label>
              <input type="password" placeholder=" Enter your password" required />
            </div>
            <div className="input-group">
              <label>Confirm Password</label>
              <input type="password" placeholder=" Confirm your password" required />
            </div>
            <button type="submit" className="register-button">Sign Up</button>
          </form>
          <p className="signin-text">
            Already have an account? <a href="/signin">Sign in.</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;