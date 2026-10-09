import React, { useState } from 'react';
import GlobalModal from "../../../../../../components/Modal/GlobalModal";
import ModalHeader from '../../../Administration/gespa/ModalHeader';
import CatalogSelect from '../../../../../../components/Select/CatalogSelect';
import { useUserStore } from '../../../../../../contextGlobal/userStore';
import { ACTIVE_SERVER } from '../../../../../../config/backend';
import { buscarDefinicionGespa, definirCuentaGespa } from '../../../../../../services/mark/orochi/LokiServices';

const Definition = ({ onClose }) => {
  const user = useUserStore((state) => state.user);
  const [cartera, setCartera] = useState('');
  const [cuenta, setCuenta] = useState('');
  const [situacion, setSituacion] = useState('');
  const [comentario, setComentario] = useState('');
  const [resultado, setResultado] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const buscar = async () => {
    if (!cartera || !cuenta.trim()) { setError('Selecciona una cartera e indica la cuenta.'); return; }
    setLoading(true); setError('');
    try {
      const data = await buscarDefinicionGespa({ idCuenta: cuenta.trim(), idCartera: Number(cartera), criterioBusqueda: 'Cuenta', servidor: ACTIVE_SERVER });
      setResultado(data);
    } catch (requestError) {
      setError(requestError?.response?.data?.message || requestError.message || 'No fue posible buscar la cuenta.');
    } finally { setLoading(false); }
  };

  const definir = async () => {
    if (!situacion) { setError('Selecciona una situación.'); return; }
    setLoading(true); setError('');
    try {
      await definirCuentaGespa({ idCartera: String(cartera), idEjecutivo: String(user?.idEjecutivo ?? user?.IdEjecutivo ?? ''), selector: 'Definir', idSituacion: String(situacion), idCuenta: cuenta.trim(), comentario: comentario.trim(), servidor: ACTIVE_SERVER });
      setResultado({ message: 'Cuenta definida correctamente.' });
    } catch (requestError) {
      setError(requestError?.response?.data?.message || requestError.message || 'No fue posible definir la cuenta.');
    } finally { setLoading(false); }
  };

  return (
    <GlobalModal isOpen onClose={onClose} title="Definir cuenta" mode="content" showHeader={false} showCloseButton={false}>
      <div className="w-full max-w-3xl overflow-hidden rounded-lg bg-surface shadow-2xl">
        <ModalHeader onClose={onClose} />
        <div className="space-y-4 p-6">
          <div className="grid gap-4 md:grid-cols-2">
            <CatalogSelect id="definicion-cartera" label="Cartera" value={cartera} onChange={(event) => setCartera(event.target.value)} required />
            <div><label htmlFor="definicion-cuenta" className="mb-1 block text-sm font-medium">Cuenta</label><input id="definicion-cuenta" className="w-full rounded-lg border p-3" value={cuenta} onChange={(event) => setCuenta(event.target.value)} /></div>
          </div>
          <button type="button" className="btn-success rounded-lg px-4 py-2" onClick={buscar} disabled={loading}>{loading ? 'Consultando…' : 'Buscar'}</button>
          {resultado && <pre className="max-h-40 overflow-auto rounded-lg bg-surface-secondary p-3 text-xs">{JSON.stringify(resultado, null, 2)}</pre>}
          <CatalogSelect id="definicion-situacion" label="Situación" catalogId={2} filter={{ nivel: 3104, excludeValues: [1012] }} value={situacion} onChange={(event) => setSituacion(event.target.value)} required />
          <textarea id="definicion-comentario" className="min-h-24 w-full rounded-lg border p-3" placeholder="Comentario" value={comentario} onChange={(event) => setComentario(event.target.value)} />
          <button type="button" className="btn-success rounded-lg px-4 py-2" onClick={definir} disabled={loading || !resultado}>{loading ? 'Guardando…' : 'Definir cuenta'}</button>
          {error && <p className="text-sm text-red-600" role="alert">{error}</p>}
        </div>
      </div>
    </GlobalModal>
  );
};

export default Definition;
