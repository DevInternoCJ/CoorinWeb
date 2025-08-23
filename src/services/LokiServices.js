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
    const response = await api.post('/Auth/login', requestData, {
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      transformResponse: [(data) => {
        try {
          return JSON.parse(data);
        } catch (jsonError) {
          console.log('Respuesta en texto plano, devolviendo como string:', data);
          return data;
        }
      }]
    });  
 
    if (response.data && response.data.ejecutivo && response.data.ejecutivo.Token) {
      localStorage.setItem('token', response.data.ejecutivo.Token);
      console.log('✅ Token guardado en localStorage:', response.data.ejecutivo.Token);   
      // Verificar que realmente se guardó
      const savedToken = localStorage.getItem('token');
      console.log('🔍 Token recuperado de localStorage:', savedToken);
      // Guardar datos del usuario
      localStorage.setItem('userData', JSON.stringify({
        idEjecutivo: response.data.ejecutivo.idEjecutivo,
        usuario: response.data.ejecutivo.Usuario,
        nombre: response.data.ejecutivo.NombreEjecutivo
      }));
    } else {
      console.warn('⚠️ No se recibió token en la respuesta');
      console.warn('⚠️ Estructura completa de la respuesta:', response.data);
    }    
    return response.data;
  } catch (error) {
    console.error('❌ Error en el inicio de sesión:', error);
    if (error.response && typeof error.response.data === 'string') {
      const customError = new Error(error.response.data);
      customError.response = error.response;
      throw customError;
    }
    throw error;
  }
};

//(userData, idEjecutivo)
export const ValidatePassword = async () => {
  try {
    const requestData = {
      // contrasenia: userData.contrasenia,
      // servidor: "Cronoss",
      // idEjecutivo
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
// export const ValidatePassword = async (userData, idEjecutivo) => {
//   try {
//     const requestData = {
//       contrasenia: userData.contrasenia,
//       servidor: "Cronoss",
//       idEjecutivo
//     };

//     console.log('📤 Enviando a /Auth/validar-contrasenia:', requestData);

//     const response = await api.post('/Auth/validar-contrasenia', requestData, {
//       headers: {
//         'Accept': 'text/plain', // Aceptar respuesta como texto plano
//         'Content-Type': 'application/json' // Enviar como JSON
//       },
//       transformResponse: [(data) => {
//         // No transformar la respuesta, dejarla como texto plano
//         return data;
//       }]
//     });

//     console.log('📥 Respuesta de /Auth/validar-contrasenia:', response.data);
//     return response.data;
//   } catch (error) {
//     console.error('❌ Error en validación de contraseña:', error);

//     // Si la respuesta es texto plano, asegurarnos de capturarla correctamente
//     if (error.response && typeof error.response.data === 'string') {
//       // Crear un nuevo error con el mensaje correcto
//       const customError = new Error(error.response.data);
//       customError.response = error.response;
//       throw customError;
//     }

//     throw error;
//   }
// };

// Actualizar contraseña (versión optimizada)
export const UpdatePassword = async (passwordData) => {
  try {
    // Verificar que el token existe antes de proceder
    const token = localStorage.getItem('token');
    
    if (!token) {
      throw new Error('No hay token de autenticación disponible. Por favor, inicie sesión nuevamente.');
    }
    console.log('📤 Enviando a /Auth/restablecer-contrasenia:', passwordData);
    console.log('🔑 Token disponible:', token);
    // ✅ DEJA QUE EL INTERCEPTOR AÑADA EL TOKEN AUTOMÁTICAMENTE
    // NO añadas headers manualmente - el interceptor ya lo hace
    const response = await api.post('/Auth/restablecer-contrasenia', passwordData);
    console.log('📥 Respuesta de /Auth/restablecer-contrasenia:', response.data);
    return response.data;
  } catch (error) {
    console.error('❌ Error al actualizar la contraseña:', error);
    // Manejo específico de errores de autenticación
    if (error.response?.status === 401) {
      console.warn('⚠️ Error 401 - Token inválido o expirado');
      localStorage.removeItem('token');
      localStorage.removeItem('userData');
    }
    // Mostrar más detalles del error
    if (error.response) {
      console.error('📊 Datos de respuesta del error:', error.response.data);
      console.error('🔢 Status del error:', error.response.status);
    } else if (error.request) {
      console.error('❌ No se recibió respuesta del servidor:', error.request);
    } else {
      console.error('❌ Error al configurar la solicitud:', error.message);
    }
    throw error;
  }
};

