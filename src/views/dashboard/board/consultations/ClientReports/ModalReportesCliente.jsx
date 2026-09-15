import React, { useEffect, useMemo, useState } from "react";
import ReusableModal from "../../modalGlobalReboot/ReusableModal";
import CatalogSelect from "../../../../../components/Select/CatalogSelect";
import DatePicker from "../../../../../components/Select/DatePicker";
import FloatingInput from "../../../../../components/Select/FloatingInput";
import FloatingSelect from "../../../../../components/Select/FloatingSelect";
import { generateClientReport, getClientReportDefinitions } from "../../../../../services/mark/Orochi/LokiServices";
import { exportDataToXLSX } from "../../../../../utils/ExcelExporter";

const definitionsFrom = (response) => Array.isArray(response) ? response : response?.data || response?.datos || [];
const reportRowsFrom = (response) => {
  if (Array.isArray(response)) return response;
  if (Array.isArray(response?.Tabla1)) return response.Tabla1;
  if (Array.isArray(response?.data)) return response.data;
  if (Array.isArray(response?.datos)) return response.datos;
  if (Array.isArray(response?.registros)) return response.registros;
  return Object.values(response || {}).find(Array.isArray) || [];
};
const get = (item, ...keys) => keys.map((key) => item?.[key]).find((value) => value !== undefined && value !== null);
const asBool = (value) => value === true || value === 1 || String(value).toLowerCase() === "true";

