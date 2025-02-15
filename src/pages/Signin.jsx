import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import './Signin.css';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await api.post('/users/login', {
        email,
        password,
      });

      if (response.data.token) {
        login(response.data.token, 'user'); // Log in as user
        navigate('/'); // Redirect to user home
      }
    } catch (err) {
      setError('Invalid email or password');
      console.error(err);
    }
  };

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
          {error && <p className="error">{error}</p>}
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label>Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="input-group">
              <label>Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="login-btn">
              Login
            </button>
          </form>
          <p className="signup-text">
            Don't have an account? <a href="/register">Create one.</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;