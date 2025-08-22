// src/components/LoginForm.jsx
import React, { useState } from "react";
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { loginUser, ValidatePassword } from '../../services/LokiServices';
import ButtonLogin from './ButtonLogin'
import LoginWallets from "./LoginWallets";
import { LoginUser, LoginKey } from "./LoginIcons";

const LoginForm = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState('');
  const navigate = useNavigate();

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (passwordError) {
      toast.error(passwordError);
      return;
    }
    if (!username || !password) {
      toast.error('Por favor, ingresa tu usuario y contraseña.');
      return;
    }
    setLoading(true);
    setApiError('');

    const userData = {
      usuario: username,
      contrasenia: password,
      usuarioWindows: username,
    };

    try {
      const response = await loginUser(userData);
      console.log('Respuesta de inicio de sesión exitosa:', response);

      // Obtener el idEjecutivo de la respuesta
      let idEjecutivo;
      if (response && response.ejecutivo && response.ejecutivo.idEjecutivo) {
        idEjecutivo = response.ejecutivo.idEjecutivo;
      } else if (response && response.idEjecutivo) {
        idEjecutivo = response.idEjecutivo;
      } else {
        throw new Error('No se pudo obtener el idEjecutivo de la respuesta');
      }

      // Guardar el username en localStorage para usarlo en ChangePassword
      localStorage.setItem('username', username);
      // Llamar al endpoint ValidatePassword con los parámetros correctos
      try {
        const passwordValidation = await ValidatePassword(
          {
            contrasenia: password, // La contraseña que el usuario ingresó
            servidor: "Cronoss"    // Valor fijo según tu endpoint
          },
          idEjecutivo              // El idEjecutivo obtenido
        );
        console.log('Respuesta de validación de contraseña:', passwordValidation);

        // Manejar la respuesta según la estructura que devuelve tu API
        // (Ajusta esto según lo que realmente devuelve tu endpoint)
        if (passwordValidation) {
          toast.info('Por favor, actualiza tu contraseña.');
          if (onLoginSuccess) {
            onLoginSuccess();
          }
        } else {
          toast.success('¡Inicio de sesión exitoso!');
          // Guardar token y datos de usuario
          if (response && response.ejecutivo && response.ejecutivo.token) {
            localStorage.setItem('token', response.ejecutivo.token);
            localStorage.setItem('userData', JSON.stringify(response.ejecutivo));
          } else if (response && response.token) {
            localStorage.setItem('token', response.token);
          }

          navigate('/dashboardPage');
        }
      } catch (validationError) {
        console.error('Error en validación de contraseña:', validationError);

        // Si el error es 404, mostrar el mensaje específico de la respuesta
        if (validationError.response && validationError.response.status === 404) {
          const errorMessage = validationError.response.data;
          toast.error(errorMessage);
          setApiError(errorMessage);
        }
        // Si el error es 400, podría significar que la contraseña necesita ser cambiada
        else if (validationError.response && validationError.response.status === 400) {
          toast.info('Por favor, actualiza tu contraseña.');
          if (onLoginSuccess) {
            onLoginSuccess();
          }
        } else {
          const genericError = response.data.loginResult.Mensaje || 'Error al validar la contraseña. Por favor, contacta al administrador.';
          toast.error(genericError);
          setApiError(genericError);
        }
      }

    } catch (error) {
      console.error('Error en inicio de sesión:', error);
      setApiError(error.response.data.loginResult.Mensaje || 'Error al iniciar sesión. Verifica tus credenciales.');
      toast.error(error.response.data.loginResult.Mensaje || 'Error al iniciar sesión. Verifica tus credenciales.');
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
              autoComplete="username"
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
              autoComplete="current-password"
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
            {apiError && (
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