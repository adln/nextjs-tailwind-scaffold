import { apiClientSide } from '@/lib/api';
import { toast } from '@/hooks/use-toast'; // Assuming you're using ShadCN's toast
import { getSession } from 'next-auth/react';

export const useAPI = () => {
  const axiosInstance = apiClientSide();

  const attachTokenToRequest = async () => {
    const session = await getSession(); // Get session and token from NextAuth
    if (session?.accessToken) {
      axiosInstance.defaults.headers.Authorization = `Bearer ${session.accessToken}`;
    }
  };

  const get = async (url, options = {}) => {
    try {
      await attachTokenToRequest(); // Attach token before making the request
      const response = await axiosInstance.get(url, options);
      return response.data;
    } catch (error) {
      handleError(error);
      throw error.response?.data || { message: 'An error occurred during GET request.' };
    }
  };

  const post = async (url, data, options = {}) => {
    try {
      await attachTokenToRequest(); // Attach token before making the request
      const response = await axiosInstance.post(url, data, options);
      return response.data;
    } catch (error) {
      handleError(error);
      throw error.response?.data || { message: 'An error occurred during POST request.' };
    }
  };

  const handleError = (error) => {
    const errorMessage = error.response?.data?.message || 'An unexpected error occurred.';
    toast({
      title: 'Error',
      description: errorMessage,
      variant: 'destructive',
    });
    console.error('API Error:', error);
  };

  return { get, post };
};
