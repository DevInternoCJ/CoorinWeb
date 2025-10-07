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
      bloqueo: 0,
      dominio: "CONJUR",
      computadora: "Coorin",
      usuarioWindows: userData.usuarioWindows,
      ip: API_URL,
      aplicacion: "Coorin",
      version: "3.4.2",
      servidor: "Albaz"
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
// export const ValidatePassword = async () => {
//   try {
//     const requestData = {
//       // contrasenia: userData.contrasenia,
//       // servidor: "Cronoss",
//       // idEjecutivo
//     };
//     console.log('📤 Enviando a /Auth/validar-contrasenia:', requestData);
//     const response = await api.post('/Auth/validar-contrasenia', requestData);
//     console.log('📥 Respuesta de /Auth/validar-contrasenia:', response.data);
//     return response.data;
//   } catch (error) {
//     console.error('❌ Error en validación de contraseña:', error);
//     throw error;
//   }
// };

export const ValidatePassword = async (userData, idEjecutivo) => {
  try {
    const requestData = {
      contrasenia: userData.contrasenia,
      servidor: "Albaz",
      idEjecutivo
    };

    console.log('📤 Enviando a /Auth/validar-contrasenia:', requestData);

    const response = await api.post('/Auth/validar-contrasenia', requestData, {
      headers: {
        'Accept': 'text/plain', // Aceptar respuesta como texto plano
        'Content-Type': 'application/json' // Enviar como JSON
      },
      transformResponse: [(data) => {
        // No transformar la respuesta, dejarla como texto plano
        return data;
      }]
    });

    console.log('📥 Respuesta de /Auth/validar-contrasenia:', response.data);
    return response.data;
  } catch (error) {
    console.error('❌ Error en validación de contraseña:', error);

    // Si la respuesta es texto plano, asegurarnos de capturarla correctamente
    if (error.response && typeof error.response.data === 'string') {
      // Crear un nuevo error con el mensaje correcto
      const customError = new Error(error.response.data);
      customError.response = error.response;
      throw customError;
    }

    throw error;
  }
};

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
export const GetScreenFields = async (idProducto) => {
  try {
    const token = localStorage.getItem('token');
    
    if (!token) {
      throw new Error('No hay token de autenticación disponible. Por favor, inicie sesión nuevamente.');
    }
    
    console.log('📤 Enviando a /CamposPantalla/campos-pantalla');
    console.log('🔑 Parámetros:', { idProducto });
    
    // Para path parameters: /CamposPantalla/{servidor}/{idProducto}/campos-pantalla
    const response = await api.get(`/CamposPantalla/campos-pantalla/${idProducto}`);
    
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

export const GetGridFields = async (idProducto) => {
  try {
    const token = localStorage.getItem('token');
    
    if (!token) {
      throw new Error('No hay token de autenticación disponible. Por favor, inicie sesión nuevamente.');
    }
    
    console.log('📤 Enviando a /CamposPantalla/grid-producto-sample');
    console.log('🔑 Parámetros:', {idProducto });
    
    // Para path parameters: /CamposPantalla/{servidor}/{idProducto}/campos-pantalla
    const response = await api.get(`/CamposPantalla/grid-producto-sample/${idProducto}/70/5`);
    
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

export const GetVerifyProduct = async (idProducto) => {
  try {
    const token = localStorage.getItem('token');
    
    if (!token) {
      throw new Error('No hay token de autenticación disponible. Por favor, inicie sesión nuevamente.');
    }
    
    console.log('📤 Enviando a /CamposPantalla/existe-tabla-producto');
    console.log('🔑 Parámetros:', {idProducto });
    
    // Para path parameters: /CamposPantalla/{servidor}/{idProducto}/campos-pantalla
    const response = await api.get(`/CamposPantalla/existe-tabla-producto/${idProducto}`);
    
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

export const SaveScreenFields = async (data) => {
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
    const response = await api.post(`/CamposPantalla/guardar-campos-pantalla`,data);
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
export const darkListV2 = async ({ idCartera, selector, dato }) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No hay token de autenticación disponible. Por favor, inicie sesión nuevamente.');
    }
    const params = { idCartera, selector, dato };
    console.log('Enviando a /ListaNegra/get-lista-negra con:', params);
    // El interceptor añade el token automáticamente
    const response = await api.get('/ListaNegra/get-lista-negra', { params });
    console.log('Respuesta de /ListaNegra/get-lista-negra:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error al obtener la ListaNegra:', error);
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
    const response = await api.get(url, requestData);
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
    const response = await api.get('/Encargados/encargados');
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
    const response = await api.post(`/PlantillasCorreo/carga-datos`, data);
    console.log('📥 Respuesta de /PlantillasCorreo/carga-datos', response.data);
    return response.data;
  } catch (error) {
    console.error('❌ Error al cargar datos', error);  
    // Manejo específico de errores de autenticación
    if (error.response?.status === 401) {
      console.warn('⚠️ Error 401 - Token inválido o expirado');
      localStorage.removeItem('token');
      localStorage.removeItem('userData');   
      // Redirigir al login si es necesario
      window.location.href = '/login';
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

export const getProductivity = async (requestData = null) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No hay token de autenticación disponible. Por favor, inicie sesión nuevamente.');
    }
    
    console.log('📤 Enviando a /Productividad/get-productividad con:', requestData);
    
    // Si se envían datos, hacer POST con body, sino POST sin body
    const response = requestData 
      ? await api.post('/Productividad/get-productividad', requestData)
      : await api.post('/Productividad/get-productividad');
    
    console.log('📥 Respuesta de /Productividad/get-productividad:', response.data);
    return response.data;
  } catch (error) {
    console.error('❌ Error al obtener la productividad:', error);
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


export const PostInsertScreen = async (data) => {
  try {
    const token = localStorage.getItem('token');  
    if (!token) {
      throw new Error('No hay token de autenticación disponible');
    }

    const response = await api.post(`/PlantillasCorreo/crear-plantilla`, data, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    return response.data;
    
  } catch (error) {
    // Manejo mejorado de errores
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('userData');
      window.location.href = '/login'; // Redirigir al login
    }
    
    throw new Error(error.response?.data?.message || 'Error al crear plantilla');
  }
};

// Obtener Historico invidual
export const historySingle = async (body) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No hay token de autenticación disponible. Por favor, inicie sesión nuevamente.');
    }
    console.log('📤 Enviando a /Histórico/individual:', body);
    // El interceptor añade el token automáticamente
    const response = await api.post('/Histórico/individual', body, {
      headers: {
        'Accept': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/json, text/plain, /',
        'Content-Type': 'application/json'
      },
      responseType: 'blob'
    });
    console.log('📥 Respuesta de /Histórico/individual:', response);
    return response;
  } catch (error) {
    console.error('Error al obtener historico:', error);
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

// Obtener Historico Archivo
export const historyArchivoUpload = async (body) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No hay token de autenticación disponible. Por favor, inicie sesión nuevamente.');
    }
    // Construir FormData
    const formData = new FormData();
    // Asume que body es un objeto con las claves necesarias y el archivo
    Object.entries(body).forEach(([key, value]) => {
      // Solo agregar si el valor no es null o undefined
      if (value !== null && value !== undefined) {
        // Si el valor es un array, agregar cada elemento por separado
        if (Array.isArray(value)) {
          value.forEach((v) => formData.append(key, v));
        } else {
          formData.append(key, value);
        }
      }
    });
    console.log('Enviando a /Histórico/archivo (FormData):', formData);
    // El interceptor añade el token automáticamente
    const response = await api.post('/Histórico/archivo', formData, {
      headers: {
        'Accept': '*/*',
        'Content-Type': 'multipart/form-data'
        // No establecer Content-Type manualmente, el navegador lo gestiona automáticamente con FormData
      },
      responseType: 'arraybuffer' // Para recibir datos binarios correctamente
    });
    console.log('Respuesta de /Histórico/archivo:', response);
    return response;
  } catch (error) {
    console.error('Error al obtener historico Archivo:', error);
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

export const patchLogoutEjecutive = async (idEjecutivo) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No hay token de autenticación disponible. Por favor, inicie sesión nuevamente.');
    }
    // Probar enviando solo el array como body
    const requestData = Array.isArray(idEjecutivo) ? idEjecutivo : [Number(idEjecutivo)];
    const url = `/Sesiones/logout-ejecutivo/${idEjecutivo}`;
    console.log('Enviando a', url, 'con:', requestData);
    const response = await api.patch(url, requestData, {
      headers: {
        'Accept': '*/*'
      }
    });
    console.log('Respuesta de', url + ':', response.data);
    return response.data;
  } catch (error) {
    console.error('Error al cerrar sesion:', error);
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


export const patchUnlockedEjecutive = async (idEjecutivo) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No hay token de autenticación disponible. Por favor, inicie sesión nuevamente.');
    }
    // Probar enviando solo el array como body
    const requestData = Array.isArray(idEjecutivo) ? idEjecutivo : [Number(idEjecutivo)];
    const url = `Sesiones/unlock-ejecutivo/${idEjecutivo}`;
    console.log('Enviando a', url, 'con:', requestData);
    const response = await api.patch(url, requestData, {
      headers: {
        'Accept': '*/*'
      }
    });
    console.log('Respuesta de', url + ':', response.data);
    return response.data;
  } catch (error) {
    console.error('Error al desbloquear ejecutivo:', error);
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

export const newCampaign = async (body) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No hay token de autenticación disponible. Por favor, inicie sesión nuevamente.');
    }
    console.log('📤 Enviando a /carteras/nueva-campania:', body);
    // El interceptor añade el token automáticamente
    const response = await api.post('/carteras/nueva-campania', body, {
      headers: {
        'Accept': '*/*',
        'Content-Type': 'application/json'
      }
    });
    console.log('📥 Respuesta de /carteras/nueva-campania:', response);
    return response;
  } catch (error) {
    console.error('Error al crear campaña:', error);
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

export const campaignCleaning = async ({ idCampaña }) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No hay token de autenticación disponible. Por favor, inicie sesión nuevamente.');
    }
    const params = { idCampaña };
    console.log('Enviando a /carteras/limpiar-campania con:', params);
    // El interceptor añade el token automáticamente
    const response = await api.put('/carteras/limpiar-campania', {}, {
      params,
      headers: {
        'Accept': '/'
      }
    });
    console.log('Respuesta de /carteras/limpiar-campania:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error al limpiar la campaña:', error);
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

