// services/apiConfig.js
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: API_URL,
  // No establecer 'Content-Type' global aquí: dejar que axios
  // determine el Content-Type por petición (JSON vs FormData).
  headers: {},
});

// Interceptores
api.interceptors.request.use(
  config => {
    // Si la URL es la de login, no añadas el token
    if (config.url !== '/Auth/login') {
        const token = sessionStorage.getItem('token') || localStorage.getItem('token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

export default api;