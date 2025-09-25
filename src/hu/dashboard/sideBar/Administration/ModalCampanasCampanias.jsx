
import React, { useEffect, useState } from "react";
import { campainghInCharge, enabledUnenabledCampaign } from "../../../../services/LokiServices";
import { toast } from "sonner";
import NewCampaign from "./NewCampaign";

const ModalCampanasCampanias = () => {
    const [campanas, setCampanas] = useState([]);
    const [updatingId, setUpdatingId] = useState(null);

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

    return (
        <div className="bg-white rounded-lg p-3 shadow border border-[var(--color-jerarquia1)] h-full flex flex-col" style={{ minWidth: 0 }}>
            <div className="flex items-center mb-2 w-full">
                <span className="modal-span-1 pl-1 mr-4" style={{ color: "var(--color-jerarquia2)" }}>Campañas - </span>
            </div>
            <div style={{ overflowX: "auto", overflowY: "auto", maxHeight: "31vh", height: "100%", flex: 1 }} className="scrollbar-gray">
                <table className="modal-table mb-2">
                    <thead>
                        <tr>
                            <th>Filas</th>
                            <th>Limpiar</th>
                            <th>Encendida</th>
                            <th>Creó</th>
                            <th>Nombre</th>
                            <th>Avance</th>
                            <th>Cuentas</th>
                            <th>Eliminar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {campanas.map((row, i) => (
                            <tr key={i}>
                                <td>
                                    <button className="modal-btn modal-btn-table" style={{ padding: 0, background: 'transparent', border: 'none' }}>
                                        <span style={{ display: 'inline-flex', alignItems: 'center' }}>
                                            {/* Icono de filas */}
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" style={{ width: 24, height: 24 }}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 0 1-2.25 2.25M16.5 7.5V18a2.25 2.25 0 0 0 2.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 0 0 2.25 2.25h13.5M6 7.5h3v3H6v-3Z" />
                                            </svg>
                                        </span>
                                    </button>
                                </td>
                                <td>
                                    <span style={{ display: 'inline-flex', alignItems: 'center' }}>
                                        {/* Icono limpiar */}
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" style={{ width: 24, height: 24 }}>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9" />
                                        </svg>
                                    </span>
                                </td>
                                <td>
                                    <input
                                        type="checkbox"
                                        checked={updatingId === row.idCampaña ? !row.Encendida : row.Encendida}
                                        readOnly
                                        style={{ cursor: 'pointer' }}
                                        onDoubleClick={async () => {
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
                                <td>{row.Usuario}</td>
                                <td>{row.Campaña}</td>
                                <td>{row.Avance}</td>
                                <td>{row.NúmeroCuentas}</td>
                                <td>
                                    <button className="modal-btn modal-btn-close" style={{ fontSize: 18 }}>&times;</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {/* Componente para crear nueva campaña */}
            <NewCampaign onCreated={cargarCampanas} />
        </div>
    );
};

export default ModalCampanasCampanias;