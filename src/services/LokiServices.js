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
        nombre: response.data.ejecutivo.NombreEjecutivo,
        dias: response.data.ejecutivo.Días,
        Jerarquía: response.data.ejecutivo.Jerarquía
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

// services/LokiServices.js
export const GetScreenFields = async (servidor, idProducto) => {
  try {
    const token = localStorage.getItem('token');
    
    if (!token) {
      throw new Error('No hay token de autenticación disponible. Por favor, inicie sesión nuevamente.');
    }
    
    console.log('📤 Enviando a /CamposPantalla/campos-pantalla');
    console.log('🔑 Parámetros:', { servidor, idProducto });
    
    // Para path parameters: /CamposPantalla/{servidor}/{idProducto}/campos-pantalla
    const response = await api.get(`/CamposPantalla/campos-pantalla/${servidor}/${idProducto}`);
    
    console.log('📥 Respuesta de /CamposPantalla/campos-pantalla:', response.data);
    
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

export const GetGridFields = async (servidor, idProducto) => {
  try {
    const token = localStorage.getItem('token');
    
    if (!token) {
      throw new Error('No hay token de autenticación disponible. Por favor, inicie sesión nuevamente.');
    }
    
    console.log('📤 Enviando a /CamposPantalla/grid-producto-sample');
    console.log('🔑 Parámetros:', { servidor, idProducto });
    
    // Para path parameters: /CamposPantalla/{servidor}/{idProducto}/campos-pantalla
    const response = await api.get(`/CamposPantalla/grid-producto-sample/${servidor}/${idProducto}/70/5`);
    
    console.log('📥 Respuesta de /CamposPantalla/grid-producto-sample:', response.data);
    
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

export const GetVerifyProduct = async (servidor, idProducto) => {
  try {
    const token = localStorage.getItem('token');
    
    if (!token) {
      throw new Error('No hay token de autenticación disponible. Por favor, inicie sesión nuevamente.');
    }
    
    console.log('📤 Enviando a /CamposPantalla/existe-tabla-producto');
    console.log('🔑 Parámetros:', { servidor, idProducto });
    
    // Para path parameters: /CamposPantalla/{servidor}/{idProducto}/campos-pantalla
    const response = await api.get(`/CamposPantalla/existe-tabla-producto/${servidor}/${idProducto}`);
    
    console.log('📥 Respuesta de /CamposPantalla/existe-tabla-producto:', response.data);
    
    return response.data;
  } catch (error) {
     console.error('❌ Error al verificar producto:', error);
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

export const SaveScreenFields = async (servidor, data) => {
  try {
    // Verificar que el token existe antes de proceder
    const token = localStorage.getItem('token');
    
    if (!token) {
      throw new Error('No hay token de autenticación disponible. Por favor, inicie sesión nuevamente.');
    }
    console.log('📤 Enviando a /CamposPantalla/guardar-campos-pantalla:', data);
    console.log('🔑 Token disponible:', token);
    // ✅ DEJA QUE EL INTERCEPTOR AÑADA EL TOKEN AUTOMÁTICAMENTE
    // NO añadas headers manualmente - el interceptor ya lo hace
    const response = await api.post(`/CamposPantalla/guardar-campos-pantalla/${servidor}`,data);
    console.log('📥 Respuesta de /CamposPantalla/guardar-campos-pantalla', response.data);
    return response.data;
  } catch (error) {
    console.error('❌ Error al guardar campos pantalla', error);
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



// Nuevo endpoint para Lista Negra con parámetros
export const darkListV2 = async ({ idCartera = 1, selector, dato }) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No hay token de autenticación disponible. Por favor, inicie sesión nuevamente.');
    }
    const params = { idCartera, selector, dato };
    console.log('📤 Enviando a /ListaNegra/get-lista-negra con:', params);
    // El interceptor añade el token automáticamente
    const response = await api.get('/ListaNegra/get-lista-negra', { params });
    console.log('📥 Respuesta de /ListaNegra/get-lista-negra:', response.data);
    return response.data;
  } catch (error) {
    console.error('❌ Error al obtener la ListaNegra:', error);
    if (error.response?.status === 401) {
      console.warn('⚠️ Error 401 - Token inválido o expirado');
      localStorage.removeItem('token');
      localStorage.removeItem('userData');
    }
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

export const getRegrest = async ({ idCartera, cuenta }) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No hay token de autenticación disponible. Por favor, inicie sesión nuevamente.');
    }
    const params = { idCartera, cuenta};
    console.log('📤 Enviando a /arrepentimientos/get-arrepentimientos a con:', params);
    // El interceptor añade el token automáticamente
    const response = await api.get('/arrepentimientos/get-arrepentimientos', { params });
    console.log('📥 Respuesta de /arrepentimientos/get-arrepentimientos:', response.data);
    return response.data;
  } catch (error) {
    console.error('❌ Error al obtener la Arrepentimientos:', error);
    if (error.response?.status === 401) {
      console.warn('⚠️ Error 401 - Token inválido o expirado');
      localStorage.removeItem('token');
      localStorage.removeItem('userData');
    }
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

export const actualizarMetas = async (payload) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No hay token de autenticación disponible. Por favor, inicie sesión nuevamente.');
    }
    console.log('📤 Enviando a /carteras/establecer-metasproductividad con:', payload);
    // El interceptor añade el token automáticamente
    const response = await api.post('/carteras/establecer-metasproductividad', payload);
    console.log('📥 Respuesta de /carteras/establecer-metasproductividad:', response.data);
    return response.data;
  } catch (error) {
    console.error('❌ Error al obtener los catalogos:', error);
    if (error.response?.status === 401) {
      console.warn('⚠️ Error 401 - Token inválido o expirado');
      localStorage.removeItem('token');
      localStorage.removeItem('userData');
    }
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


export const getSessions = async ({ idEjecutivo }) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No hay token de autenticación disponible. Por favor, inicie sesión nuevamente.');
    }
    const url = `/Sesiones/get-sesiones-ejecutivos/${idEjecutivo}`;
    console.log('Enviando a', url);
    // El interceptor añade el token automáticamente
    const response = await api.get(url);
    console.log('Respuesta de', url + ':', response.data);
    return response.data;
  } catch (error) {
    console.error('Error al obtener las sesiones:', error);
    if (error.response?.status === 401) {
      console.warn('Error 401 - Token inválido o expirado');
      localStorage.removeItem('token');
      localStorage.removeItem('userData');
    }
    if (error.response) {
      console.error('Datos de respuesta del error:', error.response.data);
      console.error('Status del error:', error.response.status);
    } else if (error.request) {
      console.error('No se recibió respuesta del servidor:', error.request);
    } else {
      console.error('Error al configurar la solicitud:', error.message);
    }
    throw error;
  }
};


export const getValidators = async ({ idProducto }) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No hay token de autenticación disponible. Por favor, inicie sesión nuevamente.');
    }
    const params = { idProducto};
    console.log('Enviando a /ejecutivos/validadores a con:', params);
    // El interceptor añade el token automáticamente
    const response = await api.get('/ejecutivos/validadores', { params });
    console.log('Respuesta de /ejecutivos/validadores:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error al obtener la Arrepentimientos:', error);
    if (error.response?.status === 401) {
      console.warn('Error 401 - Token inválido o expirado');
      localStorage.removeItem('token');
      localStorage.removeItem('userData');
    }
    if (error.response) {
      console.error('Datos de respuesta del error:', error.response.data);
      console.error('Status del error:', error.response.status);
    } else if (error.request) {
      console.error('No se recibió respuesta del servidor:', error.request);
    } else {
      console.error('Error al configurar la solicitud:', error.message);
    }
    throw error;
  }
};

