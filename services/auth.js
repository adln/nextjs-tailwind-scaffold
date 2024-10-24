import { useAPI } from '@/hooks/use-api'; // Adjust the import path as necessary
import Cookies from 'js-cookie';
import { signIn } from 'next-auth/react';
export const useAuthService = () => {
  const api = useAPI(); // Get the Axios instance from the useAPI hook

  // Email/Password Login
  const login = async (email, password) => {
    try {
      const response = await api.post('/auth/login', { email, password });

      Cookies.set('token', response.token, {
        expires: 7,
        path: '/',
        secure: true,
        sameSite: 'strict',
      });

      return response; // return the token
    } catch (error) {
      console.log('here', error)
      throw error.response?.data || { message: 'An error occurred during login.' };
    }
  };


  // Function to handle registration
  const register = async (email, password, name) => {
    try {
      const response = await api.post('/auth/register', { email, password, name });
      Cookies.set('token', response.data.token, {
        expires: 7,
        path: '/',
        secure: true,
        sameSite: 'strict',
      });
      return response.data; // Return the user data or token
    } catch (error) {
      throw error.response?.data || { message: 'An error occurred during registration.' };
    }
  };

  // Function to handle password reset
  const resetPassword = async (email) => {
    try {
      const response = await api.post('/auth/reset-password', { email });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: 'An error occurred during password reset.' };
    }
  };

  // Function to fetch the authenticated user profile
  const fetchUserProfile = async (token) => {
    try {
      const response = await api.get('/auth/me', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response;
    } catch (error) {
      throw error.response?.data || { message: 'An error occurred while fetching the user profile.' };
    }
  };

  return {
    login,
    // loginWithGoogle,
    // loginWithFacebook,
    register,
    resetPassword,
    fetchUserProfile,
  };
};
