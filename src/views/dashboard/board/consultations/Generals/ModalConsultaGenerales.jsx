import React, { useState } from "react";
import { IconGenerales } from "../IconesConsultations";
import CatalogSelect from "../../../../../components/Select/CatalogSelect";
import QueryBuilder from "../QueryBuilder";

export default function ModalConsultaGenerales({ onClose }) {
  const [idCartera, setIdCartera] = useState("");
  const [idProducto, setIdProducto] = useState("");
  const [result, setResult] = useState(null);
  return <div className="modal-xl-container bg-surface-modal p-4 space-y-4">
    <header className="flex items-center justify-between"><h2 className="text-xl font-bold text-jerarquia3 flex items-center gap-2"><IconGenerales className="size-6" />Consulta generales</h2><button type="button" onClick={onClose} aria-label="Cerrar" className="text-2xl text-muted-foreground hover:text-destructive">×</button></header>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3"><CatalogSelect id="generales-cartera" value={idCartera} onChange={(e) => { setIdCartera(e.target.value); setIdProducto(""); }} required /><CatalogSelect type="producto" id="generales-producto" label="Producto" idCartera={idCartera} value={idProducto} onChange={(e) => setIdProducto(e.target.value)} /></div>
    <QueryBuilder idCartera={idCartera} idProducto={idProducto} onResult={setResult} />
    {result && <div className="rounded-lg bg-layer border border-border p-3 text-sm">Filas encontradas: {result.totalFilasEncontradas ?? result.datos?.length ?? 0}</div>}
  </div>;
}
