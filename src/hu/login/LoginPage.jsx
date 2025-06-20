import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import LoginCard from "./LoginCard"; // Ajusta la ruta si es necesario
import PasswordChangeQuestion from "./changePassword/PasswordChangeQuestion"; // Ajusta la ruta
import ChangePassword from "./changePassword/ChangePassword"; // Ajusta la ruta


const LoginPage = () => {
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);

  return (
    <>
      <div className="min-h-screen min-w-screen flex justify-center p-4 bg-background-primary">
        <div className=" block justify-center items-center my-auto">
          {/* LoginCard ahora maneja su propio estado y la llamada a loginUser */}
          <LoginCard /> 
          <div>
            <button
              type="button"
              className="btn btn-primary"
              aria-haspopup="dialog"
              aria-expanded="false"
              aria-controls="middle-center-modal"
              data-overlay="#middle-center-modal"
              onClick={() => setShowPasswordModal(true)}
            >
              gestor
            </button>
            <button
              onClick={() => setShowChangePassword(true)}
              type="button"
              className="btn btn-primary"
              aria-haspopup="dialog"
              aria-expanded="false"
              aria-controls="tab-modal"
              data-overlay="#tab-modal"
            >
              cambio
            </button>
            {/* Este Link debe funcionar correctamente si tienes React Router configurado */}
            <button className="btn btn-primary">
              <Link to="/dashboardPage">dashboard</Link>
            </button>
          </div>
        </div>
      </div>
      {showPasswordModal && (
        <PasswordChangeQuestion onClose={() => setShowPasswordModal(false)} />
      )}
      {showChangePassword && (
        <ChangePassword onClose={() => setShowChangePassword(false)} />
      )}
    </>
  );
};

export default LoginPage;