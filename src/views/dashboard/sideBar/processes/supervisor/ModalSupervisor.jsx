// src/hu/dashboard/sideBar/processes/supervisor/ModalSupervisor.jsx

import React, { useEffect, useState } from "react";
import FloatingSelect from "../../../../../components/Select/FloatingSelect";
import ModalBaseSupervisor from "./ModalBaseSupervisor";
import {
  getSuperInfo,
  infoEjecutivo,
  InsertSuper,
  getSuperInfoExcel,
} from "../../../../../services/mark/Orochi/LokiServices";
import { toast } from "sonner";

const ModalSupervisor = ({ onClose }) => {
  // Obtener datos de usuario desde localStorage
  const userData = JSON.parse(localStorage.getItem("userData"));
  const idCartera = userData?.idCartera || 0;
  const idProducto = userData?.idProducto ?? 0;
  const idEjecutivo = userData?.idEjecutivo ?? null;

  const [cartera, setCartera] = useState("");
  const [modo, setModo] = useState("Asignar");

  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Estados para Asignar
  const [selectedUsers, setSelectedUsers] = useState({});
  const [consulta, setConsulta] = useState("");
  const [cuentas, setCuentas] = useState(0);
  const [consultasOptions, setConsultasOptions] = useState([]);
  const [loadingConsultas, setLoadingConsultas] = useState(false);
  const [errorConsultas, setErrorConsultas] = useState(null);
  const [updatingId, setUpdatingId] = useState(null);
  const [loadingAsignar, setLoadingAsignar] = useState(false);

  // Estados para Consultar
  const [fechaDesde, setFechaDesde] = useState("");
  const [fechaHasta, setFechaHasta] = useState("");
  const [consultaData, setConsultaData] = useState([]);
  const [loadingConsulta, setLoadingConsulta] = useState(false);
  const [errorConsulta, setErrorConsulta] = useState(null);

  useEffect(() => {
    if (!idEjecutivo || modo !== "Asignar") return;
    setLoadingConsultas(true);
    setErrorConsultas(null);
    infoEjecutivo(idEjecutivo)
      .then((data) => {
        console.log("Respuesta infoEjecutivo:", data);
        // Filtrar por idCartera e idProducto sobre data.consultas
        let filtered = Array.isArray(data?.consultas)
          ? data.consultas.filter(
              (item) =>
                String(item.idCartera) === String(idCartera) &&
                String(item.idProducto) === String(idProducto),
            )
          : [];
        console.log("Consultas filtradas:", filtered);
        setConsultasOptions(filtered);
      })
      .catch((err) => {
        setErrorConsultas("Error al cargar las consultas");
        setConsultasOptions([]);
        console.error("Error en infoEjecutivo:", err);
      })
      .finally(() => setLoadingConsultas(false));
  }, [idCartera, idProducto, idEjecutivo, modo]);

  useEffect(() => {
    let isMounted = true;

    if (modo !== "Asignar" || !cartera) {
      setTableData([]);
      setSelectedUsers([]);
      return () => {
        isMounted = false;
      };
    }

    const fetchSupervisores = async () => {
      try {
        setLoading(true);
        setError(null);
        setSelectedUsers([]);
        const data = await getSuperInfo(cartera);
        if (!isMounted) return;
        const sortedData = Array.isArray(data)
          ? [...data].sort((a, b) => {
              const nameA = (
                a.NombreEjecutivo ??
                a.nombreEjecutivo ??
                ""
              ).toLowerCase();
              const nameB = (
                b.NombreEjecutivo ??
                b.nombreEjecutivo ??
                ""
              ).toLowerCase();
              return nameA.localeCompare(nameB);
            })
          : [];
        setTableData(sortedData);
      } catch (err) {
        if (!isMounted) return;
        setError("No se pudieron cargar los supervisores.");
        setTableData([]);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchSupervisores();

    return () => {
      isMounted = false;
    };
  }, [cartera, modo]);

  const handleCheckboxChange = (idEjecutivo) => {
    setSelectedUsers((prev) => ({
      ...prev,
      [idEjecutivo]: !prev[idEjecutivo],
    }));
  };

  const handleAsignar = async () => {
    try {
      if (!cartera) {
        toast.error("Por favor selecciona una cartera");
        return;
      }
      if (!consulta) {
        toast.error("Por favor selecciona una consulta");
        return;
      }
      if (cuentas <= 0) {
        toast.error("Por favor ingresa un número válido de cuentas");
        return;
      }

      const selectedCount = Object.values(selectedUsers).filter(Boolean).length;
      if (selectedCount === 0) {
        toast.error("Por favor selecciona al menos un supervisor");
        return;
      }

      setLoadingAsignar(true);

      // Construir el array ejecutivos con los supervisores seleccionados
      const ejecutivos = tableData
        .filter((row) => selectedUsers[row.idEjecutivo])
        .map((row) => ({
          idEjecutivo: row.idEjecutivo,
          asignar: true,
        }));

      const payload = {
        idCartera: parseInt(cartera),
        idConsulta: parseInt(consulta),
        numeroCuentasAAsignar: cuentas,
        ejecutivos,
      };

      console.log("Payload a enviar:", payload);

      const response = await InsertSuper(payload);
      toast.success(`Asignación exitosa: ${cuentas} cuentas asignadas`);

      // Limpiar selección
      setSelectedUsers({});
      setConsulta("");
      setCuentas(0);
    } catch (err) {
      console.error("Error al asignar:", err);
      const errorMessage =
        err?.response?.data?.message || "Error al asignar supervisores";
      toast.error(errorMessage);
    } finally {
      setLoadingAsignar(false);
    }
  };

  const handleBuscar = async () => {
    try {
      if (!cartera) {
        toast.error("Por favor selecciona una cartera");
        return;
      }
      if (!fechaDesde || !fechaHasta) {
        toast.error("Por favor selecciona ambas fechas");
        return;
      }

      setLoadingConsulta(true);
      setErrorConsulta(null);

      const data = await getSuperInfoExcel(cartera, fechaDesde, fechaHasta);
      setConsultaData(Array.isArray(data) ? data : []);

      if (!data || (Array.isArray(data) && data.length === 0)) {
        toast.info(
          "No se encontraron resultados para el rango de fechas seleccionado",
        );
      } else {
        toast.success(`Se encontraron ${data.length} registros`);
      }
    } catch (err) {
      console.error("Error al buscar:", err);
      setErrorConsulta("Error al consultar las cuentas");
      const errorMessage =
        err?.response?.data?.message || "Error al consultar las cuentas";
      toast.error(errorMessage);
      setConsultaData([]);
    } finally {
      setLoadingConsulta(false);
    }
  };

  const renderContent = () => {
    if (modo === "Asignar") {
      return (
        <div className="p-2 sm:p-4">
          <div className="metas-block metas-block-3 bg-white rounded-lg shadow border border-[var(--color-jerarquia1)] flex flex-col min-w-0 min-h-0 w-full h-full overflow-hidden mb-2">
            {/* Contenedor de tabla con scroll */}
            <div
              className="scrollbar-gray w-full flex-1"
              style={{
                overflowY: "auto",
                maxHeight: "400px",
                minHeight: 0,
              }}
            >
              <table
                className="modal-table"
                style={{ width: "100%", borderCollapse: "collapse" }}
              >
                <thead>
                  <tr>
                    <th
                      style={{
                        whiteSpace: "nowrap",
                        position: "sticky",
                        top: 0,
                        zIndex: 10,
                      }}
                    >
                      Asignar
                    </th>
                    <th
                      style={{
                        whiteSpace: "nowrap",
                        position: "sticky",
                        top: 0,
                        zIndex: 10,
                      }}
                    >
                      Usuario
                    </th>
                    <th
                      style={{
                        whiteSpace: "nowrap",
                        position: "sticky",
                        top: 0,
                        zIndex: 10,
                        minWidth: "200px",
                      }}
                    >
                      Nombre Ejecutivo
                    </th>
                    <th
                      style={{
                        whiteSpace: "nowrap",
                        position: "sticky",
                        top: 0,
                        zIndex: 10,
                      }}
                    >
                      Segmento
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {loading && (
                    <tr>
                      <td
                        colSpan="4"
                        style={{ textAlign: "center", padding: "12px" }}
                      >
                        Cargando supervisores...
                      </td>
                    </tr>
                  )}
                  {!loading && error && (
                    <tr>
                      <td
                        colSpan="4"
                        style={{
                          textAlign: "center",
                          padding: "12px",
                          color: "#b91c1c",
                        }}
                      >
                        {error}
                      </td>
                    </tr>
                  )}
                  {!loading && !error && tableData.length === 0 && (
                    <tr>
                      <td
                        colSpan="4"
                        style={{ textAlign: "center", padding: "12px" }}
                      >
                        No hay supervisores para mostrar.
                      </td>
                    </tr>
                  )}
                  {!loading &&
                    !error &&
                    tableData.map((row, index) => {
                      const normalizedRow = {
                        id:
                          row.idEjecutivo ??
                          row.Usuario ??
                          row.usuario ??
                          index,
                        usuario: row.Usuario ?? row.usuario ?? "",
                        nombreEjecutivo:
                          row.NombreEjecutivo ?? row.nombreEjecutivo ?? "",
                        segmento: row.Segmento ?? row.segmento ?? "",
                        idEjecutivo: row.idEjecutivo,
                      };

                      return (
                        <tr
                          key={normalizedRow.id}
                          style={
                            index % 2 === 1 ? { background: "#f9f9f9" } : {}
                          }
                        >
                          <td
                            style={{
                              textAlign: "center",
                              padding: "8px",
                              whiteSpace: "nowrap",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                            }}
                          >
                            <div className="flex items-center justify-center">
                              <label
                                htmlFor={`switch-${normalizedRow.idEjecutivo}`}
                                className="relative inline-block w-8 h-5 cursor-pointer"
                              >
                                <input
                                  type="checkbox"
                                  id={`switch-${normalizedRow.idEjecutivo}`}
                                  className="peer sr-only"
                                  checked={
                                    selectedUsers[normalizedRow.idEjecutivo] ||
                                    false
                                  }
                                  onChange={(e) => {
                                    e.stopPropagation();
                                    handleCheckboxChange(
                                      normalizedRow.idEjecutivo,
                                    );
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
                                <span className="absolute top-1/2 end-0.5 -translate-y-1/2 flex justify-center items-center text-gray-500 peer-checked:text-jerarquia3 transition-colors duration-200">
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
                              padding: "8px",
                              whiteSpace: "nowrap",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              fontFamily: "monospace",
                              letterSpacing: "0.1em",
                            }}
                          >
                            {normalizedRow.usuario}
                          </td>
                          <td
                            style={{
                              textAlign: "left",
                              padding: "8px",
                              whiteSpace: "nowrap",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                            }}
                          >
                            {normalizedRow.nombreEjecutivo}
                          </td>
                          <td
                            style={{
                              textAlign: "left",
                              padding: "8px",
                              whiteSpace: "nowrap",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                            }}
                          >
                            {normalizedRow.segmento}
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-4 mb-4">
            <div className="w-full sm:w-48">
              <FloatingSelect
                id="consulta-select"
                label="Consulta"
                value={consulta}
                onChange={(e) => setConsulta(e.target.value)}
                options={[
                  { value: "", label: "- Todas -" },
                  ...consultasOptions.map((item) => ({
                    value: String(item.idConsulta),
                    label: item.nombreConsulta,
                  }))
                ]}
                disabled={!!(loadingConsultas || errorConsultas)}
              />
              {loadingConsultas && (
                <span className="text-xs text-gray-500 block mt-0.5">Cargando...</span>
              )}
              {errorConsultas && (
                <span className="text-xs text-red-500 block mt-0.5">{errorConsultas}</span>
              )}
            </div>
            <div className="flex items-center justify-between w-full sm:w-auto sm:justify-center sm:gap-2">
              <button
                onClick={() => setCuentas(Math.max(0, cuentas - 1))}
                className="w-8 h-8 bg-jerarquia1 text-white rounded hover:bg-jerarquia2 flex items-center justify-center text-sm font-medium"
              >
                -
              </button>
              <div className="relative flex-1">
                <input
                  type="number"
                  value={cuentas}
                  onChange={(e) =>
                    setCuentas(Math.max(0, parseInt(e.target.value) || 0))
                  }
                  className="peer p-4 block w-full sm:w-20 bg-gray-50 border-transparent rounded-lg text-sm text-center focus:outline-none focus:ring-2 focus:ring-jerarquia1 focus:border-jerarquia1 focus:pt-6 focus:pb-2 not-placeholder-shown:pt-6 not-placeholder-shown:pb-2 autofill:pt-6 autofill:pb-2 disabled:bg-gray-200 disabled:text-gray-500"
                  id="cuentas-input"
                  min="0"
                />
                <label
                  htmlFor="cuentas-input"
                  className="absolute top-0 start-0 p-4 h-full truncate pointer-events-none transition ease-in-out duration-100 border border-transparent peer-disabled:opacity-50 peer-disabled:pointer-events-none peer-focus:text-xs peer-focus:-translate-y-1.5 peer-focus:text-gray-500 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:-translate-y-1.5 peer-not-placeholder-shown:text-gray-500"
                >
                  Cuentas
                </label>
              </div>
              <button
                onClick={() => setCuentas(cuentas + 1)}
                className="w-8 h-8 bg-jerarquia1 text-white rounded hover:bg-jerarquia2 flex items-center justify-center text-sm font-medium"
              >
                +
              </button>
            </div>
            <button
              onClick={handleAsignar}
              disabled={loadingAsignar}
              className="px-3 py-2 text-sm font-medium rounded-lg transition-colors bg-jerarquia1 text-white cursor-pointer hover:bg-jerarquia2 w-full sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loadingAsignar ? "Asignando..." : "Asignar"}
            </button>
          </div>
        </div>
      );
    } else {
      return (
        <div className="p-2 sm:p-4">
          <div className="flex flex-col gap-2 sm:flex-row sm:gap-4 mb-4">
            <div className="relative flex-1">
              <input
                type="date"
                value={fechaDesde}
                onChange={(e) => setFechaDesde(e.target.value)}
                className="peer p-4 block w-full bg-gray-50 border-transparent rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-jerarquia1 focus:border-jerarquia1 focus:pt-6 focus:pb-2 not-placeholder-shown:pt-6 not-placeholder-shown:pb-2 autofill:pt-6 autofill:pb-2"
                id="fecha-desde-consulta"
                placeholder=" "
              />
              <label
                htmlFor="fecha-desde-consulta"
                className="absolute top-0 start-0 p-4 h-full truncate pointer-events-none transition ease-in-out duration-100 border border-transparent text-xs peer-focus:-translate-y-3 peer-focus:text-gray-500 peer-[:not(:placeholder-shown)]:-translate-y-3 peer-[:not(:placeholder-shown)]:text-gray-500"
              >
                Desde
              </label>
            </div>
            <div className="relative flex-1">
              <input
                type="date"
                value={fechaHasta}
                onChange={(e) => setFechaHasta(e.target.value)}
                className="peer p-4 block w-full bg-gray-50 border-transparent rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-jerarquia1 focus:border-jerarquia1 focus:pt-6 focus:pb-2 not-placeholder-shown:pt-6 not-placeholder-shown:pb-2 autofill:pt-6 autofill:pb-2"
                id="fecha-hasta-consulta"
                placeholder=" "
              />
              <label
                htmlFor="fecha-hasta-consulta"
                className="absolute top-0 start-0 p-4 h-full truncate pointer-events-none transition ease-in-out duration-100 border border-transparent text-xs peer-focus:-translate-y-3 peer-focus:text-gray-500 peer-[:not(:placeholder-shown)]:-translate-y-3 peer-[:not(:placeholder-shown)]:text-gray-500"
              >
                Hasta
              </label>
            </div>
            <button
              onClick={handleBuscar}
              disabled={loadingConsulta}
              className="px-3 py-2 text-sm font-medium rounded-lg transition-colors bg-jerarquia1 text-white cursor-pointer hover:bg-jerarquia2 w-full sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loadingConsulta ? "Buscando..." : "Buscar"}
            </button>
          </div>
          {loadingConsulta && (
            <div className="text-center py-4">
              <p className="text-gray-500">Cargando datos...</p>
            </div>
          )}
          {errorConsulta && (
            <div className="text-center py-4">
              <p className="text-red-600">{errorConsulta}</p>
            </div>
          )}
          {!loadingConsulta && !errorConsulta && consultaData.length > 0 && (
            <div className="metas-block metas-block-3 bg-white rounded-lg shadow border border-[var(--color-jerarquia1)] overflow-hidden">
              <div
                className="scrollbar-gray"
                style={{
                  overflowX: "auto",
                  overflowY: "auto",
                  maxHeight: "400px",
                }}
              >
                <table
                  className="modal-table"
                  style={{ width: "100%", borderCollapse: "collapse" }}
                >
                  <thead>
                    <tr>
                      <th
                        style={{
                          whiteSpace: "nowrap",
                          position: "sticky",
                          top: 0,
                          zIndex: 10,
                          padding: "8px",
                        }}
                      >
                        Cuenta
                      </th>
                      <th
                        style={{
                          whiteSpace: "nowrap",
                          position: "sticky",
                          top: 0,
                          zIndex: 10,
                          padding: "8px",
                        }}
                      >
                        Nombre
                      </th>
                      <th
                        style={{
                          whiteSpace: "nowrap",
                          position: "sticky",
                          top: 0,
                          zIndex: 10,
                          padding: "8px",
                        }}
                      >
                        Expediente
                      </th>
                      <th
                        style={{
                          whiteSpace: "nowrap",
                          position: "sticky",
                          top: 0,
                          zIndex: 10,
                          padding: "8px",
                        }}
                      >
                        Situación
                      </th>
                      <th
                        style={{
                          whiteSpace: "nowrap",
                          position: "sticky",
                          top: 0,
                          zIndex: 10,
                          padding: "8px",
                        }}
                      >
                        Monto
                      </th>
                      <th
                        style={{
                          whiteSpace: "nowrap",
                          position: "sticky",
                          top: 0,
                          zIndex: 10,
                          padding: "8px",
                        }}
                      >
                        Supervisor
                      </th>
                      <th
                        style={{
                          whiteSpace: "nowrap",
                          position: "sticky",
                          top: 0,
                          zIndex: 10,
                          padding: "8px",
                        }}
                      >
                        Comentario
                      </th>
                      <th
                        style={{
                          whiteSpace: "nowrap",
                          position: "sticky",
                          top: 0,
                          zIndex: 10,
                          padding: "8px",
                          textAlign: "center",
                        }}
                      >
                        Realizado
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {consultaData.map((row, index) => (
                      <tr
                        key={index}
                        style={index % 2 === 1 ? { background: "#f9f9f9" } : {}}
                      >
                        <td
                          style={{
                            padding: "8px",
                            whiteSpace: "nowrap",
                            fontFamily: "monospace",
                            letterSpacing: "0.1em",
                          }}
                        >
                          {row.Cuenta?.trim() || "-"}
                        </td>
                        <td style={{ padding: "8px", whiteSpace: "nowrap" }}>
                          {row.Nombre || "-"}
                        </td>
                        <td
                          style={{
                            padding: "8px",
                            whiteSpace: "nowrap",
                            fontFamily: "monospace",
                            letterSpacing: "0.1em",
                          }}
                        >
                          {row.Expediente || "-"}
                        </td>
                        <td style={{ padding: "8px", whiteSpace: "nowrap" }}>
                          {row.Situación || "-"}
                        </td>
                        <td
                          style={{
                            padding: "8px",
                            whiteSpace: "nowrap",
                            textAlign: "right",
                          }}
                        >
                          {row.Monto
                            ? `$${row.Monto.toLocaleString("es-MX", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
                            : "-"}
                        </td>
                        <td style={{ padding: "8px", whiteSpace: "nowrap" }}>
                          {row.Supervisor || "-"}
                        </td>
                        <td style={{ padding: "8px", whiteSpace: "nowrap" }}>
                          {row.Comentario || "-"}
                        </td>
                        <td
                          style={{
                            padding: "8px",
                            whiteSpace: "nowrap",
                            textAlign: "center",
                          }}
                        >
                          {row.Realizado ? (
                            <span
                              style={{ color: "#16a34a", fontWeight: "bold" }}
                            >
                              ✓
                            </span>
                          ) : (
                            <span
                              style={{ color: "#dc2626", fontWeight: "bold" }}
                            >
                              ✗
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      );
    }
  };

  return (
    <ModalBaseSupervisor
      onClose={onClose}
      cartera={cartera}
      setCartera={setCartera}
      modo={modo}
      setModo={setModo}
    >
      {renderContent()}
    </ModalBaseSupervisor>
  );
};

export default ModalSupervisor;
