import React, { useEffect, useMemo, useState } from "react";
import CatalogSelect from "../../../../../../components/Select/CatalogSelect";
import DatePicker from "../../../../../../components/Select/DatePicker";
import { useUserStore } from "../../../../../../contextGlobal/userStore";
import { getAccountStatementsGespa, markAccountStatementGespa } from "../../../../../../services/mark/Orochi/LokiServices";
import { exportDataToXLSX } from "../../../../../../utils/ExcelExporter";

const today = new Date().toISOString().slice(0, 10);
const asRows = (response) => Array.isArray(response) ? response : Array.isArray(response?.data) ? response.data : Array.isArray(response?.datos) ? response.datos : Array.isArray(response?.Tabla1) ? response.Tabla1 : Object.values(response || {}).find(Array.isArray) || [];
const valueOf = (row, keys) => keys.map((key) => row?.[key]).find((value) => value !== undefined && value !== null);
const isSent = (row) => ["si", "sí", "true", "1"].includes(String(valueOf(row, ["Enviado", "enviado"]) || "").trim().toLowerCase());
const rowKey = (row, index) => [valueOf(row, ["Cuenta", "cuenta", "idCuenta"]), valueOf(row, ["Fecha", "fecha"]), valueOf(row, ["Hora", "hora"]), index].join("|");
const printableValue = (value) => value === null || value === undefined || value === "" ? "—" : typeof value === "object" ? JSON.stringify(value) : String(value);

