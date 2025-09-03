import React, { useState, useCallback } from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { loginUser, ValidatePassword } from "../../services/LokiServices";
import ButtonLogin from "./ButtonLogin";
import { LoginUser, LoginKey } from "./LoginIcons";
import { useUserStore } from "../../contextGlobal/userStore";

// Constantes para mensajes de error
const ERROR_MESSAGES = {
  PASSWORD_LENGTH: "La contraseña debe tener al menos 8 caracteres.",
  REQUIRED_FIELDS: "Por favor, ingresa tu usuario y contraseña.",
  NO_ID_EJECUTIVO: "No se pudo obtener el idEjecutivo de la respuesta",
  PASSWORD_VALIDATION:
    "Error al validar la contraseña. Por favor, contacta al administrador.",
  LOGIN_ERROR: "Error al iniciar sesión. Verifica tus credenciales.",
};

// Componente InputField separado (fuera de LoginForm)
const InputField = ({
  icon: Icon,
  type,
  placeholder,
  value,
  onChange,
  id,
  label,
  minLength,
  maxLength,
  required,
  disabled,
}) => (
  <div className="flex">
    <Icon className="size-9.5 border border-jerarquia2 rounded-l-lg bg-jerarquia2" />
    <div className="input-floating mb-4">
      <input
        type={type}
        placeholder={placeholder}
        className="w-full px-3 text-neutral-900 py-2 text-sm bg-neutral-100 border rounded-r-lg border-jerarquia2 focus:ring-2 focus:ring-jerarquia2 focus:outline-none"
        value={value}
        onChange={onChange}
        minLength={minLength}
        maxLength={maxLength}
        required={required}
        autoComplete={type === "password" ? "current-password" : "username"}
        id={id}
        disabled={disabled}
      />
      <label
        className={`input-floating-label block text-sm font-medium ${
          type === "password" ? "text-neutral-500" : "border-0"
        } mb-1`}
        htmlFor={id}
      >
        {label}
      </label>
    </div>
  </div>
);

