// editar gestiones
import React, { useState, useRef } from "react";
import CatalogSelect from "../../../../../components/Select/CatalogSelect";
import FloatingInput from "../../../../../components/Select/FloatingInput";
import FieldError from "../../../../../components/Formulario/FieldError";
import useZodValidation from "../../../../../hooks/useZodValidation";
import { gestionEditSchema, gestionSearchSchema } from "../../../../../schemas/formSchemas";
import {
  GetInfoEditManagments,
  PutEditManagments,
} from "../../../../../services/mark/Orochi/LokiServices";

const TabEditManagement = () => {
  const [cartera, setCartera] = useState("");
  const [cuenta, setCuenta] = useState("");
  const [comentario, setComentario] = useState("");
  const [hasBuscado, setHasBuscado] = useState(false);
  const [gestiones, setGestiones] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedRow, setSelectedRow] = useState(null);
  const rowRefs = useRef([]);
  const searchValidation = useZodValidation(gestionSearchSchema);
  const editValidation = useZodValidation(gestionEditSchema);

  const handleBuscar = async () => {
    const filters = searchValidation.validate({ idCartera: cartera, idCuenta: cuenta });
    if (!filters) return;

    setLoading(true);
    try {
      const data = await GetInfoEditManagments({
        idCartera: filters.idCartera,
        idCuenta: filters.idCuenta,
      });
      setGestiones(data || []);
      setHasBuscado(true);
      setSelectedRow(null);
      setComentario("");
    } catch (error) {
      console.error("Error al buscar gestiones:", error);
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
      console.warn("Debe seleccionar una gestión para editar");
      return;
    }

    const gestionSeleccionada = gestiones[selectedRow];
    const currentSelectedIndex = selectedRow;

    const params = {
      idCartera: cartera,
      idCuenta: cuenta,
      fecha: gestionSeleccionada.Fecha
        ? gestionSeleccionada.Fecha.split("T")[0]
        : "",
      hora: gestionSeleccionada.Hora || "",
      comentario: comentario,
    };

    const parsedParams = editValidation.validate(params);
    if (!parsedParams) return;

    console.log("Parámetros a enviar al endpoint PutEditManagments:", params);

    setLoading(true);
    try {
      const response = await PutEditManagments(parsedParams);
      console.log("Respuesta exitosa de PutEditManagments:", response);

      // Recargar las gestiones después de editar
      const data = await GetInfoEditManagments({
        idCartera: parseInt(cartera),
        idCuenta: cuenta,
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
      console.error("Error al editar gestión:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 flex flex-col h-full space-y-4">
      {/* Row 1: Select Cartera, Input Cuenta y Botón Buscar */}
      <div className="flex flex-col gap-4 sm:flex-row sm:gap-4">
        {/* Select Cartera */}
        <div className="flex-1">
          <CatalogSelect
            id="cartera-select-edit"
            label="Cartera"
            value={cartera}
              onChange={(e) => {
                setCartera(e.target.value);
                searchValidation.clearError("idCartera");
                editValidation.clearError("idCartera");
              }}
            required
            options={[
              { value: "1",  label: "Cartera 1"  },
              { value: "2",  label: "Cartera 2"  },
              { value: "3",  label: "Cartera 3"  },
              { value: "31", label: "Cartera 31" },
            ]}
          />
          <FieldError id="idCartera-error" message={searchValidation.errors.idCartera || editValidation.errors.idCartera} />
        </div>

        <FloatingInput
          id="idCuenta"
          label="Cuenta"
          value={cuenta}
          onChange={(e) => {
            setCuenta(e.target.value);
            searchValidation.clearError("idCuenta");
            editValidation.clearError("idCuenta");
          }}
          error={searchValidation.errors.idCuenta || editValidation.errors.idCuenta}
          required
        />

        {/* Botón Buscar */}
        <div className="flex items-center">
          <button
            onClick={handleBuscar}
            type="button"
            disabled={loading}
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
                    Contacto
                  </th>
                  <th
                    style={{
                      whiteSpace: "nowrap",
                      position: "sticky",
                      top: 0,
                      zIndex: 10,
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
                    }}
                  >
                    Ejecutivo
                  </th>
                </tr>
              </thead>
              <tbody>
                {!hasBuscado ? (
                  <tr>
                    <td
                      colSpan="5"
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
                      colSpan="5"
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
                ) : gestiones.length === 0 ? (
                  <tr>
                    <td
                      colSpan="5"
                      style={{
                        textAlign: "center",
                        verticalAlign: "middle",
                        padding: "8px",
                        height: "150px",
                      }}
                    >
                      <span>No se encontraron gestiones</span>
                    </td>
                  </tr>
                ) : (
                  gestiones.map((gestion, index) => (
                    <tr
                      key={index}
                      ref={(el) => (rowRefs.current[index] = el)}
                      style={{
                        background: index % 2 === 1 ? "#f9f9f9" : "transparent",
                        cursor: "pointer",
                        backgroundColor:
                          selectedRow === index
                            ? "var(--color-jerarquia1)"
                            : index % 2 === 1
                              ? "#f9f9f9"
                              : "transparent",
                      }}
                      onClick={() => handleRowClick(gestion, index)}
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
                        {gestion.Fecha ? gestion.Fecha.split("T")[0] : "-"}
                        {/* {gestion.Fecha || '-'} */}
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
                        {gestion.Contacto || "-"}
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
                        {gestion.Situación || "-"}
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
                        {gestion.Ejecutivo || "-"}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Textarea con botón */}
        <div className="relative min-h-[100px] flex-shrink-0">
          <textarea
            id="comentario-gestion"
            name="comentario"
            value={comentario}
            onChange={(e) => {
              setComentario(e.target.value);
              editValidation.clearError("comentario");
            }}
            aria-invalid={Boolean(editValidation.errors.comentario)}
            className="w-full h-full p-4 pr-28 pb-4 bg-gray-50 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-jerarquia1 focus:border-jerarquia1 resize-y"
            placeholder="Comentario de la Gestion. "
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
          <FieldError id="comentario-gestion-error" message={editValidation.errors.comentario || editValidation.errors.fecha || editValidation.errors.hora} className="absolute -bottom-5 start-0" />
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

export default TabEditManagement;
