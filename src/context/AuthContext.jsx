import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../utils/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check user session on mount
  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await api.get('/api/auth/session');
        if (response.status === 'success' && response.user) {
          setUser(response.user);
        }
      } catch (err) {
        // Safe to ignore: no active session is normal on mount
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    checkSession();
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    try {
      const response = await api.post('/api/auth/login', { email, password });
      if (response.status === 'success' && response.user) {
        setUser(response.user);
        return response.user;
      }
      throw new Error(response.message || 'Login failed');
    } catch (err) {
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const register = async (name, email, password, phone) => {
    setLoading(true);
    try {
      const response = await api.post('/api/auth/register', { name, email, password, phone });
      return response;
    } catch (err) {
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const loginWithGoogle = async (credential, mode = 'any') => {
    setLoading(true);
    try {
      const response = await api.post('/api/auth/google', { credential, mode });
      if (response.status === 'success' && response.user) {
        setUser(response.user);
        return response.user;
      }
      throw new Error(response.message || 'Google authentication failed');
    } catch (err) {
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const loginWithGoogleDirect = async (email, name, mode = 'any') => {
    setLoading(true);
    try {
      const response = await api.post('/api/auth/google-direct', { email, name, mode });
      if (response.status === 'success' && response.user) {
        setUser(response.user);
        return response.user;
      }
      throw new Error(response.message || 'Google authentication failed');
    } catch (err) {
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await api.post('/api/auth/logout');
      setUser(null);
    } catch (err) {
      console.error('Logout error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, loginWithGoogle, loginWithGoogleDirect, logout, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
