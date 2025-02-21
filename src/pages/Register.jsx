import React, { useState } from "react";
import axios from 'axios';
import "./Register.css";
import api from '../services/api';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [message, setMessage] = useState(''); // State for success/error message
  const [isSuccess, setIsSuccess] = useState(false); // State to track success

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setMessage("Passwords do not match");
      setIsSuccess(false);
      return;
    }

    try {
      const response = await api.post('/users/register', {
        name: formData.name,
        email: formData.email,
        password: formData.password
      });

      // Handle successful registration
      setMessage('Registration successful!');
      setIsSuccess(true);

      // Clear the form
      setFormData({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
      });

      // Optionally, redirect the user after a delay
      setTimeout(() => {
        // history.push('/login'); // Uncomment if you want to redirect
      }, 2000); // Redirect after 2 seconds

    } catch (error) {
      console.error('Registration failed:', error.response ? error.response.data : error.message);
      setMessage('Registration failed. Please try again.');
      setIsSuccess(false);
    }
  };

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
          {message && (
            <div className={`message ${isSuccess ? 'success' : 'error'}`}>
              {message}
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label>Name</label>
              <input
                type="text"
                name="name"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-group">
              <label>Password</label>
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <div className="input-group">
              <label>Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
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