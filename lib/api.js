import axios from 'axios';
import { getSession } from 'next-auth/react';

// Axios instance for use with both server and client
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API,
});
let sessionCache = null;
let isInterceptorApplied = false;

// Request interceptor for client-side (if cookies or token are needed)
export const apiClientSide = () => api

// Use this function in getServerSideProps
export const apiServerSide = (token) => {
  // Apply interceptor only once for server-side requests
  if (!isInterceptorApplied) {
    api.interceptors.request.use((config) => {
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });
    isInterceptorApplied = true;
  }

  return api;
};

// Function to get token from request cookies
export const getToken = (context) => {
  return context.req.cookies.token;
};
