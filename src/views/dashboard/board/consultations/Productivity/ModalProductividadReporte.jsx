import React, { useEffect, useState } from "react";
import ReusableModal from "../../modalGlobalReboot/ReusableModal";
import CatalogSelect from "../../../../../components/Select/CatalogSelect";
import DatePicker from "../../../../../components/Select/DatePicker";
import { getProductivityReport } from "../../../../../services/mark/Orochi/LokiServices";
import { exportDataToXLSX } from "../../../../../utils/ExcelExporter";
import { IconProductividad } from "../IconesConsultations";

const sessionData = () => {
  try { return JSON.parse(sessionStorage.getItem("userData") || localStorage.getItem("userData") || "{}"); }
  catch { return {}; }
};
const rowsFrom = (value) => Array.isArray(value) ? value : Array.isArray(value?.datos) ? value.datos : Array.isArray(value?.data) ? value.data : [];

export default function ModalProductividadReporte({ isOpen, onClose, size = "productivity" }) {
  const [cartera, setCartera] = useState("");
  const [producto, setProducto] = useState("");
  const [desde, setDesde] = useState("");
  const [hasta, setHasta] = useState("");
  const [rows, setRows] = useState([]);
  const [state, setState] = useState("idle");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isOpen) return;
    const user = sessionData();
    setCartera(String(user.idCartera ?? user.idcartera ?? user.cartera ?? ""));
    setProducto(String(user.idProducto ?? user.idproducto ?? user.producto ?? ""));
    setRows([]); setState("idle"); setError("");
  }, [isOpen]);

  const submit = async (event) => {
    event.preventDefault();
    if (!cartera || !desde || !hasta) return setError("Selecciona la cartera y el rango de fechas.");
    if (desde > hasta) return setError("La fecha inicial no puede ser posterior a la fecha final.");
    setState("loading"); setError("");
    try {
      const response = await getProductivityReport({
        idCartera: Number(cartera),
        idProducto: producto ? Number(producto) : null,
        fechaInicial: desde,
        fechaFinal: hasta,
      });
      const reportRows = rowsFrom(response);
      setRows(reportRows);
      if (!reportRows.length) {
        setState("empty");
        return;
      }
      const exported = exportDataToXLSX(
        reportRows,
        `productividad_${desde}_a_${hasta}`,
      );
      setState(exported ? "success" : "error");
      if (!exported) setError("No fue posible generar el archivo Excel.");
    } catch (requestError) {
      setRows([]); setState("error");
      setError(requestError?.response?.data?.message || "No fue posible consultar el reporte de productividad.");
    }
  };
  return <ReusableModal isOpen={isOpen} onClose={onClose} size={size} title="Productividad" icon={IconProductividad} iconClassName="text-jerarquia2" contentClassName="p-0" closeOnBackdropClick={false}>
    <form onSubmit={submit} className="space-y-4 p-1 sm:p-2">
      <section className="rounded-xl border border-border bg-surface p-4">
        <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
          <div><p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Reporte operativo</p><h3 className="mt-1 text-lg font-semibold text-foreground">Productividad por periodo</h3><p className="mt-1 text-sm text-muted-foreground">La consulta genera y descarga un archivo Excel con el detalle consolidado.</p></div>
          <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">ProductividadInfo</span>
        </div>
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4">
          <CatalogSelect id="productividad-cartera" label="Cartera" value={cartera} onChange={(e) => { setCartera(e.target.value); setProducto(""); }} required />
          <CatalogSelect id="productividad-producto" label="Producto (opcional)" type="producto" idCartera={cartera} value={producto} onChange={(e) => setProducto(e.target.value)} disabled={!cartera} />
          <DatePicker id="productividad-desde" label="Fecha inicial" value={desde} onChange={setDesde} className="w-full" />
          <DatePicker id="productividad-hasta" label="Fecha final" value={hasta} onChange={setHasta} min={desde || undefined} className="w-full" />
        </div>
        {error && <p className="mt-3 rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">{error}</p>}
        <div className="mt-4 flex justify-end"><button type="submit" disabled={state === "loading"} className="inline-flex items-center gap-x-2 rounded-lg border border-transparent bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition hover:bg-jerarquia3 focus:outline-none focus:ring-2 focus:ring-primary disabled:pointer-events-none disabled:opacity-50">{state === "loading" ? "Generando Excel…" : "Generar Excel"}</button></div>
      </section>
      <section className="rounded-xl border border-border bg-layer px-4 py-5 text-center">
        {state === "idle" && <p className="text-sm text-muted-foreground">Selecciona los filtros y genera el archivo Excel.</p>}
        {state === "loading" && <p className="text-sm text-muted-foreground">Consultando información y preparando el archivo…</p>}
        {state === "empty" && <p className="text-sm text-muted-foreground">No hay datos para los criterios seleccionados; no se generó ningún archivo.</p>}
        {state === "success" && <p className="text-sm text-foreground">Excel generado correctamente con {rows.length} registros.</p>}
      </section>
    </form>
  </ReusableModal>;
}
