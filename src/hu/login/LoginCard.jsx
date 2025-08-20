// src/components/LoginCard.jsx (versión actualizada)
import React from "react";
import LogoCoorin7 from "../../assets/logo_coorin_7.svg";
import LogicCard from "./LogicCard";
import LoginForm from "./LoginForm";
import PasswordChangeContent from "./changePassword/PasswordChangeContent";
import ChangePassword from "./changePassword/ChangePassword"; // Importamos ChangePassword

const LoginCard = ({
  logo = LogoCoorin7,
  formComponent = null,
  children,
  showPasswordContent = false,
  showChangePassword = false, // Nueva prop para cambio de contraseña
  onClosePassword = () => {},
  onCloseChangePassword = () => {} // Nueva función para cerrar cambio
}) => {
  const defaultContent = formComponent ? (
    React.createElement(formComponent)
  ) : (
    <LoginForm />
  );

  return (
    <div className="bg-bgcolor1 shadow-2xl shadow-gray-500 rounded-4xl">
      <div className="w-xs sm:w-md md:xl lg:w-3xl rounded-4xl h-4xl block lg:flex justify-center p-4 font-sans bg-cover bg-no-repeat bg-center bg-[url(/src/assets/backgroundLogin.svg)]">
        
        {/* Logo - solo se muestra en login normal */}
        { !showChangePassword && (
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
        <div className={ !showChangePassword ? "lg:w-1/2" : "w-full"}>
          {showPasswordContent ? (
            <PasswordChangeContent onClose={onClosePassword} />
          ) : showChangePassword ? (
            <ChangePassword onClose={onCloseChangePassword} show={true} />
          ) : (
            children || defaultContent
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginCard;