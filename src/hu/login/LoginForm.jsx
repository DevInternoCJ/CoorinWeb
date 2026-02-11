import React, { useState, useCallback } from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
//import { ValidatePassword } from "../../services/mark/Orochi/LokiServices";
import { loginUser } from "../../services/mark/login/AuthServices";
import ButtonLogin from "./ButtonLogin";
import { LoginUser, LoginKey } from "./LoginIcons";
import { useUserStore } from "../../contextGlobal/userStore";

// Constantes para mensajes de error
const ERROR_MESSAGES = {
  // PASSWORD_LENGTH: "La contraseña debe tener al menos 8 caracteres.",
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
  id = "hs-floating-input-email",
  label,
  minLength,
  maxLength,
  required,
  disabled,
}) => (
  <div className="flex">
    <Icon className="size-9.5 border border-jerarquia2 rounded-l-lg bg-jerarquia2" />
    <div className="relative input-floating w-full mb-4">
      <input
        type={type}
        placeholder={placeholder}
        className="peer p-2 block w-full bg-background-dashboard border border-gray-200 rounded-e-lg sm:text-sm placeholder:text-transparent focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none
    focus:pt-3
    focus:pb-1
    not-placeholder-shown:pt-3
    not-placeholder-shown:pb-1
    autofill:pt-3
    autofill:pb-1"
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
        htmlFor="hs-floating-input-email-value"
        className="absolute top-0 start-0 p-2 h-full sm:text-sm truncate pointer-events-none transition ease-in-out duration-100  origin-[0_0] peer-disabled:opacity-50 peer-disabled:pointer-events-none
      peer-focus:scale-90
      peer-focus:translate-x-0.5
      peer-focus:-translate-y-3
      peer-focus:text-gray-500 
      peer-not-placeholder-shown:scale-90
      peer-not-placeholder-shown:translate-x-0.5
      peer-not-placeholder-shown:-translate-y-3
      peer-not-placeholder-shown:text-gray-500  "
      >
        {label}
      </label>
    </div>
  </div>
);

