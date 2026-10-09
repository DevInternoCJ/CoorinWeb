import React, { useEffect, useMemo, useState } from "react";
import * as XLSX from "xlsx";
import CatalogSelect from "../../../../../components/Select/CatalogSelect";
import DatePicker from "../../../../../components/Select/DatePicker";
import FloatingSelect from "../../../../../components/Select/FloatingSelect";
import { getAccionamientosInforme, infoEjecutivo } from "../../../../../services/mark/orochi/LokiServices";

const rowsFrom = (response) => {
  if (Array.isArray(response)) return response;
  if (Array.isArray(response?.datos)) return response.datos;
  if (Array.isArray(response?.data)) return response.data;
  return Object.values(response || {}).find(Array.isArray) || [];
};
const valueFrom = (item, keys) => keys.map((key) => item?.[key]).find((value) => value !== undefined && value !== null);
const executiveIdFromStorage = () => {
  for (const storage of [sessionStorage, localStorage]) {
    try {
      const user = JSON.parse(storage.getItem("userData") || "null");
      const id = valueFrom(user, ["idEjecutivo", "idejecutivo", "id"]);
      if (id) return id;
    } catch { /* probar el siguiente almacenamiento */ }
  }
  return null;
};

const ConsultaContent = () => {
  const [cartera, setCartera] = useState("");
  const [consulta, setConsulta] = useState("");
  const [fechaDesde, setFechaDesde] = useState("");
  const [fechaHasta, setFechaHasta] = useState("");
  const [consultas, setConsultas] = useState([]);
  const [loadingConsultas, setLoadingConsultas] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [results, setResults] = useState([]);

  useEffect(() => {
    let active = true;
    const idEjecutivo = executiveIdFromStorage();
    if (!idEjecutivo) {
      setLoadingConsultas(false);
      setError("No se encontró el ejecutivo de la sesión.");
      return () => { active = false; };
    }
    infoEjecutivo(idEjecutivo)
      .then((response) => { if (active) setConsultas(rowsFrom(response)); })
      .catch(() => { if (active) setError("No fue posible cargar las consultas disponibles."); })
      .finally(() => { if (active) setLoadingConsultas(false); });
    return () => { active = false; };
  }, []);

  const consultaOptions = useMemo(() => consultas.map((item) => {
    const value = valueFrom(item, ["idConsulta", "IdConsulta", "id", "Id"]);
    const label = valueFrom(item, ["nombreConsulta", "NombreConsulta", "consulta", "Consulta", "nombre", "Nombre"]);
    return value == null ? null : { value: String(value), label: String(label || `Consulta ${value}`) };
  }).filter(Boolean), [consultas]);

  const handleConsultar = async () => {
    if (!cartera || !consulta || !fechaDesde || !fechaHasta) return setError("Selecciona cartera, consulta y rango de fechas.");
    if (fechaDesde > fechaHasta) return setError("La fecha inicial no puede ser posterior a la fecha final.");
    setLoading(true); setError(""); setResults([]);
    try {
      const response = await getAccionamientosInforme({ idCartera: Number(cartera), idConsulta: Number(consulta), fechaDesde, fechaHasta });
      setResults(rowsFrom(response));
    } catch (requestError) {
      setError(requestError?.response?.data?.message || requestError?.message || "No fue posible consultar los accionamientos.");
    } finally { setLoading(false); }
  };

  const downloadExcel = () => {
    if (!results.length) return setError("No hay resultados para exportar.");
    const sheet = XLSX.utils.json_to_sheet(results);
    const book = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(book, sheet, "Accionamientos");
    XLSX.writeFile(book, `accionamientos_${new Date().toISOString().slice(0, 10)}.xlsx`);
  };
  const columns = [...new Set(results.flatMap((row) => Object.keys(row || {})))];
  return (
    <div className="p-6 flex flex-col h-full space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <CatalogSelect id="accionamientos-cartera" label="Cartera" value={cartera} onChange={(event) => { setCartera(event.target.value); setResults([]); }} required />
        <FloatingSelect id="accionamientos-consulta" label="Consulta" value={consulta} onChange={(event) => setConsulta(event.target.value)} options={consultaOptions} disabled={!cartera || loadingConsultas} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <DatePicker id="accionamientos-desde" label="Desde" value={fechaDesde} onChange={setFechaDesde} />
        <DatePicker id="accionamientos-hasta" label="Hasta" value={fechaHasta} onChange={setFechaHasta} />
      </div>
      {loadingConsultas && <p className="text-sm text-secondary">Cargando consultas...</p>}
      {error && <p className="text-sm text-danger">{error}</p>}
      <div className="flex gap-2 justify-center">
        <button type="button" onClick={handleConsultar} disabled={loading} className="btn-success px-4 py-2 rounded-lg">{loading ? "Consultando..." : "Consultar"}</button>
        <button type="button" onClick={downloadExcel} disabled={!results.length} className="btn-secondary px-4 py-2 rounded-lg disabled:opacity-50">Guardar Excel</button>
      </div>
      {results.length > 0 && <div className="overflow-auto max-h-80"><table className="w-full text-sm"><thead><tr>{columns.map((column) => <th key={column} className="text-left px-2 py-1">{column}</th>)}</tr></thead><tbody>{results.map((row, index) => <tr key={index}>{columns.map((column) => <td key={column} className="px-2 py-1">{String(row?.[column] ?? "—")}</td>)}</tr>)}</tbody></table></div>}
    </div>
  );
};

export default ConsultaContent;
