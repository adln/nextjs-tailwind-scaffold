import React, { createContext, useState, useEffect, useContext } from 'react';
import { login as apiLogin, register as apiRegister, fetchUserProfile } from '../services/api';
import Cookies from 'js-cookie'; // Use only on the client-side
import { toast } from '@/hooks/use-toast';

const AuthContext = createContext();

const handleError = (error, defaultMessage) => {
  const message = error?.response?.data?.message || defaultMessage;
  toast({
    title: defaultMessage,
    description: message,
  });
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // To handle loading state
  const [token, setToken] = useState(null);

  // Function to load user profile from the token
  const loadUserProfile = async (token) => {
    try {
      const profile = await fetchUserProfile(token);
      setUser(profile);
    } catch (error) {
      console.error('Error fetching user profile:', error);
      setUser(null); // Reset user on error
    } finally {
      setLoading(false); // Set loading to false when done
    }
  };

  // Check for token and load user profile when component mounts
  useEffect(() => {
    const token = Cookies.get('token'); // Get token from the cookie
    if (token) {
      setToken(token);
      loadUserProfile(token); // Load user profile if token exists
    } else {
      setLoading(false); // No token, just set loading to false
    }
  }, []);

  // Login function
  const login = async ({email, password}) => {
    try {
      const data = await apiLogin(email, password);
      // Token is automatically set as HTTP-only cookie in apiLogin
      setToken(data.token);
      await loadUserProfile(data.token); // Load user profile with the new token
      
    } catch (error) {
      handleError(error, 'échec de la connexion.');
    }
  };

  // Registration function
  const register = async (email, password, name) => {
    try {
      const data = await apiRegister(email, password, name);
      // Token is automatically set as HTTP-only cookie in apiRegister
      setToken(data.token)
      await loadUserProfile(data.token); // Load user profile with the new token
      
    } catch (error) {
      handleError(error, `Echec lors de l'enregistrement.`);
      
    }
  };

  // Logout function
  const logout = async () => {
    setUser(null);
    setToken(null);
    Cookies.remove('token', { path: '/' }); // Remove the token cookie
  };

  // Return loading state and authentication methods
  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
