import React, { useState, useCallback } from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { ValidatePassword } from "../../services/mark/albaz/LokiServices";
import { loginUser } from "../../services/mark/login/AuthServices";
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
  id="hs-floating-input-email",
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
      <label htmlFor="hs-floating-input-email-value" className="absolute top-0 start-0 p-2 h-full sm:text-sm truncate pointer-events-none transition ease-in-out duration-100  origin-[0_0] peer-disabled:opacity-50 peer-disabled:pointer-events-none
      peer-focus:scale-90
      peer-focus:translate-x-0.5
      peer-focus:-translate-y-3
      peer-focus:text-gray-500 
      peer-not-placeholder-shown:scale-90
      peer-not-placeholder-shown:translate-x-0.5
      peer-not-placeholder-shown:-translate-y-3
      peer-not-placeholder-shown:text-gray-500  ">{label}</label>
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
        toast.info("Contraseña válida.");
        onLoginSuccess?.();
      } else {
        toast.success("¡Inicio de sesión exitoso!");
        saveUserData(response);
        onLoginSuccess?.(); 
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
    const userInfo = response?.ejecutivo || response;

    // ✅ GUARDAR DATOS COMPLETOS EN STORE Y LOCALSTORAGE
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
      // ✅ NUEVO: Guardar también la contraseña actual temporalmente
      contraActual: formData.password
    };

    setUser(userStoreData);
    
    // ✅ GUARDAR EN LOCALSTORAGE CON CONTRASEÑA ACTUAL
    const localStorageData = {
      ...userStoreData,
      contraActual: formData.password // ✅ Guardar para ChangePassword
    };
    localStorage.setItem("userData", JSON.stringify(localStorageData));
    
    console.log("Datos guardados en store y localStorage:", userStoreData);

    try {
      const passwordValidation = await ValidatePassword(
        { contrasenia: formData.password, servidor: "Thor" },
        idEjecutivo
      );
      console.log("Respuesta de validación de contraseña:", passwordValidation);

      // ✅ DETECTAR SI LA CONTRASEÑA ESTÁ PRÓXIMA A EXPIRAR (pero aún es válida)
      const diasRestantes = userInfo.Días;
      console.log("🔍 Días restantes para expirar:", diasRestantes);

      // ✅ CONDICIÓN MODIFICADA: Mostrar PasswordChangeContent si:
      // 1. La contraseña expiró (días <= 0) O 
      // 2. La contraseña está próxima a expirar (días < 30) Y es cambio opcional
      if (diasRestantes <= 0) {
        console.log("🚨 CONTRASEÑA EXPIRADA - Cambio obligatorio");
        // ✅ Para contraseña expirada, usar onPasswordExpired para flujo directo a ChangePassword
        if (onPasswordExpired && typeof onPasswordExpired === 'function') {
          const expiredData = {
            diasRestantes: diasRestantes,
            username: formData.username,
            contraActual: formData.password,
            esExpirada: true
          };
          console.log("📤 Ejecutando onPasswordExpired (contraseña expirada):", expiredData);
          onPasswordExpired(expiredData);
        }
      } else if (diasRestantes < 30) {
        console.log("⚠️  CONTRASEÑA PRÓXIMA A EXPIRAR - Cambio recomendado");
        // ✅ Para contraseña próxima a expirar, usar onLoginSuccess para mostrar opción
        if (onLoginSuccess && typeof onLoginSuccess === 'function') {
          const successData = {
            diasRestantes: diasRestantes,
            username: formData.username,
            contraActual: formData.password,
            esExpirada: false
          };
          console.log("📤 Ejecutando onLoginSuccess (cambio opcional):", successData);
          onLoginSuccess(successData);
        }
      } else {
        console.log("✅ CONTRASEÑA VÁLIDA - Login normal");
        // ✅ Contraseña válida con muchos días restantes - login normal
        processSuccessfulLogin(
          response,
          passwordValidation,
          () => {
            // Callback vacío para no mostrar PasswordChangeContent
            console.log("✅ Login exitoso, redirigiendo al dashboard");
            navigate("/dashboardPage");
          },
          navigate
        );
      }

    } catch (validationError) {
      console.error("Error en validación de contraseña:", validationError);
      handlePasswordValidationError(validationError, onLoginSuccess);
    }
  } catch (error) {
    console.error("❌ Error en el inicio de sesión:", error);
    
    // 🔥 DETECTAR CONTRASEÑA EXPIRADA (error 400 del servidor)
    if (error.response?.status === 400 && 
        error.response?.data?.loginResult?.Expiró === 1) {
      
      const diasRestantes = error.response?.data?.loginResult?.Días || 0;
      const mensaje = error.response?.data?.loginResult?.Mensaje || "Su contraseña expiró y debe renovarla.";
      
      console.log("🔐 CONTRASEÑA EXPIRADA DETECTADA (error 400):", {
        expiró: error.response.data.loginResult.Expiró,
        mensaje,
        días: diasRestantes,
        usuario: formData.username,
        contraActual: formData.password
      });

      // ✅ LIMPIAR Y GUARDAR DATOS TEMPORALES
      localStorage.removeItem('userData');
      
      const tempUserData = {
        dias: diasRestantes,
        usuario: formData.username,
        contraActual: formData.password,
        mensaje: mensaje,
        esExpirada: true
      };
      localStorage.setItem("userData", JSON.stringify(tempUserData));
      
      // ✅ GUARDAR EN STORE
      setUser({
        usuario: formData.username,
        contraActual: formData.password,
        dias: diasRestantes,
        esExpirada: true
      });
      
      // ✅ MOSTRAR TOAST INFORMATIVO
      toast.warning(mensaje, { duration: 5000 });
      
      // ✅ EJECUTAR CALLBACK PARA CAMBIO OBLIGATORIO
      if (onPasswordExpired && typeof onPasswordExpired === 'function') {
        const dataToSend = {
          diasRestantes: diasRestantes,
          username: formData.username,
          contraActual: formData.password,
          esExpirada: true
        };
        
        console.log("📤 EJECUTANDO onPasswordExpired con:", dataToSend);
        onPasswordExpired(dataToSend);
      } else {
        console.error("❌ onPasswordExpired no disponible");
      }
      
      setLoading(false);
      return;
    }
    
    // ✅ MANEJAR OTROS ERRORES 400
    if (error.response?.status === 400) {
      const errorMessage = error.response?.data?.loginResult?.Mensaje || 
                          error.response?.data?.message || 
                          ERROR_MESSAGES.LOGIN_ERROR;
      setApiError(errorMessage);
      toast.error(errorMessage);
      setLoading(false);
      return;
    }
    
    // ✅ MANEJO DE ERRORES GENÉRICOS
    const errorMessage =
      error.response?.data?.loginResult?.Mensaje ||
      error.response?.data?.message ||
      ERROR_MESSAGES.LOGIN_ERROR;
    setApiError(errorMessage);
    toast.error(errorMessage);
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