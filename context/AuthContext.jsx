import { createContext, useState, useEffect, useContext } from 'react';

import { toast } from '@/hooks/use-toast';
import { getSession, signIn, signOut } from 'next-auth/react';
import { useAPI } from '@/hooks/use-api';
import Cookies from 'js-cookie';

const AuthContext = createContext();

const handleError = (_error, defaultMessage) => {
  let error = _error;
  try {
    error = JSON.parse(error);
  } catch (error) {
    defaultMessage = error;
  }

  const title = error?.title || defaultMessage;
  const message = error?.message || defaultMessage;
  toast({
    title: title,
    description: message,
  });
};

export const AuthProvider = ({ children }) => {
  const api = useAPI();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // To handle loading state

  // Function to load user profile from the token
  const loadUserProfile = async () => {
    try {
      const profile = await api.get('/auth/me');
      console.log('Users profile', profile);
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
        loadUserProfile();
      } else {
        setLoading(false);
      }
    };

    fetchSession();
  }, []);

  // Login function
  const login = async ({ email, password }) => {
    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });
      if (result.error) {
        handleError(result.error, 'Echec de la connexion.');
      } else {
        // Token is automatically set as HTTP-only cookie in apiLogin
        await loadUserProfile(result.token); // Load user profile with the new token
      }
    } catch (error) {
      console.log('catch error', error);
      handleError(error, 'échec de la connexion.');
    }
  };

  // Registration function
  const register = async (formData) => {
    try {
      const data = await api.post('/auth/signup', formData);
      const { token } = data;
      console.log(token);
      await signIn('credentials', {
        email: formData.credentials.email,
        password: formData.credentials.password,
        redirect: false, // We handle redirection manually
      });
      // TODO add accessToken to next-auth
      await loadUserProfile();
    } catch (error) {
      console.log('here', error);
      // handleError(error, `Echec lors de l'enregistrement.`);
    }
  };

  // Logout function
  const logout = async () => {
    setUser(null);
    signOut({ redirect: false });
  };

  // Return loading state and authentication methods
  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
