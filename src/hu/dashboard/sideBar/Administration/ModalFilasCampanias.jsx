import React, { useState } from "react";
import { toast } from "sonner";
import * as XLSX from "xlsx";
import { CreatedTableTempFilas } from "../../../../services/mark/albaz/LokiServices";

const ModalFilasCampañas = ({
  open,
  onClose,
  cartera = "American Express",
  idCampaña,
}) => {
  // Estado para loading del botón cargar
  const [loading, setLoading] = useState(false);
  const [tipoFilas, setTipoFilas] = useState("archivo");
  const [fileName, setFileName] = useState("");
  const [fileRows, setFileRows] = useState([]);
  const [fileCols, setFileCols] = useState(0);
  const [fileHeaders, setFileHeaders] = useState([]);
  const [sortConfig, setSortConfig] = useState({ col: null, direction: null });
  const [originalRows, setOriginalRows] = useState([]);

  // Limpiar estados al cerrar el modal
  React.useEffect(() => {
    if (!open) {
      setTipoFilas("archivo");
      setFileName("");
      setFileRows([]);
      setFileCols(0);
      setFileHeaders([]);
      setSortConfig({ col: null, direction: null });
      setOriginalRows([]);
    }
  }, [open]);
  // Procesar archivo CSV
  // Ordenamiento
  const handleSort = (colIdx, type) => {
    if (sortConfig.col === colIdx) {
      // Si ya está ordenando esta columna, revertir al original
      setSortConfig({ col: null, direction: null });
      setFileRows([...originalRows]);
    } else {
      let sorted = [...fileRows];
      if (type === "number") {
        // Si el header es Teléfono, ordenar por longitud descendente
        if (fileHeaders[colIdx] === "Teléfono") {
          sorted.sort(
            (a, b) =>
              (b[colIdx] || "").toString().length -
              (a[colIdx] || "").toString().length
          );
        } else {
          sorted.sort((a, b) => {
            const numA = parseFloat(a[colIdx]) || 0;
            const numB = parseFloat(b[colIdx]) || 0;
            return numA - numB;
          });
        }
      } else {
        sorted.sort((a, b) => {
          const valA = (a[colIdx] || "").toString().toLowerCase();
          const valB = (b[colIdx] || "").toString().toLowerCase();
          return valA.localeCompare(valB);
        });
      }
      setSortConfig({ col: colIdx, direction: "asc" });
      setFileRows(sorted);
    }
  };

  // Procesar archivo CSV
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setFileName(file.name);
    const ext = file.name.split(".").pop().toLowerCase();
    if (ext === "csv") {
      const reader = new FileReader();
      reader.onload = (evt) => {
        const text = evt.target.result;
        const lines = text.split(/\r?\n/).filter(Boolean);
        let headers = [];
        let rows = [];
        if (lines.length > 0) {
          headers = lines[0].split(",");
          rows = lines.slice(1).map((line) => {
            const cols = line.split(",");
            return cols;
          });
        }
        setFileHeaders(headers);
        setFileCols(headers.length);
        setFileRows(rows);
        setOriginalRows(rows);
      };
      reader.readAsText(file);
    } else if (ext === "xlsx") {
      const reader = new FileReader();
      reader.onload = (evt) => {
        const data = new Uint8Array(evt.target.result);
        const workbook = XLSX.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const json = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
        let headers = [];
        let rows = [];
        if (json.length > 0) {
          headers = json[0];
          rows = json.slice(1);
        }
        setFileHeaders(headers);
        setFileCols(headers.length);
        setFileRows(rows);
        setOriginalRows(rows);
      };
      reader.readAsArrayBuffer(file);
    }
  };

  // Eliminar fila
  const handleDeleteRow = (rowIdx) => {
    setFileRows((prev) => prev.filter((_, i) => i !== rowIdx));
  };

  // Acción al presionar Cargar (solo modo archivo)
  const handleCargarArchivo = async () => {
    if (!idCampaña) {
      toast.error("No se encontró el id de la campaña.");
      return;
    }
    setLoading(true);
    try {
      await CreatedTableTempFilas(idCampaña);
      toast.success("Tabla temporal creada correctamente.");
    } catch (err) {
      toast.error("Error al crear la tabla temporal de filas.", err);
    } finally {
      setLoading(false);
    }
  };
  return open ? (
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
          padding: 28,
          minWidth: 900,
          minHeight: 520,
          boxShadow: "0 2px 16px rgba(0,0,0,0.15)",
          position: "relative",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
        }}
      >
        <div
          className="flex items-center mb-2 w-full"
          style={{ position: "relative" }}
        >
          <span
            className="modal-span-1 pl-1 mr-4"
            style={{
              color: "var(--color-jerarquia2)",
              fontWeight: 600,
              fontSize: 22,
            }}
          >
            Filas de trabajo (Promesa Midprimes) - Coorin
          </span>
          <button
            className="modal-btn modal-btn-close"
            style={{ fontSize: 20, position: "absolute", right: 12, top: 8 }}
            onClick={onClose}
          >
            &times;
          </button>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            marginBottom: 10,
            width: "100%",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              alignItems: "center",
              width: "100%",
              gap: 18,
            }}
          >
            {tipoFilas === "archivo" ? (
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontWeight: "bold", color: "#000" }}>
                  Cartera:
                </span>
                <span style={{ color: "#000" }}>{cartera}</span>
              </div>
            ) : (
              <div></div>
            )}
            {fileRows.length === 0 && (
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: 18,
                  height: "100%",
                }}
              >
                <label style={{ color: "#000", fontWeight: 400 }}>
                  <input
                    type="radio"
                    name="tipo"
                    checked={tipoFilas === "archivo"}
                    onChange={() => setTipoFilas("archivo")}
                  />{" "}
                  Archivo
                </label>
                <label style={{ color: "#000", fontWeight: 400 }}>
                  <input
                    type="radio"
                    name="tipo"
                    checked={tipoFilas === "consulta"}
                    onChange={() => setTipoFilas("consulta")}
                  />{" "}
                  Consulta
                </label>
              </div>
            )}
            <div></div>
          </div>
          {tipoFilas === "archivo" ? (
            <>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  width: "100%",
                  marginTop: 12,
                }}
              >
                <input
                  type="text"
                  value={fileName}
                  readOnly
                  style={{
                    flex: 1,
                    padding: "4px 10px",
                    borderRadius: 4,
                    border: "1px solid #ccc",
                    marginRight: 18,
                    minWidth: 180,
                  }}
                />
                <label
                  style={{
                    background: "var(--color-jerarquia2)",
                    color: "#fff",
                    border: "none",
                    borderRadius: 4,
                    padding: "4px 18px",
                    fontWeight: 500,
                    cursor: "pointer",
                  }}
                >
                  Archivo
                  <input
                    type="file"
                    accept=".csv,.xlsx"
                    style={{ display: "none" }}
                    onChange={handleFileChange}
                  />
                </label>
              </div>
              <div style={{ width: "100%", marginBottom: 8 }}>
                <table className="modal-table">
                  <thead>
                    <tr>
                      <th>Cuenta</th>
                      <th>Usuario</th>
                      <th>Teléfono</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td colSpan={3} style={{ textAlign: "center" }}>
                        {" "}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              {/* Tabla cargada desde archivo */}
              {fileRows.length > 0 && (
                <div
                  className="scrollbar-gray"
                  style={{
                    width: "100%",
                    marginBottom: 8,
                    maxHeight: 320,
                    height: 320,
                    overflowY: "auto",
                  }}
                >
                  <table className="modal-table" style={{ marginTop: 12 }}>
                    <thead>
                      <tr>
                        {/* Columna 1 */}
                        <th
                          style={{
                            background: "var(--color-jerarquia3)",
                            color: "#fff",
                            textAlign: "center",
                            cursor:
                              typeof fileHeaders[0] === "string" &&
                              !fileHeaders[0].includes("Expr")
                                ? "pointer"
                                : "default",
                          }}
                          onClick={() => {
                            if (typeof fileHeaders[0] === "string") {
                              if (!fileHeaders[0].includes("Expr")) {
                                handleSort(
                                  0,
                                  fileHeaders[0] === "Cuenta" ||
                                    fileHeaders[0] === "Teléfono"
                                    ? "number"
                                    : "string"
                                );
                              }
                            } else {
                              toast.error(
                                "El encabezado de la columna 1 no es válido."
                              );
                            }
                          }}
                        >
                          {fileCols >= 1
                            ? fileHeaders[0] || "Expr1000"
                            : "Expr1000"}
                          {typeof fileHeaders[0] === "string" &&
                            !fileHeaders[0].includes("Expr") && (
                              <span style={{ marginLeft: 6, fontSize: 14 }}>
                                {sortConfig.col === 0
                                  ? sortConfig.direction === "asc"
                                    ? "▲"
                                    : "▼"
                                  : "⇅"}
                              </span>
                            )}
                        </th>
                        {/* Columna 2 */}
                        <th
                          style={{
                            background: "var(--color-jerarquia3)",
                            color: "#fff",
                            textAlign: "center",
                            cursor:
                              typeof fileHeaders[1] === "string" &&
                              !fileHeaders[1].includes("Expr")
                                ? "pointer"
                                : "default",
                          }}
                          onClick={() => {
                            if (typeof fileHeaders[1] === "string") {
                              if (!fileHeaders[1].includes("Expr")) {
                                handleSort(
                                  1,
                                  fileHeaders[1] === "Cuenta" ||
                                    fileHeaders[1] === "Teléfono"
                                    ? "number"
                                    : "string"
                                );
                              }
                            } else {
                              toast.error(
                                "El encabezado de la columna 2 no es válido."
                              );
                            }
                          }}
                        >
                          {fileCols >= 2
                            ? fileHeaders[1] || "Expr1001"
                            : "Expr1001"}
                          {typeof fileHeaders[1] === "string" &&
                            !fileHeaders[1].includes("Expr") && (
                              <span style={{ marginLeft: 6, fontSize: 14 }}>
                                {sortConfig.col === 1
                                  ? sortConfig.direction === "asc"
                                    ? "▲"
                                    : "▼"
                                  : "⇅"}
                              </span>
                            )}
                        </th>
                        {/* Columna 3 */}
                        <th
                          style={{
                            background: "var(--color-jerarquia3)",
                            color: "#fff",
                            textAlign: "center",
                            cursor:
                              typeof fileHeaders[2] === "string" &&
                              !fileHeaders[2].includes("Expr")
                                ? "pointer"
                                : "default",
                          }}
                          onClick={() => {
                            if (typeof fileHeaders[2] === "string") {
                              if (!fileHeaders[2].includes("Expr")) {
                                handleSort(
                                  2,
                                  fileHeaders[2] === "Cuenta" ||
                                    fileHeaders[2] === "Teléfono"
                                    ? "number"
                                    : "string"
                                );
                              }
                            } else {
                              toast.error(
                                "El encabezado de la columna 3 no es válido."
                              );
                            }
                          }}
                        >
                          {fileCols >= 3
                            ? fileHeaders[2] || "Expr1002"
                            : "Expr1002"}
                          {typeof fileHeaders[2] === "string" &&
                            !fileHeaders[2].includes("Expr") && (
                              <span style={{ marginLeft: 6, fontSize: 14 }}>
                                {sortConfig.col === 2
                                  ? sortConfig.direction === "asc"
                                    ? "▲"
                                    : "▼"
                                  : "⇅"}
                              </span>
                            )}
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {fileRows.map((row, idx) => (
                        <tr key={idx}>
                          {/* Columna 1 */}
                          <td style={{ textAlign: "center" }}>
                            {row[0] ? row[0] : ""}
                            {fileCols < 3 && !row[0] && (
                              <span
                                style={{
                                  border: "1px solid red",
                                  background: "#fff",
                                  color: "red",
                                  fontWeight: "bold",
                                  borderRadius: 2,
                                  padding: "0 2px",
                                  fontSize: 16,
                                  marginLeft: 4,
                                }}
                              >
                                &#10006;
                              </span>
                            )}
                          </td>
                          {/* Columna 2 */}
                          <td style={{ textAlign: "center" }}>
                            {row[1] ? row[1] : ""}
                            {fileCols < 3 && !row[1] && (
                              <span
                                style={{
                                  border: "1px solid red",
                                  background: "#fff",
                                  color: "red",
                                  fontWeight: "bold",
                                  borderRadius: 2,
                                  padding: "0 2px",
                                  fontSize: 16,
                                  marginLeft: 4,
                                }}
                              >
                                &#10006;
                              </span>
                            )}
                          </td>
                          {/* Columna 3 */}
                          <td style={{ textAlign: "center" }}>
                            {row[2] ? row[2] : ""}
                            {fileCols < 3 && !row[2] && (
                              <span
                                style={{
                                  border: "1px solid red",
                                  background: "#fff",
                                  color: "red",
                                  fontWeight: "bold",
                                  borderRadius: 2,
                                  padding: "0 2px",
                                  fontSize: 16,
                                  marginLeft: 4,
                                }}
                              >
                                &#10006;
                              </span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </>
          ) : (
            <>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  width: "100%",
                  marginTop: 24,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    marginBottom: 18,
                  }}
                >
                  <label
                    style={{ fontWeight: 500, color: "#000", marginRight: 8 }}
                  >
                    CFP
                  </label>
                  <select className="modal-dropdown-select">
                    <option value="">Selecciona CFP</option>
                    <option value="cfp1">CFP 1</option>
                    <option value="cfp2">CFP 2</option>
                  </select>
                </div>
                <button
                  style={{
                    background: "var(--color-jerarquia3)",
                    color: "#fff",
                    border: "none",
                    borderRadius: 4,
                    padding: "8px 32px",
                    fontWeight: 500,
                    fontSize: 17,
                    marginTop: 18,
                  }}
                >
                  Cargar
                </button>
              </div>
            </>
          )}
        </div>
        {/* Grid resumen abajo del modal, arriba de Resultado solo si está en archivo */}
        {tipoFilas === "archivo" && fileRows.length > 0 && (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              alignItems: "center",
              width: "100%",
              position: "relative",
              marginTop: 12,
              padding: "0 28px",
              fontWeight: 600,
              fontSize: 13,
            }}
          >
            {/* Columna: número de columnas */}
            <div
              style={{ textAlign: "left", color: "var(--color-jerarquia3)" }}
            >
              ( {fileCols} / 3 )
            </div>
            {/* Columna: botón cargar */}
            <div style={{ textAlign: "center" }}>
              <button
                style={{
                  background: "var(--color-jerarquia2)",
                  color: "#fff",
                  border: "none",
                  borderRadius: 4,
                  padding: "6px 32px",
                  fontWeight: 600,
                  fontSize: 15,
                  cursor: loading ? "wait" : "pointer",
                  opacity: loading ? 0.7 : 1,
                }}
                onClick={handleCargarArchivo}
                disabled={loading}
              >
                {loading ? "Cargando..." : "Cargar"}
              </button>
            </div>
            {/* Columna: número de registros */}
            <div
              style={{ textAlign: "right", color: "var(--color-jerarquia3)" }}
            >
              ( {fileRows.length} / {fileRows.length} )
            </div>
          </div>
        )}
        <div
          style={{
            color: "#444",
            fontSize: 13,
            marginTop: "auto",
            paddingTop: 18,
            width: "100%",
            textAlign: "left",
          }}
        >
          {fileRows.length > 0
            ? "Verifique la equivalencia de columnas, si es correcta presione Cargar."
            : "Resultado"}
        </div>
      </div>
    </div>
  ) : null;
};

export default ModalFilasCampañas;