export const campaignDeleteada = async ({ idCampaña }) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No hay token de autenticación disponible. Por favor, inicie sesión nuevamente.');
    }
    const params = { idCampaña };
    console.log('Enviando a /carteras/eliminar-campania con:', params);
    // El interceptor añade el token automáticamente
    const response = await api.delete('/carteras/eliminar-campania', {
      params,
      headers: {
        'Accept': '/'
      }
    });
    console.log('Respuesta de /carteras/eliminar-campania:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error al eliminar campaña:', error);
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

export const campainghInCharge = async ({ idEncargado, idCartera, idProducto }) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No hay token de autenticación disponible. Por favor, inicie sesión nuevamente.');
    }
    const url = `/campañas/campañas-encargado/${idEncargado}/${idCartera}/${idProducto}`;
    console.log('Enviando a', url, 'con:', { idEncargado, idCartera, idProducto });
    // El interceptor añade el token automáticamente
    const response = await api.get(url, {
      headers: {
        Accept: '/'
      }
    });
    console.log('Respuesta de', url + ':', response.data);
    return response.data;
  } catch (error) {
    console.error('Error al obtener la Campañas de encargado:', error);
    if (error.response?.status === 401) {
      console.warn('⚠️ Error 401 - Token inválido o expirado');
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

export const enabledUnenabledCampaign = async (body) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No hay token de autenticación disponible. Por favor, inicie sesión nuevamente.');
    }
  const { idCampaña, ...rest } = body;
  const url = `/campañas/habilitar-deshabilitar/${idCampaña}`;
    console.log('📤 Enviando a', url, 'con:', rest);
    // El interceptor añade el token automáticamente
    const response = await api.patch(url, rest, {
      headers: {
        'Accept': '/',
        'Content-Type': 'application/json'
      }
    });
    console.log('📥 Respuesta de', url + ':', response);
    return response;
  } catch (error) {
    console.error('Error al encender o apagar campaña:', error);
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


export const topCampaign = async ({ idCampaña }) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No hay token de autenticación disponible. Por favor, inicie sesión nuevamente.');
    }
    const params = { idCampaña };
    console.log('Enviando a /carteras/Top100Filas con:', params);
    // El interceptor añade el token automáticamente
    const response = await api.get('/carteras/Top100Filas', {
      params,
      headers: {
        'Accept': '*/*'
      }
    });
    console.log('Respuesta de /carteras/Top100Filas:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error al obtener las 100 filas:', error);
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




