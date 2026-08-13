import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

// Generic loading spinner for session check
const Spinner = () => (
  <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    <div style={{ textAlign: 'center', color: 'var(--text-muted)' }}>
      <div style={{
        width: '40px', height: '40px', border: '3px solid var(--border-color)',
        borderTopColor: 'var(--primary)', borderRadius: '50%',
        animation: 'spin 0.8s linear infinite', margin: '0 auto 1rem'
      }} />
      <p style={{ fontSize: '0.9rem' }}>Loading...</p>
    </div>
    <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
  </div>
);

// Requires authenticated user
export const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <Spinner />;
  return user ? children : <Navigate to="/login" replace />;
};

// Requires admin role
export const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <Spinner />;
  if (!user) return <Navigate to="/login" replace />;
  if (user.role !== 'admin') return <Navigate to="/dashboard" replace />;
  return children;
};

// Redirects logged-in users away from login/register
export const GuestRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <Spinner />;
  if (user) return <Navigate to={user.role === 'admin' ? '/admin' : '/dashboard'} replace />;
  return children;
};
