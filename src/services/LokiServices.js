import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptores
api.interceptors.request.use(
  config => {
    // Si la URL es la de login, no añadas el token
    if (config.url !== '/Auth/login') {
      const token = localStorage.getItem('token'); 
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

// --- ENDPOINT PARA EL INICIO DE SESIÓN ---
export const loginUser = async (userData) => {
  try {
    const response = await api.post('/Auth/login', {
      usuario: userData.usuario,
      contrasenia: userData.contrasenia,
      extension: 0,
      bloqueo: 1,
      dominio: "CONJUR",
      computadora: "Coorin",
      usuarioWindows: userData.usuarioWindows,
      ip: API_URL, 
      aplicacion: "Coorin", 
      version: "3.4.2", 
      servidor: "Cronoss"
    });
    return response.data;
  } catch (error) {
    console.error('Error en el inicio de sesión:', error);
    throw error;
  }
};

export const ValidatePassword = async (userData, idEjecutivo) => {
  try {
    const response = await api.post('/Auth/validar-contrasenia', {
      contrasenia: userData.contrasenia,
      servidor: "Cronoss",
      idEjecutivo
    });
    // La respuesta debería contener el token y la información del usuario
    return response.data;
  } catch (error) {
    console.error('Error en el inicio de sesión:', error);
    throw error;
  }
};

export const UpdatePassword = async (passwordData) => {
  try {
    // Obtener el token del localStorage
    const token = localStorage.getItem('token');
    
    const response = await api.post('/Auth/restablecer-contrasenia', passwordData, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` // Agregar el token de autorización
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error al actualizar la contraseña:', error);
    throw error;
  }
};



