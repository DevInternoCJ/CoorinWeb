import React, { useState, useEffect} from "react";
import LogoCoorin7 from "../../assets/logo_coorin_7.svg";
import LogicCard from "./LogicCard";
import LoginForm from "./LoginForm";
import PasswordChangeContent from "./changePassword/PasswordChangeContent";
import ChangePassword from "./changePassword/ChangePassword";

const LoginCard = ({
  logo = LogoCoorin7,
  formComponent = null,
  children
}) => {
  const [showPasswordContent, setShowPasswordContent] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [diasRestantes, setDiasRestantes] = useState(null);
  const [passwordExpiredData, setPasswordExpiredData] = useState(null);

  useEffect(() => {
    // Obtener los días del localStorage
    const userData = localStorage.getItem('userData');
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
      passwordExpiredData
    });
  }, 100);
}

  // Función para manejar el click en "Sí" en PasswordChangeContent
  const handleAcceptPasswordChange = () => {
    console.log("Usuario aceptó cambiar contraseña. Datos disponibles:", {
      passwordExpiredData,
      tieneContraActual: passwordExpiredData?.contraActual ? " SÍ" : " NO",
      usuario: passwordExpiredData?.username
    });
    
    if (!passwordExpiredData) {
      console.error("ERROR: No hay passwordExpiredData para cambiar contraseña");
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
      passwordExpiredData: passwordExpiredData ? {
        username: passwordExpiredData.username,
        contraActual: passwordExpiredData.contraActual ? "PRESENTE" : " AUSENTE",
        diasRestantes: passwordExpiredData.diasRestantes,
        mensaje: passwordExpiredData.mensaje
      } : "NULL",
      diasRestantes
    });
  }, [showPasswordContent, showChangePassword, passwordExpiredData, diasRestantes]);

  const defaultContent = formComponent ? (
    React.createElement(formComponent, { 
      onLoginSuccess: handleLoginSuccess,
      onPasswordExpired: handlePasswordExpired //  Pasar el callback
    })
  ) : (
    <LoginForm 
      onLoginSuccess={handleLoginSuccess} 
      onPasswordExpired={handlePasswordExpired} //  Pasar el callback
    />
  );

  return (
    <div className="bg-bgcolor1 shadow-2xl shadow-gray-500 rounded-4xl">
      <div className="w-xs sm:w-md md:xl lg:w-3xl rounded-4xl h-4xl block lg:flex justify-center p-4 font-sans bg-cover bg-no-repeat bg-center bg-[url(/src/assets/backgroundLogin.svg)]">
        
        {/* Logo - solo se muestra en login normal */}
        {!showPasswordContent && !showChangePassword && (
          <div className="lg:w-1/2">
            <div className="w-full text-center md:pt-8 px-6">
              <LogicCard
                id="login-logo-card"
                intensity={5}
                scale={1.05}
                className="mt-5"
              >
                <img
                  src={logo}
                  alt="logo-coorin"
                  className="mx-auto my-auto h-auto max-w-[20vh] lg:max-w-[40vh] rotate-x-30 -rotate-y-30 transition-transform duration-200 ease-out"
                />
              </LogicCard>
            </div>
          </div>
        )}

          {/* Contenido principal */}
        <div className={(!showPasswordContent && !showChangePassword) ? "lg:w-1/2" : "w-full"}>
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
                <div>
                </div>
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


