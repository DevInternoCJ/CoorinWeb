import React, { useState, useEffect, useCallback } from "react";
import { EyeOpen, EyeClosed, ArrowSync, LockSync} from "./PasswordIcons";
import PASSWORD_REQUIREMENTS from "./Validations";

const ChangePassword = ({ onClose, show }) => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Estado de errores
  const [errors, setErrors] = useState({
    minLengthError: false,
    uppercaseError: false,
    lowercaseError: false,
    numberError: false,
    symbolError: false,
    matchError: false,
  });

  // Validación de contraseña
  const validatePassword = useCallback((pwd, confirmPwd) => {
    const newErrors = {};
    PASSWORD_REQUIREMENTS.forEach(req => {
      newErrors[req.key] = !req.check(pwd);
    });
    newErrors.matchError = pwd.length > 0 && confirmPwd.length > 0 ? pwd !== confirmPwd : true;
    setErrors(newErrors);
  }, []);

  useEffect(() => {
    validatePassword(newPassword, confirmPassword);
  }, [newPassword, confirmPassword, validatePassword]);

  const handleNewPasswordChange = (e) => setNewPassword(e.target.value);
  const handleConfirmPasswordChange = (e) => setConfirmPassword(e.target.value);

  // Alternar visibilidad de contraseña
  const togglePasswordVisibility = (setter) => {
    setter(true);
    setTimeout(() => setter(false), 400);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    validatePassword(newPassword, confirmPassword);
    const hasError = Object.values(errors).some(Boolean);
    if (hasError) {
      console.log('Errores de validación. No se puede actualizar la contraseña.');
      return;
    }
    console.log('Contraseña actualizada:', newPassword);
    onClose();
  };

  return (
    <div
      id="middle-center-modal"
      className={`fixed top-0 left-0 w-full h-full flex justify-center items-center z-10 ${show}`}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="fixed top-0 left-0 w-full h-full bg-background-primary z-0"
      />
      <div className=" w-2xl z-10 relative bg-background-dashboard rounded-3xl shadow-2xl shadow-jerarquia4">
        <div className="modal-header flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ArrowSync className="size-8 text-jerarquia4"/>
            <h3 className="modal-title text-jerarquia4 font-bold">
              Actualización de Contraseña
            </h3>
          </div>
          <button
            type="button"
            className="text-jerarquia4 hover:text-jerarquia3 focus:outline-none btn btn-text btn-circle btn-sm"
            aria-label="Close"
            onClick={onClose}
          >
            <span className=" text-2xl hover:rotate-30">×</span>
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <input
              type="text"
              name="username"
              id="username-hidden"
              autoComplete="username"
              className="hidden"
              aria-hidden="true"
              tabIndex="-1"
              readOnly
            />
            <div className="flex items-end mb-4 relative">
              <div className="input-floating w-full relative">
                <input
                  type={showNewPassword ? "text" : "password"}
                  placeholder=""
                  className={`w-full pl-3 pr-10 text-neutral-900 py-2 text-sm bg-neutral-100 rounded-lg border focus:ring-2 focus:ring-jerarquia2 focus:outline-none ${
                    newPassword.length > 0 &&
                    (errors.minLengthError ||
                      errors.uppercaseError ||
                      errors.lowercaseError ||
                      errors.numberError ||
                      errors.symbolError)
                      ? "border-red-500 focus:border-red-500"
                      : "border-jerarquia2 focus:border-jerarquia2"
                  }`}
                  value={newPassword}
                  onChange={handleNewPasswordChange}
                  maxLength={50}
                  required
                  autoComplete="new-password"
                  id="new-password-floating"
                />
                <label
                  className="input-floating-label block text-sm font-medium text-neutral-500"
                  htmlFor="new-password-floating"
                >
                  Nueva Contraseña
                </label>
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility(setShowNewPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 text-gray-500"
                  aria-label="Toggle password visibility"
                >
                  {showNewPassword ? (
                    <EyeOpen className="size-5" />
                  ) : (
                    <EyeClosed className="size-5" />
                  )}
                </button>
              </div>
            </div>
            <div className="flex items-end mb-4 relative">
              <div className="input-floating w-full relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder=""
                  className={`w-full pl-3 pr-10 text-neutral-900 py-2 text-sm bg-neutral-100 rounded-lg border focus:ring-2 focus:ring-jerarquia2 focus:outline-none ${
                    confirmPassword.length > 0 && errors.matchError
                      ? "border-red-500 focus:border-red-500"
                      : "border-jerarquia2 focus:border-jerarquia2"
                  }`}
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                  maxLength={50}
                  required
                  autoComplete="new-password"
                  id="confirm-password-floating"
                />
                <label
                  className="input-floating-label ms-2 block text-sm font-medium text-neutral-500"
                  htmlFor="confirm-password-floating"
                >
                  Confirmar Contraseña
                </label>
                <button
                  type="button"
                  onClick={() =>
                    togglePasswordVisibility(setShowConfirmPassword)
                  }
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 text-gray-500"
                  aria-label="Toggle password visibility"
                >
                  {showConfirmPassword ? (
                    <EyeOpen className="size-5" />
                  ) : (
                    <EyeClosed className="size-5" />
                  )}
                </button>
              </div>
            </div>
            <div className="bg-jerarquia1 p-4 rounded-3xl mt-4">
              <h4 className="text-jerarquia4 font-semibold mb-2">
                Requisitos de la contraseña
              </h4>
              <ul className="text-sm">
                {PASSWORD_REQUIREMENTS.map((req) => (
                  <li
                    key={req.key}
                    className={`flex items-center ${
                      errors[req.key] ? "text-red-900" : "text-jerarquia3"
                    }`}
                  >
                    <span className="mr-2">{errors[req.key] ? "•" : "✓"}</span>{" "}
                    {req.label}
                  </li>
                ))}
                <li
                  className={`flex items-center ${
                    errors.matchError ? "text-red-900" : "text-jerarquia3"
                  }`}
                >
                  <span className="mr-2">{errors.matchError ? "•" : "✓"}</span>{" "}
                  La nueva contraseña debe coincidir con su confirmación
                </li>
              </ul>
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="submit"
              className="btn bg-jerarquia2 rounded-lg hover:bg-jerarquia3 text-jerarquia4 border border-jerarquia2 hover:border hover:border-jerarquia4 focus:ring-2 focus:ring-jerarquia1 hover:text-jerarquia1 hover:shadow-2xl hover:shadow-jerarquia4"
            >
              Actualizar{" "}
              <span>
                <LockSync className="size-4 rotate-40 hover:rotate-220" />
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default ChangePassword;