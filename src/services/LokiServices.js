// src/api/api.js (o tu archivo de configuración de Axios)

import axios from 'axios';

// ¡CAMBIA ESTA LÍNEA!
const API_BASE_URL = 'http://192.168.7.33:8030'; // La URL base de tu API

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    // Tus otros headers, como el de autorización, si los tienes
    // 'Authorization': `Bearer ${localStorage.getItem('authToken')}`
  },
});

// ... (El resto de tu configuración de interceptores y funciones de petición) ...

// Ejemplo de función de petición ajustada
export const getMyData = async () => {
  try {
    // Axios automáticamente usará 'http://192.168.7.33:8030/scalar/...'
    const response = await api.get('/scalar/'); // Si la raíz de tus endpoints es '/scalar/'
    return response.data;
  } catch (error) {
    console.error('Error fetching data from local API:', error);
    throw error;
  }
};

export default api;