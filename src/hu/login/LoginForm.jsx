import React from "react";
import { useState } from "react";
import LoginWallets from "./LoginWallets";
import { LoginUser,LoginKey } from "./LoginIcons";

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Lógica de login
    console.log('Login submitted', { username, password });
  };

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

  return (
    <>
      {/* Login Form */}
      <form onSubmit={handleSubmit} className="lg:w-1/2 px-6 text-neutral-900">
        <h4 className="text-lg font-semibold pt-8 text-center pb-6 text-neutral-100">
          Iniciar Sesion
        </h4>
        {/* Username Field */}
        <div className=" flex">
          <LoginUser className="size-9.5 border border-jerarquia2 rounded-l-lg bg-jerarquia2"/>
          <div className="input-floating mb-4">
            <input
              type="text"
              placeholder="COOR"
              className="w-full px-3 text-neutral-900 py-2 text-sm bg-neutral-100 border rounded-r-lg border-jerarquia2 focus:ring-2 focus:ring-jerarquia2 focus:outline-none"
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
          <LoginKey className="size-9.5 border border-jerarquia2 rounded-l-lg bg-jerarquia2"/>
          <div className="input-floating mb-4">
            <input
              type="password"
              placeholder=""
              className="w-full px-3 text-neutral-900 py-2 text-sm bg-neutral-100 border rounded-r-lg border-jerarquia2 focus:ring-2 focus:ring-jerarquia2 focus:outline-none"
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