// Obtener ramificación de encargados (sin parámetros)
export const obetenerJerarquiaEncargados = async (idEjecutivo) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No hay token de autenticación disponible. Por favor, inicie sesión nuevamente.');
    }
    const idNum = Number(idEjecutivo);
    const requestData = [idNum];
    const url = `/Encargados/ejecutivos-propios/${idNum}`;
    console.log('📤 Enviando a', url, 'con:', requestData);
    // El interceptor añade el token automáticamente
    const response = await api.post(url, requestData);
    console.log('📥 Respuesta de', url + ':', response.data);
    return response.data;
  } catch (error) {
    console.error('❌ Error al obtener la ramificación de encargados:', error);
    if (error.response?.status === 401) {
      console.warn('⚠️ Error 401 - Token inválido o expirado');
      localStorage.removeItem('token');
      localStorage.removeItem('userData');
    }
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

export const obetenerTablaMetas = async (idEjecutivo) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No hay token de autenticación disponible. Por favor, inicie sesión nuevamente.');
    }
    // Probar enviando solo el array como body
    const requestData = Array.isArray(idEjecutivo) ? idEjecutivo : [Number(idEjecutivo)];
    console.log('📤 Enviando a /carteras/metas-productividad con:', requestData);
    const response = await api.post('/carteras/metas-productividad', requestData);
    console.log('📥 Respuesta de /carteras/metas-productividad:', response.data);
    return response.data;
  } catch (error) {
    console.error('❌ Error al obtener la tabla metas:', error);
    if (error.response?.status === 401) {
      console.warn('⚠️ Error 401 - Token inválido o expirado');
      localStorage.removeItem('token');
      localStorage.removeItem('userData');
    }
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

// Obtener ramificación de encargados (sin parámetros)
export const obetenerDropdownsEncargados = async () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No hay token de autenticación disponible. Por favor, inicie sesión nuevamente.');
    }
    console.log('📤 Enviando a /Encargados/ramificacion (sin body)');
    // El interceptor añade el token automáticamente
    const response = await api.post('/Encargados/encargados');
    console.log('📥 Respuesta de /Encargados/ramificacion:', response.data);
    return response.data;
  } catch (error) {
    console.error('❌ Error al obtener la ramificación de encargados:', error);
    if (error.response?.status === 401) {
      console.warn('⚠️ Error 401 - Token inválido o expirado');
      localStorage.removeItem('token');
      localStorage.removeItem('userData');
    }
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

export const PostLoadData = async (data) => {
  try {
    // Verificar que el token existe antes de proceder
    const token = localStorage.getItem('token');
    
    if (!token) {
      throw new Error('No hay token de autenticación disponible. Por favor, inicie sesión nuevamente.');
    }
    console.log('📤 Enviando a /PlantillasCorreo/carga-datos:', data);
    console.log('🔑 Token disponible:', token);
    // ✅ DEJA QUE EL INTERCEPTOR AÑADA EL TOKEN AUTOMÁTICAMENTE
    // NO añadas headers manualmente - el interceptor ya lo hace
    const response = await api.post(`/PlantillasCorreo/carga-datos`,data);
    console.log('📥 Respuesta de /PlantillasCorreo/carga-datos', response.data);
    return response.data;
  } catch (error) {
    console.error('❌ Error al cargar datos', error);
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
       }   throw error;
  }
};

