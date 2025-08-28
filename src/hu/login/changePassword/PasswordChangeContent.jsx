// src/components/PasswordChangeContent.jsx
import React from "react";
import { ExclamationKey } from "./PasswordIcons";
import ButtonLogin from '../ButtonLogin'
import { useNavigate } from 'react-router-dom'; // useNavigate

const PasswordChangeContent = ({ onClose, onAccept}) => {
  const navigate = useNavigate(); 
  const handleNoClick = () => {
    navigate('/dashboardPage'); // <--- Navegar programáticamente
  };
  
  return (
    <div className="flex flex-col justify-center items-center p-6 ">
      <div className="w-full relative mb-6">
        <div className="flex items-center justify-center">
          <ExclamationKey className="size-10 p-0 text-yellow-500" />
          <h3 className="text-2xl font-bold text-neutral-950 ml-3">
            Gestor de Contraseña
          </h3>
        </div>
      </div>
      <div className="mb-8 text-red-800 w-full text-center">
        <h6 className="text-lg font-semibold mb-2">
          Su contraseña expira en {d} días
        </h6>
        <h6 className="text-lg font-semibold">¿Desea cambiar ahora?</h6>
      </div>
      <hr className="text-jerarquia1 w-full mb-8" />
      <div className="flex justify-between w-full gap-4">
        <button
          onClick={handleNoClick}
          className="w-1/2 btn rounded-lg bg-red-700 border border-red-700 hover:border-jerarquia4 text-background-dashboard hover:text-jerarquia4 hover:bg-red-600 hover:shadow-lg hover:shadow-red-700 transition-all duration-200 py-3 font-medium"
        >
          No
        </button>
        <ButtonLogin
          onClick={onAccept}
        >
          Sí
        </ButtonLogin>
      </div>
    </div>
  );
};
export default PasswordChangeContent;