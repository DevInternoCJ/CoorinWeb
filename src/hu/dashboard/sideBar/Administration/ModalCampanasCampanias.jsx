
import React, { useEffect, useState } from "react";
import ModalFilasCampañas from "./ModalFilasCampanias";
import { campainghInCharge, enabledUnenabledCampaign, campaignDeleteada, campaignCleaning } from "../../../../services/LokiServices";
import { toast } from "sonner";
import NewCampaign from "./NewCampaign";
import ModalToponeHundred from "./ModalToponeHundred";

const ModalCampanasCampanias = ({ onSeleccionCampaña }) => {
    const [campanas, setCampanas] = useState([]);
    const [updatingId, setUpdatingId] = useState(null);
    const [modalLimpiar, setModalLimpiar] = useState({ open: false, idCampaña: null, nombre: "" });
    const [modalTop100, setModalTop100] = useState({ open: false, idCampaña: null });
    const [modalFilas, setModalFilas] = useState({ open: false, cartera: "American Express", idCampaña: null, nombreCampaña: "" });
    const [tipoFilas, setTipoFilas] = useState("archivo");

    // Función para cargar campañas
    const cargarCampanas = () => {
        const userData = JSON.parse(localStorage.getItem('userData') || '{}');
        const idEncargado = userData?.idEjecutivo ?? userData?.idejecutivo ?? userData?.id ?? 1;
        const idCartera = userData?.idCartera ?? userData?.idcartera ?? userData?.cartera ?? 1;
        const idProducto = userData?.idProducto ?? userData?.idproducto ?? userData?.producto ?? 1;
        const params = { idEncargado, idCartera, idProducto };
        campainghInCharge(params)
            .then(data => {
                setCampanas(Array.isArray(data) ? data : [data]);
            })
            .catch(() => setCampanas([]));
    };

    useEffect(() => {
        cargarCampanas();
    }, []);

    // Ordenar campañas por nombre alfabéticamente (ignorando mayúsculas y tildes)
    const sortedCampanas = [...campanas].sort((a, b) => {
        if (!a.Campaña || !b.Campaña) return 0;
        return a.Campaña.localeCompare(b.Campaña, 'es', { sensitivity: 'base' });
    });

    return (
        <div className="bg-white rounded-lg p-3 shadow border border-[var(--color-jerarquia1)] h-full flex flex-col" style={{ minWidth: 0 }}>
            <div className="flex items-center mb-2 w-full">
                    <span className="modal-span-1 pl-1 mr-4" style={{ color: "var(--color-jerarquia2)" }}>
                        Campañas - {campanas.length}
                    </span>
            </div>
            <div style={{ overflowX: "auto", overflowY: "auto", maxHeight: "31vh", height: "100%", flex: 1 }} className="scrollbar-gray">
                <table className="modal-table mb-2">
                    <thead>
                        <tr>
                            <th style={{ textAlign: 'center' }}>Filas</th>
                            <th style={{ textAlign: 'center' }}>Limpiar</th>
                            <th style={{ textAlign: 'center' }}>Encendida</th>
                            <th style={{ textAlign: 'left' }}>Creó</th>
                            <th style={{ textAlign: 'left' }}>Nombre</th>
                            <th style={{ textAlign: 'left' }}>Avance</th>
                            <th style={{ textAlign: 'center' }}>Cuentas</th>
                            <th style={{ textAlign: 'center' }}>Eliminar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedCampanas.map((row, i) => (
                            <tr
                                key={i}
                                style={{ minHeight: 0, height: '28px', lineHeight: '1.1' }}
                                onClick={() => {
                                    if (row.idCampaña) {
                                        console.log('idCampaña', row.idCampaña);
                                        if (typeof onSeleccionCampaña === 'function') {
                                            onSeleccionCampaña(row.idCampaña);
                                        }
                                    }
                                }}
                            >
                                <td style={{ textAlign: 'center', height: '28px', lineHeight: '1.1', paddingTop: 0, paddingBottom: 0 }}>
                                    <button
                                        className="modal-btn modal-btn-table"
                                        style={{ padding: 0, background: 'transparent', border: 'none', cursor: 'pointer' }}
                                        onClick={() => {
                                            setModalFilas({ open: true, cartera: "American Express", idCampaña: row.idCampaña, nombreCampaña: row.Campaña });
                                            setTipoFilas("archivo"); // Selecciona Archivo por defecto
                                        }}
                                    >
                                        <span style={{ display: 'inline-flex', alignItems: 'center', padding: 0, margin: 0 }}>
                                            {/* Icono de filas */}
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" style={{ width: 18, height: 18, margin: 0, padding: 0 }}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 0 1-2.25 2.25M16.5 7.5V18a2.25 2.25 0 0 0 2.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 0 0 2.25 2.25h13.5M6 7.5h3v3H6v-3Z" />
                                            </svg>
                                        </span>
                                    </button>
                                </td>
                                <td style={{ textAlign: 'center', height: '28px', lineHeight: '1.1', paddingTop: 0, paddingBottom: 0 }}>
                                    <span style={{ display: 'inline-flex', alignItems: 'center', padding: 0, margin: 0 }}>
                                        {/* Icono limpiar */}
                                        <button
                                            className="modal-btn modal-btn-table"
                                            style={{ background: 'transparent', border: 'none', padding: 0, cursor: 'pointer', margin: 0 }}
                                            onClick={() => setModalLimpiar({ open: true, idCampaña: row.idCampaña, nombre: row.Campaña })}
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" style={{ width: 18, height: 18, margin: 0, padding: 0 }}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9" />
                                            </svg>
                                        </button>
                                    </span>
                                </td>
                                <td
                                    style={{ textAlign: 'center', height: '28px', lineHeight: '1.1', paddingTop: 0, paddingBottom: 0 }}
                                    onDoubleClick={e => {
                                        // Solo abrir si el doble clic NO es sobre el checkbox
                                        if (e.target.type !== 'checkbox') setModalTop100({ open: true, idCampaña: row.idCampaña });
                                    }}
                                >
                                    <input
                                        type="checkbox"
                                        checked={updatingId === row.idCampaña ? !row.Encendida : row.Encendida}
                                        readOnly
                                        className="modal-checkbox-small"
                                        style={{ cursor: 'pointer' }}
                                        onDoubleClick={async (e) => {
                                            e.stopPropagation();
                                            if (!row.idCampaña) return;
                                            setUpdatingId(row.idCampaña);
                                            const userData = JSON.parse(localStorage.getItem('userData') || '{}');
                                            const idEncargado = userData?.idEjecutivo ?? userData?.idejecutivo ?? userData?.id ?? 1;
                                            try {
                                                const encender = !row.Encendida;
                                                await enabledUnenabledCampaign({ idCampaña: row.idCampaña, idEncargado, encender });
                                                toast.success(`Campaña "${row.Campaña}" ${encender ? "encendida" : "apagada"}`);
                                                await cargarCampanas();
                                            } catch (e) {
                                                toast.error("Error al actualizar campaña", e);
                                            } finally {
                                                setUpdatingId(null);
                                            }
                                        }}
                                    />
                                </td>
                                <td style={{ textAlign: 'left', height: '28px', lineHeight: '1.1', paddingTop: 0, paddingBottom: 0 }}>{row.Usuario}</td>
                                <td style={{ textAlign: 'left', height: '28px', lineHeight: '1.1', paddingTop: 0, paddingBottom: 0 }}>{row.Campaña}</td>
                                <td style={{ textAlign: 'left', height: '28px', lineHeight: '1.1', paddingTop: 0, paddingBottom: 0 }}>{row.Avance}</td>
                                <td style={{ textAlign: 'center', height: '28px', lineHeight: '1.1', paddingTop: 0, paddingBottom: 0 }}>{row.NúmeroCuentas}</td>
                                <td style={{ textAlign: 'center', height: '28px', lineHeight: '1.1', paddingTop: 0, paddingBottom: 0 }}>
                                    <button
                                        className="modal-btn modal-btn-close"
                                        style={{ fontSize: 18 }}
                                        onClick={async () => {
                                            if (!row.idCampaña) return;
                                            try {
                                                await campaignDeleteada({ idCampaña: row.idCampaña });
                                                toast.success(`Campaña "${row.Campaña}" eliminada`);
                                                await cargarCampanas();
                                            } catch (e) {
                                                toast.error("Error al eliminar campaña", e);
                                            }
                                        }}
                                    >
                                        &times;
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {/* Componente para crear nueva campaña */}
            {/* Modal Top 100 */}
            <ModalToponeHundred open={modalTop100.open} idCampaña={modalTop100.idCampaña} onClose={() => setModalTop100({ open: false, idCampaña: null })} />
            <NewCampaign onCreated={cargarCampanas} />
            {/* Modal visual de Filas de trabajo (Promesa Midprimes) */}
            <ModalFilasCampañas
                open={modalFilas.open}
                onClose={() => setModalFilas({ open: false, cartera: "American Express", idCampaña: null, nombreCampaña: "" })}
                cartera={modalFilas.cartera}
                idCampaña={modalFilas.idCampaña}
                nombreCampaña={modalFilas.nombreCampaña}
            />
            {modalLimpiar.open && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100vw',
                    height: '100vh',
                    background: 'rgba(0,0,0,0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 9999
                }}>
                    <div style={{ background: 'white', borderRadius: 8, padding: 24, minWidth: 320, boxShadow: '0 2px 16px rgba(0,0,0,0.15)' }}>
                        <div style={{ fontWeight: 600, fontSize: 18, marginBottom: 12, color: '#000' }}>Limpiar Campaña</div>
                        <div style={{ marginBottom: 18, fontSize: 15, color: '#000' }}>
                            ¿Desea remover todas las cuentas de la campaña "{modalLimpiar.nombre}"?
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12 }}>
                            <button
                                className="modal-btn modal-btn-primary"
                                style={{ minWidth: 60, height: 28, fontSize: 15, color: '#000' }}
                                onClick={async () => {
                                    try {
                                        await campaignCleaning({ idCampaña: modalLimpiar.idCampaña });
                                        toast.success(`Campaña "${modalLimpiar.nombre}" limpiada`);
                                        await cargarCampanas();
                                    } catch (e) {
                                        toast.error("Error al limpiar campaña", e);
                                    } finally {
                                        setModalLimpiar({ open: false, idCampaña: null, nombre: "" });
                                    }
                                }}
                            >Sí</button>
                            <button
                                className="modal-btn modal-btn-close"
                                style={{ minWidth: 60, height: 28, fontSize: 15, color: '#000' }}
                                onClick={() => setModalLimpiar({ open: false, idCampaña: null, nombre: "" })}
                            >No</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ModalCampanasCampanias;