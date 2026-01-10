import React, { useEffect, useState } from "react";
import IconCircular from "../../../../../components/iconos/IconCircular";
import ModalFilasCampañas from "./ModalFilasCampanias";
import {
  campainghInCharge,
  enabledUnenabledCampaign,
  campaignDeleteada,
  campaignCleaning,
  AvanceCampaing,
} from "../../../../../services/mark/orochi/LokiServices";
import { toast } from "sonner";
import NewCampaign from "./NewCampaign";
import ModalToponeHundred from "./ModalToponeHundred";

const ModalCampanasCampanias = ({ onSeleccionCampaña }) => {
  const [selectedId, setSelectedId] = useState(null);
  const [campanas, setCampanas] = useState([]);
  const [updatingId, setUpdatingId] = useState(null);
  const [modalLimpiar, setModalLimpiar] = useState({
    open: false,
    idCampaña: null,
    nombre: "",
  });
  const [modalEliminar, setModalEliminar] = useState({
    open: false,
    idCampaña: null,
    nombre: "",
  });
  const [modalTop100, setModalTop100] = useState({
    open: false,
    idCampaña: null,
  });
  const [modalFilas, setModalFilas] = useState({
    open: false,
    cartera: "American Express",
    idCampaña: null,
    nombreCampaña: "",
  });
  const [setTipoFilas] = useState("archivo");

  // Función para cargar campañas
  const cargarCampanas = async () => {
    const userData = JSON.parse(localStorage.getItem("userData") || "{}");
    const idEncargado = userData?.idEjecutivo ?? 0;
    const idCartera = userData?.idCartera ?? 0;
    const idProducto = userData?.idProducto ?? 0;
    const params = { idEncargado, idCartera, idProducto };

    try {
      // Obtener las campañas
      const campanasData = await campainghInCharge(params);
      const campanasList = Array.isArray(campanasData)
        ? campanasData
        : [campanasData];

      // Obtener el avance de las campañas
      const avanceResponse = await AvanceCampaing(
        idEncargado,
        idCartera,
        idProducto
      );
      const avanceData = Array.isArray(avanceResponse.data)
        ? avanceResponse.data
        : [avanceResponse.data];

      // Combinar los datos: actualizar el campo Avance basado en idCampaña
      const campanasConAvance = campanasList.map((campana) => {
        const avanceInfo = avanceData.find(
          (avance) => avance.idCampaña === campana.idCampaña
        );
        return {
          ...campana,
          Avance: avanceInfo ? avanceInfo.avance : campana.Avance, // Usar el nuevo avance si existe, sino mantener el original
        };
      });

      setCampanas(campanasConAvance);
    } catch (error) {
      console.error("Error al cargar campañas o avances:", error);
      // Fallback: cargar solo las campañas sin avance actualizado
      try {
        const data = await campainghInCharge(params);
        setCampanas(Array.isArray(data) ? data : [data]);
      } catch (fallbackError) {
        console.error("Error en fallback:", fallbackError);
        setCampanas([]);
      }
    }
  };

  useEffect(() => {
    cargarCampanas();
  }, []);

  // Ordenar campañas por nombre alfabéticamente (ignorando mayúsculas y tildes)
  const sortedCampanas = [...campanas].sort((a, b) => {
    if (!a.Campaña || !b.Campaña) return 0;
    return a.Campaña.localeCompare(b.Campaña, "es", { sensitivity: "base" });
  });

  return (
    <div
      className="bg-white rounded-lg p-3 shadow border border-[var(--color-jerarquia1)] h-full flex flex-col justify-between"
      style={{ minWidth: 0 }}
    >
      <div>
        <div className="flex items-center mb-2 w-full">
          <span
            className="modal-span-1 pl-1 mr-4"
            style={{ color: "var(--color-jerarquia2)" }}
          >
            Campañas - {campanas.length}
          </span>
        </div>
        <div
          style={{
            overflowX: "auto",
            overflowY: "auto",
            maxHeight: "40vh",
            height: "100%",
          }}
          className="scrollbar-gray"
        >
          <table className="modal-table mb-2">
            <thead>
              <tr>
                <th
                  style={{
                    textAlign: "center",
                    position: "sticky",
                    top: 0,
                    zIndex: 2,
                  }}
                >
                  Filas
                </th>
                <th
                  style={{
                    textAlign: "center",
                    position: "sticky",
                    top: 0,
                    zIndex: 2,
                  }}
                >
                  Limpiar
                </th>
                <th
                  style={{
                    textAlign: "center",
                    position: "sticky",
                    top: 0,
                    zIndex: 2,
                  }}
                >
                  Encendida
                </th>
                <th
                  style={{
                    textAlign: "left",
                    position: "sticky",
                    top: 0,
                    zIndex: 2,
                  }}
                >
                  Creó
                </th>
                <th
                  style={{
                    textAlign: "left",
                    position: "sticky",
                    top: 0,
                    zIndex: 2,
                  }}
                >
                  Nombre
                </th>
                <th
                  style={{
                    textAlign: "left",
                    position: "sticky",
                    top: 0,
                    zIndex: 2,
                  }}
                >
                  Avance
                </th>
                <th
                  style={{
                    textAlign: "center",
                    position: "sticky",
                    top: 0,
                    zIndex: 2,
                  }}
                >
                  Cuentas
                </th>
                <th
                  style={{
                    textAlign: "center",
                    position: "sticky",
                    top: 0,
                    zIndex: 2,
                  }}
                >
                  Eliminar
                </th>
              </tr>
            </thead>
            <tbody>
              {sortedCampanas.map((row, i) => (
                <tr
                  key={i}
                  style={{
                    minHeight: 0,
                    height: "28px",
                    lineHeight: "1.1",
                    cursor: "pointer",
                    background:
                      selectedId === row.idCampaña
                        ? "var(--color-jerarquia1)"
                        : undefined,
                  }}
                  onClick={() => {
                    if (row.idCampaña) {
                      setSelectedId(row.idCampaña);
                      if (typeof onSeleccionCampaña === "function") {
                        onSeleccionCampaña(row.idCampaña, row.Campaña);
                      }
                    }
                  }}
                  onDoubleClick={(e) => {
                    // Prevenir el doble clic si es sobre elementos interactivos
                    if (
                      e.target.type === "checkbox" ||
                      e.target.tagName === "BUTTON"
                    ) {
                      return;
                    }
                    if (row.idCampaña) {
                      setModalTop100({ open: true, idCampaña: row.idCampaña });
                    }
                  }}
                  className={
                    selectedId === row.idCampaña ? "selected-campaign-row" : ""
                  }
                >
                  <td
                    style={{
                      textAlign: "center",
                      height: "28px",
                      lineHeight: "1.1",
                      paddingTop: 0,
                      paddingBottom: 0,
                    }}
                  >
                    <button
                      className="modal-btn modal-btn-table"
                      style={{
                        padding: 0,
                        background: "transparent",
                        border: "none",
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        setModalFilas({
                          open: true,
                          cartera: "American Express",
                          idCampaña: row.idCampaña,
                          nombreCampaña: row.Campaña,
                        });
                        setTipoFilas("archivo"); // Selecciona Archivo por defecto
                      }}
                    >
                      <span
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          padding: 0,
                          margin: 0,
                        }}
                      >
                        <IconCircular
                          bgColor="bg-green-200"
                          textColor="text-green-700"
                          borderColor="border-green-800"
                          size="size-5"
                          borderWidth="border-2"
                          tooltip="Filas"
                        >
                          {/* Icono original de filas con verde intenso */}
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                          >
                            <path
                              fill="#111"
                              d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z"
                            />
                          </svg>
                        </IconCircular>
                      </span>
                    </button>
                  </td>
                  <td
                    style={{
                      textAlign: "center",
                      height: "28px",
                      lineHeight: "1.1",
                      paddingTop: 0,
                      paddingBottom: 0,
                    }}
                  >
                    <span
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        padding: 0,
                        margin: 0,
                      }}
                    >
                      <button
                        className="modal-btn modal-btn-table"
                        style={{
                          background: "transparent",
                          border: "none",
                          padding: 0,
                          cursor: "pointer",
                          margin: 0,
                        }}
                        onClick={() =>
                          setModalLimpiar({
                            open: true,
                            idCampaña: row.idCampaña,
                            nombre: row.Campaña,
                          })
                        }
                      >
                        <IconCircular
                          bgColor="bg-yellow-300"
                          textColor="text-yellow-900"
                          borderColor="border-orange-custom"
                          size="size-5"
                          borderWidth="border-2"
                          tooltip="Limpiar"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                          >
                            <path
                              fill="#111"
                              d="M16 11h-1V3c0-1.1-.9-2-2-2h-2c-1.1 0-2 .9-2 2v8H8c-2.76 0-5 2.24-5 5v7h18v-7c0-2.76-2.24-5-5-5m-5-8h2v8h-2zm8 18h-2v-3c0-.55-.45-1-1-1s-1 .45-1 1v3h-2v-3c0-.55-.45-1-1-1s-1 .45-1 1v3H9v-3c0-.55-.45-1-1-1s-1 .45-1 1v3H5v-5c0-1.65 1.35-3 3-3h8c1.65 0 3 1.35 3 3z"
                            />
                          </svg>
                        </IconCircular>
                      </button>
                    </span>
                  </td>
                  <td
                    style={{
                      textAlign: "center",
                      height: "28px",
                      lineHeight: "1.1",
                      paddingTop: 0,
                      paddingBottom: 0,
                    }}
                  >
                    <div className="flex items-center justify-center">
                      <label
                        htmlFor={`switch-${row.idCampaña}`}
                        className="relative inline-block w-8 h-5 cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          id={`switch-${row.idCampaña}`}
                          className="peer sr-only"
                          checked={
                            updatingId === row.idCampaña
                              ? !row.Encendida
                              : row.Encendida
                          }
                          onChange={async (e) => {
                            e.stopPropagation();
                            if (!row.idCampaña) return;
                            setUpdatingId(row.idCampaña);
                            const userData = JSON.parse(
                              localStorage.getItem("userData") || "{}"
                            );
                            const idEncargado =
                              userData?.idEjecutivo ??
                              userData?.idejecutivo ??
                              userData?.id ??
                              1;
                            try {
                              const encender = !row.Encendida;
                              await enabledUnenabledCampaign({
                                idCampaña: row.idCampaña,
                                idEncargado,
                                encender,
                              });
                              toast.success(
                                `Campaña "${row.Campaña}" ${
                                  encender ? "encendida" : "apagada"
                                }`
                              );
                              await cargarCampanas();
                            } catch (e) {
                              toast.error("Error al actualizar campaña", e);
                            } finally {
                              setUpdatingId(null);
                            }
                          }}
                        />
                        <span className="absolute inset-0 bg-gray-200 rounded-full transition-colors duration-200 ease-in-out peer-checked:bg-jerarquia3"></span>
                        <span className="absolute top-1/2 start-0.5 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-xs transition-transform duration-200 ease-in-out peer-checked:translate-x-full"></span>
                        <span className="absolute top-1/2 start-0.5 -translate-y-1/2 flex justify-center items-center text-gray-500 peer-checked:text-white transition-colors duration-200">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={13}
                            height={13}
                            viewBox="0 0 24 24"
                          >
                            <path
                              fill="currentColor"
                              d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12z"
                            ></path>
                          </svg>
                        </span>
                        <span className="absolute top-1/2 end-0.5 -translate-y-1/2 flex justify-center items-center text-gray-500 peer-checked:text-jerarquia3 transition-colors duration-200 ">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width={13}
                            height={13}
                            viewBox="0 0 24 24"
                          >
                            <path
                              fill="currentColor"
                              d="M9 16.17L4.83 12l-1.42 1.41L9 19L21 7l-1.41-1.41z"
                            ></path>
                          </svg>
                        </span>
                      </label>
                    </div>
                  </td>
                  <td
                    style={{
                      textAlign: "left",
                      height: "28px",
                      lineHeight: "1.1",
                      paddingTop: 0,
                      paddingBottom: 0,
                    }}
                  >
                    {row.Usuario}
                  </td>
                  <td
                    style={{
                      textAlign: "left",
                      height: "28px",
                      lineHeight: "1.1",
                      paddingTop: 0,
                      paddingBottom: 0,
                    }}
                  >
                    {row.Campaña}
                  </td>
                  <td
                    style={{
                      textAlign: "left",
                      height: "28px",
                      lineHeight: "1.1",
                      paddingTop: 0,
                      paddingBottom: 0,
                    }}
                  >
                    {row.Avance}
                  </td>
                  <td
                    style={{
                      textAlign: "center",
                      height: "28px",
                      lineHeight: "1.1",
                      paddingTop: 0,
                      paddingBottom: 0,
                    }}
                  >
                    {row.NúmeroCuentas}
                  </td>
                  <td
                    style={{
                      textAlign: "center",
                      height: "28px",
                      lineHeight: "1.1",
                      paddingTop: 0,
                      paddingBottom: 0,
                    }}
                  >
                    <button
                      className="modal-btn modal-btn-close"
                      style={{
                        padding: 0,
                        background: "transparent",
                        border: "none",
                        cursor: "pointer",
                      }}
                      onClick={() =>
                        setModalEliminar({
                          open: true,
                          idCampaña: row.idCampaña,
                          nombre: row.Campaña,
                        })
                      }
                    >
                      <IconCircular
                        bgColor="bg-red-200"
                        textColor="text-red-700"
                        borderColor="border-red-800"
                        size="size-5"
                        borderWidth="border-2"
                        tooltip="Eliminar"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                        >
                          <path
                            fill="#b91c1c"
                            d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12z"
                          />
                        </svg>
                      </IconCircular>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Componente para crear nueva campaña */}
        {/* Modal Top 100 */}
        <ModalToponeHundred
          open={modalTop100.open}
          idCampaña={modalTop100.idCampaña}
          onClose={() => setModalTop100({ open: false, idCampaña: null })}
        />
      </div>
      <div className="flex justify-center mt-4 mb-2">
        <NewCampaign
          onCreated={cargarCampanas}
          buttonClassName="btn-success w-full sm:w-auto sm:min-w-[120px] px-4 py-2 text-base font-medium rounded-lg shadow-sm flex justify-center"
        />
      </div>
      {/* Modal visual de Filas de trabajo (Promesa Midprimes) */}
      <ModalFilasCampañas
        open={modalFilas.open}
        onClose={() =>
          setModalFilas({
            open: false,
            cartera: "American Express",
            idCampaña: null,
            nombreCampaña: "",
          })
        }
        cartera={modalFilas.cartera}
        idCampaña={modalFilas.idCampaña}
        nombreCampaña={modalFilas.nombreCampaña}
        onSuccess={cargarCampanas}
      />
      {modalLimpiar.open && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "rgba(0,0,0,0.2)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
          }}
        >
          <div
            style={{
              background: "white",
              borderRadius: 8,
              padding: 24,
              minWidth: 320,
              boxShadow: "0 2px 16px rgba(0,0,0,0.15)",
            }}
          >
            <div
              style={{
                fontWeight: 600,
                fontSize: 18,
                marginBottom: 12,
                color: "#000",
              }}
            >
              Limpiar Campaña
            </div>
            <div style={{ marginBottom: 18, fontSize: 15, color: "#000" }}>
              ¿Desea remover todas las cuentas de la campaña "
              {modalLimpiar.nombre}"?
            </div>
            <div
              style={{ display: "flex", justifyContent: "flex-end", gap: 12 }}
            >
              <button
                className="modal-btn modal-btn-primary"
                style={{
                  minWidth: 60,
                  height: 28,
                  fontSize: 15,
                  color: "#000",
                }}
                onClick={async () => {
                  try {
                    await campaignCleaning({
                      idCampaña: modalLimpiar.idCampaña,
                    });
                    toast.success(`Campaña "${modalLimpiar.nombre}" limpiada`);
                    await cargarCampanas();
                  } catch (e) {
                    toast.error("Error al limpiar campaña", e);
                  } finally {
                    setModalLimpiar({
                      open: false,
                      idCampaña: null,
                      nombre: "",
                    });
                  }
                }}
              >
                Sí
              </button>
              <button
                className="modal-btn modal-btn-close"
                style={{
                  minWidth: 60,
                  height: 28,
                  fontSize: 15,
                  color: "#000",
                }}
                onClick={() =>
                  setModalLimpiar({ open: false, idCampaña: null, nombre: "" })
                }
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}

      {modalEliminar.open && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "rgba(0,0,0,0.2)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
          }}
        >
          <div
            style={{
              background: "white",
              borderRadius: 8,
              padding: 24,
              minWidth: 320,
              boxShadow: "0 2px 16px rgba(0,0,0,0.15)",
            }}
          >
            <div
              style={{
                fontWeight: 600,
                fontSize: 18,
                marginBottom: 12,
                color: "#000",
              }}
            >
              Eliminar Campaña
            </div>
            <div style={{ marginBottom: 18, fontSize: 15, color: "#000" }}>
              ¿Desea eliminar la campaña "{modalEliminar.nombre}"?
            </div>
            <div
              style={{ display: "flex", justifyContent: "flex-end", gap: 12 }}
            >
              <button
                className="modal-btn modal-btn-primary"
                style={{
                  minWidth: 60,
                  height: 28,
                  fontSize: 15,
                  color: "#000",
                }}
                onClick={async () => {
                  try {
                    await campaignDeleteada({
                      idCampaña: modalEliminar.idCampaña,
                    });
                    toast.success(
                      `Campaña "${modalEliminar.nombre}" eliminada`
                    );
                    await cargarCampanas();
                  } catch (e) {
                    toast.error("Error al eliminar campaña", e);
                  } finally {
                    setModalEliminar({
                      open: false,
                      idCampaña: null,
                      nombre: "",
                    });
                  }
                }}
              >
                Sí
              </button>
              <button
                className="modal-btn modal-btn-close"
                style={{
                  minWidth: 60,
                  height: 28,
                  fontSize: 15,
                  color: "#000",
                }}
                onClick={() =>
                  setModalEliminar({ open: false, idCampaña: null, nombre: "" })
                }
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ModalCampanasCampanias;
