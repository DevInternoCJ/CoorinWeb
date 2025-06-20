// src/components/LoginForm.jsx
import React, { useState } from "react";
import { toast } from 'sonner'; // Para notificaciones
import { useNavigate } from 'react-router-dom'; // Para redirección
import { loginUser } from '../../services/LokiServices'; // <--- ¡IMPORTANTE! Asegúrate de que esta ruta sea correcta

import LoginWallets from "./LoginWallets"; // Si lo usas, asegúrate de que esté importado
import { LoginUser, LoginKey } from "./LoginIcons"; // Tus iconos

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState(''); // Para errores de validación de contraseña del frontend
  const [loading, setLoading] = useState(false); // <--- Nuevo estado para la carga
  const [apiError, setApiError] = useState(''); // <--- Nuevo estado para errores de la API
  const navigate = useNavigate(); // <--- Hook para la navegación

  const handleUsernameChange = (e) => {
    const value = e.target.value.replace(/[^a-zA-Z]/g, '').toUpperCase().slice(0, 4);
    setUsername(value);
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    setPasswordError(
      value.length > 0 && value.length < 10
        ? 'La contraseña debe tener al menos 10 caracteres.'
        : ''
    );
  };

  const handleSubmit = async (e) => { // <--- Convertir a async
    e.preventDefault();

    // Validaciones básicas de frontend (además de minLength/maxLength en el input)
    if (passwordError) {
      toast.error(passwordError); // Muestra el error de validación de contraseña
      return;
    }
    if (!username || !password) {
      toast.error('Por favor, ingresa tu usuario y contraseña.');
      return;
    }

    setLoading(true); // Activa el estado de carga
    setApiError(''); // Limpia cualquier error de API anterior

    const userData = {
      usuario: username, // Tu API espera 'usuario'
      contrasenia: password, // Tu API espera 'contrasenia'
      extension: 0,
      bloqueo: 1,
      dominio: "CONJUR",
      computadora: "Coorin",
      usuarioWindows: username,
      ip: "192.168.7.33:8030", // Puedes intentar obtener la IP del cliente en el frontend, pero es más fiable que el backend la capture.
      aplicacion: "Coorin", // Un identificador de tu aplicación
      version: "3.4.2", // La versión actual de tu frontend
      servidor: "Cronoss"
    };

    try {
      const response = await loginUser(userData); // Llama a tu función de la API
      console.log('Respuesta de inicio de sesión exitosa:', response);
      toast.success('¡Inicio de sesión exitoso!');

      // --- Manejo del Token y Redirección ---
      // **MUY IMPORTANTE**: Ajusta esta parte según la estructura REAL de la respuesta de tu API.
      // Basado en ejemplos anteriores (ejecutivo.token o token directo), aquí algunas opciones:
      if (response && response.ejecutivo && response.ejecutivo.token) {
        localStorage.setItem('token', response.ejecutivo.token);
        // Puedes guardar otros datos del ejecutivo si los necesitas
        localStorage.setItem('userData', JSON.stringify(response.ejecutivo));
        navigate('/dashboardPage'); // Redirige
      } else if (response && response.token) { // Si el token viene directamente en la raíz
        localStorage.setItem('token', response.token);
        navigate('/dashboardPage'); // Redirige
      } else {
        // Esto es si el login fue exitoso (status 200) pero no se recibió un token esperado
        toast.warning('Inicio de sesión exitoso, pero no se recibió un token de sesión.');
        // Decide si quieres redirigir de todas formas o esperar un token.
        // Por ahora, redirigimos, pero si el token es CRÍTICO, deberías manejarlo como un error.
        navigate('/dashboardPage');
      }

    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      // Captura el mensaje de error de la API si está disponible
      const errorMessage = error.response?.data?.mensaje || error.message || 'Credenciales inválidas o error de red.';
      setApiError(errorMessage); // Guarda el error para mostrarlo en el formulario
      toast.error(errorMessage); // Muestra el toast con el error
    } finally {
      setLoading(false); // Siempre desactiva el estado de carga al finalizar
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="lg:w-1/2 px-6 text-neutral-900">
        <h4 className="text-lg font-semibold pt-8 text-center pb-6 text-neutral-100">
          Iniciar Sesion
        </h4>
        {/* Username Field */}
        <div className=" flex">
          <LoginUser className="size-9.5 border border-jerarquia2 rounded-l-lg bg-jerarquia2" />
          <div className="input-floating mb-4">
            <input
              type="text"
              placeholder="COOR"
              className="w-full px-3 text-neutral-900 py-2 text-sm bg-neutral-100 border rounded-r-lg border-jerarquia2 focus:ring-2 focus:ring-jerarquia2 focus:outline-none"
              value={username}
              onChange={handleUsernameChange}
              maxLength={4}
              required
              autoComplete="username" // Buena práctica para la accesibilidad
              id="floatingInput"
              disabled={loading}
            />
            <label
              className="input-floating-label border-0 block text-sm font-medium mb-1"
              htmlFor="floatingInput"
            >
              Usuario
            </label>
          </div>
        </div>
        <div className="flex ">
          <LoginKey className="size-9.5 border border-jerarquia2 rounded-l-lg bg-jerarquia2" />
          <div className="input-floating mb-4">
            <input
              type="password"
              placeholder="**********"
              className="w-full px-3 text-neutral-900 py-2 text-sm bg-neutral-100 border rounded-r-lg border-jerarquia2 focus:ring-2 focus:ring-jerarquia2 focus:outline-none"
              value={password}
              onChange={handlePasswordChange}
              minLength={10}
              maxLength={50}
              required
              autoComplete="current-password" // Buena práctica para la accesibilidad
              id="password-floating"
              disabled={loading}
            />
            <label
              className="input-floating-label block text-sm font-medium text-neutral-500 mb-1"
              htmlFor="password-floating"
            >
              Contraseña
            </label>
            <div
              data-strong-password='{
                "target": "#password-floating",
                "stripClasses": "strong-password:bg-jerarquia1 strong-password-accepted:bg-jerarquia2 h-1.5 flex-auto bg-neutral-500"
              }'
              className="rounded-full overflow-hidden mt-2 flex gap-0.5"
            ></div>
            {passwordError && (
              <p className="text-red-400 text-xs mt-1">{passwordError}</p>
            )}
            {apiError && ( /* Muestra el error de la API si existe */
              <p className="text-red-500 text-sm mt-1">{apiError}</p>
            )}
          </div>
        </div>
        {/* <LoginWallets /> */}
        <button
          type="submit"
          className="w-full bg-jerarquia2 text-neutral-900 hover:text-neutral-200 border border-jerarquia2 hover:border hover:border-jerarquia1  focus:ring-2 focus:ring-jerarquia1 py-2 px-4 mt-14 rounded-lg text-sm font-medium hover:bg-jerarquia3 focus:outline-none cursor-pointer transition duration-200 ease-in-out hover:shadow-lg hover:shadow-jerarquia2"
          disabled={loading}
        >
          {loading ? 'Accediendo...' : 'Acceder'}
        </button>
        <div className=" px-6 mt-3 rounded-4xl py-4  text-center">
          <p className="text-[10px] text-neutral-400">© 2025 Coorin</p>
          <p className="text-[10px] text-neutral-400 mt-1">
            Powered By React & Tailwind CSS
          </p>
        </div>
      </form>
    </>
  );
};

export default LoginForm;