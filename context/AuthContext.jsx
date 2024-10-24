import React, { createContext, useState, useEffect, useContext } from 'react';
import { useAuthService } from '../services/auth';
import Cookies from 'js-cookie'; // Use only on the client-side
import { toast } from '@/hooks/use-toast';
import { getSession, signIn, signOut } from 'next-auth/react';

const AuthContext = createContext();

const handleError = (_error, defaultMessage) => {
  let error = _error;
  if(typeof error === "string") error = JSON.parse(error);
  
  const title = error?.title || defaultMessage;
  const message = error?.message || defaultMessage;
  toast({
    title: title,
    description: message,
  });
};

export const AuthProvider = ({ children }) => {
  const {
    // login: apiLogin,
    fetchUserProfile,
    register: apiRegister,
  } = useAuthService();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // To handle loading state
  

  // Function to load user profile from the token
  const loadUserProfile = async (token) => {
    try {
      const profile = await fetchUserProfile(token);
      console.log(token);
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
    const fetchSession = async () => {
      const session = await getSession();
      if (session && session.accessToken) {
        loadUserProfile(session.accessToken);
      } else {
        setLoading(false);
      }
    };

    fetchSession();
  }, []);

  // Login function
  const login = async ({ email, password }) => {
    try {
      const result = await signIn('credentials', { email, password, redirect: false });
      if (result.error) {        
        handleError(result.error, 'Echec de la connexion.')
      }else{
        // Token is automatically set as HTTP-only cookie in apiLogin
        await loadUserProfile(result.token); // Load user profile with the new token
      }
    } catch (error) {
      console.log('catch error', error);
      handleError(error, 'échec de la connexion.');
    }
  };

  // Registration function
  const register = async (email, password, name) => {
    try {
      const data = await apiRegister(email, password, name);
      await loadUserProfile(data.token); // Load user profile with the new token
    } catch (error) {
      handleError(error, `Echec lors de l'enregistrement.`);
    }
  };

  // Logout function
  const logout = async () => {
    setUser(null);
    signOut({redirect: false})
  };

  // Return loading state and authentication methods
  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
