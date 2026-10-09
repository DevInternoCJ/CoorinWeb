import React, { useState } from "react";
import CatalogSelect from "../../../../../../components/Select/CatalogSelect";
import { useUserStore } from "../../../../../../contextGlobal/userStore";
import { ACTIVE_SERVER } from "../../../../../../config/backend";
import { buscarBloqueoCuentaGespa, ejecutarBloqueoCuentaGespa } from "../../../../../../services/mark/orochi/LokiServices";

const AccountBlocking = () => {
  const user = useUserStore((state) => state.user);
  const [cartera, setCartera] = useState("");
  const [cuenta, setCuenta] = useState("");
  const [comentarios, setComentarios] = useState("");
  const [resultado, setResultado] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const buscar = async () => {
    if (!cartera || !cuenta.trim()) return setError("Selecciona una cartera e indica la cuenta.");
    setLoading(true); setError("");
    try {
      setResultado(await buscarBloqueoCuentaGespa({ idCuenta: cuenta.trim(), idCartera: Number(cartera), idEjecutivo: String(user?.idEjecutivo ?? user?.IdEjecutivo ?? ""), comentarios: comentarios.trim(), bloqueo: false, servidor: ACTIVE_SERVER }));
    } catch (requestError) {
      setError(requestError?.response?.data?.message || requestError.message || "No fue posible buscar la cuenta.");
    } finally { setLoading(false); }
  };

  const ejecutar = async (bloqueo) => {
    if (!cartera || !cuenta.trim()) return setError("Selecciona una cartera e indica la cuenta.");
    setLoading(true); setError("");
    try {
      const data = await ejecutarBloqueoCuentaGespa({ idCuenta: cuenta.trim(), idCartera: String(cartera), idEjecutivo: String(user?.idEjecutivo ?? user?.IdEjecutivo ?? ""), comentarios: comentarios.trim(), bloqueo, servidor: ACTIVE_SERVER });
      setResultado(data || { message: bloqueo ? "Cuenta bloqueada correctamente." : "Cuenta desbloqueada correctamente." });
    } catch (requestError) {
      setError(requestError?.response?.data?.message || requestError.message || "No fue posible actualizar el bloqueo.");
    } finally { setLoading(false); }
  };

  return (
    <div className="space-y-4 p-6">
      <div className="grid gap-4 md:grid-cols-2">
        <CatalogSelect id="bloqueo-cartera" label="Cartera" value={cartera} onChange={(event) => setCartera(event.target.value)} required />
        <div><label htmlFor="bloqueo-cuenta" className="mb-1 block text-sm font-medium">Cuenta</label><input id="bloqueo-cuenta" className="w-full rounded-lg border p-3" value={cuenta} onChange={(event) => setCuenta(event.target.value)} /></div>
      </div>
      <textarea id="bloqueo-comentarios" className="min-h-20 w-full rounded-lg border p-3" placeholder="Comentarios" value={comentarios} onChange={(event) => setComentarios(event.target.value)} />
      <div className="flex flex-wrap gap-2"><button type="button" className="btn-secondary rounded-lg px-4 py-2" onClick={buscar} disabled={loading}>Buscar</button><button type="button" className="btn-danger rounded-lg px-4 py-2" onClick={() => ejecutar(true)} disabled={loading}>Bloquear</button><button type="button" className="btn-success rounded-lg px-4 py-2" onClick={() => ejecutar(false)} disabled={loading}>Desbloquear</button></div>
      {resultado && <pre className="max-h-40 overflow-auto rounded-lg bg-surface-secondary p-3 text-xs text-foreground">{JSON.stringify(resultado, null, 2)}</pre>}
      {error && <p className="text-sm text-red-600" role="alert">{error}</p>}
    </div>
  );
};

export default AccountBlocking;
