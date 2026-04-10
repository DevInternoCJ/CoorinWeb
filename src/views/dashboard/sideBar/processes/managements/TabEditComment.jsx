// editar comentario
import React, { useState, useRef, useMemo } from "react";
import {
  GetInfoEditComments,
  PutEditComments,
} from "../../../../../services/mark/Orochi/LokiServices";

const TabEditComment = () => {
  const [cartera, setCartera] = useState("");
  const [cuenta, setCuenta] = useState("");
  const [fecha, setFecha] = useState("");
  const [comentario, setComentario] = useState("");
  const [hasBuscado, setHasBuscado] = useState(false);
  const [gestiones, setGestiones] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const rowRefs = useRef([]);

  // Obtener fecha actual local para max del input date
  const hoy = new Date();
  const fechaHoy = `${hoy.getFullYear()}-${String(hoy.getMonth() + 1).padStart(2, "0")}-${String(hoy.getDate()).padStart(2, "0")}`;

  const handleBuscar = async () => {
    if (!cartera || !cuenta) {
      console.warn("Cartera y Cuenta son requeridos");
      return;
    }

    setLoading(true);
    try {
      const data = await GetInfoEditComments({
        idCartera: parseInt(cartera),
        cuenta: cuenta,
      });
      console.log("Datos recibidos:", data);
      setGestiones(data || []);
      setHasBuscado(true);
      setSelectedRow(null);
      setComentario("");
    } catch (error) {
      console.error("Error al buscar comentarios:", error);
      setGestiones([]);
      setHasBuscado(true);
    } finally {
      setLoading(false);
    }
  };

  const handleRowClick = (gestion, index) => {
    setSelectedRow(index);
    setComentario(gestion.Comentario || "");
  };

  const handleEditar = async () => {
    if (selectedRow === null) {
      console.warn("Debe seleccionar un comentario para editar");
      return;
    }

    const gestionSeleccionada = gestiones[selectedRow];
    const currentSelectedIndex = selectedRow;

    // Obtener fecha actual del sistema local en formato YYYY-MM-DD
    const hoy = new Date();
    const fechaSistema = `${hoy.getFullYear()}-${String(hoy.getMonth() + 1).padStart(2, "0")}-${String(hoy.getDate()).padStart(2, "0")}`;

    const params = {
      comentario: comentario,
      idCuenta: cuenta,
      idCartera: parseInt(cartera),
      fechaOriginal: gestionSeleccionada.Fecha
        ? gestionSeleccionada.Fecha.split("T")[0]
        : "",
      segundoInsert: gestionSeleccionada.Hora || "",
      fechaNueva: fechaSistema,
    };

    console.log("Parámetros a enviar al endpoint PutEditComments:", params);

    setLoading(true);
    try {
      const response = await PutEditComments(params);
      console.log("Respuesta exitosa de PutEditComments:", response);

      // Recargar los comentarios después de editar
      const data = await GetInfoEditComments({
        idCartera: parseInt(cartera),
        cuenta: cuenta,
      });
      setGestiones(data || []);

      // Mantener la selección del mismo row y actualizar el comentario
      setSelectedRow(currentSelectedIndex);
      setComentario(comentario);

      // Hacer scroll al row editado después de que se actualice el DOM
      setTimeout(() => {
        if (rowRefs.current[currentSelectedIndex]) {
          rowRefs.current[currentSelectedIndex].scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
        }
      }, 100);
    } catch (error) {
      console.error("Error al editar comentario:", error);
    } finally {
      setLoading(false);
    }
  };

  // Filtrar gestiones por fecha (filtro local)
  const gestionesFiltradas = useMemo(() => {
    if (!fecha) {
      return gestiones;
    }
    return gestiones.filter((gestion) => {
      const fechaGestion = gestion.Fecha ? gestion.Fecha.split("T")[0] : "";
      return fechaGestion === fecha;
    });
  }, [gestiones, fecha]);

  return (
    <div className="p-6 flex flex-col h-full space-y-4">
      {/* Row 1: Select Cartera, Input Cuenta y Botón Buscar */}
      <div className="flex flex-col gap-4 sm:flex-row sm:gap-4">
        {/* Select Cartera */}
        <div className="relative flex-1">
          <select
            value={cartera}
            onChange={(e) => setCartera(e.target.value)}
            className="peer p-4 pe-9 block w-full bg-gray-50 border-transparent rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-jerarquia1 focus:border-jerarquia1 disabled:opacity-50 disabled:pointer-events-none focus:pt-6 focus:pb-2 not-placeholder-shown:pt-6 not-placeholder-shown:pb-2 autofill:pt-6 autofill:pb-2"
            id="cartera-select-comment"
          >
            <option value="" disabled hidden></option>
            <option value="cartera1">Cartera 1</option>
            <option value="cartera2">Cartera 2</option>
            <option value="cartera3">Cartera 3</option>
            <option value="31">Cartera 31</option>
          </select>
          <label
            htmlFor="cartera-select-comment"
            className="absolute top-0 start-0 p-4 h-full truncate pointer-events-none transition ease-in-out duration-100 border border-transparent peer-disabled:opacity-50 peer-disabled:pointer-events-none peer-focus:text-xs peer-focus:-translate-y-1.5 peer-focus:text-gray-500 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:-translate-y-1.5 peer-not-placeholder-shown:text-gray-500"
          >
            Cartera
          </label>
        </div>

        {/* Input Cuenta (no editable) */}
        <div className="relative flex-1">
          <input
            type="text"
            value={cuenta}
            onChange={(e) => setCuenta(e.target.value)}
            className="peer p-4 block w-full bg-gray-50 border-transparent rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-jerarquia1 focus:border-jerarquia1 focus:pt-6 focus:pb-2 not-placeholder-shown:pt-6 not-placeholder-shown:pb-2 autofill:pt-6 autofill:pb-2"
            id="cuenta-input-comment"
            placeholder=" "
          />
          <label
            htmlFor="cuenta-input-comment"
            className="absolute top-0 start-0 p-4 h-full truncate pointer-events-none transition ease-in-out duration-100 border border-transparent text-sm peer-focus:text-xs peer-focus:-translate-y-1.5 peer-focus:text-gray-500 peer-not-placeholder-shown:text-xs peer-not-placeholder-shown:-translate-y-1.5 peer-not-placeholder-shown:text-gray-500"
          >
            Cuenta
          </label>
        </div>

        {/* Input Fecha */}
        <div className="relative flex-1">
          <input
            type="date"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
            min="2016-01-01"
            max={fechaHoy}
            className="peer p-4 block w-full bg-gray-50 border-transparent rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-jerarquia1 focus:border-jerarquia1 focus:pt-6 focus:pb-2 not-placeholder-shown:pt-6 not-placeholder-shown:pb-2 autofill:pt-6 autofill:pb-2"
            id="fecha-input-comment"
            placeholder=" "
          />
          <label
            htmlFor="fecha-input-comment"
            className="absolute top-0 start-0 p-4 h-full truncate pointer-events-none transition ease-in-out duration-100 border border-transparent text-xs peer-focus:-translate-y-3 peer-focus:text-gray-500 peer-[:not(:placeholder-shown)]:-translate-y-3 peer-[:not(:placeholder-shown)]:text-gray-500"
          >
            Fecha (Opcional)
          </label>
        </div>

        {/* Botón Buscar */}
        <div className="flex items-center">
          <button
            onClick={handleBuscar}
            className="btn-info w-full px-6 py-2 text-sm font-medium rounded-lg shadow-sm flex justify-center items-center"
          >
            Buscar
          </button>
        </div>
      </div>

      {/* Row 2: Tabla y Textarea apilados */}
      <div className="flex-1 flex flex-col gap-4 min-h-0">
        {/* Tabla */}
        <div className="flex-1 metas-block metas-block-3 bg-white rounded-lg shadow border border-[var(--color-jerarquia1)] flex flex-col min-w-0 min-h-0 overflow-hidden">
          <div
            className="scrollbar-gray w-full flex-1"
            style={{
              overflowY: "auto",
              maxHeight:
                window.innerWidth >= 1280 && window.innerWidth < 1536
                  ? "30vh"
                  : window.innerWidth >= 1024
                    ? "30vh"
                    : "40vh",
              minHeight: "150px",
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
                    Cuenta
                  </th>
                  <th
                    style={{
                      whiteSpace: "nowrap",
                      position: "sticky",
                      top: 0,
                      zIndex: 10,
                    }}
                  >
                    Cartera
                  </th>
                  <th
                    style={{
                      whiteSpace: "nowrap",
                      position: "sticky",
                      top: 0,
                      zIndex: 10,
                    }}
                  >
                    Fecha
                  </th>
                  <th
                    style={{
                      whiteSpace: "nowrap",
                      position: "sticky",
                      top: 0,
                      zIndex: 10,
                    }}
                  >
                    Hora
                  </th>
                  <th
                    style={{
                      whiteSpace: "nowrap",
                      position: "sticky",
                      top: 0,
                      zIndex: 10,
                    }}
                  >
                    NombreEjecutivo
                  </th>
                  <th
                    style={{
                      whiteSpace: "nowrap",
                      position: "sticky",
                      top: 0,
                      zIndex: 10,
                    }}
                  >
                    ClaveEjecutivo
                  </th>
                </tr>
              </thead>
              <tbody>
                {!hasBuscado ? (
                  <tr>
                    <td
                      colSpan="6"
                      style={{
                        textAlign: "center",
                        verticalAlign: "middle",
                        padding: "8px",
                        height: "150px",
                      }}
                    >
                      <span>Aún no se realiza una Busqueda</span>
                    </td>
                  </tr>
                ) : loading ? (
                  <tr>
                    <td
                      colSpan="6"
                      style={{
                        textAlign: "center",
                        verticalAlign: "middle",
                        padding: "8px",
                        height: "150px",
                      }}
                    >
                      <span>Cargando...</span>
                    </td>
                  </tr>
                ) : gestionesFiltradas.length === 0 ? (
                  <tr>
                    <td
                      colSpan="6"
                      style={{
                        textAlign: "center",
                        verticalAlign: "middle",
                        padding: "8px",
                        height: "150px",
                      }}
                    >
                      <span>
                        No se encontraron comentarios
                        {fecha ? " para la fecha seleccionada" : ""}
                      </span>
                    </td>
                  </tr>
                ) : (
                  gestionesFiltradas.map((gestion, index) => {
                    const originalIndex = gestiones.findIndex(
                      (g) => g === gestion,
                    );
                    return (
                      <tr
                        key={originalIndex}
                        ref={(el) => (rowRefs.current[originalIndex] = el)}
                        style={{
                          background:
                            index % 2 === 1 ? "#f9f9f9" : "transparent",
                          cursor: "pointer",
                          backgroundColor:
                            selectedRow === originalIndex
                              ? "var(--color-jerarquia1)"
                              : index % 2 === 1
                                ? "#f9f9f9"
                                : "transparent",
                        }}
                        onClick={() => handleRowClick(gestion, originalIndex)}
                      >
                        <td
                          style={{
                            textAlign: "left",
                            padding: "8px",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          {gestion.Cuenta || "-"}
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
                          {gestion.Cartera || "-"}
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
                          {gestion.Fecha ? gestion.Fecha.split("T")[0] : "-"}
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
                          {gestion.Hora || "-"}
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
                          {gestion.NombreEjecutivo || "-"}
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
                          {gestion.ClaveEjecutivo || "-"}
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Textarea con botón */}
        <div className="relative min-h-[100px] flex-shrink-0">
          <textarea
            value={comentario}
            onChange={(e) => setComentario(e.target.value)}
            className="w-full h-full p-4 pr-28 pb-4 bg-gray-50 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-jerarquia1 focus:border-jerarquia1 resize-y"
            placeholder="Comentarios."
            style={{
              minHeight: "100px",
              backgroundImage:
                "linear-gradient(135deg, transparent 50%, #000 50%), linear-gradient(45deg, transparent 50%, #000 50%)",
              backgroundPosition:
                "calc(100% - 8px) calc(100% - 8px), calc(100% - 4px) calc(100% - 4px)",
              backgroundSize: "8px 8px, 8px 8px",
              backgroundRepeat: "no-repeat",
            }}
          />
          <button
            type="button"
            onClick={handleEditar}
            disabled={selectedRow === null || loading}
            className="btn-success absolute right-5 bottom-3 px-6 py-2 text-sm font-medium rounded-lg shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Guardando..." : "Editar"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TabEditComment;
