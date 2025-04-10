import axios from 'axios';

const api = axios.create({
  baseURL: 'https://medesi.loca.lt/',
  withCredentials: true,
  withXSRFToken: true 
});

// Add request interceptor to include the auth token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default api;