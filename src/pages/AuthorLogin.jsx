import React, { useState, useEffect } from 'react'; // Add useEffect
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import { jwtDecode } from 'jwt-decode';
import './AuthorLogin.css';

const AuthorLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { user, login } = useAuth(); // Add user from useAuth

  // Redirect to /home if the user is already logged in
  useEffect(() => {
    if (user) {
      navigate('/home');
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await api.post('/authors/login', {
        email,
        password,
      });

      if (response.data.token) {
        const decodedToken = jwtDecode(response.data.token); // Decode the token
        const { authorId, role } = decodedToken; // Extract authorId and role
        login(response.data.token, role, authorId); // Pass token, role, and authorId to login
        navigate('/home'); // Redirect to author home
      }
    } catch (err) {
      setError('Invalid email or password');
      console.error(err);
    }
  };

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
        </div>
      </div>
    </div>
  );
};

export default AuthorLogin;