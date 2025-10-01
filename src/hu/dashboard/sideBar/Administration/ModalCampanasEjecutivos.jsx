


import React, { useEffect, useState, useMemo } from "react";
import { obetenerJerarquiaEncargados, asignaEjecutivoCampanas, UsuarioRestante } from "../../../../services/LokiServices";

const ModalConsultaCuentasColumnas = ({ idCampaña }) => {
    const [executiveTree, setExecutiveTree] = useState([]);
    const [loadingRow, setLoadingRow] = useState(null); // Para mostrar loading en el row

    useEffect(() => {
        const fetchExecutives = async () => {
            try {
                const userData = JSON.parse(localStorage.getItem('userData'));
                const idEjecutivo = userData?.idEjecutivo || userData?.idejecutivo || userData?.id;
                if (!idEjecutivo) return;
                const data = await obetenerJerarquiaEncargados(idEjecutivo);
                // Mapeo: ajusta según la estructura real del endpoint
                const mapped = Array.isArray(data) ? data.map(e => ({
                    usuario: e.usuario || e.Usuario || '',
                    asignado: e.asignado ?? false,
                    restantes: e.restantes ?? 0,
                    subordinados: e.subordinados ?? [],
                    idEjecutivo: e.idEjecutivo || e.idejecutivo || e.id || '',
                })) : [];
                setExecutiveTree(mapped);
            } catch (err) {
                setExecutiveTree([]);
            }
        };
        fetchExecutives();
    }, []);

    // Consumir UsuarioRestante cada vez que cambie idCampaña
    useEffect(() => {
        if (!idCampaña) return;
        const fetchRestantes = async () => {
            try {
                const respuesta = await UsuarioRestante(idCampaña);
                console.log('Respuesta UsuarioRestante:', respuesta);
                // Actualizar el campo 'restantes' en la tabla de ejecutivos
                if (respuesta && Array.isArray(respuesta.data)) {
                    setExecutiveTree(prev => prev.map(ej => {
                        const encontrado = respuesta.data.find(r => r.idEjecutivo === ej.idEjecutivo);
                        return encontrado ? { ...ej, restantes: encontrado.Restantes } : { ...ej, restantes: 0 };
                    }));
                }
            } catch (err) {
                console.error('Error al consumir UsuarioRestante:', err);
            }
        };
        fetchRestantes();
    }, [idCampaña]);

    // Ordenar ejecutivos: mantener el orden original, pero mover al final los que sean subordinados de algún otro encargado
    const ejecutivosOrdenados = useMemo(() => {
        if (!executiveTree.length) return [];
        // Normalizar usuarios y detectar todos los subordinados
        const getUsuario = u => (u?.usuario || u?.Usuario || (typeof u === 'string' ? u : '')).toUpperCase();
        const subordinadosSet = new Set();
        executiveTree.forEach(e => {
            if (Array.isArray(e.subordinados)) {
                e.subordinados.forEach(sub => {
                    subordinadosSet.add(getUsuario(sub));
                });
            }
        });
        // Ejecutivos que NO son subordinados de nadie (manteniendo el orden original)
        const noSubordinados = executiveTree.filter(e => !subordinadosSet.has(getUsuario(e)));
        // Ejecutivos que SÍ son subordinados de alguien (orden inverso al original)
        const siSubordinados = executiveTree.filter(e => subordinadosSet.has(getUsuario(e))).reverse();
        // Unir ambos grupos, asegurando que todos se pinten
        return [...noSubordinados, ...siSubordinados];
    }, [executiveTree]);

    // Handler para asignar ejecutivo a campaña
    const handleAsignar = async (checked, row, idx) => {
        if (!idCampaña || !row.idEjecutivo) return;
        setLoadingRow(idx);
        try {
            const response = await asignaEjecutivoCampanas(checked, idCampaña, row.idEjecutivo);
            // Si la respuesta fue exitosa, actualiza el estado asignado
            if (response?.data?.success || response?.status === 200) {
                setExecutiveTree(prev => prev.map((r, i) => i === idx ? { ...r, asignado: checked } : r));
            }
        } catch (err) {
            // Si falla, no cambia el estado
        } finally {
            setLoadingRow(null);
        }
    };

    return (
        <div className="bg-white rounded-lg p-3 shadow border border-[var(--color-jerarquia1)] h-full flex flex-col" style={{ minWidth: 0, width: '300px', maxWidth: '300px' }}>
            <div className="flex items-center mb-2 w-full">
                <span className="modal-span-1 pl-1" style={{ color: "var(--color-jerarquia2)", minWidth: 80 }}>
                    Ejecutivos - {ejecutivosOrdenados.length}
                </span>
            </div>
            <div
                style={{
                    overflowX: "auto",
                    overflowY: "auto",
                    maxHeight: "35vh",
                    height: "100%",
                    flex: 1,
                    width: "100%",
                    maxWidth: "100%"
                }}
                className="scrollbar-gray"
            >
                <table className="modal-table" style={{ borderCollapse: 'collapse', tableLayout: 'fixed', minWidth: '0', width: '100%' }}>
                    <thead>
                        <tr>
                            <th className="modal-table-th" style={{ padding: '2px 2px', fontWeight: 600, fontSize: '0.95rem', textAlign: 'center', width: '60px', minWidth: '40px' }}>Asignado</th>
                            <th className="modal-table-th" style={{ padding: '2px 2px', fontWeight: 600, fontSize: '0.95rem', textAlign: 'center', width: '80px', minWidth: '60px' }}>Usuario</th>
                            <th className="modal-table-th" style={{ padding: '2px 2px', fontWeight: 600, fontSize: '0.95rem', textAlign: 'center', width: '60px', minWidth: '40px' }}>Restantes</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ejecutivosOrdenados.map((row, i) => (
                            <tr key={i}>
                                <td className="modal-table-td" style={{ padding: '2px 2px', textAlign: 'center', width: '60px', minWidth: '40px' }}>
                                    <input
                                        type="checkbox"
                                        checked={row.asignado || false}
                                        disabled={loadingRow === i}
                                        className="modal-checkbox-small"
                                        onChange={e => handleAsignar(e.target.checked, row, i)}
                                    />
                                </td>
                                <td className="modal-table-td" style={{ padding: '2px 2px', textAlign: 'center', width: '80px', minWidth: '60px' }}>{row.usuario}</td>
                                <td className="modal-table-td" style={{ padding: '2px 2px', textAlign: 'center', width: '60px', minWidth: '40px' }}>{row.restantes ?? 0}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ModalConsultaCuentasColumnas;