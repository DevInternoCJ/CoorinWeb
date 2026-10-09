import React, { useState } from "react";
import SaveButton from "../../../Administration/gespa/ButtonSave";
import SelectWallet from "../../../../board/screenFields/SelectWallet";
import CatalogSelect from "../../../../../../components/Select/CatalogSelect";
import { useUserStore } from "../../../../../../contextGlobal/userStore";
import { ACTIVE_SERVER } from "../../../../../../config/backend";
import { buscarArrepentimientoGespa, ejecutarArrepentimientoGespa } from "../../../../../../services/mark/orochi/LokiServices";

const Repentance = ({ cartera = "", onCarteraChange = () => {} }) => {
  const user = useUserStore((state) => state.user);
  const [cuenta, setCuenta] = useState("");
  const [tipo, setTipo] = useState("");
  const [concepto, setConcepto] = useState("");
  const [dato, setDato] = useState("");
  const [resultado, setResultado] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const tipos = [{ value: "", label: "Selecciona un tipo" }, { value: "individual", label: "Individual" }, { value: "archivo", label: "Archivo" }, { value: "lote", label: "Lote" }];

  const buscar = async () => {
    if (!cartera || !cuenta.trim()) return setError("Selecciona una cartera e indica la cuenta.");
    setLoading(true); setError("");
    try { setResultado(await buscarArrepentimientoGespa({ idCuenta: cuenta.trim(), idCartera: Number(cartera), criterioBusqueda: "Cuenta", servidor: ACTIVE_SERVER })); }
    catch (requestError) { setError(requestError?.response?.data?.message || requestError.message || "No fue posible buscar la cuenta."); }
    finally { setLoading(false); }
  };
  const guardar = async () => {
    if (!resultado || !concepto.trim()) return setError("Busca una cuenta e indica el concepto.");
    setLoading(true); setError("");
    try { setResultado(await ejecutarArrepentimientoGespa({ idCartera: Number(cartera), idCuenta: cuenta.trim(), idEjecutivo: Number(user?.idEjecutivo ?? user?.IdEjecutivo ?? 0), concepto: concepto.trim(), dato: dato.trim(), fechaInsert: new Date().toISOString(), segundoInsert: null, fechaHoraInsert: new Date().toISOString(), servidor: ACTIVE_SERVER })); }
    catch (requestError) { setError(requestError?.response?.data?.message || requestError.message || "No fue posible guardar el arrepentimiento."); }
    finally { setLoading(false); }
  };

  return <div className="w-full space-y-4 p-6">
    <div className="grid gap-4 md:grid-cols-2"><CatalogSelect id="arrepentimiento-cartera" label="Cartera" value={cartera} onChange={onCarteraChange} required /><SelectWallet label="Tipo de cuenta" options={tipos} value={tipo} onChange={setTipo} /></div>
    <div><label htmlFor="arrepentimiento-cuenta" className="mb-1 block text-sm font-medium">Cuenta</label><input id="arrepentimiento-cuenta" className="w-full rounded-lg border p-3" value={cuenta} onChange={(event) => setCuenta(event.target.value)} /></div>
    <div className="flex gap-2"><SaveButton onClick={buscar} className="btn-success" disabled={loading}>{loading ? "Consultando…" : "Buscar"}</SaveButton></div>
    {resultado && <div className="grid gap-4 md:grid-cols-2"><input className="rounded-lg border p-3" placeholder="Concepto" value={concepto} onChange={(event) => setConcepto(event.target.value)} /><input className="rounded-lg border p-3" placeholder="Dato" value={dato} onChange={(event) => setDato(event.target.value)} /><SaveButton onClick={guardar} className="btn-success" disabled={loading}>Guardar arrepentimiento</SaveButton></div>}
    {resultado && <pre className="max-h-40 overflow-auto rounded-lg bg-surface-secondary p-3 text-xs text-foreground">{JSON.stringify(resultado, null, 2)}</pre>}
    {error && <p className="text-sm text-red-600" role="alert">{error}</p>}
  </div>;
};

export default Repentance;
