import React from 'react';
import { Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const isTokenValid = (token) => {
  if (!token) return false;
  try {
    const decoded = jwtDecode(token);
    return decoded.exp * 1000 > Date.now();
  } catch {
    return false;
  }
};

export default function PrivateRoute({ children }) {
  const token = localStorage.getItem('token');

  if (!isTokenValid(token)) {
    localStorage.removeItem('token');
    return <Navigate to="/login" replace />;
  }

  return children;
}