export const getCatalogoCard = async () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No hay token de autenticación disponible. Por favor, inicie sesión nuevamente.');
    }
    const url = `/Catalogos/catalogos`;
    console.log('Enviando a', url);
    // El interceptor añade el token automáticamente
    const response = await api.get(url);
    console.log('Respuesta de', url + ':', response.data);
    return response.data;
  } catch (error) {
    console.error('Error al obtener las descripciones catalogo:', error);
    if (error.response?.status === 401) {
      console.warn('Error 401 - Token inválido o expirado');
      localStorage.removeItem('token');
      localStorage.removeItem('userData');
    }
    if (error.response) {
      console.error('Datos de respuesta del error:', error.response.data);
      console.error('Status del error:', error.response.status);
    } else if (error.request) {
      console.error('No se recibió respuesta del servidor:', error.request);
    } else {
      console.error('Error al configurar la solicitud:', error.message);
    }
    throw error;
  }
};

export const getCatalogoValueCard = async () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No hay token de autenticación disponible. Por favor, inicie sesión nuevamente.');
    }
    const url = `/Catalogos/valores-catalogo`;
    console.log('Enviando a', url);
    // El interceptor añade el token automáticamente
    const response = await api.get(url);
    console.log('Respuesta de', url + ':', response.data);
    return response.data;
  } catch (error) {
    console.error('Error al obtener los valores actalogo:', error);
    if (error.response?.status === 401) {
      console.warn('Error 401 - Token inválido o expirado');
      localStorage.removeItem('token');
      localStorage.removeItem('userData');
    }
    if (error.response) {
      console.error('Datos de respuesta del error:', error.response.data);
      console.error('Status del error:', error.response.status);
    } else if (error.request) {
      console.error('No se recibió respuesta del servidor:', error.request);
    } else {
      console.error('Error al configurar la solicitud:', error.message);
    }
    throw error;
  }
};