export default function AccountStatements() {
  const user = useUserStore((state) => state.user);
  const fixedCartera = valueOf(user, ["idCartera", "IdCartera"]);
  const hierarchy = Number(valueOf(user, ["Jerarquía", "jerarquia", "Jerarquia"]));
  const [cartera, setCartera] = useState(fixedCartera ? String(fixedCartera) : "");
  const [fechaDesde, setFechaDesde] = useState(today);
  const [fechaHasta, setFechaHasta] = useState(today);
  const [rows, setRows] = useState([]);
  const [selected, setSelected] = useState({});
  const [loading, setLoading] = useState(false);
  const [marking, setMarking] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [hasQueried, setHasQueried] = useState(false);

  useEffect(() => {
    if (fixedCartera) setCartera(String(fixedCartera));
  }, [fixedCartera]);

  const minDate = cartera === "1" ? "2016-01-01" : undefined;
  const columns = useMemo(() => {
    const preferred = ["Cuenta", "Fecha", "Hora", "NombreEjecutivo", "FechaInicial", "FechaFinal", "Enviado"];
    const responseColumns = [...new Set(rows.flatMap((row) => Object.keys(row || {})))];
    return [...preferred.filter((column) => responseColumns.includes(column)), ...responseColumns.filter((column) => !preferred.includes(column))];
  }, [rows]);
  const pendingRows = rows.filter((row) => !isSent(row));
  const selectedPending = pendingRows.filter((row) => selected[rowKey(row, rows.indexOf(row))]);

  const resetResults = () => {
    setRows([]); setSelected({}); setHasQueried(false); setMessage(""); setError("");
  };

  const handleSearch = async () => {
    if (hierarchy && hierarchy < 2) return setError("Carece de permisos para realizar un reporte.");
    if (!cartera || !fechaDesde || !fechaHasta) return setError("Selecciona cartera y el rango de fechas.");
    if (fechaDesde > fechaHasta) return setError("La fecha desde no puede ser posterior a la fecha hasta.");
    setLoading(true); setError(""); setMessage(""); setRows([]); setSelected({});
    try {
      const response = await getAccountStatementsGespa({ idCartera: Number(cartera), fechaDesde, fechaHasta, servidor: null });
      const responseRows = asRows(response).sort((a, b) => String(valueOf(b, ["Fecha", "fecha"]) || "").localeCompare(String(valueOf(a, ["Fecha", "fecha"]) || "")));
      setRows(responseRows); setHasQueried(true);
      setMessage(responseRows.length ? "Consulta terminada con " + responseRows.length.toLocaleString("es-MX") + " estado(s) de cuenta." : "No existen registros para el periodo seleccionado.");
    } catch (requestError) {
      setError(requestError?.response?.data?.message || requestError?.message || "Falló al consultar estados de cuenta.");
    } finally { setLoading(false); }
  };

  const toggleRow = (row, index) => {
    if (isSent(row)) return;
    const key = rowKey(row, index);
    setSelected((current) => ({ ...current, [key]: !current[key] }));
  };
  const toggleAll = (checked) => {
    setSelected(Object.fromEntries(rows.map((row, index) => [rowKey(row, index), checked && !isSent(row)])));
    setMessage(checked ? "Presiona Marcar seleccionados para confirmar." : "");
  };
  const handleMark = async () => {
    if (!selectedPending.length) return setError("Selecciona al menos un estado de cuenta pendiente de envío.");
    setMarking(true); setError(""); setMessage("Marcando registros, espera un momento…");
    try {
      for (const row of selectedPending) {
        await markAccountStatementGespa({
          idCuenta: valueOf(row, ["idCuenta", "IdCuenta", "Cuenta", "cuenta"]),
          fechaInsert: valueOf(row, ["FechaInsert", "fechaInsert", "Fecha", "fecha"]),
          hora: valueOf(row, ["Hora", "hora"]),
          servidor: null,
        });
      }
      const selectedKeys = new Set(selectedPending.map((row) => rowKey(row, rows.indexOf(row))));
      setRows((current) => current.map((row, index) => selectedKeys.has(rowKey(row, index)) ? { ...row, Enviado: "Si" } : row));
      setSelected({}); setMessage("Registros marcados.");
    } catch (requestError) {
      setError(requestError?.response?.data?.message || requestError?.message || "Falló al marcar uno o más estados de cuenta.");
    } finally { setMarking(false); }
  };

  return (
    <div className="w-full max-w-none space-y-4 pb-5">
      <section className="rounded-xl border border-border bg-surface p-4 shadow-sm">
        <div className="mb-4"><h3 className="text-base font-semibold text-foreground">Estados de cuenta</h3><p className="mt-1 text-sm text-muted-foreground">Consulta, selecciona y marca las solicitudes pendientes de envío.</p></div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <CatalogSelect id="estados-cuenta-cartera" label="Cartera" value={cartera} onChange={(event) => { setCartera(event.target.value); resetResults(); }} required disabled={Boolean(fixedCartera)} />
          <DatePicker id="estados-cuenta-desde" label="Fecha desde" value={fechaDesde} onChange={(value) => { setFechaDesde(value); resetResults(); }} min={minDate} max={today} />
          <DatePicker id="estados-cuenta-hasta" label="Fecha hasta" value={fechaHasta} onChange={(value) => { setFechaHasta(value); resetResults(); }} min={minDate} max={today} />
        </div>
        {error && <p className="mt-3 rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">{error}</p>}
        {message && !error && <p className="mt-3 text-sm text-muted-foreground">{message}</p>}
        <div className="mt-5 flex justify-end"><button type="button" onClick={handleSearch} disabled={loading || marking} className="inline-flex items-center gap-x-2 rounded-lg border border-transparent bg-primary px-3 py-2 text-sm font-semibold text-white transition hover:bg-jerarquia3 focus:outline-none focus:ring-2 focus:ring-jerarquia2 disabled:pointer-events-none disabled:opacity-50">{loading ? "Consultando…" : "Consultar"}</button></div>
      </section>

      <section className="overflow-hidden rounded-xl border border-border bg-surface shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-4 py-3">
          <div><h4 className="font-semibold text-foreground">Solicitudes</h4>{hasQueried && <p className="text-xs text-muted-foreground">{rows.length} registro(s)</p>}</div>
          {rows.length > 0 && <div className="flex flex-wrap items-center gap-2">
            <button type="button" onClick={() => exportDataToXLSX(rows, "estados-de-cuenta")} className="inline-flex items-center gap-x-2 rounded-lg border border-border bg-layer px-3 py-2 text-sm font-semibold text-foreground transition hover:bg-overlay focus:outline-none focus:ring-2 focus:ring-jerarquia2">Exportar Excel</button>
            <button type="button" onClick={handleMark} disabled={marking || selectedPending.length === 0} className="inline-flex items-center gap-x-2 rounded-lg border border-transparent bg-primary px-3 py-2 text-sm font-semibold text-white transition hover:bg-jerarquia3 focus:outline-none focus:ring-2 focus:ring-jerarquia2 disabled:pointer-events-none disabled:opacity-50">{marking ? "Marcando…" : "Marcar seleccionados"}</button>
          </div>}
        </div>
        {!hasQueried ? <p className="px-4 py-10 text-center text-sm text-muted-foreground">Selecciona los filtros y realiza una consulta.</p> : rows.length === 0 ? <p className="px-4 py-10 text-center text-sm text-muted-foreground">No se encontraron solicitudes para el periodo seleccionado.</p> : (
          <div className="max-h-[48vh] overflow-auto"><table className="min-w-full text-left text-sm">
            <thead className="sticky top-0 z-10 bg-layer text-xs uppercase tracking-wide text-muted-foreground"><tr>
              <th className="px-4 py-3"><input type="checkbox" aria-label="Seleccionar todas las solicitudes pendientes" checked={pendingRows.length > 0 && selectedPending.length === pendingRows.length} onChange={(event) => toggleAll(event.target.checked)} className="size-4 rounded border-border text-primary focus:ring-jerarquia2" /></th>
              {columns.map((column) => <th key={column} className="whitespace-nowrap px-4 py-3 font-semibold">{column}</th>)}
            </tr></thead>
            <tbody className="divide-y divide-border">{rows.map((row, index) => {
              const sent = isSent(row);
              return <tr key={rowKey(row, index)} className={sent ? "text-foreground" : "text-destructive"}>
                <td className="px-4 py-3"><input type="checkbox" aria-label={"Seleccionar solicitud " + (index + 1)} checked={Boolean(selected[rowKey(row, index)])} disabled={sent} onChange={() => toggleRow(row, index)} className="size-4 rounded border-border text-primary focus:ring-jerarquia2 disabled:cursor-not-allowed disabled:opacity-40" /></td>
                {columns.map((column) => <td key={column} className="whitespace-nowrap px-4 py-3">{printableValue(row?.[column])}</td>)}
              </tr>;
            })}</tbody>
          </table></div>
        )}
      </section>
    </div>
  );
}
