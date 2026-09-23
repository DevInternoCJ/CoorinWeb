import React, { useMemo, useState } from "react";
import CatalogSelect from "../../../../../../components/Select/CatalogSelect";
import FloatingInput from "../../../../../../components/Select/FloatingInput";
import { useUserStore } from "../../../../../../contextGlobal/userStore";
import { searchCargoAutorizarGespa, executeCargoAutorizarGespa, searchCargoCorregirGespa, executeCargoCorregirGespa } from "../../../../../../services/mark/Orochi/LokiServices";

const rowsOf = (response) => Array.isArray(response) ? response : Array.isArray(response?.data) ? response.data : Array.isArray(response?.datos) ? response.datos : Array.isArray(response?.Tabla1) ? response.Tabla1 : Object.values(response || {}).find(Array.isArray) || [];
const val = (row, keys) => keys.map((key) => row?.[key]).find((value) => value !== undefined && value !== null);
const keyOf = (row, index) => [val(row, ["idCuenta", "IdCuenta", "Cuenta", "cuenta"]), val(row, ["fechaInsert", "FechaInsert", "Fecha", "fecha"]), val(row, ["segundoInsert", "SegundoInsert", "Hora", "hora"]), index].join("|");

export default function OnlineCharges() {
  const user = useUserStore((state) => state.user);
  const fixedCartera = val(user, ["idCartera", "IdCartera"]);
  const executiveId = val(user, ["idEjecutivo", "IdEjecutivo", "id"]);
  const [cartera, setCartera] = useState(fixedCartera ? String(fixedCartera) : "");
  const [action, setAction] = useState("autorizar");
  const [selector, setSelector] = useState("Pendientes");
  const [desde, setDesde] = useState("");
  const [hasta, setHasta] = useState("");
  const [rows, setRows] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [correction, setCorrection] = useState({});

  const columns = useMemo(() => [...new Set(rows.flatMap((row) => Object.keys(row || {})))], [rows]);
  const reset = () => { setRows([]); setSelected(null); setMessage(""); setError(""); };
  const runSearch = async () => {
    if (!cartera) return setError("Selecciona una cartera.");
    if (action !== "corregir" && (!desde || !hasta)) return setError("Selecciona el rango de fechas para autorizar.");
    if (desde && hasta && desde > hasta) return setError("La fecha inicial no puede ser posterior a la fecha final.");
    setLoading(true); setError(""); setMessage(""); setSelected(null);
    try {
      const payload = { selector, idCartera: Number(cartera), servidor: null };
      const response = action === "corregir" ? await searchCargoCorregirGespa(payload) : await searchCargoAutorizarGespa(payload);
      const result = rowsOf(response);
      setRows(result);
      setMessage(result.length ? result.length + " cargo(s) encontrado(s)." : "No se encontraron cargos.");
    } catch (requestError) {
      setError(requestError?.response?.data?.message || requestError?.message || "No fue posible consultar los cargos.");
    } finally { setLoading(false); }
  };
  const updateCorrection = (field, value) => setCorrection((current) => ({ ...current, [field]: value }));
  const processSelected = async () => {
    if (!selected) return setError("Selecciona un cargo de la tabla.");
    const row = rows[selected.index];
    setProcessing(true); setError(""); setMessage("");
    try {
      if (action === "corregir") {
        await executeCargoCorregirGespa({
          idCartera: Number(cartera),
          idCuenta: val(row, ["idCuenta", "IdCuenta", "Cuenta", "cuenta"]),
          segundoInsert: val(row, ["segundoInsert", "SegundoInsert", "Hora", "hora"]),
          tarjeta: correction.tarjeta ?? val(row, ["tarjeta", "Tarjeta"]),
          vencimiento: correction.vencimiento ?? val(row, ["vencimiento", "Vencimiento"]),
          autorizacion: correction.autorizacion ?? val(row, ["autorizacion", "Autorizacion"]),
          monto: Number(correction.monto ?? val(row, ["monto", "Monto"]) ?? 0),
          recurrente: correction.recurrente ?? val(row, ["recurrente", "Recurrente"]),
          fechaInsert: correction.fechaInsert ?? val(row, ["fechaInsert", "FechaInsert", "Fecha", "fecha"]),
          servidor: null,
        });
      } else {
        await executeCargoAutorizarGespa({
          selector: action === "autorizar" ? "Autorizar" : "NoAutorizar",
          idCartera: String(cartera),
          fechaInicial: desde,
          fechaFinal: hasta,
          autorizacion: val(row, ["autorizacion", "Autorizacion"]),
          idEjecutivo: String(executiveId ?? ""),
          idCuenta: val(row, ["idCuenta", "IdCuenta", "Cuenta", "cuenta"]),
          fechaInsert: val(row, ["fechaInsert", "FechaInsert", "Fecha", "fecha"]),
          segundoInsert: val(row, ["segundoInsert", "SegundoInsert", "Hora", "hora"]),
          motivo: correction.motivo || "",
          servidor: null,
        });
      }
      setRows((current) => current.filter((_, index) => index !== selected.index));
      setSelected(null); setCorrection({}); setMessage("Cargo procesado correctamente.");
    } catch (requestError) {
      setError(requestError?.response?.data?.message || requestError?.message || "No fue posible procesar el cargo.");
    } finally { setProcessing(false); }
  };

  return (
    <div className="w-full max-w-none space-y-4 pb-5">
      <section className="rounded-xl border border-border bg-surface p-4 shadow-sm">
        <div className="mb-4"><h3 className="text-base font-semibold text-foreground">Cargos en línea</h3><p className="mt-1 text-sm text-muted-foreground">Consulta cargos pendientes para autorizar o corregir la información.</p></div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          <CatalogSelect id="cargos-cartera" label="Cartera" value={cartera} onChange={(event) => { setCartera(event.target.value); reset(); }} required disabled={Boolean(fixedCartera)} />
          <FloatingInput id="cargos-selector" label="Selector de búsqueda" value={selector} onChange={(event) => setSelector(event.target.value)} required />
          <FloatingInput id="cargos-desde" label="Fecha inicial" type="date" value={desde} onChange={(event) => setDesde(event.target.value)} disabled={action === "corregir"} />
          <FloatingInput id="cargos-hasta" label="Fecha final" type="date" value={hasta} onChange={(event) => setHasta(event.target.value)} disabled={action === "corregir"} />
        </div>
        <div className="mt-4 flex flex-wrap items-center gap-5 rounded-lg border border-border bg-layer px-4 py-3">
          {[
            ["autorizar", "Autorizar"],
            ["noAutorizar", "No autorizar"],
            ["corregir", "Corregir"],
          ].map(([value, label]) => <label key={value} className="flex cursor-pointer items-center gap-2 text-sm text-foreground"><input type="radio" name="cargo-action" checked={action === value} onChange={() => { setAction(value); reset(); }} className="size-4 border-border text-primary focus:ring-jerarquia2" />{label}</label>)}
        </div>
        {error && <p className="mt-3 rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">{error}</p>}
        {message && !error && <p className="mt-3 text-sm text-muted-foreground">{message}</p>}
        <div className="mt-5 flex justify-end"><button type="button" onClick={runSearch} disabled={loading || processing} className="inline-flex items-center rounded-lg border border-transparent bg-primary px-3 py-2 text-sm font-semibold text-white transition hover:bg-jerarquia3 focus:outline-none focus:ring-2 focus:ring-jerarquia2 disabled:pointer-events-none disabled:opacity-50">{loading ? "Consultando…" : "Consultar cargos"}</button></div>
      </section>

      {selected && action !== "corregir" && <section className="rounded-xl border border-border bg-surface p-4"><FloatingInput id="cargo-motivo" label="Motivo (opcional)" value={correction.motivo || ""} onChange={(event) => updateCorrection("motivo", event.target.value)} /><div className="mt-3 flex justify-end"><button type="button" onClick={processSelected} disabled={processing} className="btn-success disabled:opacity-50">{processing ? "Procesando…" : action === "autorizar" ? "Autorizar cargo" : "No autorizar cargo"}</button></div></section>}
      {selected && action === "corregir" && <section className="grid grid-cols-1 gap-4 rounded-xl border border-border bg-surface p-4 sm:grid-cols-2 xl:grid-cols-4">
        {["tarjeta", "vencimiento", "autorizacion", "monto", "recurrente", "fechaInsert"].map((field) => <FloatingInput key={field} id={"cargo-" + field} label={field} type={field === "monto" ? "number" : "text"} value={correction[field] ?? val(rows[selected.index], [field, field[0].toUpperCase() + field.slice(1)]) ?? ""} onChange={(event) => updateCorrection(field, event.target.value)} />)}
        <div className="flex items-end"><button type="button" onClick={processSelected} disabled={processing} className="btn-success w-full disabled:opacity-50">{processing ? "Procesando…" : "Guardar corrección"}</button></div>
      </section>}

      <section className="overflow-hidden rounded-xl border border-border bg-surface shadow-sm"><div className="border-b border-border px-4 py-3"><h4 className="font-semibold text-foreground">Resultados</h4></div>{rows.length === 0 ? <p className="px-4 py-10 text-center text-sm text-muted-foreground">Realiza una consulta para ver cargos.</p> : <div className="max-h-[45vh] overflow-auto"><table className="min-w-full text-left text-sm"><thead className="sticky top-0 bg-layer text-xs uppercase text-muted-foreground"><tr>{columns.map((column) => <th key={column} className="whitespace-nowrap px-4 py-3">{column}</th>)}</tr></thead><tbody className="divide-y divide-border">{rows.map((row, index) => <tr key={keyOf(row, index)} onClick={() => setSelected({ row, index })} className={"cursor-pointer text-foreground transition hover:bg-overlay " + (selected?.index === index ? "bg-overlay ring-1 ring-inset ring-primary" : "")}>{columns.map((column) => <td key={column} className="whitespace-nowrap px-4 py-3">{String(row?.[column] ?? "—")}</td>)}</tr>)}</tbody></table></div>}</section>
    </div>
  );
}
