import React, { useState, useEffect } from "react";
import LogoCoorin7 from "../../assets/logo_coorin_7.svg";
import CoorinBlack from "../../assets/CoorinBlack.svg";
import CoorinGreen from "../../assets/CoorinGreen.svg";
import LogicCard from "./LogicCard";
import LoginForm from "./LoginForm";
import PasswordChangeContent from "./changePassword/PasswordChangeContent";
import ChangePassword from "./changePassword/ChangePassword";
import { useThemeStore } from "../../contextGlobal/themeStore";

const LoginCard = ({ logo = null, formComponent = null, children }) => {
  const { isDark } = useThemeStore();
  // Seleccionar logo según el modo de color activo
  const activeLogo = logo ?? (isDark ? CoorinGreen : CoorinBlack);
  const [showPasswordContent, setShowPasswordContent] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [diasRestantes, setDiasRestantes] = useState(null);
  const [passwordExpiredData, setPasswordExpiredData] = useState(null);

  useEffect(() => {
    // Obtener los días desde sessionStorage (preferido) o localStorage como fallback
    const raw =
      sessionStorage.getItem("userData") || localStorage.getItem("userData");
    const userData = raw;
    if (userData) {
      const parsedData = JSON.parse(userData);
      setDiasRestantes(parsedData.dias);
    }
  }, []);

  // Función mejorada con más debug y manejo de estado
  //  Recibir datos de contraseña expirada
  const handlePasswordExpired = (data) => {
    console.log(" Contraseña expirada con datos:", data);
    setPasswordExpiredData(data);
    setDiasRestantes(data.diasRestantes);
    setShowPasswordContent(false);
    setShowChangePassword(true); //  Mostrar directamente ChangePassword
  };

  const handleLoginSuccess = (data) => {
    console.log(" handleLoginSuccess EJECUTADO con:", data);

    if (!data) {
      console.error(" ERROR: data es null/undefined");
      return;
    }

    console.log("Actualizando estado...");
    setPasswordExpiredData(data);
    setDiasRestantes(data.diasRestantes);
    setShowPasswordContent(true);

    // Verificar que el estado se actualizó
    setTimeout(() => {
      console.log("Estado después de handleLoginSuccess:", {
        showPasswordContent,
        showChangePassword,
        diasRestantes,
        passwordExpiredData,
      });
    }, 100);
  };

  // Función para manejar el click en "Sí" en PasswordChangeContent
  const handleAcceptPasswordChange = () => {
    console.log("Usuario aceptó cambiar contraseña. Datos disponibles:", {
      passwordExpiredData,
      tieneContraActual: passwordExpiredData?.contraActual ? " SÍ" : " NO",
      usuario: passwordExpiredData?.username,
    });

    if (!passwordExpiredData) {
      console.error(
        "ERROR: No hay passwordExpiredData para cambiar contraseña",
      );
      return;
    }

    setShowPasswordContent(false);
    setShowChangePassword(true);
  };

  // Función para cerrar PasswordChangeContent
  const handleClosePasswordContent = () => {
    setShowPasswordContent(false);
    setPasswordExpiredData(null);
  };

  // Función para cerrar ChangePassword
  const handleCloseChangePassword = () => {
    setShowChangePassword(false);
    setPasswordExpiredData(null);
    setDiasRestantes(null);
  };

  // NUEVO: useEffect para debug del estado
  useEffect(() => {
    console.log(" LoginCard - Estado actualizado:", {
      showPasswordContent,
      showChangePassword,
      passwordExpiredData: passwordExpiredData
        ? {
            username: passwordExpiredData.username,
            contraActual: passwordExpiredData.contraActual
              ? "PRESENTE"
              : " AUSENTE",
            diasRestantes: passwordExpiredData.diasRestantes,
            mensaje: passwordExpiredData.mensaje,
          }
        : "NULL",
      diasRestantes,
    });
  }, [
    showPasswordContent,
    showChangePassword,
    passwordExpiredData,
    diasRestantes,
  ]);

  const defaultContent = formComponent ? (
    React.createElement(formComponent, {
      onLoginSuccess: handleLoginSuccess,
      onPasswordExpired: handlePasswordExpired, //  Pasar el callback
    })
  ) : (
    <LoginForm
      onLoginSuccess={handleLoginSuccess}
      onPasswordExpired={handlePasswordExpired} //  Pasar el callback
    />
  );

  // Fondo SVG inline — los colores cambian con el tema
  const LoginBgSvg = () => (
    <svg
      id="login-bg-visual"
      viewBox="0 0 900 600"
      preserveAspectRatio="xMidYMid slice"
      xmlns="http://www.w3.org/2000/svg"
      className="absolute inset-0 w-full h-full rounded-4xl transition-colors duration-500 pointer-events-none z-0"
      aria-hidden="true"
    >
      <path
        d="M374 600L386.5 566.7C399 533.3 424 466.7 421.7 400C419.3 333.3 389.7 266.7 388.8 200C388 133.3 416 66.7 430 33.3L444 0L900 0L900 33.3C900 66.7 900 133.3 900 200C900 266.7 900 333.3 900 400C900 466.7 900 533.3 900 566.7L900 600Z"
        fill={isDark ? "#0b533aff" : "#147f5e"}
      />
      <path
        d="M648 600L637.3 566.7C626.7 533.3 605.3 466.7 597.7 400C590 333.3 596 266.7 612.7 200C629.3 133.3 656.7 66.7 670.3 33.3L684 0L900 0L900 33.3C900 66.7 900 133.3 900 200C900 266.7 900 333.3 900 400C900 466.7 900 533.3 900 566.7L900 600Z"
        fill={isDark ? "#051c10" : "#255241ff"}
      />
    </svg>
  );

  return (
    <div className="bg-bgcolor1 shadow-lg rounded-4xl">
      {/* Contenedor con SVG de fondo inline — relative para posicionar el SVG */}
      <div className="relative w-xs sm:w-md md:xl lg:w-3xl rounded-4xl h-4xl block lg:flex justify-center p-4 font-sans overflow-hidden">
        {/* Fondo SVG reactivo al tema */}
        <LoginBgSvg />
        {/* Logo - solo se muestra en login normal */}
        {!showPasswordContent && !showChangePassword && (
          <div className="relative z-10 lg:w-1/2">
            <div className="w-full text-center md:pt-8 px-6">
              <LogicCard
                id="login-logo-card"
                intensity={5}
                scale={1.02}
                className="mt-5"
              >
                <img
                  src={activeLogo}
                  alt="logo-coorin"
                  className="mx-auto my-auto h-auto max-w-[15vh] lg:max-w-[25vh] rotate-x-30 -rotate-y-30 transition-all duration-500 ease-out"
                />
              </LogicCard>
            </div>
          </div>
        )}

        {/* Contenido principal */}
        <div
          className={`relative z-10 ${
            !showPasswordContent && !showChangePassword ? "lg:w-1/2" : "w-full"
          }`}
        >
          {showPasswordContent ? (
            <PasswordChangeContent
              onClose={handleClosePasswordContent}
              onAccept={handleAcceptPasswordChange}
              dias={diasRestantes || 0}
            />
          ) : showChangePassword ? (
            <>
              {/*  RENDER CONDICIONAL BASADO EN DATOS */}
              {passwordExpiredData && passwordExpiredData.contraActual ? (
                <ChangePassword
                  onClose={handleCloseChangePassword}
                  show={true}
                  contraActual={passwordExpiredData.contraActual}
                  username={passwordExpiredData.username}
                  passwordData={passwordExpiredData}
                />
              ) : (
                <div></div>
              )}
            </>
          ) : (
            children || defaultContent
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginCard;
