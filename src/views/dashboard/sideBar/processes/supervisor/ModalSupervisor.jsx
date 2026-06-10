// src/hu/dashboard/sideBar/processes/supervisor/ModalSupervisor.jsx

import React, { useEffect, useState } from "react";
import FloatingSelect from "../../../../../components/Select/FloatingSelect";
import FloatingInput from "../../../../../components/Select/FloatingInput";
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
  const [searchQuery, setSearchQuery] = useState("");
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
    setSearchQuery("");
  }, [cartera, modo]);

  // Filtrar supervisores localmente
  const filteredTableData = tableData.filter((row) => {
    if (!searchQuery) return true;
    const term = searchQuery.toLowerCase();
    const usuario = (row.Usuario ?? row.usuario ?? "").toLowerCase();
    const nombre = (row.NombreEjecutivo ?? row.nombreEjecutivo ?? "").toLowerCase();
    const segmento = (row.Segmento ?? row.segmento ?? "").toLowerCase();
    return (
      usuario.includes(term) ||
      nombre.includes(term) ||
      segmento.includes(term)
    );
  });

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
          {/* Barra de búsqueda compacta */}
          <div className="relative mb-3">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                className="size-4 text-[var(--color-text-muted)]"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.3-4.3"></path>
              </svg>
            </div>
            <input
              type="text"
              className="py-2.5 ps-10 pe-8 block w-full bg-[var(--color-surface-secondary)] border border-[var(--color-border)] rounded-lg text-sm font-medium text-[var(--color-text-primary)] placeholder:text-[var(--color-text-muted)]/60 focus:outline-none focus:ring-2 focus:ring-[var(--color-jerarquia2)] focus:border-[var(--color-jerarquia2)] transition-all"
              placeholder="Buscar supervisor por nombre, usuario o segmento..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute inset-y-0 end-0 flex items-center pe-3 text-[var(--color-text-muted)]/60 hover:text-red-500 transition-colors focus:outline-none"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 6 6 18"></path>
                  <path d="m6 6 12 12"></path>
                </svg>
              </button>
            )}
          </div>

          {/* Contenedor de la tabla */}
          <div className="bg-layer border border-border rounded-lg shadow-sm flex flex-col min-w-0 min-h-0 w-full h-full overflow-hidden mb-3">
            <div
              className="scrollbar-gray w-full flex-1"
              style={{
                overflowY: "auto",
                maxHeight: "350px",
                minHeight: 0,
              }}
            >
              <table
                className="modal-table w-full"
                style={{ borderCollapse: "separate", borderSpacing: 0 }}
              >
                <thead>
                  <tr>
                    <th
                      style={{
                        whiteSpace: "nowrap",
                        position: "sticky",
                        top: 0,
                        zIndex: 10,
                        textAlign: "center",
                        width: "80px",
                      }}
                    >
                      <div className="flex items-center justify-center">
                        <input
                          type="checkbox"
                          className="modal-checkbox-small"
                          checked={
                            filteredTableData.length > 0 &&
                            filteredTableData.every(
                              (row) => selectedUsers[row.idEjecutivo]
                            )
                          }
                          onChange={(e) => {
                            const isChecked = e.target.checked;
                            const nextSelection = { ...selectedUsers };
                            filteredTableData.forEach((row) => {
                              nextSelection[row.idEjecutivo] = isChecked;
                            });
                            setSelectedUsers(nextSelection);
                          }}
                          aria-label="Seleccionar todos los supervisores"
                        />
                      </div>
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
                        className="text-center py-6 text-muted-foreground bg-surface"
                      >
                        <div className="flex flex-col items-center justify-center gap-2">
                          <span className="animate-spin inline-block size-6 border-[3px] border-current border-t-transparent text-jerarquia2 rounded-full" role="status" aria-label="loading"></span>
                          <span>Cargando supervisores...</span>
                        </div>
                      </td>
                    </tr>
                  )}
                  {!loading && error && (
                    <tr>
                      <td
                        colSpan="4"
                        className="text-center py-6 text-red-500 bg-surface font-medium"
                      >
                        {error}
                      </td>
                    </tr>
                  )}
                  {!loading && !error && tableData.length === 0 && (
                    <tr>
                      <td
                        colSpan="4"
                        className="text-center py-6 text-muted-foreground bg-surface"
                      >
                        No hay supervisores para mostrar.
                      </td>
                    </tr>
                  )}
                  {!loading && !error && tableData.length > 0 && filteredTableData.length === 0 && (
                    <tr>
                      <td
                        colSpan="4"
                        className="text-center py-6 text-muted-foreground bg-surface"
                      >
                        Ningún supervisor coincide con la búsqueda.
                      </td>
                    </tr>
                  )}
                  {!loading &&
                    !error &&
                    filteredTableData.map((row, index) => {
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
                          className="bg-surface even:bg-surface-secondary/30 hover:bg-surface-secondary transition-colors duration-150"
                        >
                          <td className="text-center p-2.5">
                            <div className="flex items-center justify-center">
                              <input
                                type="checkbox"
                                id={`chk-${normalizedRow.idEjecutivo}`}
                                className="modal-checkbox-small"
                                checked={
                                  selectedUsers[normalizedRow.idEjecutivo] ||
                                  false
                                }
                                onChange={(e) => {
                                  e.stopPropagation();
                                  handleCheckboxChange(
                                    normalizedRow.idEjecutivo
                                  );
                                }}
                              />
                            </div>
                          </td>
                          <td
                            className="p-2.5 font-mono tracking-wider text-xs"
                            style={{
                              textAlign: "left",
                              whiteSpace: "nowrap",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                            }}
                          >
                            {normalizedRow.usuario}
                          </td>
                          <td
                            className="p-2.5"
                            style={{
                              textAlign: "left",
                              whiteSpace: "nowrap",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                            }}
                          >
                            {normalizedRow.nombreEjecutivo}
                          </td>
                          <td
                            className="p-2.5"
                            style={{
                              textAlign: "left",
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

          {/* Controles de asignación */}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-4">
            <div className="w-full sm:flex-1">
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
                <span className="text-xs text-[var(--color-text-muted)] block mt-1">Cargando...</span>
              )}
              {errorConsultas && (
                <span className="text-xs text-red-500 block mt-1">{errorConsultas}</span>
              )}
            </div>

            <div className="flex items-center gap-1.5 self-center">
              <button
                type="button"
                onClick={() => setCuentas(Math.max(0, cuentas - 1))}
                className="w-11 h-11 inline-flex justify-center items-center text-sm font-medium rounded-lg border border-border bg-surface-secondary text-text-primary shadow-sm hover:bg-surface disabled:opacity-50 disabled:pointer-events-none transition-colors"
                disabled={cuentas <= 0}
              >
                <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/></svg>
              </button>
              
              <div className="w-24">
                <FloatingInput
                  id="cuentas-input"
                  label="Cuentas"
                  type="number"
                  value={cuentas === 0 ? "" : cuentas}
                  onChange={(e) =>
                    setCuentas(Math.max(0, parseInt(e.target.value) || 0))
                  }
                  min="0"
                />
              </div>

              <button
                type="button"
                onClick={() => setCuentas(cuentas + 1)}
                className="w-11 h-11 inline-flex justify-center items-center text-sm font-medium rounded-lg border border-border bg-surface-secondary text-text-primary shadow-sm hover:bg-surface disabled:opacity-50 disabled:pointer-events-none transition-colors"
              >
                <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
              </button>
            </div>

            <button
              onClick={handleAsignar}
              disabled={loadingAsignar}
              className="py-3 px-5 inline-flex items-center justify-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-jerarquia2 text-white hover:bg-jerarquia3 disabled:opacity-50 disabled:pointer-events-none transition-colors cursor-pointer w-full sm:w-auto h-[46px]"
            >
              {loadingAsignar && (
                <span className="animate-spin inline-block size-4 border-[2px] border-current border-t-transparent text-white rounded-full" role="status" aria-label="loading">
                  <span className="sr-only">Cargando...</span>
                </span>
              )}
              Asignar
            </button>
          </div>
        </div>
      );
    } else {
      return (
        <div className="p-2 sm:p-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4 mb-4">
            <div className="flex-1">
              <FloatingInput
                id="fecha-desde-consulta"
                label="Desde"
                type="date"
                value={fechaDesde}
                onChange={(e) => setFechaDesde(e.target.value)}
              />
            </div>
            <div className="flex-1">
              <FloatingInput
                id="fecha-hasta-consulta"
                label="Hasta"
                type="date"
                value={fechaHasta}
                onChange={(e) => setFechaHasta(e.target.value)}
              />
            </div>
            <button
              onClick={handleBuscar}
              disabled={loadingConsulta}
              className="py-3 px-5 inline-flex items-center justify-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-jerarquia2 text-white hover:bg-jerarquia3 disabled:opacity-50 disabled:pointer-events-none transition-colors cursor-pointer w-full sm:w-auto h-[46px]"
            >
              {loadingConsulta && (
                <span className="animate-spin inline-block size-4 border-[2px] border-current border-t-transparent text-white rounded-full" role="status" aria-label="loading">
                  <span className="sr-only">Buscando...</span>
                </span>
              )}
              Buscar
            </button>
          </div>
          {loadingConsulta && (
            <div className="text-center py-6 text-muted-foreground bg-surface rounded-lg border border-border">
              <div className="flex flex-col items-center justify-center gap-2">
                <span className="animate-spin inline-block size-6 border-[3px] border-current border-t-transparent text-jerarquia2 rounded-full" role="status" aria-label="loading"></span>
                <span>Cargando datos...</span>
              </div>
            </div>
          )}
          {errorConsulta && (
            <div className="text-center py-6 text-red-500 bg-surface rounded-lg border border-border font-medium">
              {errorConsulta}
            </div>
          )}
          {!loadingConsulta && !errorConsulta && consultaData.length > 0 && (
            <div className="bg-layer border border-border rounded-lg shadow-sm overflow-hidden">
              <div
                className="scrollbar-gray"
                style={{
                  overflowX: "auto",
                  overflowY: "auto",
                  maxHeight: "350px",
                }}
              >
                <table
                  className="modal-table w-full"
                  style={{ borderCollapse: "separate", borderSpacing: 0 }}
                >
                  <thead>
                    <tr>
                      <th
                        style={{
                          whiteSpace: "nowrap",
                          position: "sticky",
                          top: 0,
                          zIndex: 10,
                          padding: "10px 8px",
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
                          padding: "10px 8px",
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
                          padding: "10px 8px",
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
                          padding: "10px 8px",
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
                          padding: "10px 8px",
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
                          padding: "10px 8px",
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
                          padding: "10px 8px",
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
                          padding: "10px 8px",
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
                        className="bg-surface even:bg-surface-secondary/30 hover:bg-surface-secondary transition-colors duration-150"
                      >
                        <td
                          className="p-2.5 font-mono tracking-wider text-xs"
                          style={{
                            whiteSpace: "nowrap",
                          }}
                        >
                          {row.Cuenta?.trim() || "-"}
                        </td>
                        <td className="p-2.5" style={{ whiteSpace: "nowrap" }}>
                          {row.Nombre || "-"}
                        </td>
                        <td
                          className="p-2.5 font-mono tracking-wider text-xs"
                          style={{
                            whiteSpace: "nowrap",
                          }}
                        >
                          {row.Expediente || "-"}
                        </td>
                        <td className="p-2.5" style={{ whiteSpace: "nowrap" }}>
                          {row.Situación || "-"}
                        </td>
                        <td
                          className="p-2.5"
                          style={{
                            whiteSpace: "nowrap",
                            textAlign: "right",
                          }}
                        >
                          {row.Monto
                            ? `$${row.Monto.toLocaleString("es-MX", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
                            : "-"}
                        </td>
                        <td className="p-2.5" style={{ whiteSpace: "nowrap" }}>
                          {row.Supervisor || "-"}
                        </td>
                        <td className="p-2.5" style={{ whiteSpace: "nowrap" }}>
                          {row.Comentario || "-"}
                        </td>
                        <td
                          className="p-2.5"
                          style={{
                            whiteSpace: "nowrap",
                            textAlign: "center",
                          }}
                        >
                          {row.Realizado ? (
                            <span
                              className="text-emerald-500 font-bold"
                            >
                              ✓
                            </span>
                          ) : (
                            <span
                              className="text-red-500 font-bold"
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
