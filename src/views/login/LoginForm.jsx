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

// Componente InputField — Preline floating label + icon prefix
const InputField = ({
  icon: Icon,
  type,
  placeholder,
  value,
  onChange,
  id = "hs-floating-input",
  label,
  minLength,
  maxLength,
  required,
  disabled,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";
  const inputType = isPassword ? (showPassword ? "text" : "password") : type;

  return (
    <div className="flex mb-4">
      {/* Prefijo con ícono — estilo Preline input-group addon */}
      <span className="inline-flex items-center justify-center min-w-fit px-3 rounded-s-lg border border-e-0 border-white/20 bg-white/10 backdrop-blur-sm">
        <Icon className="size-4 text-slate-200 shrink-0" />
      </span>

      {/* Contenedor floating label */}
      <div className="relative flex-1">
        <input
          id={id}
          type={inputType}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          minLength={minLength}
          maxLength={maxLength}
          required={required}
          disabled={disabled}
          autoComplete={type === "password" ? "current-password" : "username"}
          className={`
            peer py-3 block w-full h-full
            bg-white
            border border-white/20
            rounded-e-lg
            text-sm placeholder:text-transparent
            focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-white/40
            disabled:opacity-50 disabled:pointer-events-none
            transition-all duration-200
            pt-3 pb-2
            not-placeholder-shown:pt-3 not-placeholder-shown:pb-2
            autofill:pt-3 autofill:pb-2
            ps-4 ${isPassword ? "pe-10" : "pe-4"}
          `}
        />
        <label
          htmlFor={id}
          className="
            absolute top-0 start-0 px-4
            h-full flex items-center
            text-xs text-slate-300/80 font-medium
            pointer-events-none
            origin-[0_0] transition-all duration-150 ease-in-out
            peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-sm peer-placeholder-shown:text-slate-300/60
            peer-focus:-translate-y-2.5 peer-focus:text-[10px] peer-focus:text-slate-200
            peer-not-placeholder-shown:-translate-y-2.5 peer-not-placeholder-shown:text-[10px] peer-not-placeholder-shown:text-slate-200
          "
        >
          {label}
        </label>

        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 end-0 flex items-center pe-3 text-neutral-400 hover:text-neutral-600 focus:outline-none focus:text-neutral-600 transition-colors"
          >
            {showPassword ? (
              // EyeOff Icon
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.815 7.815L21 21m-3.956-3.956-3.09-3.09m0 0a3 3 0 0 1-4.243-4.243m4.242 4.242L9.88 9.88"
                />
              </svg>
            ) : (
              // Eye Icon
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
              </svg>
            )}
          </button>
        )}
      </div>
    </div>
  );
};


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
      console.log("Respuesta de inicio de sesión:", response);
      localStorage.setItem("username", formData.username);

      // ====================================================
      // 🔒 CASO: contraseña expirada en respuesta exitosa
      //    El backend devuelve { expiró: 1, días: 0, mensaje: '...' }
      //    directamente en response.data (sin nodo 'ejecutivo')
      // ====================================================
      const rootData = response?.data ?? response;
      const expiroFlag =
        rootData?.expiró ?? rootData?.Expiró ??
        rootData?.loginResult?.expiró ?? rootData?.loginResult?.Expiró;

      if (expiroFlag === 1) {
        const diasRestantes = rootData?.días ?? rootData?.Días ??
          rootData?.loginResult?.días ?? rootData?.loginResult?.Días ?? 0;
        const mensaje =
          rootData?.mensaje ?? rootData?.Mensaje ??
          rootData?.loginResult?.mensaje ?? rootData?.loginResult?.Mensaje ??
          "Su contraseña expiró y debe renovarla.";

        console.warn("🔒 CONTRASEÑA EXPIRADA (200 OK):", { diasRestantes, mensaje });
        toast.warning(mensaje, { duration: 6000 });

        // Guardar temporalmente para que ChangePassword tenga acceso
        const tempUserData = {
          usuario: formData.username,
          contraActual: formData.password,
          dias: diasRestantes,
          esExpirada: true,
          mensaje,
        };
        try {
          sessionStorage.setItem("userData", JSON.stringify(tempUserData));
        } catch {
          localStorage.setItem("userData", JSON.stringify(tempUserData));
        }
        setUser({ usuario: formData.username, contraActual: formData.password, dias: diasRestantes, esExpirada: true });

        onPasswordExpired?.({
          diasRestantes,
          username: formData.username,
          contraActual: formData.password,
          esExpirada: true,
          mensaje,
        });

        setLoading(false);
        return; // ❌ No continuar al dashboard
      }

      const userInfo = response?.ejecutivo || rootData?.ejecutivo || rootData;

      // GUARDAR DATOS COMPLETOS EN STORE
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

      // GUARDAR EN sessionStorage
      const storageData = { ...userStoreData, contraActual: formData.password };
      try {
        sessionStorage.setItem("userData", JSON.stringify(storageData));
      } catch (e) {
        console.warn("No se pudo guardar userData en sessionStorage", e);
        localStorage.setItem("userData", JSON.stringify(storageData));
      }

      console.log("Datos guardados en store:", userStoreData);

      // Determinar flujo según días restantes
      const diasRestantes = userInfo.Días;
      const notificationData = {
        diasRestantes,
        username: formData.username,
        contraActual: formData.password,
        mensaje: userInfo.Mensaje || "",
      };

      // 1️⃣ CONTRASEÑA EXPIRADA (días <= 0)
      if (diasRestantes <= 0) {
        console.log("⚠️ CONTRASEÑA EXPIRADA (días restantes)");
        toast.warning("Tu contraseña ha expirado. Debes cambiarla para continuar.");
        onPasswordExpired?.({ ...notificationData, esExpirada: true });
      }
      // 2️⃣ PRÓXIMA A EXPIRAR
      else if (diasRestantes < 30) {
        console.log("⏰ CONTRASEÑA PRÓXIMA A EXPIRAR");
        toast.info(`Tu contraseña expira en ${diasRestantes} días. ¿Deseas cambiarla ahora?`);
        onLoginSuccess?.({ ...notificationData, esExpirada: false });
      }
      // 3️⃣ VÁLIDA
      else {
        console.log("✅ CONTRASEÑA VÁLIDA - Redirigiendo al dashboard");
        toast.success("¡Inicio de sesión exitoso!");
        saveUserData(response);
        navigate("/dashboardPage");
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

      // ── Detectar contraseña expirada (400 con Expiró/expiró = 1) ──────────
      const loginResult = error.response?.data?.loginResult ?? error.response?.data;
      const expiroValue = loginResult?.Expiró ?? loginResult?.expiró;

      if (status === 400 && expiroValue === 1) {
        const diasRestantes = loginResult?.Días ?? loginResult?.días ?? 0;
        const mensaje =
          loginResult?.Mensaje ?? loginResult?.mensaje ??
          "Su contraseña expiró y debe renovarla.";

        console.warn("🔒 CONTRASEÑA EXPIRADA (400):", { expiroValue, mensaje, diasRestantes });

        const tempUserData = {
          dias: diasRestantes,
          usuario: formData.username,
          contraActual: formData.password,
          mensaje,
          esExpirada: true,
        };
        try {
          sessionStorage.setItem("userData", JSON.stringify(tempUserData));
        } catch {
          localStorage.setItem("userData", JSON.stringify(tempUserData));
        }

        setUser({
          usuario: formData.username,
          contraActual: formData.password,
          dias: diasRestantes,
          esExpirada: true,
        });

        toast.warning(mensaje, { duration: 6000 });

        onPasswordExpired?.({
          diasRestantes,
          username: formData.username,
          contraActual: formData.password,
          esExpirada: true,
          mensaje,
        });

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
    <form
      onSubmit={handleSubmit}
      className="lg:w-full px-6 text-neutral-900 bg-transparent backdrop-blur-sm "
    >
      <h4 className="text-2xl font-semibold py-2  text-center px-2  text-white my-4 pt-6 text-shadow-lg">
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
          Todos los derechos reservados - Oicrosnoc.
        </p>
      </div>
    </form>
  );
};

export default LoginForm;