const LoginForm = ({ onLoginSuccess, onPasswordExpired }) => {
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
          : "",
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
    // Preferir sessionStorage para que la sesión se borre al cerrar la pestaña
    if (response?.ejecutivo?.token) {
      sessionStorage.setItem("token", response.ejecutivo.token);
      sessionStorage.setItem("userData", JSON.stringify(response.ejecutivo));
    } else if (response?.token) {
      sessionStorage.setItem("token", response.token);
    }
  }, []);

  const processSuccessfulLogin = useCallback(
    (response, passwordValidation, onLoginSuccess, navigate) => {
      if (passwordValidation) {
        toast.info("Contraseña válida.");
        onLoginSuccess?.();
      } else {
        toast.success("¡Inicio de sesión exitoso!");
        saveUserData(response);
        onLoginSuccess?.();
        navigate("/dashboardPage");
      }
    },
    [saveUserData],
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
      localStorage.setItem("username", formData.username);

      const userInfo = response?.ejecutivo || response;

      // GUARDAR DATOS COMPLETOS EN STORE Y LOCALSTORAGE
      const userStoreData = {
        idEjecutivo: userInfo.idEjecutivo,
        usuario: formData.username,
        nombre: userInfo.NombreEjecutivo,
        dias: userInfo.Días,
        Jerarquía: userInfo.Jerarquía,
        token: userInfo.Token,
        idCartera: userInfo.idCartera,
        idSucursal: userInfo.idSucursal,
        idArea: userInfo.idÁrea,
        Extensión: userInfo.Extensión,
        Encargado: userInfo.Encargado,
        idEncargado: userInfo.idEncargado,
        idLogIngreso: userInfo.idLogIngreso,
        idProducto: userInfo.idProducto,
        Segmento: userInfo.Segmento,
        contraActual: formData.password,
      };

      setUser(userStoreData);

      // GUARDAR EN sessionStorage CON CONTRASEÑA ACTUAL
      const storageData = {
        ...userStoreData,
        contraActual: formData.password,
      };
      try {
        sessionStorage.setItem("userData", JSON.stringify(storageData));
      } catch (e) {
        console.warn("No se pudo guardar userData en sessionStorage", e);
        localStorage.setItem("userData", JSON.stringify(storageData));
      }

      console.log("Datos guardados en store y localStorage:", userStoreData);

      // ✅ LÓGICA CORREGIDA: Determinar flujo según días restantes
      const diasRestantes = userInfo.Días;
      const notificationData = {
        diasRestantes,
        username: formData.username,
        contraActual: formData.password,
        mensaje: userInfo.Mensaje || ''
      };

      // 1️⃣ CONTRASEÑA EXPIRADA (obligatorio cambiar)
      if (diasRestantes <= 0) {
        console.log("⚠️ CONTRASEÑA EXPIRADA - Mostrando modal obligatorio");
        toast.warning("Tu contraseña ha expirado. Debes cambiarla para continuar.");
        onPasswordExpired?.({ ...notificationData, esExpirada: true });
        // ❌ NO navegar al dashboard
      } 
      // 2️⃣ CONTRASEÑA PRÓXIMA A EXPIRAR (opcional cambiar)
      else if (diasRestantes < 30) {
        console.log("⏰ CONTRASEÑA PRÓXIMA A EXPIRAR - Mostrando opción de cambio");
        toast.info(`Tu contraseña expira en ${diasRestantes} días. ¿Deseas cambiarla ahora?`);
        onLoginSuccess?.({ ...notificationData, esExpirada: false });
        // ❌ NO navegar al dashboard - esperar respuesta del usuario
      } 
      // 3️⃣ CONTRASEÑA VÁLIDA (login normal)
      else {
        console.log("✅ CONTRASEÑA VÁLIDA - Redirigiendo al dashboard");
        toast.success("¡Inicio de sesión exitoso!");
        saveUserData(response);
        navigate("/dashboardPage"); // ✅ Solo navegar aquí
      }

    } catch (error) {
      console.error("Error en el inicio de sesión:", error);

      const status = error.response?.status;
      const axiosCode = error.code;

      // Error 503 (Servidor no disponible)
      if (status === 503) {
        const detail =
          error.response?.data?.detail ||
          "El servicio no está disponible en este momento. Intenta más tarde.";
        toast.error("Servidor no disponible: " + detail);
        console.error("Detalle del error 503:", detail);
        setApiError(detail);
        setLoading(false);
        return;
      }

      // Error de red (sin conexión al servidor)
      if (axiosCode === "ERR_NETWORK") {
        toast.error(
          "No se pudo conectar con el servidor. Verifica tu red o VPN.",
        );
        console.error("Error de red:", error.message);
        setApiError("No se pudo establecer conexión con el servidor.");
        setLoading(false);
        return;
      }

      // Error de respuesta inválida del backend
      if (axiosCode === "ERR_BAD_RESPONSE") {
        const sqlError =
          error.response?.data?.detail ||
          "Error interno del servidor o base de datos no accesible.";
        toast.error("Error en el servidor: " + sqlError);
        console.error("🧩 Detalle SQL:", sqlError);
        setApiError(sqlError);
        setLoading(false);
        return;
      }

      // Detectar contraseña expirada (400 con Expiró = 1)
      if (status === 400 && error.response?.data?.loginResult?.Expiró === 1) {
        const diasRestantes = error.response?.data?.loginResult?.Días || 0;
        const mensaje =
          error.response?.data?.loginResult?.Mensaje ||
          "Su contraseña expiró y debe renovarla.";
        console.log("CONTRASEÑA EXPIRADA DETECTADA:", {
          expiró: error.response.data.loginResult.Expiró,
          mensaje,
          días: diasRestantes,
        });

        localStorage.removeItem("userData");
        const tempUserData = {
          dias: diasRestantes,
          usuario: formData.username,
          contraActual: formData.password,
          mensaje,
          esExpirada: true,
        };
        localStorage.setItem("userData", JSON.stringify(tempUserData));

        setUser({
          usuario: formData.username,
          contraActual: formData.password,
          dias: diasRestantes,
          esExpirada: true,
        });

        toast.warning(mensaje, { duration: 5000 });

        if (onPasswordExpired && typeof onPasswordExpired === "function") {
          onPasswordExpired({
            diasRestantes,
            username: formData.username,
            contraActual: formData.password,
            esExpirada: true,
            mensaje,
          });
        }

        setLoading(false);
        return;
      }

      // Otros errores 400 (credenciales inválidas, etc.)
      if (status === 400) {
        const errorMessage =
          error.response?.data?.loginResult?.Mensaje ||
          error.response?.data?.message ||
          ERROR_MESSAGES.LOGIN_ERROR;
        toast.error(errorMessage);
        setApiError(errorMessage);
        setLoading(false);
        return;
      }

      // otros errores 500
      if (status === 500) {
        toast.error("Error interno del servidor. Inténtalo más tarde.");
        console.error("❌ Error 500:", error.response?.data);
        setApiError("Error interno del servidor.");
        setLoading(false);
        return;
      }

      // Manejo genérico
      const fallbackMessage =
        error.response?.data?.message ||
        error.message ||
        ERROR_MESSAGES.LOGIN_ERROR;
      toast.error(fallbackMessage);
      setApiError(fallbackMessage);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="lg:w-full px-6 text-neutral-900 ">
      <h4 className="text-3xl font-bold py-2 opacity-80 text-center px-2  text-black my-6">
        Iniciar Sesion
      </h4>
      <InputField
        icon={LoginUser}
        type="text"
        placeholder="Usuario"
        value={formData.username}
        onChange={(e) => handleInputChange("username", e.target.value)}
        id="floatingInput"
        label="Usuario"
        maxLength={4}
        required
        disabled={loading}
      />
      <InputField
        icon={LoginKey}
        type="password"
        placeholder="Contraseña"
        value={formData.password}
        onChange={(e) => handleInputChange("password", e.target.value)}
        id="password-floating"
        label="Contraseña"
        minLength={8}
        maxLength={50}
        required
        disabled={loading}
        autoComplete
      />
      {passwordError && (
        <p className="text-red-400 text-xs mt-1 mb-2">{passwordError}</p>
      )}
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