import React from "react";
import { useState } from "react";
import LoginWallets from "./LoginWallets";

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic
    console.log('Login submitted', { username, password });
  };

  const handleUsernameChange = (e) => {
  const value = e.target.value.replace(/[^a-zA-Z]/g, '').toUpperCase().slice(0, 4);
  setUsername(value);
};

const handlePasswordChange = (e) => {
  const value = e.target.value;
  setPassword(value);

  // Validación: mínimo 10 caracteres
  if (value.length > 0 && value.length < 10) {
    setPasswordError('La contraseña debe tener al menos 10 caracteres.');
  } else {
    setPasswordError('');
  }
}

  return (
    <>
      {/* Login Form */}
      <form onSubmit={handleSubmit} className="lg:w-1/2 px-6 text-neutral-900">
        <h4 className="text-lg font-semibold pt-8 text-center pb-6 text-neutral-100">
          Iniciar Sesion
        </h4>
        {/* Username Field */}
        <div className=" flex">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-9"
          >
            <path
              fillRule="evenodd"
              d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
              clipRule="evenodd"
            />
          </svg>

          <div className="input-floating mb-4">
            <input
              type="text"
              placeholder="COOR"
              className="input w-full px-3 py-2 text-neutral-900 text-sm bg-neutral-100 border rounded-lg border-jerarquia2 focus:ring-2 focus:ring-jerarquia2 focus:outline-none"
              value={username}
              onChange={handleUsernameChange}
              maxLength={4}
              required
              autoComplete={username}
              id="floatingInput"
            />
            <label
              className="input-floating-label block text-sm font-medium mb-1"
              htmlFor="floatingInput"
            >
              Usuario
            </label>
          </div>
        </div>
        <div className="flex ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="size-9"
          >
            <path
              fillRule="evenodd"
              d="M12 1.5a5.25 5.25 0 0 0-5.25 5.25v3a3 3 0 0 0-3 3v6.75a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3v-6.75a3 3 0 0 0-3-3v-3c0-2.9-2.35-5.25-5.25-5.25Zm3.75 8.25v-3a3.75 3.75 0 1 0-7.5 0v3h7.5Z"
              clipRule="evenodd"
            />
          </svg>

          <div className="input-floating mb-4">
            <input
              type="password"
              placeholder=""
              className="w-full px-3 text-neutral-900 py-2 text-sm bg-neutral-100 rounded-lg border border-jerarquia2 focus:ring-2 focus:ring-jerarquia2 focus:outline-none"
              value={password}
              onChange={handlePasswordChange}
              minLength={10}
              maxLength={50}
              required
              autoComplete="current-password"
              id="password-floating"
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
          </div>
        </div>
        {/*  <LoginWallets /> */}
        <button
          type="submit"
          className="w-full bg-jerarquia2 text-neutral-900 hover:text-neutral-200 border border-jerarquia2 hover:border hover:border-jerarquia1  focus:ring-2 focus:ring-jerarquia1 py-2 px-4 mt-14 rounded-lg text-sm font-medium hover:bg-jerarquia3 focus:outline-none cursor-pointer transition duration-200 ease-in-out hover:shadow-lg hover:shadow-jerarquia2"
        >
          Acceder
        </button>

        {/* Footer */}
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