import axios from 'axios';

// ¡ASEGÚRATE DE QUE ESTA ES LA URL CORRECTA!
// Según tu curl, la base es http://192.168.7.33:8030
const API_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    // IMPORTANTE: El token de autorización NO DEBE IR AQUÍ para la petición de LOGIN.
    // El token se obtendrá *después* de un inicio de sesión exitoso y se añadirá dinámicamente.
    // Lo eliminamos para esta petición inicial, o lo dejaremos vacío si es que siempre debe estar.
    // Generalmente, para login, no se envía un Bearer token.

  },
});

// Interceptores: Si tienes interceptores para añadir el token, asegúrate de que no se apliquen a la ruta de login.
// Si no tienes interceptores, ignora este comentario.
api.interceptors.request.use(
  config => {
    // Si la URL es la de login, no añadas el token
    if (config.url !== '/Auth/login') {
      const token = localStorage.getItem('token'); // O de donde guardes tu token
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


// --- NUEVA FUNCIÓN PARA EL INICIO DE SESIÓN ---
export const loginUser = async (userData) => {
  try {
    const response = await api.post('/Auth/login', {
      usuario: userData.usuario,
      contrasenia: userData.contrasenia,
      extension: userData.extension,
      bloqueo: userData.bloqueo,
      dominio: userData.dominio,
      computadora: userData.computadora,
      usuarioWindows: userData.usuarioWindows,
      ip: userData.ip,
      aplicacion: userData.aplicacion,
      version: userData.version,
      servidor: userData.servidor,
    });

    // La respuesta debería contener el token y la información del usuario
    return response.data;
  } catch (error) {
    console.error('Error en el inicio de sesión:', error);
    // Puedes lanzar el error de nuevo para que el componente lo maneje
    throw error;
  }
};

// ... (Si tienes otras funciones de petición, como getMyData) ...
export const getMyData = async () => {
  try {
    const response = await api.get('/scalar/');
    return response.data;
  } catch (error) {
    console.error('Error fetching data from local API:', error);
    throw error;
  }
};

export default api;