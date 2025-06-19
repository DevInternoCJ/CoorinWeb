import React from "react";
import { ExclamationKey } from "./PasswordIcons"; 
const PasswordChangeQuestion = ({ onClose, show }) => {
  return (
    <div
      id="middle-center-modal"
      className={`fixed top-0 left-0 w-full h-full flex justify-center items-center z-10 ${show}`}
      role="dialog"
      aria-modal="true"
    >
      {/* Fondo oscuro con opacidad */}
      <div className="fixed top-0 left-0 w-full h-full bg-neutral/40 backdrop-blur-sm" />
      {/* Contenedor del modal (cuadro blanco) */}
      <div className="bg-background-dashboard rounded-2xl shadow-2xl shadow-black p-6 w-md z-10 relative">
        <div className="modal-header pl-0 pt-0">
          <div className="flex items-center justify-start">
            <ExclamationKey className="size-10 p-0 text-yellow-600" />
            <h3 className="modal-title text-jerarquia4">
              Gestor de Contraseña
            </h3>
          </div>
          <button
            onClick={onClose}
            type="button"
            className="btn btn-text btn-circle btn-sm absolute end-0 top-0 "
            aria-label="Close"
            data-overlay="#middle-start-modal"
          >
            <span className=" hover:rotate-30 text-2xl text-jerarquia4 hover:text-jerarquia3">
              ×
            </span>
          </button>
        </div>
        <div className="mb-8 text-jerarquia4">
          <h6 className="text-lg">Su contraseña expira en __ dias</h6>
          <h6 className="text-lg">¿Desea cambiar ahora?</h6>
        </div>
        <hr className="text-jerarquia1 w-full mb-8"/>
        <div className="flex justify-between w-full ">
          <button className="w-2/5 btn rounded-lg bg-red-700 border border-red-700 hover:border-jerarquia4 text-background-dashboard hover:text-jerarquia4 hover:bg-red-600 hover:shadow-lg hover:shadow-red-700">
            No
          </button>
          <button className="w-2/5 btn rounded-lg bg-jerarquia3 hover:bg-jerarquia2 border border-jerarquia3 hover:border-jerarquia4 text-background-dashboard hover:text-neutral-800 hover:shadow-lg hover:shadow-jerarquia3">
            Si
          </button>
        </div>
      </div>
    </div>
  );
};

export default PasswordChangeQuestion;
