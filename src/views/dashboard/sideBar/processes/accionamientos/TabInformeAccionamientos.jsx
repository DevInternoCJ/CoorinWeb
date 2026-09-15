import React, { useEffect, useMemo, useState } from "react";
import CatalogSelect from "../../../../../components/Select/CatalogSelect";
import DatePicker from "../../../../../components/Select/DatePicker";
import FloatingSelect from "../../../../../components/Select/FloatingSelect";
import { getAccionamientosInforme, infoEjecutivo } from "../../../../../services/mark/Orochi/LokiServices";

const asRows = (response) => {
  if (Array.isArray(response)) return response;
  if (Array.isArray(response?.data)) return response.data;
  if (Array.isArray(response?.datos)) return response.datos;
  if (Array.isArray(response?.Tabla1)) return response.Tabla1;
  return Object.values(response || {}).find(Array.isArray) || [];
};

const firstValue = (item, keys) =>
  keys.map((key) => item?.[key]).find((value) => value !== undefined && value !== null);

const formatValue = (value) => {
  if (value === null || value === undefined || value === "") return "—";
  return typeof value === "object" ? JSON.stringify(value) : String(value);
};

const getExecutiveId = () => {
  for (const storage of [sessionStorage, localStorage]) {
    try {
      const user = JSON.parse(storage.getItem("userData") || "null");
      const id = firstValue(user, ["idEjecutivo", "idejecutivo", "id"]);
      if (id !== undefined && id !== null && id !== "") return id;
    } catch {
      // El siguiente almacenamiento puede contener la sesión válida.
    }
  }
  return null;
};

