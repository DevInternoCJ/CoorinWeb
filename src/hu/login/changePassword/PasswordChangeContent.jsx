// src/components/PasswordChangeContent.jsx
import React from "react";
import { ExclamationKey } from "./PasswordIcons";

const PasswordChangeContent = ({ onClose, onAccept }) => { // <--- Añade onAccept
  return (
    <div className="flex flex-col justify-center items-center p-6 ">
      <div className="w-full relative mb-6">
        <div className="flex items-center justify-start">
          <ExclamationKey className="size-10 p-0 text-yellow-500" />
          <h3 className="text-2xl font-bold text-neutral-900 ml-3">
            Gestor de Contraseña
          </h3>
        </div>
      </div>
      <div className="mb-8 text-neutral-900 w-full">
        <h6 className="text-lg font-semibold mb-2">
          Su contraseña expira en __ días
        </h6>
        <h6 className="text-lg font-semibold">¿Desea cambiar ahora?</h6>
      </div>
      <hr className="text-jerarquia1 w-full mb-8" />
      <div className="flex justify-between w-full gap-4">
        <button
          onClick={onClose}
          className="w-2/5 btn rounded-lg bg-red-700 border border-red-700 hover:border-jerarquia4 text-background-dashboard hover:text-jerarquia4 hover:bg-red-600 hover:shadow-lg hover:shadow-red-700 transition-all duration-200 py-3 font-medium"
        >
          No
        </button>
        <button 
          onClick={onAccept} // <--- Usa onAccept aquí
          className="w-2/5 btn rounded-lg bg-jerarquia3 hover:bg-jerarquia2 border border-jerarquia3 hover:border-jerarquia4 text-background-dashboard hover:text-neutral-800 hover:shadow-lg hover:shadow-jerarquia3 transition-all duration-200 py-3 font-medium"
        >
          Sí
        </button>
      </div>
    </div>
  );
};
export default PasswordChangeContent;