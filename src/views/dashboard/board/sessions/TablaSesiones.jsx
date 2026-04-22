import React, { useState, useEffect, useMemo } from "react";
import IconCircular from "../../../../components/Iconos/IconCircular";
import {
  getSessions,
  patchLogoutEjecutive,
  patchUnlockedEjecutive,
  ResetPassword,
} from "../../../../services/mark/Orochi/LokiServices";
import { toast } from "sonner";
import { useUserStore } from "../../../../contextGlobal/userStore";
const TABLE_HEADERS = [
  { id: "ejecutivo", label: "Ejecutivo", align: "left", noWrap: true },
  { id: "usuario", label: "Usuario", align: "center", noWrap: false },
  { id: "bloqueado", label: "Bloqueado", align: "center", noWrap: false },
  { id: "contrasena", label: "Contraseña", align: "center", noWrap: false },
  {
    id: "sesion_abierta",
    label: "Sesión Abierta",
    align: "center",
    noWrap: true,
  },
];

// Tabla de sesiones
const TablaSesiones = ({ selectedExecutiveId }) => {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [loggingOut, setLoggingOut] = useState(null); // Para mostrar estado de logout por ejecutivo
  const [unlocking, setUnlocking] = useState(null); // Para mostrar estado de desbloqueo por ejecutivo
  const [resettingPassword, setResettingPassword] = useState(null); // Para mostrar estado de reset de contraseña
  const [passwordReset, setPasswordReset] = useState(() => new Set()); // inicializador lazy — evita crear Set en cada render
  const [retryCount, setRetryCount] = useState(0);
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
  // Memoizado para evitar que sea una dependencia inestable del useEffect
  // (sin useMemo, se recalcula leyendo storage en cada render y causa bucle infinito de fetches)
  const idEjecutivoSesion = useMemo(() => {
    const persisted =
      storeUser ||
      JSON.parse(sessionStorage.getItem("userData") || "null") ||
      JSON.parse(localStorage.getItem("userData") || "null");
    return (
      persisted?.idEjecutivo || persisted?.idejecutivo || persisted?.id || null
    );
  }, [storeUser]); // solo recalcula cuando cambia el store

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
  }, [selectedExecutiveId, idEjecutivoSesion, retryCount]);

  return (
    <div className="bg-[var(--color-surface)] overflow-auto rounded-2xl flex flex-col p-4 lg:p-6 w-full h-auto lg:h-82 min-h-64 transition-colors duration-300 border border-dashed border-[var(--color-jerarquia1)]">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-base lg:text-lg font-semibold flex items-center text-[var(--color-text-primary)]">
          <span className="mr-2">
            {/* Icono personalizado para Sesiones */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="inline-block w-5 h-5 lg:w-6 lg:h-6 text-[var(--color-text-muted)]"
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

        <button
          onClick={() => setRetryCount((c) => c + 1)}
          className="p-1.5 rounded-md hover:bg-[var(--color-surface-secondary)] text-[var(--color-jerarquia3)] transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--color-jerarquia3)]"
          title="Recargar sesiones"
          disabled={loading}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            className={`w-5 h-5 lg:w-6 lg:h-6 ${loading ? "animate-spin" : ""}`}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
            />
          </svg>
        </button>
      </div>
      <div className="bg-[var(--color-surface)] overflow-auto rounded-lg border border-[var(--color-jerarquia1)] flex-1 w-full">
        <div
          style={{
            scrollbarColor:
              "var(--color-scrollbar-thumb) var(--color-scrollbar-track)",
            scrollbarWidth: "thin",
          }}
          className="w-full max-h-[35vh] lg:max-h-[27vh]"
        >
          <table className="modal-table text-xs" style={{ minWidth: "100%" }}>
            <thead
              style={{
                position: "sticky",
                top: 0,
                background: "var(--color-jerarquia1)",
                zIndex: 0,
              }}
            >
              <tr>
                {TABLE_HEADERS.map((header) => (
                  <th
                    key={header.id}
                    style={{
                      textAlign:
                        header.align !== "left" ? header.align : undefined,
                      top: 0,
                      background: "var(--color-jerarquia4)",
                      color: "#fff",
                      whiteSpace: header.noWrap ? "nowrap" : undefined,
                      color: "var(--color-text-inverse)",
                    }}
                  >
                    {header.label}
                  </th>
                ))}
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
                          stroke="var(--color-jerarquia3)"
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
                      <span
                        style={{
                          color: "var(--color-jerarquia3)",
                          fontSize: "0.875rem",
                        }}
                      >
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
                    style={{
                      textAlign: "center",
                      color: "var(--color-error, #b71c1c)",
                    }}
                  >
                    {error}
                  </td>
                </tr>
              )}
              {!loading && !error && sessions.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    style={{
                      textAlign: "center",
                      color: "var(--color-text-muted)",
                    }}
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
                  <tr key={session.idEjecutivo ?? i} style={{ height: "auto" }}>
                    <td
                      className="px-1 py-0.5"
                      style={{ whiteSpace: "nowrap" }}
                    >
                      {session.nombreEjecutivo ||
                        session.ejecutivo ||
                        session.nombre ||
                        "---"}
                    </td>
                    <td
                      className="px-1 py-0.5"
                      style={{
                        letterSpacing: "0.05em",
                        fontVariantNumeric: "tabular-nums",
                        fontFamily: "monospace",
                        textAlign: "center",
                      }}
                    >
                      {session.usuario || session.user || "---"}
                    </td>
                    <td className="px-1 py-0.5" style={{ textAlign: "center" }}>
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
                                color: "var(--color-text-muted)",
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
                      className="px-1 py-0.5"
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
                          className="modal-btn modal-btn-outline text-[10px] px-1.5 py-0.5"
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
                            size="size-5"
                            borderWidth="border"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
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
                    <td
                      className="px-1 py-0.5"
                      style={{ textAlign: "center", whiteSpace: "nowrap" }}
                    >
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
                            color: "var(--color-text-muted)",
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
