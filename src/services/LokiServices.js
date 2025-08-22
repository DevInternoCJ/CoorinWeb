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
    const requestData = {
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
    };
    
    console.log('📤 Enviando a /Auth/login:', requestData);
    
    const response = await api.post('/Auth/login', requestData);
    
    console.log('📥 Respuesta de /Auth/login:', response.data);
    return response.data;
  } catch (error) {
    console.error('❌ Error en el inicio de sesión:', error);
    throw error;
  }
};

export const ValidatePassword = async (userData, idEjecutivo) => {
  try {
    const requestData = {
      contrasenia: userData.contrasenia,
      servidor: "Cronoss",
      idEjecutivo
    };
    
    console.log('📤 Enviando a /Auth/validar-contrasenia:', requestData);
    
    const response = await api.post('/Auth/validar-contrasenia', requestData);
    
    console.log('📥 Respuesta de /Auth/validar-contrasenia:', response.data);
    return response.data;
  } catch (error) {
    console.error('❌ Error en validación de contraseña:', error);
    throw error;
  }
};

export const UpdatePassword = async (passwordData) => {
  try {
    // Obtener el token del localStorage
    const token = localStorage.getItem('token');
    
    console.log('📤 Enviando a /Auth/restablecer-contrasenia:', passwordData);
    console.log('🔑 Token usado:', token);
    
    const response = await api.post('/Auth/restablecer-contrasenia', passwordData, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` // Agregar el token de autorización
      }
    });
    
    console.log('📥 Respuesta de /Auth/restablecer-contrasenia:', response.data);
    return response.data;
  } catch (error) {
    console.error('❌ Error al actualizar la contraseña:', error);
    
    // Mostrar más detalles del error
    if (error.response) {
      console.error('📊 Datos de respuesta del error:', error.response.data);
      console.error('🔢 Status del error:', error.response.status);
      console.error('📋 Headers del error:', error.response.headers);
    } else if (error.request) {
      console.error('❌ No se recibió respuesta del servidor:', error.request);
    } else {
      console.error('❌ Error al configurar la solicitud:', error.message);
    }
    
    throw error;
  }
};



