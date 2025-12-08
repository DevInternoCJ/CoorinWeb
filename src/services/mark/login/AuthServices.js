import api from '../../../loki/apiConfig';

const API_URL = import.meta.env.VITE_API_URL;

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
      ip: "192.168.7.116",
      aplicacion: "Coorin",
      version: "3.4.2",
      servidor: "Orochi"
    };
    console.log('Enviando a /Auth/login:', requestData);
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
      console.log(' Token guardado en localStorage:', response.data.ejecutivo.Token);   
      // Verificar que realmente se guardó
      const savedToken = localStorage.getItem('token');
      console.log('Token recuperado de localStorage:', savedToken);
      // Guardar datos del usuario
      localStorage.setItem('userData', JSON.stringify({
        idEjecutivo: response.data.ejecutivo.idEjecutivo,
        usuario: response.data.ejecutivo.Usuario,
        nombre: response.data.ejecutivo.NombreEjecutivo,
        dias: response.data.ejecutivo.Días,
        Jerarquía: response.data.ejecutivo.Jerarquía
      }));
    } else {
      console.warn('No se recibió token en la respuesta');
      console.warn('Estructura completa de la respuesta:', response.data);
    }    
    return response.data;
  } catch (error) {
    console.error('Error en el inicio de sesión:', error);
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
//     console.log('Enviando a /Auth/validar-contrasenia:', requestData);
//     const response = await api.post('/Auth/validar-contrasenia', requestData);
//     console.log('Respuesta de /Auth/validar-contrasenia:', response.data);
//     return response.data;
//   } catch (error) {
//     console.error('Error en validación de contraseña:', error);
//     throw error;
//   }
// };