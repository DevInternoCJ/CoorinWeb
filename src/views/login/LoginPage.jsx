// src/pages/LoginPage.jsx
import React, { useState } from 'react';
import LoginCard from "./LoginCard";
import ThemeToggle from "../../components/ui/ThemeToggle";

const LoginPage = () => {
  const [showPasswordContent, setShowPasswordContent] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);

  return (
    <>
      {/* Botón de tema — posición fija en la esquina superior derecha */}
      <div className="fixed top-4 right-4 z-50">
        <ThemeToggle />
      </div>

      <div className="min-h-screen min-w-screen flex justify-center p-4 bg-background-dashboard transition-colors duration-300">
        <div className="block justify-center items-center my-auto">
          <LoginCard
            showPasswordContent={showPasswordContent}
            showChangePassword={showChangePassword}
            onClosePassword={() => setShowPasswordContent(false)}
            onCloseChangePassword={() => setShowChangePassword(false)}
          />
        </div>
      </div>
    </>
  );
};
export default LoginPage;