export default function InformeContent() {
  const [cartera, setCartera] = useState("");
  const [consulta, setConsulta] = useState("");
  const [acercamiento, setAcercamiento] = useState("");
  const [fechaDesde, setFechaDesde] = useState("");
  const [fechaHasta, setFechaHasta] = useState("");
  const [conteo, setConteo] = useState(false);
  const [usarComplemento, setUsarComplemento] = useState(true);
  const [consultas, setConsultas] = useState([]);
  const [loadingConsultas, setLoadingConsultas] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [results, setResults] = useState([]);
  const [hasQueried, setHasQueried] = useState(false);

  useEffect(() => {
    let active = true;
    const executiveId = getExecutiveId();
    if (!executiveId) {
      setLoadingConsultas(false);
      setError("No se encontró el ejecutivo de la sesión para cargar las consultas.");
      return () => { active = false; };
    }

    infoEjecutivo(executiveId)
      .then((response) => {
        if (active) setConsultas(asRows(response));
      })
      .catch(() => {
        if (active) setError("No fue posible cargar el catálogo de consultas.");
      })
      .finally(() => {
        if (active) setLoadingConsultas(false);
      });
    return () => { active = false; };
  }, []);

  const consultaOptions = useMemo(
    () => consultas.map((item) => {
      const value = firstValue(item, ["idConsulta", "IdConsulta", "id", "Id"]);
      const label = firstValue(item, ["nombreConsulta", "NombreConsulta", "consulta", "Consulta", "nombre", "Nombre"]);
      return value === undefined || value === null ? null : {
        value: String(value),
        label: String(label ?? ("Consulta " + value)),
      };
    }).filter(Boolean),
    [consultas],
  );

  const columns = useMemo(
    () => [...new Set(results.flatMap((row) => Object.keys(row || {})))],
    [results],
  );

  const handleCarteraChange = (event) => {
    setCartera(event.target.value);
    setConsulta("");
    setResults([]);
    setHasQueried(false);
    setError("");
  };

  const handleConsultar = async () => {
    if (!cartera || !consulta || !fechaDesde || !fechaHasta) {
      setError("Selecciona cartera, consulta, fecha desde y fecha hasta.");
      return;
    }
    if (fechaDesde > fechaHasta) {
      setError("La fecha desde no puede ser posterior a la fecha hasta.");
      return;
    }

    setLoading(true);
    setError("");
    setResults([]);
    try {
      const response = await getAccionamientosInforme({
        idCartera: Number(cartera),
        idConsulta: Number(consulta),
        idAcercamiento: acercamiento ? Number(acercamiento) : 0,
        fechaDesde,
        fechaHasta,
        conteo: conteo ? 1 : 0,
        usarComplemento,
      });
      setResults(asRows(response));
      setHasQueried(true);
    } catch (requestError) {
      setError(requestError?.response?.data?.message || requestError?.message || "No fue posible generar el informe de accionamientos.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4 p-4 sm:p-6">
      <section className="rounded-xl border border-border bg-surface p-4 shadow-sm">
        <div className="mb-4">
          <h3 className="text-base font-semibold text-primary">Informe de accionamientos</h3>
          <p className="mt-1 text-sm text-secondary">Selecciona los filtros para consultar la información del periodo.</p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          <CatalogSelect id="informe-accionamientos-cartera" label="Cartera" value={cartera} onChange={handleCarteraChange} required />
          <FloatingSelect id="informe-accionamientos-consulta" label="Consulta" value={consulta} onChange={(event) => setConsulta(event.target.value)} options={consultaOptions} disabled={!cartera || loadingConsultas} required />
          <CatalogSelect id="informe-accionamientos-acercamiento" label="Acercamiento (opcional)" catalogId={8} value={acercamiento} onChange={(event) => setAcercamiento(event.target.value)} />
          <DatePicker id="informe-accionamientos-desde" label="Fecha desde" value={fechaDesde} onChange={setFechaDesde} required />
          <DatePicker id="informe-accionamientos-hasta" label="Fecha hasta" value={fechaHasta} onChange={setFechaHasta} required />
          <fieldset className="flex flex-wrap items-center gap-x-5 gap-y-3 rounded-lg border border-border bg-layer px-4 py-3">
            <legend className="sr-only">Opciones del informe</legend>
            <label className="flex cursor-pointer items-center gap-2 text-sm text-primary">
              <input type="checkbox" checked={conteo} onChange={(event) => setConteo(event.target.checked)} className="size-4 rounded border-border text-accent focus:ring-accent" />
              Solo conteo
            </label>
            <label className="flex cursor-pointer items-center gap-2 text-sm text-primary">
              <input type="checkbox" checked={usarComplemento} onChange={(event) => setUsarComplemento(event.target.checked)} className="size-4 rounded border-border text-accent focus:ring-accent" />
              Usar complemento
            </label>
          </fieldset>
        </div>

        {loadingConsultas && <p className="mt-3 text-xs text-secondary">Cargando consultas disponibles…</p>}
        {error && <p className="mt-3 rounded-lg border border-danger/30 bg-danger/10 px-3 py-2 text-sm text-danger">{error}</p>}

        <div className="mt-5 flex justify-end">
          <button type="button" onClick={handleConsultar} disabled={loading} className="btn-success min-w-36 px-4 py-2 disabled:cursor-not-allowed disabled:opacity-60">
            {loading ? "Consultando…" : "Generar informe"}
          </button>
        </div>
      </section>

      <section className="overflow-hidden rounded-xl border border-border bg-surface shadow-sm">
        <div className="border-b border-border px-4 py-3"><h4 className="font-semibold text-primary">Resultado</h4></div>
        {!hasQueried ? (
          <p className="px-4 py-8 text-center text-sm text-secondary">Configura los filtros y genera el informe para ver los resultados.</p>
        ) : results.length === 0 ? (
          <p className="px-4 py-8 text-center text-sm text-secondary">No se encontraron registros para los filtros seleccionados.</p>
        ) : (
          <div className="max-h-96 overflow-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="sticky top-0 bg-layer text-xs uppercase tracking-wide text-secondary">
                <tr>{columns.map((column) => <th key={column} className="whitespace-nowrap px-4 py-3 font-semibold">{column}</th>)}</tr>
              </thead>
              <tbody className="divide-y divide-border">
                {results.map((row, rowIndex) => (
                  <tr key={rowIndex} className="text-primary">
                    {columns.map((column) => <td key={column} className="whitespace-nowrap px-4 py-3">{formatValue(row?.[column])}</td>)}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
