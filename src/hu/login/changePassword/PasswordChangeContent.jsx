import React from "react";
import { ExclamationKey } from "./PasswordIcons";
import ButtonLogin from '../ButtonLogin';
import { useNavigate } from 'react-router-dom';
import { useUserStore } from "../../../contextGlobal/userStore";

const PasswordChangeContent = ({ onAccept }) => {
  const dias = useUserStore((state) => state.user?.dias); 
  const navigate = useNavigate();
  
  console.log("Días desde store:", dias);

  const handleNoClick = () => {
    navigate('/dashboardPage');
  };

  // Determinar el mensaje según los días
  const getMensaje = () => {
    if (dias === undefined || dias === null) {
      return "Tu contraseña ha expirado";
    }
    
    if (dias <= 0) {
      return "Su contraseña ha expirado";
    }
    
    if (dias === 1) {
      return `Su contraseña expira en ${dias} día`;
    }
    
    return `Su contraseña expira en ${dias} días`;
  };

  // Determinar si debe mostrar la pregunta o solo el botón de cambiar
  const passwordExpired = dias === undefined || dias === null || dias <= 0;

  return (
    <div className="flex flex-col justify-center items-center p-6">
      <div className="w-full relative mb-6">
        <div className="flex items-center justify-center">
          <ExclamationKey className="size-10 p-0 text-yellow-500" />
          <h3 className="text-2xl font-bold text-neutral-950 ml-3">
            Gestor de Contraseña
          </h3>
        </div>
      </div>

      <div className="text-black w-full text-center mb-2 p-2 rounded-lg opacity-80">
        <h6 className={`text-lg font-semibold ${passwordExpired ? 'text-red-600' : ''}`}>
          {getMensaje()}
        </h6>
        
        {!passwordExpired && (
          <h6 className="text-lg font-semibold mt-2">¿Desea cambiar ahora?</h6>
        )}
        
        {passwordExpired && (
          <h6 className="text-lg font-semibold mt-2 text-red-600">
            Debe actualizar su contraseña para continuar
          </h6>
        )}
      </div>

      <hr className="text-jerarquia1 w-full mb-8" />

      <div className="flex justify-between w-full gap-4">
        {!passwordExpired ? (
          <>
            {/* Si NO ha expirado, mostrar ambos botones */}
            <button
              onClick={handleNoClick}
              className="w-full btn rounded-lg bg-red-700 border border-red-700 hover:border-jerarquia4 text-background-dashboard hover:text-jerarquia4 hover:bg-red-600 hover:shadow-lg hover:shadow-red-700 transition-all duration-200 font-medium"
            >
              No
            </button>
            <ButtonLogin onClick={onAccept}>
              Sí
            </ButtonLogin>
          </>
        ) : (
          <>
            {/* Si YA expiró, solo mostrar botón de cambiar */}
            <ButtonLogin 
              onClick={onAccept}
              className="w-full"
            >
              Cambiar Contraseña
            </ButtonLogin>
          </>
        )}
      </div>
    </div>
  );
};

export default PasswordChangeContent;