// src/components/LoginForm.jsx
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom'; // Para redirección
import { loginUser } from '../../services/LokiServices'; // <--- ¡IMPORTANTE! Asegúrate de que esta ruta sea correcta
import ButtonLogin from './ButtonLogin'
import LoginWallets from "./LoginWallets"; // Si lo usas, asegúrate de que esté importado
import { LoginUser, LoginKey } from "./LoginIcons"; // Tus iconos

const LoginForm = ({onLoginSuccess}) => {
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
      value.length > 0 && value.length < 8
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
      usuarioWindows: username,
    };

    try {
      const response = await loginUser(userData);
      console.log('Respuesta de inicio de sesión exitosa:', response);
      toast.success('¡Inicio de sesión exitoso!');

      // Manejo del token
      if (response && response.ejecutivo && response.ejecutivo.token) {
        localStorage.setItem('token', response.ejecutivo.token);
        localStorage.setItem('userData', JSON.stringify(response.ejecutivo));
        
        // Llama a la función de éxito para mostrar PasswordChangeContent
        if (onLoginSuccess) {
          onLoginSuccess();
        } else {
          navigate('/dashboardPage');
        }
        
      } else if (response && response.token) {
        localStorage.setItem('token', response.token);
        
        if (onLoginSuccess) {
          onLoginSuccess();
        } else {
          navigate('/dashboardPage');
        }
        
      } else {
        toast.warning('Inicio de sesión exitoso, pero no se recibió un token de sesión.');
        if (onLoginSuccess) {
          onLoginSuccess();
        } else {
          navigate('/dashboardPage');
        }
      }

    } catch (error) {
      // ... manejo de errores ...
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="lg:w-full px-6 text-neutral-900">
        <h4 className="text-2xl font-bold pt-8 text-center pb-6 text-jerarquia1">
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
         <ButtonLogin
          type="submit"
          loading={loading}
          disabled={loading}
          className="mt-14"
        >
          {loading ? 'Accediendo...' : 'Acceder'}
        </ButtonLogin>
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