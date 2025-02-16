import React, { useEffect, useState } from 'react';
import Layout from '/src/components/AuthorLayout/AuthorLayout';
import './AuthorSettings.css';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';

const AuthorSettings = () => {
  const { user, logout } = useAuth();
  const [authorDetails, setAuthorDetails] = useState({
    name: '',
    email: '',
  });
  const [passwordFields, setPasswordFields] = useState({
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchAuthorDetails = async () => {
      try {
        console.log('User:', user); // Debugging
        if (!user || !user.id) {
          console.error('Author ID is missing');
          return;
        }
        const response = await api.get(`/authors/${user.id}`);
        const { name, email } = response.data; // Only fetch name and email
        setAuthorDetails({ name, email });
      } catch (error) {
        console.error('Failed to fetch author details', error);
      }
    };

    if (user) {
      fetchAuthorDetails();
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAuthorDetails((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordFields((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Validate new password and confirm new password
    if (passwordFields.newPassword !== passwordFields.confirmNewPassword) {
      setError('New password and confirm new password do not match');
      return;
    }

    try {
      // Update profile (name and email)
      await api.put(`/authors/${user.id}`, {
        name: authorDetails.name,
        email: authorDetails.email,
      });

      // Update password (if current password is provided)
      if (passwordFields.currentPassword) {
        await api.put(`/authors/${user.id}/password`, {
          currentPassword: passwordFields.currentPassword,
          newPassword: passwordFields.newPassword,
        });
      }

      setSuccess('Profile updated successfully');
    } catch (error) {
      console.error('Failed to update profile', error);
      setError(error.response?.data?.error || 'Failed to update profile');
    }
  };

  return (
    <Layout>
      <div className="author-settings-container">
        {error && <p className="error">{error}</p>}
        {success && <p className="success">{success}</p>}
        <form onSubmit={handleSubmit}>
          <div>
          <h2>Settings</h2>
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={authorDetails.name}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={authorDetails.email}
              onChange={handleChange}
            />
          </div>
          <div>
            <label>Current Password:</label>
            <input
              type="password"
              name="currentPassword"
              value={passwordFields.currentPassword}
              onChange={handlePasswordChange}
              placeholder="Enter current password"
            />
          </div>
          <div>
            <label>New Password:</label>
            <input
              type="password"
              name="newPassword"
              value={passwordFields.newPassword}
              onChange={handlePasswordChange}
              placeholder="Enter new password"
            />
          </div>
          <div>
            <label>Confirm New Password:</label>
            <input
              type="password"
              name="confirmNewPassword"
              value={passwordFields.confirmNewPassword}
              onChange={handlePasswordChange}
              placeholder="Confirm new password"
            />
          </div>
          <div className="btns">
          <button className="update-button" type="submit">Update</button>
          <button onClick={logout} className="logout-button">
          Logout
        </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default AuthorSettings;