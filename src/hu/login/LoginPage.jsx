// src/pages/LoginPage.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import LoginCard from "./LoginCard";

const LoginPage = () => {
  const [showPasswordContent, setShowPasswordContent] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);

  return (
    <>
      <div className="min-h-screen min-w-screen flex justify-center p-4 bg-background-primary">
        <div className="block justify-center items-center my-auto">
          
          {/* LoginCard con ambos contenidos */}
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