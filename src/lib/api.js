import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost',
  withCredentials: true,
  withXSRFToken: true 
});


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