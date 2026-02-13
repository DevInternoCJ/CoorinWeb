import React, { useState, useEffect } from "react";
import IconCircular from "../../../../components/iconos/IconCircular";
import CoorinGreen from "../../../../assets/CoorinGreen.svg";
import {
  getSessions,
  patchLogoutEjecutive,
  patchUnlockedEjecutive,
  ResetPassword,
} from "../../../../services/mark/Orochi/LokiServices";
import { toast } from "sonner";
import { useUserStore } from "../../../../contextGlobal/userStore";

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
            : session,
        ),
      );
      toast.success(`Ejecutivo desbloqueado: ${rowIdEjecutivo}`);
    } catch (error) {
      console.error("Error al desbloquear ejecutivo:", error);
      toast.error(
        `Error al desbloquear ejecutivo ID: ${rowIdEjecutivo}. ${error.message || "Inténtalo de nuevo."}`,
      );
    } finally {
      setUnlocking(null);
    }
  };

  // Obtener el idEjecutivo del usuario logueado: preferir el store (sessionStorage),
  // fallback a sessionStorage y luego a localStorage para compatibilidad.
  const storeUser = useUserStore((state) => state.user);
  const persistedSession =
    storeUser ||
    JSON.parse(sessionStorage.getItem("userData") || "null") ||
    JSON.parse(localStorage.getItem("userData") || "null");

  const idEjecutivoSesion =
    persistedSession?.idEjecutivo ||
    persistedSession?.idejecutivo ||
    persistedSession?.id ||
    null;

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
            : session,
        ),
      );

      toast.success(`Cierre exitoso para Ejecutivo: ${rowIdEjecutivo}`);
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
      toast.error(
        `Error al cerrar sesión del ejecutivo ID: ${rowIdEjecutivo}. ${error.message || "Inténtalo de nuevo."}`,
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
        `Error al restablecer contraseña para usuario ${usuario}. ${error.message || "Inténtalo de nuevo."}`,
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
    <div className=" bg-white/80 overflow-auto ring-1 ring-black/5 rounded-2xl flex flex-col p-4 lg:p-6 w-full h-auto lg:h-82 min-h-64">
      <h3 className="text-base lg:text-lg font-semibold mb-4 flex items-center text-gray-800">
        <span className="mr-2">
          {/* Icono personalizado para Sesiones */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="inline-block w-5 h-5 lg:w-6 lg:h-6 text-gray-700"
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
      <div className="bg-white/80 overflow-auto rounded-lg border border-[var(--color-jerarquia1)] flex-1 w-full">
        <div
          style={{
            scrollbarColor: "#b0b0b0 #f5f5f5",
            scrollbarWidth: "thin",
          }}
          className=" w-full max-h-[35vh] lg:max-h-[27vh]"
        >
          <table
            className="modal-table text-xs lg:text-sm"
            style={{ minWidth: "100%" }}
          >
            <thead
              style={{
                position: "sticky",
                top: 0,
                background: "var(--color-jerarquia1)",
                zIndex: 0,
              }}
            >
              <tr>
                <th
                  style={{
                    top: 0,
                    background: "bg-jerarquia4",
                    color: "#fff",
                    whiteSpace: "nowrap",
                  }}
                >
                  Ejecutivo
                </th>
                <th
                  style={{
                    textAlign: "center",
                    top: 0,
                    background: "bg-jerarquia4¿",
                    color: "#fff",
                  }}
                >
                  Usuario
                </th>
                <th
                  style={{
                    textAlign: "center",
                    top: 0,
                    background: "bg-jerarquia4",
                    color: "#fff",
                  }}
                >
                  Bloqueado
                </th>
                <th
                  style={{
                    textAlign: "center",
                    top: 0,
                    background: "bg-jerarquia4",
                    color: "#fff",
                  }}
                >
                  Contraseña
                </th>
                <th
                  style={{
                    textAlign: "center",
                    top: 0,
                    background: "bg-jerarquia4",
                    color: "#fff",
                    whiteSpace: "nowrap",
                  }}
                >
                  Sesión Abierta
                </th>
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
                  <tr key={session.id || i} style={{ height: "20px" }}>
                    <td style={{ whiteSpace: "nowrap" }}>
                      {session.nombreEjecutivo ||
                        session.ejecutivo ||
                        session.nombre ||
                        "---"}
                    </td>
                    <td
                      style={{
                        letterSpacing: "0.05em",
                        fontVariantNumeric: "tabular-nums",
                        fontFamily: "monospace",
                        textAlign: "center",
                      }}
                    >
                      {session.usuario || session.user || "---"}
                    </td>
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
                    <td
                      style={{ textAlign: "center", verticalAlign: "middle" }}
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          height: "100%",
                        }}
                      >
                        <button
                          className="modal-btn modal-btn-outline text-xs lg:text-sm px-2 lg:px-3 py-1 lg:py-2"
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
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                          title="Reestablecer contraseña"
                        >
                          <IconCircular
                            bgColor="bg-jerarquia1"
                            textColor="text-jerarquia4"
                            borderColor="border-jerarquia2"
                            size="size-6"
                            borderWidth="border-2"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                            >
                              <path
                                fill="currentColor"
                                d="M12 6v3l4-4l-4-4v3c-4.42 0-8 3.58-8 8c0 1.57.46 3.03 1.24 4.26L6.7 14.8A5.9 5.9 0 0 1 6 12c0-3.31 2.69-6 6-6m6.76 1.74L17.3 9.2c.44.84.7 1.79.7 2.8c0 3.31-2.69 6-6 6v-3l-4 4l4 4v-3c4.42 0 8-3.58 8-8c0-1.57-.46-3.03-1.24-4.26"
                              />
                            </svg>
                          </IconCircular>
                        </button>
                      </div>
                    </td>
                    <td style={{ textAlign: "center", whiteSpace: "nowrap" }}>
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
                            margin: "0 auto",
                            display: "block",
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