export default function ModalReportesCliente({ isOpen, onClose, size = "productivity" }) {
  const [definitions, setDefinitions] = useState([]);
  const [definitionId, setDefinitionId] = useState("");
  const [cartera, setCartera] = useState("");
  const [producto, setProducto] = useState("");
  const [desde, setDesde] = useState("");
  const [hasta, setHasta] = useState("");
  const [segmento, setSegmento] = useState("");
  const [loading, setLoading] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isOpen) return undefined;
    const controller = new AbortController();
    setLoading(true); setError(""); setDefinitionId("");
    getClientReportDefinitions({ signal: controller.signal })
      .then((response) => setDefinitions(definitionsFrom(response)))
      .catch((requestError) => {
        if (requestError?.name !== "CanceledError" && requestError?.name !== "AbortError") {
          setError("No fue posible cargar las definiciones de reportes para cliente.");
        }
      })
      .finally(() => setLoading(false));
    return () => controller.abort();
  }, [isOpen]);

  const selected = useMemo(() => definitions.find((item) => String(get(item, "id", "Id", "idReporte", "IdReporte")) === definitionId), [definitions, definitionId]);
  const visible = {
    desde: asBool(get(selected, "requiereDesde", "RequiereDesde", "paramDesde", "ParamDesde")),
    hasta: asBool(get(selected, "requiereHasta", "RequiereHasta", "paramHasta", "ParamHasta")),
    producto: asBool(get(selected, "requiereProducto", "RequiereProducto", "paramProducto", "ParamProducto")),
    segmento: asBool(get(selected, "paramSegmento", "ParamSegmento")),
  };
  const reportOptions = definitions.map((item) => ({
    value: String(get(item, "id", "Id", "idReporte", "IdReporte") ?? ""),
    label: String(get(item, "reporte", "Reporte", "nombre", "Nombre") ?? "Reporte sin nombre"),
  })).filter((item) => item.value);
  const selectedDescription = String(get(selected, "descripcion", "Descripcion") ?? "").trim();
  const segmentOptions = (get(selected, "segmentos", "Segmentos") || []).map((item) => ({ value: String(get(item, "id", "Id", "value", "Valor") ?? item), label: String(get(item, "nombre", "Nombre", "label", "Valor") ?? item) }));

  const selectDefinition = (event) => {
    const nextId = event.target.value;
    const definition = definitions.find((item) => String(get(item, "id", "Id", "idReporte", "IdReporte")) === nextId);
    setDefinitionId(nextId);
    setCartera(String(get(definition, "idCartera", "IdCartera") ?? ""));
    setProducto(""); setDesde(""); setHasta(""); setSegmento("");
  };

  const downloadReport = async () => {
    if (!definitionId || !cartera || (visible.producto && !producto) || (visible.desde && !desde) || (visible.hasta && !hasta) || (visible.segmento && !segmento)) {
      setError("Completa los filtros requeridos para descargar el reporte.");
      return;
    }
    setGenerating(true); setError("");
    try {
      const response = await generateClientReport({
        idReporte: Number(definitionId),
        idProducto: producto ? Number(producto) : null,
        fechaDesde: visible.desde ? desde : null,
        fechaHasta: visible.hasta ? hasta : null,
        segmento: visible.segmento ? segmento || null : null,
      });
      const rows = reportRowsFrom(response);
      if (!rows.length || !exportDataToXLSX(rows, `reporte-cliente-${definitionId}`)) {
        setError("La consulta no devolvió registros para generar el Excel.");
      }
    } catch {
      setError("No fue posible generar el archivo del reporte seleccionado.");
    } finally {
      setGenerating(false);
    }
  };

  return <ReusableModal isOpen={isOpen} onClose={onClose} size={size} title="Reportes al Cliente" contentClassName="p-0" closeOnBackdropClick={false}>
    <div className="space-y-4 p-1 sm:p-2">
      <section className="rounded-xl border border-border bg-surface p-4">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">Reportería externa</p>
        <h3 className="mt-1 text-lg font-semibold text-foreground">Generación de reportes al cliente</h3>
        <p className="mt-1 text-sm text-muted-foreground">Los filtros se adaptan a la definición del reporte seleccionada.</p>
        <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4">
          <FloatingSelect id="reporte-cliente-definicion" label="Reporte" value={definitionId} onChange={selectDefinition} options={reportOptions} disabled={loading} required placeholder={loading ? "Cargando reportes…" : "Seleccionar…"} />
          <CatalogSelect id="reporte-cliente-cartera" label="Cartera" value={cartera} onChange={(event) => { setCartera(event.target.value); setProducto(""); }} disabled={!definitionId} required />
          <CatalogSelect id="reporte-cliente-producto" label={visible.producto ? "Producto" : "Producto (opcional)"} type="producto" idCartera={cartera} value={producto} onChange={(event) => setProducto(event.target.value)} disabled={!cartera} required={visible.producto} />
          {visible.desde && <DatePicker id="reporte-cliente-desde" label="Fecha desde" value={desde} onChange={setDesde} className="w-full" />}
          {visible.hasta && <DatePicker id="reporte-cliente-hasta" label="Fecha hasta" value={hasta} onChange={setHasta} min={desde || undefined} className="w-full" />}
          {visible.segmento && (segmentOptions.length ? <FloatingSelect id="reporte-cliente-segmento" label="Segmento" value={segmento} onChange={(event) => setSegmento(event.target.value)} options={segmentOptions} required /> : <FloatingInput id="reporte-cliente-segmento" label="Segmento" value={segmento} onChange={(event) => setSegmento(event.target.value)} />)}
        </div>
        {selectedDescription && <div className="mt-3 rounded-lg border border-border bg-layer px-3 py-2.5 text-sm text-muted-foreground"><span className="font-semibold text-foreground">Descripción: </span>{selectedDescription}</div>}
        {error && <p className="mt-3 rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">{error}</p>}
        <div className="mt-4 flex justify-end"><button type="button" onClick={downloadReport} disabled={loading || generating || !definitionId || !cartera} className="inline-flex items-center gap-x-2 rounded-lg border border-transparent bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition hover:bg-jerarquia3 focus:outline-none focus:ring-2 focus:ring-primary disabled:pointer-events-none disabled:opacity-50">{generating ? "Generando archivo…" : "Descargar Excel"}</button></div>
      </section>
    </div>
  </ReusableModal>;
}
