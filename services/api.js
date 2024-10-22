import axios from 'axios';
import Cookies from 'js-cookie';

// Set up your API base URL
const API_BASE_URL = 'http://localhost:3000/api/v1';

// Create an Axios instance with default settings
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Email/Password Login
export const login = async (email, password) => {
  try {
    const response = await api.post('/auth/login', { email, password });
    Cookies.set('token', response.data.token, {
      expires: 7,
      path: '/',
      secure: true,
      sameSite: 'strict',
    });

    return response.data; // return the token
  } catch (error) {
    console.error('Login error:', error.response?.data || error.message);

    throw error.response?.data || { message: 'An error occurred during login.' };
  }
};
// Google Login
export const loginWithGoogle = async (googleToken) => {
  try {
    const response = await api.post('/auth/login/google', { token: googleToken });
    return response.data;
  } catch (error) {
    console.error('Google login error:', error.response?.data || error.message);
    throw error.response?.data || { message: 'An error occurred during Google login.' };
  }
};

// Facebook Login
export const loginWithFacebook = async (facebookToken) => {
  try {
    const response = await api.post('/auth/login/facebook', { token: facebookToken });
    return response.data;
  } catch (error) {
    console.error('Facebook login error:', error.response?.data || error.message);
    throw error.response?.data || { message: 'An error occurred during Facebook login.' };
  }
};

// Function to handle registration
export const register = async (email, password, name) => {
  try {
    const response = await api.post('/auth/register', { email, password, name });
    Cookies.set('token', response.data.token, {
      expires: 7, // Expires in 7 days (or whatever you need)
      path: '/',   // Available on all routes
      secure: true, // Ensures the cookie is sent over HTTPS
      sameSite: 'strict', // Protects from CSRF attacks
    });
    return response.data; // Return the user data or token
  } catch (error) {
    console.error('Registration error:', error.response?.data || error.message);
    throw error.response?.data || { message: 'An error occurred during registration.' };
  }
};

// Function to handle password reset
export const resetPassword = async (email) => {
  try {
    const response = await api.post('/auth/reset-password', { email });
    return response.data;
  } catch (error) {
    console.error('Password reset error:', error.response?.data || error.message);
    throw error.response?.data || { message: 'An error occurred during password reset.' };
  }
};

// Function to fetch the authenticated user profile
export const fetchUserProfile = async (token) => {
  try {
    const response = await api.get('/auth/me', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Fetch user profile error:', error.response?.data || error.message);
    throw error.response?.data || { message: 'An error occurred while fetching the user profile.' };
  }
};

// Export the axios instance for use in other parts of the app if needed
export default api;