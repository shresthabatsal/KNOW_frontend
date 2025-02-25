import React, { useEffect, useState } from 'react';
import './Settings.css';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

const Settings = () => {
  const { user, logout } = useAuth();
  const [userDetails, setUserDetails] = useState({
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
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        console.log('User:', user); // Debugging
        if (!user || !user.id) {
          console.error('User ID is missing');
          return;
        }
        const response = await api.get(`/users/${user.id}`);
        const { name, email } = response.data; // Only fetch name and email
        setUserDetails({ name, email });
      } catch (error) {
        console.error('Failed to fetch user details', error);
      }
    };

    if (user) {
      fetchUserDetails();
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserDetails((prevState) => ({
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
      await api.put(`/users/${user.id}`, {
        name: userDetails.name,
        email: userDetails.email,
      });

      // Update password (if current password is provided)
      if (passwordFields.currentPassword) {
        await api.put(`/users/${user.id}/password`, {
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

  const handleDeleteAccount = async () => {
    // Show confirmation dialog
    const confirmDelete = window.confirm('Are you sure? Once deleted, this action cannot be undone.');

    if (confirmDelete) {
      try {
        // Call the delete user API
        await api.delete(`/users/${user.id}`);
        logout(); // Log out the user
        navigate('/'); // Redirect to home page
      } catch (error) {
        console.error('Failed to delete account', error);
        setError('Failed to delete account');
      }
    }
  };

  return (
    <div className="settings-container">
      <form onSubmit={handleSubmit}>
      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}
        <div>
          <h2>Settings</h2>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={userDetails.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={userDetails.email}
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
        <button type="submit">Update</button>
        <button className="delete-account-button" onClick={handleDeleteAccount}>
        Delete Account
      </button>
      </form>      
    </div>
  );
};

export default Settings;