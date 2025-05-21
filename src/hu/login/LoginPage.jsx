import React from "react";
import LoginCard from "./LoginCard";
import { useState } from "react";
import PasswordChangeQuestion from './changePassword/PasswordChangeQuestion';
import ChangePassword from "./changePassword/ChangePassword";
import { Navigate } from "react-router-dom";


const MaranathaLogin = () => {
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);

  return (
    <>
      <div className="min-h-screen min-w-screen flex justify-center p-4 bg-background-primary">
        <div className=" block justify-center items-center my-auto">
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
              Modal
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
              Modal tab accessibility
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

export default MaranathaLogin;