import React, { useState, useEffect } from "react";
import {
  getSessions,
  patchLogoutEjecutive,
  patchUnlockedEjecutive,
  ResetPassword,
} from "../../../../services/mark/albaz/LokiServices";
import { toast } from "sonner";

// Tabla de sesiones
const TablaSesiones = ({ selectedExecutiveId }) => {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [loggingOut, setLoggingOut] = useState(null); // Para mostrar estado de logout por ejecutivo
  const [unlocking, setUnlocking] = useState(null); // Para mostrar estado de desbloqueo por ejecutivo
  const [resettingPassword, setResettingPassword] = useState(null); // Para mostrar estado de reset de contraseña
  const [passwordReset, setPasswordReset] = useState(new Set()); // Para rastrear qué usuarios ya tienen contraseña reestablecida
  // Función para manejar el desbloqueo del ejecutivo
  const handleUnlockExecutive = async (rowIdEjecutivo) => {
    try {
      setUnlocking(rowIdEjecutivo);
      const response = await patchUnlockedEjecutive(rowIdEjecutivo);
      console.log("Desbloqueo exitoso:", response);
      setSessions((prevSessions) =>
        prevSessions.map((session) =>
          session.idEjecutivo === rowIdEjecutivo
            ? { ...session, bloqueado: false }
            : session
        )
      );
      toast.success(`Ejecutivo desbloqueado: ${rowIdEjecutivo}`);
    } catch (error) {
      console.error("Error al desbloquear ejecutivo:", error);
      toast.error(
        `Error al desbloquear ejecutivo ID: ${rowIdEjecutivo}. ${
          error.message || "Inténtalo de nuevo."
        }`
      );
    } finally {
      setUnlocking(null);
    }
  };

  // Obtener el idEjecutivo del usuario logueado desde localStorage
  const userData = JSON.parse(localStorage.getItem("userData") || "{}");
  const idEjecutivoSesion =
    userData?.idEjecutivo || userData?.idejecutivo || userData?.id || null;

  // Función para manejar el logout del ejecutivo
  const handleLogoutExecutive = async (rowIdEjecutivo) => {
    try {
      setLoggingOut(rowIdEjecutivo);

      const response = await patchLogoutEjecutive(rowIdEjecutivo);
      console.log("Logout exitoso:", response);

      // Actualizar la tabla de sesiones después del logout exitoso
      setSessions((prevSessions) =>
        prevSessions.map((session) =>
          session.idEjecutivo === rowIdEjecutivo
            ? { ...session, sesionAbierta: false }
            : session
        )
      );

      toast.success(`Cierre exitoso para Ejecutivo: ${rowIdEjecutivo}`);
    } catch (error) {
      console.error("❌ Error al cerrar sesión:", error);
      toast.error(
        `Error al cerrar sesión del ejecutivo ID: ${rowIdEjecutivo}. ${
          error.message || "Inténtalo de nuevo."
        }`
      );
    } finally {
      setLoggingOut(null);
    }
  };

  // Función para manejar el reset de contraseña del ejecutivo
  const handleResetPassword = async (usuario) => {
    try {
      setResettingPassword(usuario);

      const body = { usuario };
      const response = await ResetPassword(body);
      console.log("Reset de contraseña exitoso:", response);

      // Agregar el usuario al Set de contraseñas reestablecidas
      setPasswordReset((prevSet) => new Set(prevSet).add(usuario));

      toast.success(`Contraseña reestablecida para usuario ${usuario}`);
    } catch (error) {
      toast.error(
        `Error al restablecer contraseña para usuario ${usuario}. ${
          error.message || "Inténtalo de nuevo."
        }`
      );
    } finally {
      setResettingPassword(null);
    }
  };

  // Efecto para cargar las sesiones cuando cambia el ejecutivo seleccionado
  useEffect(() => {
    const fetchSessions = async () => {
      setLoading(true);
      setError(null);
      try {
        // Usar selectedExecutiveId si existe, sino usar idEjecutivoSesion por defecto
        const idToUse = selectedExecutiveId || idEjecutivoSesion;

        if (!idToUse) {
          setSessions([]);
          setLoading(false);
          return;
        }

        const data = await getSessions({ idEjecutivo: idToUse });
        console.log("Respuesta de getSessions:", data);

        // Obtener solo los subordinados directos, excluyendo el usuario actual
        let directSubordinates = [];

        if (Array.isArray(data)) {
          data.forEach((session) => {
            // Solo agregar subordinados directos, no el nodo padre ni subordinados de subordinados
            if (
              Array.isArray(session.subordinados) &&
              session.subordinados.length > 0
            ) {
              session.subordinados.forEach((subordinado) => {
                // Verificar que no sea el usuario actual
                if (subordinado.idEjecutivo !== idEjecutivoSesion) {
                  directSubordinates.push({
                    usuario: subordinado.usuario,
                    nombreEjecutivo: subordinado.nombreEjecutivo,
                    idEjecutivo: subordinado.idEjecutivo,
                    idEncargado: subordinado.idEncargado,
                    sesionAbierta: subordinado.sesionAbierta,
                    bloqueado: subordinado.bloqueado,
                  });
                }
              });
            }
          });
        }

        console.log("Subordinados directos:", directSubordinates);
        setSessions(directSubordinates);
      } catch (e) {
        console.error("Error al obtener las sesiones:", e);
        setError("Error al cargar las sesiones");
        setSessions([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSessions();
  }, [selectedExecutiveId, idEjecutivoSesion]);

  return (
    <div className="relative bg-white shadow-lg ring-1 ring-black/5 rounded-2xl flex flex-col p-6 w-full h-82">
      <h3 className="text-lg font-semibold mb-4 flex items-center text-gray-800">
        <span className="mr-2">
          {/* Icono personalizado para Sesiones */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="inline-block w-6 h-6 text-gray-700"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15M12 9l3 3m0 0-3 3m3-3H2.25"
            />
          </svg>
        </span>
        Sesiones
      </h3>
      <div className="bg-white rounded-lg p-3 shadow border border-[var(--color-jerarquia1)] flex-1 w-full">
        <div
          style={{
            overflowX: "auto",
            overflowY: "auto",
            maxHeight: "22vh",
            scrollbarColor: "#b0b0b0 #f5f5f5",
            scrollbarWidth: "thin",
          }}
          className="scrollbar-gray w-full"
        >
          <table className="modal-table">
            <thead>
              <tr>
                <th>Ejecutivo</th>
                <th>Usuario</th>
                <th>Bloqueado</th>
                <th>Contraseña</th>
                <th>Sesión Abierta</th>
              </tr>
            </thead>
            <tbody>
              {loading && (
                <tr>
                  <td colSpan={5} style={{ textAlign: "center" }}>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: "0.5rem",
                      }}
                    >
                      <div className="spinner-sonner">
                        <svg
                          width="24"
                          height="24"
                          viewBox="0 0 38 38"
                          xmlns="http://www.w3.org/2000/svg"
                          stroke="#2b463c"
                        >
                          <g fill="none" fillRule="evenodd">
                            <g transform="translate(1 1)" strokeWidth="3">
                              <circle
                                strokeOpacity=".3"
                                cx="18"
                                cy="18"
                                r="18"
                              />
                              <path d="M36 18c0-9.94-8.06-18-18-18">
                                <animateTransform
                                  attributeName="transform"
                                  type="rotate"
                                  from="0 18 18"
                                  to="360 18 18"
                                  dur="1s"
                                  repeatCount="indefinite"
                                />
                              </path>
                            </g>
                          </g>
                        </svg>
                      </div>
                      <span style={{ color: "#2b463c", fontSize: "0.875rem" }}>
                        Cargando sesiones...
                      </span>
                    </div>
                  </td>
                </tr>
              )}
              {error && !loading && (
                <tr>
                  <td
                    colSpan={5}
                    style={{ textAlign: "center", color: "#b71c1c" }}
                  >
                    {error}
                  </td>
                </tr>
              )}
              {!loading && !error && sessions.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    style={{ textAlign: "center", color: "#666" }}
                  >
                    {selectedExecutiveId
                      ? "No hay sesiones para este ejecutivo"
                      : "No hay sesiones disponibles"}
                  </td>
                </tr>
              )}
              {!loading &&
                !error &&
                sessions.length > 0 &&
                sessions.map((session, i) => (
                  <tr key={session.id || i}>
                    <td>
                      {session.nombreEjecutivo ||
                        session.ejecutivo ||
                        session.nombre ||
                        "---"}
                    </td>
                    <td>{session.usuario || session.user || "---"}</td>
                    <td style={{ textAlign: "center" }}>
                      {session.bloqueado !== undefined ? (
                        <>
                          <input
                            type="checkbox"
                            checked={session.bloqueado}
                            readOnly
                            className="modal-checkbox-small"
                            onDoubleClick={() => {
                              // Solo permitir desbloqueo si está bloqueado
                              if (session.bloqueado) {
                                handleUnlockExecutive(session.idEjecutivo);
                              }
                            }}
                            style={{
                              cursor: session.bloqueado ? "pointer" : "default",
                              opacity:
                                unlocking === session.idEjecutivo ? 0.5 : 1,
                            }}
                            title={
                              session.bloqueado
                                ? "Doble clic para desbloquear"
                                : "No bloqueado"
                            }
                          />
                          {unlocking === session.idEjecutivo && (
                            <div
                              style={{
                                display: "inline-block",
                                marginLeft: "5px",
                                fontSize: "10px",
                                color: "#666",
                              }}
                            >
                              Desbloqueando...
                            </div>
                          )}
                        </>
                      ) : (
                        "---"
                      )}
                    </td>
                    <td>
                      <button
                        className="modal-btn modal-btn-outline"
                        onClick={() => {
                          if (
                            !passwordReset.has(session.usuario) &&
                            resettingPassword !== session.usuario
                          ) {
                            handleResetPassword(session.usuario);
                          }
                        }}
                        disabled={
                          passwordReset.has(session.usuario) ||
                          resettingPassword === session.usuario
                        }
                        style={{
                          opacity:
                            passwordReset.has(session.usuario) ||
                            resettingPassword === session.usuario
                              ? 0.5
                              : 1,
                          cursor:
                            passwordReset.has(session.usuario) ||
                            resettingPassword === session.usuario
                              ? "not-allowed"
                              : "pointer",
                        }}
                      >
                        RESTABLECER
                      </button>
                    </td>
                    <td style={{ textAlign: "center" }}>
                      {session.sesionAbierta !== undefined ? (
                        <input
                          type="checkbox"
                          checked={session.sesionAbierta}
                          readOnly
                          className="modal-checkbox-small"
                          onDoubleClick={() => {
                            // Solo permitir logout si la sesión está abierta
                            if (session.sesionAbierta) {
                              handleLogoutExecutive(session.idEjecutivo);
                            }
                          }}
                          style={{
                            cursor: session.sesionAbierta
                              ? "pointer"
                              : "default",
                            opacity:
                              loggingOut === session.idEjecutivo ? 0.5 : 1,
                          }}
                          title={
                            session.sesionAbierta
                              ? "Doble clic para cerrar sesión"
                              : "Sesión ya cerrada"
                          }
                        />
                      ) : (
                        "---"
                      )}
                      {loggingOut === session.idEjecutivo && (
                        <div
                          style={{
                            display: "inline-block",
                            marginLeft: "5px",
                            fontSize: "10px",
                            color: "#666",
                          }}
                        >
                          Cerrando...
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TablaSesiones;
