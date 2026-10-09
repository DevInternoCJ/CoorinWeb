import React, { useState } from "react";
import { IconGenerales } from "../IconesConsultations";
import CatalogSelect from "../../../../../components/Select/CatalogSelect";
import QueryBuilder from "../QueryBuilder";

export default function ModalConsultaGenerales({ onClose }) {
  const [idCartera, setIdCartera] = useState("");
  const [idProducto, setIdProducto] = useState("");
  const [result, setResult] = useState(null);
  return (
    <div className="modal-xl-container flex max-h-[92vh] w-full flex-col gap-4 overflow-hidden bg-surface-modal p-4 sm:p-5">
      <header className="flex shrink-0 items-center justify-between border-b border-border pb-3">
        <h2 className="flex items-center gap-2 text-xl font-semibold text-jerarquia3">
          <IconGenerales className="size-6" />
          Consulta generales
        </h2>
        <button type="button" onClick={onClose} aria-label="Cerrar" className="inline-flex size-9 items-center justify-center rounded-lg text-2xl text-muted-foreground transition-colors hover:bg-surface-secondary hover:text-destructive focus:outline-none focus:ring-2 focus:ring-jerarquia2">×</button>
      </header>
      <section className="grid shrink-0 grid-cols-1 gap-3 rounded-lg border border-border bg-surface p-3 md:grid-cols-2" aria-label="Parámetros de consulta">
        <CatalogSelect id="generales-cartera" label="Cartera" value={idCartera} onChange={(e) => { setIdCartera(e.target.value); setIdProducto(""); }} required />
        <CatalogSelect type="producto" id="generales-producto" label="Producto (opcional)" idCartera={idCartera} value={idProducto} onChange={(e) => setIdProducto(e.target.value)} />
      </section>
      <div className="min-h-0 flex-1 overflow-y-auto"><QueryBuilder idCartera={idCartera} idProducto={idProducto} onResult={setResult} /></div>
      {result && <div className="shrink-0 rounded-lg border border-border bg-layer p-3 text-sm text-foreground">Filas encontradas: <strong>{result.totalFilasEncontradas ?? result.datos?.length ?? 0}</strong></div>}
    </div>
  );
}