export const CreatedTableTempFilas = async (idCampaña) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No hay token de autenticación disponible. Por favor, inicie sesión nuevamente.');
    }
    const NombreTabla = `FilasTemp_${idCampaña}`;
    const payload = { NombreTabla };
    const url = `/carteras/crea-tabla-filasTemp?idCampaña=${idCampaña}`;
    console.log('Enviando a', url, payload);
    // El interceptor añade el token automáticamente
    const response = await api.post(url, payload, {
      headers: {
        'Accept': '*/*',
      }
    });
    console.log('Respuesta de /carteras/nueva-campania:', response);
    return response;
  } catch (error) {
    console.error('Error al crear tabla temporal de filas cargadas:', error);
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


export const CargaFilasExcel = async (idCampaña, idCartera) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No hay token de autenticación disponible. Por favor, inicie sesión nuevamente.');
    }
    // El nombre de la tabla debe ser solo con el idCampaña
    const NombreTabla = `FilasTemp_${idCampaña}`;
    const payload = { NombreTabla };
    const url = `/carteras/carga-filas?idCampaña=${idCampaña}&idCartera=${idCartera}`;
    console.log('Enviando a', url, payload);
    // El interceptor añade el token automáticamente
    const response = await api.post(url, payload, {
      headers: {
        'Accept': '*/*',
      }
    });
    console.log('Respuesta de /carteras/carga-filas:', response);
    return response;
  } catch (error) {
    console.error('Error al cargar filas excel:', error);
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



export const UsuarioRestante = async (idCampaña) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No hay token de autenticación disponible. Por favor, inicie sesión nuevamente.');
    }
    const url = `/carteras/Ejecutivos-en-Campaña?idCampaña=${idCampaña}`;
    console.log('Enviando a', url);
    // El interceptor añade el token automáticamente
    const response = await api.get(url, null, {
      headers: {
        'Accept': '*/*',
      }
    });
    console.log('Respuesta de /carteras/Ejecutivos_en-Campaña:', response);
    return response;
  } catch (error) {
    console.error('Error al cargar Ejecutivos en Campaña:', error);
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




export const asignaEjecutivoCampanas = async (inserta, idCampaña, idEjecutivo) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No hay token de autenticación disponible. Por favor, inicie sesión nuevamente.');
    }
    const url = `/carteras/Asigna-ejecutivos-campaña?inserta=${inserta}&idCampaña=${idCampaña}&idEjecutivo=${idEjecutivo}`;
    // El interceptor añade el token automáticamente
    const response = await api.post(url, null, {
      headers: {
        'Accept': '*/*',
      }
    });
    console.log('Respuesta de /carteras/Asigna-ejecutivos-campaña:', response);
    return response;
  } catch (error) {
    console.error('Error al asignar ejecutivos a campañas:', error);
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

export const ValidatorsNormal = async (idProducto) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No hay token de autenticación disponible. Por favor, inicie sesión nuevamente.');
    }
    const url = `/ejecutivos/validadores?idProducto=${idProducto}`;
    console.log('Enviando a', url);
    // El interceptor añade el token automáticamente
    const response = await api.get(url, {
      headers: {
        'Accept': '*/*',
      }
    });
    console.log('Respuesta de /ejecutivos/validadores:', response);
    return response;
  } catch (error) {
    console.error('Error al obtener validadores:', error);
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


export const Validatorsregrets = async (idProducto) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No hay token de autenticación disponible. Por favor, inicie sesión nuevamente.');
    }
    const url = `/ejecutivos/validadores-arrepentimientos?idProducto=${idProducto}`;
    console.log('Enviando a', url);
    // El interceptor añade el token automáticamente
    const response = await api.get(url, {
      headers: {
        'Accept': '*/*',
      }
    });
    console.log('Respuesta de /ejecutivos/validadores-arrepentimientos:', response);
    return response;
  } catch (error) {
    console.error('Error al obtener validadores arrepentimientos:', error);
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


export const InsertDeletedValidators = async (body) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No hay token de autenticación disponible. Por favor, inicie sesión nuevamente.');
    }
    // El interceptor añade el token automáticamente
    const response = await api.post('/ejecutivos/inserta-elimina-validador', body, {
      headers: {
        'Accept': '*/*',
        'Content-Type': 'application/json'
      }
    });
    console.log('Respuesta de /ejecutivos/inserta-elimina-validador:', response);
    return response;
  } catch (error) {
    console.error('Error insertar o eliminar validador:', error);
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

export const InsertDeletedValidatorsRegrets = async (body) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No hay token de autenticación disponible. Por favor, inicie sesión nuevamente.');
    }
    // El interceptor añade el token automáticamente
    const response = await api.post('/ejecutivos/inserta-elimina-validadores-arrepentimientos', body, {
      headers: {
        'Accept': '*/*',
        'Content-Type': 'application/json'
      }
    });
    console.log('Respuesta de /ejecutivos/inserta-elimina-validadores-arrepentimientos:', response);
    return response;
  } catch (error) {
    console.error('Error insertar o eliminar validador arrepentimientos:', error);
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

export const ResetPassword = async (body) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No hay token de autenticación disponible. Por favor, inicie sesión nuevamente.');
    }
    // El interceptor añade el token automáticamente
    const response = await api.post('/Sesiones/reset-password-ejecutivo', body, {
      headers: {
        'Accept': '*/*',
        'Content-Type': 'application/json'
      }
    });
    console.log('Respuesta de /Sesiones/reset-password-ejecutivo:', response);
    return response;
  } catch (error) {
    console.error('Error al resetear contraseña:', error);
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


export const AvanceCampaing = async (idEncargado, idCartera, idProducto) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No hay token de autenticación disponible. Por favor, inicie sesión nuevamente.');
    }
    const url = `/carteras/FilasRestantesPorCampaña?idEncargado=${idEncargado}&idCartera=${idCartera}&idProducto=${idProducto}`;
    console.log('Enviando a', url);
    // El interceptor añade el token automáticamente
    const response = await api.get(url, {
      headers: {
        'Accept': '*/*',
      }
    });
    console.log('Respuesta de /carteras/FilasRestantesPorCampaña:', response);
    return response;
  } catch (error) {
    console.error('Error al obtener avance de campañas:', error);
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

// Guardar plantilla 
export const SaveCreateTemplate = async (payload) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No hay token de autenticación disponible. Por favor, inicie sesión nuevamente.');
    }
    console.log('📤 Enviando a /PlantillasCorreo/crear-plantilla:', payload);
    console.log('🔑 Token disponible:', token);
    const response = await api.post(
      '/PlantillasCorreo/crear-plantilla',
      payload,
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
    console.log('📥 Respuesta de /PlantillasCorreo/crear-plantilla', response.data);
    return response.data;
  } catch (error) {
    
    console.error('❌ Error al guardar platilla', error);
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

export const ShowFieldScreen = async (idProducto) => {
  try {
    const token = localStorage.getItem('token');
    
    if (!token) {
      throw new Error('No hay token de autenticación disponible. Por favor, inicie sesión nuevamente.');
    }
    
    console.log('📤 Enviando a /CamposPantalla/muestra-campos/');
    console.log('🔑 Parámetros:', { idProducto });
    
    // Para path parameters: /CamposPantalla/{servidor}/{idProducto}/campos-pantalla
      const response = await api.get(`/CamposPantalla/muestra-campos/${idProducto}`);
    
    console.log('📥 Respuesta de /CamposPantalla/muestra-campos/', response.data);
    
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

export const DeleteTemplate = async (data) => {
  try {
    const token = localStorage.getItem('token');
    
    if (!token) {
      throw new Error('No hay token de autenticación disponible. Por favor, inicie sesión nuevamente.');
    }
    
    console.log('📤 Enviando a /PlantillasCorreo/eliminar-plantillas', data);
    console.log('🔑 Parámetros:', { data });
    
    // Para path parameters: /CamposPantalla/{servidor}/{idProducto}/campos-pantalla
      const response = await api.delete(`/PlantillasCorreo/eliminar-plantillas`, data);
    
    console.log('📥 Respuesta de /PlantillasCorreo/eliminar-plantillas', response.data);
    
    return response.data;
  } catch (error) {
     console.error('❌ Error al eliminar plantilla', error);
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

export const UpdateTemplate = async (data) => {
  try {
    const token = localStorage.getItem('token');
    
    if (!token) {
      throw new Error('No hay token de autenticación disponible. Por favor, inicie sesión nuevamente.');
    }
    
    console.log('📤 Enviando a /PlantillasCorreo/actualizar-plantillas', data);
    console.log('🔑 Parámetros:', { data });
    
    // Para path parameters: /CamposPantalla/{servidor}/{idProducto}/campos-pantalla
      const response = await api.put(`/PlantillasCorreo/actualizar-plantillas`, data);
    
    console.log('📥 Respuesta de PlantillasCorreo/actualizar-plantillas', response.data);
    
    return response.data;
  } catch (error) {
     console.error('❌ Error al Actualizar plantilla', error);
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