const LoginForm = ({ onLoginSuccess }) => {
  const setUser = useUserStore((state) => state.setUser);
  
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [passwordError, setPasswordError] = useState("");
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");
  const navigate = useNavigate();

  // Handler para cambios en los inputs
  const handleInputChange = useCallback((field, value) => {
    if (field === "username") {
      const formattedValue = value
        .replace(/[^a-zA-Z]/g, "")
        .toUpperCase()
        .slice(0, 4);
      setFormData((prev) => ({ ...prev, username: formattedValue }));
    } else if (field === "password") {
      setFormData((prev) => ({ ...prev, password: value }));
      setPasswordError(
        value.length > 0 && value.length < 8
          ? ERROR_MESSAGES.PASSWORD_LENGTH
          : ""
      );
    }
  }, []);

  // Extraer idEjecutivo de la respuesta
  const extractIdEjecutivo = useCallback((response) => {
    if (response?.ejecutivo?.idEjecutivo) {
      return response.ejecutivo.idEjecutivo;
    } else if (response?.idEjecutivo) {
      return response.idEjecutivo;
    }
    throw new Error(ERROR_MESSAGES.NO_ID_EJECUTIVO);
  }, []);

  // Guardar datos de usuario en localStorage
  const saveUserData = useCallback((response) => {
    if (response?.ejecutivo?.token) {
      localStorage.setItem("token", response.ejecutivo.token);
      localStorage.setItem("userData", JSON.stringify(response.ejecutivo));
    } else if (response?.token) {
      localStorage.setItem("token", response.token);
    }
  }, []);

  // Manejar errores de validación de contraseña
  const handlePasswordValidationError = useCallback((error, onLoginSuccess) => {
    console.error("Error en validación de contraseña:", error);
    if (error.response?.status === 404) {
      const errorMessage = error.response.data || ERROR_MESSAGES.LOGIN_ERROR;
      toast.error(errorMessage);
      setApiError(errorMessage);
    } else if (error.response?.status === 400) {
      toast.info("Por favor, actualiza tu contraseña.");
      onLoginSuccess?.();
    } else {
      const genericError = error.message || ERROR_MESSAGES.PASSWORD_VALIDATION;
      toast.error(genericError);
      setApiError(genericError);
    }
  }, []);

  // Procesar login exitoso
  const processSuccessfulLogin = useCallback(
    (response, passwordValidation, onLoginSuccess, navigate) => {
      if (passwordValidation) {
        toast.info("Por favor, actualiza tu contraseña.");
        onLoginSuccess?.();
      } else {
        toast.success("¡Inicio de sesión exitoso!");
        saveUserData(response);
        navigate("/dashboardPage");
      }
    },
    [saveUserData]
  );

  // Handler principal de submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (passwordError) {
      toast.error(passwordError);
      return;
    }
    if (!formData.username || !formData.password) {
      toast.error(ERROR_MESSAGES.REQUIRED_FIELDS);
      return;
    }
    setLoading(true);
    setApiError("");
    const userData = {
      usuario: formData.username,
      contrasenia: formData.password,
      usuarioWindows: formData.username,
    };
    try {
      const response = await loginUser(userData);
      console.log("Respuesta de inicio de sesión exitosa:", response);
      const idEjecutivo = extractIdEjecutivo(response);
      localStorage.setItem("username", formData.username);
       if (response?.ejecutivo) {
        setUser({
          idEjecutivo: response.ejecutivo.idEjecutivo,
          usuario: response.ejecutivo.Usuario,
          nombre: response.ejecutivo.NombreEjecutivo,
          dias: response.ejecutivo.Días,
          Jerarquía: response.ejecutivo.Jerarquía,
          token: response.ejecutivo.Token
        });
      }
      try {
        const passwordValidation = await ValidatePassword(
          { contrasenia: formData.password, servidor: "Cronoss" },
          idEjecutivo
        );
        console.log(
          "Respuesta de validación de contraseña:",
          passwordValidation
        );
        processSuccessfulLogin(
          response,
          passwordValidation,
          onLoginSuccess,
          navigate
        );
      } catch (validationError) {
        handlePasswordValidationError(validationError, onLoginSuccess);
      }
    } catch (error) {
      console.error("Error en inicio de sesión:", error);
      const errorMessage =
        error.response?.data?.loginResult?.Mensaje ||
        ERROR_MESSAGES.LOGIN_ERROR;
      setApiError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="lg:w-full px-6 text-neutral-900">
      <h4 className="text-2xl font-bold pt-8 text-center pb-6 text-jerarquia1">
        Iniciar Sesion
      </h4>
      <InputField
        icon={LoginUser}
        type="text"
        placeholder="COOR"
        value={formData.username}
        onChange={(e) => handleInputChange("username", e.target.value)}
        id="floatingInput"
        label="Usuario"
        maxLength={4}
        required
        disabled={loading}
        autoComplete="off"
      />
      <InputField
        icon={LoginKey}
        type="password"
        placeholder="**********"
        value={formData.password}
        onChange={(e) => handleInputChange("password", e.target.value)}
        id="password-floating"
        label="Contraseña"
        minLength={8}
        maxLength={50}
        required
        disabled={loading}
        autoComplete="off"
      />
      {passwordError && (
        <p className="text-red-400 text-xs mt-1 mb-2">{passwordError}</p>
      )}
      {apiError && <p className="text-red-500 text-sm mt-1 mb-2">{apiError}</p>}
      <ButtonLogin
        type="submit"
        loading={loading}
        disabled={loading}
        className="mt-14"
      >
        {loading ? "Accediendo..." : "Acceder"}
      </ButtonLogin>
      <div className="px-6 mt-3 rounded-4xl py-4 text-center">
        <p className="text-[10px] text-neutral-400">© 2025 Coorin</p>
        <p className="text-[10px] text-neutral-400 mt-1">
          Powered By React & Tailwind CSS
        </p>
      </div>
    </form>
  );
};

export default LoginForm;
