import axios from 'axios';
import Cookies from 'js-cookie';

// Axios instance for use with both server and client
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API,
});

// Request interceptor for client-side (if cookies or token are needed)
export const apiClientSide = () => {
  const tokenFromCookies = Cookies.get('token');

  api.interceptors.request.use((config) => {
    if (tokenFromCookies) {
      config.headers.Authorization = `Bearer ${tokenFromCookies}`;
    }
    return config;
  });

  return api;
};

// Use this function in getServerSideProps
export const apiServerSide = (token) => {
  api.interceptors.request.use((config) => {
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  return api;
};

export const getToken = (context) => {
  return context.req.cookies.token;
}
