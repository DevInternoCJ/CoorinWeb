import React, { useMemo, useState } from "react";
import FloatingInput from "../../../../components/Select/FloatingInput";
import FloatingSelect from "../../../../components/Select/FloatingSelect";
import CatalogSelect from "../../../../components/Select/CatalogSelect";
import { postReportCampaign } from "../../../../services/mark/Orochi/LokiServices";
import { toast } from "sonner";
import { ACTIVE_SERVER } from "../../../../config/backend";
import { buildSearchCriteria } from "../../../../forms/queryAdapters";
import { realizarBusquedaRequestSchema } from "../../../../schemas/formSchemas";

const CONCEPT_FIELDS = {
  Teléfonos: ["Clase", "Telefonía", "Origen", "Confirmado", "Municipio", "Teléfono"],
  Gestiones: ["Contacto", "Situación", "Sucursal", "Modo", "Acercamiento", "Parentesco", "CausaNoPago", "Fecha", "Hora", "Comentario"],
  Negociaciones: ["Estado", "CartaConvenio", "Herramienta", "TipoNegociación", "Modo", "Monto", "Plazo"],
  Seguimientos: ["Recordatorio", "Realizado", "Fecha", "Comentario"],
  Chats: ["Salida", "Contacto", "Etapa", "Situación", "Parentesco", "CausaNoPago", "Sucursal", "Fecha"],
};
const GENERAL_FIELDS = CONCEPT_FIELDS.Teléfonos;
const catalogByField = { Clase: 12, Telefonía: 23, Origen: 24, Contacto: 5, Situación: 2, Sucursal: 1, Modo: 21, Acercamiento: 8, Parentesco: 11, CausaNoPago: 10, Etapa: 13, Estado: 9, TipoNegociación: 8 };

export default function QueryBuilder({ idCartera, idProducto, modo = "detalle", onResult }) {
  const [concepto, setConcepto] = useState("Teléfonos");
  const [campo, setCampo] = useState(GENERAL_FIELDS[0]);
  const [signo, setSigno] = useState("=");
  const [valor, setValor] = useState("");
  const [parametros, setParametros] = useState([]);
  const [agrupaciones, setAgrupaciones] = useState([]);
  const [loading, setLoading] = useState(false);
  const isCatalog = Boolean(catalogByField[campo]);
  const fieldType = ["Fecha"].includes(campo) ? "date" : ["Monto", "Plazo"].includes(campo) ? "number" : "text";
  const options = useMemo(() => [{ value: "Teléfonos", label: "Teléfonos" }, { value: "Gestiones", label: "Gestiones" }, { value: "Negociaciones", label: "Negociaciones" }, { value: "Seguimientos", label: "Seguimientos" }, { value: "Chats", label: "Chats" }], []);
  const add = () => {
    if (!idCartera) return toast.warning("Selecciona una cartera");
    if (!campo || !valor) return toast.warning("Selecciona un campo y captura un valor");
    if (fieldType === "number" && Number.isNaN(Number(valor))) return toast.warning("Capture un valor numérico");
    const tipoValor = isCatalog ? "catalogo" : fieldType === "number" ? "numero" : fieldType === "date" ? "fecha" : "texto";
    const row = { id: crypto.randomUUID(), concepto, campo, signo, tipoValor, ...(isCatalog ? { idValor: Number(valor), idCatalogo: catalogByField[campo] } : { valorTexto: valor }) };
    if (parametros.some((item) => item.campo === campo && item.signo === signo && String(item.idValor ?? item.valorTexto) === String(valor))) return toast.warning("El filtro ya fue agregado");
    setParametros((rows) => [...rows, row]); setValor("");
  };
  const consultar = async () => {
    if (!idCartera || !idProducto || parametros.length === 0) return toast.warning("Selecciona cartera, producto y agrega al menos un filtro");
    setLoading(true);
    try {
      const request = buildSearchCriteria({ servidor: ACTIVE_SERVER, idCartera, idProducto, esDetalleResultado: modo === "detalle", parametros, agrupar: agrupaciones });
      const validation = realizarBusquedaRequestSchema.safeParse(request);
      if (!validation.success) throw new Error(validation.error.issues[0]?.message || "La consulta no es válida");
      const response = await postReportCampaign(validation.data);
      onResult?.(response);
      toast.success("Consulta realizada");
    }
    catch { toast.error("No fue posible realizar la consulta"); } finally { setLoading(false); }
  };
  return <div className="bg-layer rounded-xl border border-border p-3 space-y-3">
    <div className="grid grid-cols-1 md:grid-cols-5 gap-2">
      <FloatingSelect id="qb-concepto" label="Concepto" value={concepto} onChange={(e) => { const next = e.target.value; setConcepto(next); setCampo(CONCEPT_FIELDS[next][0]); setValor(""); }} options={options} />
      <FloatingSelect id="qb-campo" label="Campo" value={campo} onChange={(e) => { setCampo(e.target.value); setValor(""); }} options={(CONCEPT_FIELDS[concepto] || GENERAL_FIELDS).map((item) => ({ value: item, label: item }))} />
      <FloatingSelect id="qb-signo" label="Operador" value={signo} onChange={(e) => setSigno(e.target.value)} options={["=", "≠", ">", "<", "≤", "≥"]} />
      {isCatalog ? <CatalogSelect id="qb-valor" label="Valor" catalogId={catalogByField[campo]} value={valor} onChange={(e) => setValor(e.target.value)} /> : <FloatingInput id="qb-valor" label="Valor" type={fieldType} value={valor} onChange={(e) => setValor(e.target.value)} />}
      <button type="button" onClick={add} className="py-2 px-3 rounded-lg bg-primary text-white font-semibold">Agregar</button>
    </div>
    <div className="overflow-auto"><table className="w-full text-sm"><thead><tr><th>Concepto</th><th>Campo</th><th>Operador</th><th>Valor</th><th /></tr></thead><tbody>{parametros.map((row) => <tr key={row.id}><td>{row.concepto}</td><td>{row.campo}</td><td>{row.signo}</td><td>{row.valorTexto ?? row.idValor}</td><td><button type="button" onClick={() => setParametros((items) => items.filter((x) => x.id !== row.id))} className="text-destructive">Eliminar</button></td></tr>)}</tbody></table></div>
    <div className="flex justify-end gap-2"><button type="button" disabled={loading} onClick={() => setAgrupaciones(parametros.map((x) => ({ campo: x.campo })))} className="py-2 px-3 rounded-lg border border-border">Agrupar filtros</button><button type="button" disabled={loading} onClick={consultar} className="py-2 px-3 rounded-lg bg-primary text-white">{loading ? "Consultando…" : "Consultar"}</button></div>
  </div>;
}
