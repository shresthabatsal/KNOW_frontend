import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children, role }) => {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    // Redirect to the correct login page based on the required role
    return <Navigate to={role === 'author' ? '/author' : '/signin'} state={{ from: location }} replace />;
  }

  if (user.role !== role) {
    // If the user is logged in but doesn't have the required role, redirect to their home
    return <Navigate to={user.role === 'user' ? '/' : '/home'} replace />;
  }

  return children;
};

export default ProtectedRoute;