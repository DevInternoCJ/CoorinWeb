import React, { useState, useEffect } from "react";
import { obetenerTablaMetas } from '../../../../services/LokiServices';
import ConsorcioLogo from "../../../../assets/logo_coorin_5.svg";

// Flecha tipo chevron moderna
const DropdownArrow = () => (
    <span
        style={{
            pointerEvents: "none",
            position: "absolute",
            right: "0.75rem",
            top: "50%",
            transform: "translateY(-50%)",
            fontSize: "1.15rem",
            color: "#2b463c",
            display: "flex",
            alignItems: "center"
        }}
    >
        <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
            <path d="M6 8l4 4 4-4" stroke="#2b463c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    </span>
);


const ModalMetasContent = () => {
    const [tablaMetas, setTablaMetas] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [expandedNodes, setExpandedNodes] = useState({});
    const [selectedExecutive, setSelectedExecutive] = useState("ALDF");

    const toggleExpanded = (executiveValue) => {
        setExpandedNodes(prev => ({
            ...prev,
            [executiveValue]: !prev[executiveValue]
        }));
    };


    useEffect(() => {
        const fetchTablaMetas = async () => {
            setLoading(true);
            setError(null);
            try {
                // Obtener idEjecutivo del usuario logueado desde localStorage
                const userData = JSON.parse(localStorage.getItem('userData'));
                const idEjecutivo = userData?.idEjecutivo || userData?.idejecutivo || userData?.id || null;
                console.log('🟢 idEjecutivo (usuario logueado) que se enviará al endpoint:', idEjecutivo, userData);
                if (!idEjecutivo) throw new Error('No se encontró el idEjecutivo del usuario logueado');
                const data = await obetenerTablaMetas(idEjecutivo);
                setTablaMetas(Array.isArray(data) ? data : []);
            } catch (err) {
                setError('Error al obtener la tabla de metas');
                setTablaMetas([]);
            } finally {
                setLoading(false);
            }
        };
        fetchTablaMetas();
    }, []);

    const getVisibleExecutives = () => {
        const result = [];

        executiveOptions.forEach(executive => {
            // Siempre mostrar nivel 1 (principales)
            if (executive.level === 1) {
                result.push(executive);

                // Mostrar subordinados solo si está expandido
                if (expandedNodes[executive.value]) {
                    const subordinates = executiveOptions.filter(sub => sub.parent === executive.value);
                    subordinates.forEach(sub => {
                        result.push(sub);

                        // Mostrar subordinados de nivel 3 si el de nivel 2 está expandido
                        if (expandedNodes[sub.value]) {
                            const subSubordinates = executiveOptions.filter(subsub => subsub.parent === sub.value);
                            result.push(...subSubordinates);
                        }
                    });
                }
            }
        });

        return result;
    };

    // Datos de ramificación/ejecutivos con jerarquía
    const executiveOptions = [
        { value: "ALDF", label: "ALDF - Alan De La O Flores", level: 1, isManager: true },
        { value: "JMPR", label: "JMPR - Juan Manuel Pérez Rodríguez", level: 2, isManager: false, parent: "ALDF" },
        { value: "MAGS", label: "MAGS - María Alejandra González Sánchez", level: 2, isManager: false, parent: "ALDF" },
        { value: "RAFM", label: "RAFM - Roberto Andrés Fernández Martín", level: 1, isManager: true },
        { value: "LEVA", label: "LEVA - Leticia Esperanza Vargas Aguilar Leticia Esperanza Vargas Aguilar ", level: 2, isManager: false, parent: "RAFM" },
        { value: "JCHL", label: "JCHL - ", level: 2, isManager: false, parent: "RAFM" },
        { value: "AMRT", label: "AMRT - Ana María Ramírez Torres", level: 3, isManager: false, parent: "JCHL" },
        { value: "DAFV", label: "DAFV - Daniel Antonio Flores Vázquez", level: 3, isManager: false, parent: "LEVA" },
        // Más ejemplos para pruebas de scroll y ancho
        { value: "MGR1", label: "MGR1 - Manager Uno", level: 1, isManager: true },
        { value: "EMP1", label: "EMP1 - Empleado Uno", level: 2, isManager: false, parent: "MGR1" },
        { value: "EMP2", label: "EMP2 - Empleado Dos", level: 2, isManager: false, parent: "MGR1" },
        { value: "EMP3", label: "EMP3 - Empleado Tres", level: 2, isManager: false, parent: "MGR1" },
        { value: "EMP4", label: "EMP4 - Empleado Cuatro", level: 2, isManager: false, parent: "MGR1" },
        { value: "EMP5", label: "EMP5 - Empleado Cinco", level: 2, isManager: false, parent: "MGR1" },
        { value: "EMP6", label: "EMP6 - Empleado Seis", level: 2, isManager: false, parent: "MGR1" },
        { value: "EMP7", label: "EMP7 - Empleado Siete", level: 2, isManager: false, parent: "MGR1" },
        { value: "EMP8", label: "EMP8 - Empleado Ocho", level: 2, isManager: false, parent: "MGR1" },
        { value: "EMP9", label: "EMP9 - Empleado Nueve", level: 2, isManager: false, parent: "MGR1" },
        { value: "EMP10", label: "EMP10 - Empleado Diez", level: 2, isManager: false, parent: "MGR1" },
        { value: "EMP11", label: "EMP11 - Empleado Once", level: 2, isManager: false, parent: "MGR1" },
        { value: "EMP12", label: "EMP12 - Empleado Doce", level: 2, isManager: false, parent: "MGR1" },
        { value: "EMP13", label: "EMP13 - Empleado Trece", level: 2, isManager: false, parent: "MGR1" },
        { value: "EMP14", label: "EMP14 - Empleado Catorce", level: 2, isManager: false, parent: "MGR1" },
        { value: "EMP15", label: "EMP15 - Empleado Quince", level: 2, isManager: false, parent: "MGR1" },
        { value: "EMP16", label: "EMP16 - Empleado Dieciséis", level: 2, isManager: false, parent: "MGR1" },
        { value: "EMP17", label: "EMP17 - Empleado Diecisiete", level: 2, isManager: false, parent: "MGR1" },
        { value: "EMP18", label: "EMP18 - Empleado Dieciocho", level: 2, isManager: false, parent: "MGR1" },
        { value: "EMP19", label: "EMP19 - Empleado Diecinueve", level: 2, isManager: false, parent: "MGR1" },
        { value: "EMP20", label: "EMP20 - Empleado Veinte", level: 2, isManager: false, parent: "MGR1" }
    ];

    return (
        <div className="flex gap-4 h-full">
            {/* Columna izquierda - Dropdown de Ejecutivos/Ramificación */}
            <div className="productividad-branch" style={{ overflowX: 'auto', overflowY: 'auto', height: '56vh', width: '18rem' }}>
                <div className="space-y-1">
                    {getVisibleExecutives().map((executive) => {
                        const hasSubordinates = executiveOptions.some(sub => sub.parent === executive.value);
                        const isExpanded = expandedNodes[executive.value];

                        return (
                            <div
                                key={executive.value}
                                className={`p-2 rounded cursor-pointer transition-colors border ${selectedExecutive === executive.value
                                        ? 'bg-[var(--color-jerarquia1)] border-[var(--color-jerarquia2)] text-white'
                                        : 'bg-white border-[var(--color-jerarquia1)] hover:bg-gray-100'
                                    }`}
                                style={{
                                    marginLeft: `${(executive.level - 1) * 16}px`,
                                    borderLeft: executive.level > 1 ? `3px solid var(--color-jerarquia${executive.level})` : 'none'
                                }}
                                onClick={() => setSelectedExecutive(executive.value)}
                            >
                                {/* Indicador de jerarquía */}
                                <div className="flex items-center gap-2">
                                    {/* Botón de expand/collapse para managers con subordinados */}
                                    {hasSubordinates && (
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                toggleExpanded(executive.value);
                                            }}
                                            className="text-xs font-bold text-[var(--color-jerarquia3)] hover:text-[var(--color-jerarquia4)] transition-colors"
                                        >
                                            {isExpanded ? '▼' : '▶'}
                                        </button>
                                    )}

                                    {executive.level > 1 && (
                                        <span className="text-xs opacity-60">
                                            {'└─'.repeat(executive.level - 1)}
                                        </span>
                                    )}
                                    {executive.isManager && (
                                        <span className="text-xs font-bold text-[var(--color-jerarquia3)]">
                                            👑
                                        </span>
                                    )}
                                    <div className="flex-1">
                                        <div className={`text-xs font-semibold ${executive.isManager ? 'text-[var(--color-jerarquia3)]' : ''}`}>
                                            {executive.value}
                                        </div>
                                        <div className="text-xs opacity-90">
                                            {executive.label.split(' - ')[1]}
                                        </div>
                                        {executive.level > 1 && (
                                            <div className="text-xs opacity-60 italic">
                                                Reporta a: {executive.parent}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Columna derecha - Inputs y Tabla principal */}
            <div className="flex-1 flex flex-col gap-3" style={{ minWidth: 0 }}>
                {/* Fila de inputs */}
                <div className="bg-white rounded-lg p-3 shadow border border-[var(--color-jerarquia1)]">
                    <div className="grid grid-cols-9 gap-2">
                        {/* Cuentas */}
                        <div className="flex flex-col">
                            <label className="text-xs font-medium text-[var(--color-jerarquia3)] mb-1">Cuentas</label>
                            <input
                                type="text"
                                style={{
                                    backgroundColor: "var(--color-bgcolor2)",
                                    color: "var(--color-jerarquia3)",
                                    border: "1px solid var(--color-jerarquia1)",
                                    borderRadius: "0.25rem",
                                    padding: "0.25rem 0.5rem",
                                    fontSize: "0.75rem",
                                    fontWeight: "400"
                                }}
                            />
                        </div>

                        {/* Titulares */}
                        <div className="flex flex-col">
                            <label className="text-xs font-medium text-[var(--color-jerarquia3)] mb-1">Titulares</label>
                            <input
                                type="text"
                                style={{
                                    backgroundColor: "var(--color-bgcolor2)",
                                    color: "var(--color-jerarquia3)",
                                    border: "1px solid var(--color-jerarquia1)",
                                    borderRadius: "0.25rem",
                                    padding: "0.25rem 0.5rem",
                                    fontSize: "0.75rem",
                                    fontWeight: "400"
                                }}
                            />
                        </div>

                        {/* Negociaciones */}
                        <div className="flex flex-col">
                            <label className="text-xs font-medium text-[var(--color-jerarquia3)] mb-1">Negociaciones</label>
                            <input
                                type="text"
                                style={{
                                    backgroundColor: "var(--color-bgcolor2)",
                                    color: "var(--color-jerarquia3)",
                                    border: "1px solid var(--color-jerarquia1)",
                                    borderRadius: "0.25rem",
                                    padding: "0.25rem 0.5rem",
                                    fontSize: "0.75rem",
                                    fontWeight: "400"
                                }}
                            />
                        </div>

                        {/* Cumplimientos */}
                        <div className="flex flex-col">
                            <label className="text-xs font-medium text-[var(--color-jerarquia3)] mb-1">Cumplimientos</label>
                            <input
                                type="text"
                                style={{
                                    backgroundColor: "var(--color-bgcolor2)",
                                    color: "var(--color-jerarquia3)",
                                    border: "1px solid var(--color-jerarquia1)",
                                    borderRadius: "0.25rem",
                                    padding: "0.25rem 0.5rem",
                                    fontSize: "0.75rem",
                                    fontWeight: "400"
                                }}
                            />
                        </div>

                        {/* Monto Cumplido */}
                        <div className="flex flex-col">
                            <label className="text-xs font-medium text-[var(--color-jerarquia3)] mb-1">Monto Cumplido</label>
                            <input
                                type="text"
                                style={{
                                    backgroundColor: "var(--color-bgcolor2)",
                                    color: "var(--color-jerarquia3)",
                                    border: "1px solid var(--color-jerarquia1)",
                                    borderRadius: "0.25rem",
                                    padding: "0.25rem 0.5rem",
                                    fontSize: "0.75rem",
                                    fontWeight: "400"
                                }}
                            />
                        </div>

                        {/* Saldo Solucionado */}
                        <div className="flex flex-col">
                            <label className="text-xs font-medium text-[var(--color-jerarquia3)] mb-1">Saldo Solucionado</label>
                            <input
                                type="text"
                                style={{
                                    backgroundColor: "var(--color-bgcolor2)",
                                    color: "var(--color-jerarquia3)",
                                    border: "1px solid var(--color-jerarquia1)",
                                    borderRadius: "0.25rem",
                                    padding: "0.25rem 0.5rem",
                                    fontSize: "0.75rem",
                                    fontWeight: "400"
                                }}
                            />
                        </div>

                        {/* Segmento */}
                        <div className="flex flex-col">
                            <label className="text-xs font-medium text-[var(--color-jerarquia3)] mb-1">Segmento</label>
                            <input
                                type="text"
                                style={{
                                    backgroundColor: "var(--color-bgcolor2)",
                                    color: "var(--color-jerarquia3)",
                                    border: "1px solid var(--color-jerarquia1)",
                                    borderRadius: "0.25rem",
                                    padding: "0.25rem 0.5rem",
                                    fontSize: "0.75rem",
                                    fontWeight: "400"
                                }}
                            />
                        </div>

                        {/* Hora Entrada */}
                        <div className="flex flex-col">
                            <label className="text-xs font-medium text-[var(--color-jerarquia3)] mb-1">Hora Entrada</label>
                            <input
                                type="time"
                                defaultValue="00:00"
                                style={{
                                    backgroundColor: "var(--color-bgcolor2)",
                                    color: "var(--color-jerarquia3)",
                                    border: "1px solid var(--color-jerarquia1)",
                                    borderRadius: "0.25rem",
                                    padding: "0.25rem 0.5rem",
                                    fontSize: "0.75rem",
                                    fontWeight: "400"
                                }}
                            />
                        </div>

                        {/* Hora Salida */}
                        <div className="flex flex-col">
                            <label className="text-xs font-medium text-[var(--color-jerarquia3)] mb-1">Hora Salida</label>
                            <input
                                type="time"
                                defaultValue="00:00"
                                style={{
                                    backgroundColor: "var(--color-bgcolor2)",
                                    color: "var(--color-jerarquia3)",
                                    border: "1px solid var(--color-jerarquia1)",
                                    borderRadius: "0.25rem",
                                    padding: "0.25rem 0.5rem",
                                    fontSize: "0.75rem",
                                    fontWeight: "400"
                                }}
                            />
                        </div>
                    </div>
                </div>

                {/* Tabla principal */}
                <div className="bg-white rounded-lg p-3 shadow border border-[var(--color-jerarquia1)] flex-1 flex flex-col" style={{ minWidth: 0 }}>
                    {/* Tabla con scroll */}
                    <div style={{ maxHeight: "calc(60vh - 12rem)", overflow: "auto" }} className="scrollbar-gray">
                        <table className="modal-table">
                            <thead>
                                <tr>
                                    <th>
                                        <input type="checkbox" className="mr-2" />
                                        Cambiar
                                    </th>
                                    <th>Ejecutivo</th>
                                    <th>Usuario</th>
                                    <th>Cuentas</th>
                                    <th>Titulares</th>
                                    <th>Negociaciones</th>
                                    <th>Cumplimientos</th>
                                    <th>Monto Cumplido</th>
                                    <th>Saldo Solucionado</th>
                                    <th>Segmento</th>
                                    <th>Hora Entrada</th>
                                    <th>Hora Salida</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loading && (
                                    <tr><td colSpan={12} style={{ textAlign: 'center' }}>Cargando...</td></tr>
                                )}
                                {error && !loading && (
                                    <tr><td colSpan={12} style={{ color: 'red', textAlign: 'center' }}>{error}</td></tr>
                                )}
                                {!loading && !error && tablaMetas.length === 0 && (
                                    <tr><td colSpan={12} style={{ textAlign: 'center' }}>Sin datos</td></tr>
                                )}
                                {!loading && !error && tablaMetas.map((row, i) => (
                                    <tr key={row.id || row.usuario || i}>
                                        <td><input type="checkbox" /></td>
                                        <td>{row.ejecutivo || row.nombreEjecutivo || row.nombre || ''}</td>
                                        <td>{row.usuario || row.usuarioEjecutivo || row.clave || ''}</td>
                                        <td>{row.cuentas !== undefined ? row.cuentas : (row.totalCuentas !== undefined ? row.totalCuentas : '')}</td>
                                        <td>{row.titulares !== undefined ? row.titulares : (row.totalTitulares !== undefined ? row.totalTitulares : '')}</td>
                                        <td>{row.negociaciones !== undefined ? row.negociaciones : (row.totalNegociaciones !== undefined ? row.totalNegociaciones : '')}</td>
                                        <td>{row.cumplimientos !== undefined ? row.cumplimientos : (row.totalCumplimientos !== undefined ? row.totalCumplimientos : '')}</td>
                                        <td>{row.montoCumplido !== undefined ? `$${Number(row.montoCumplido).toLocaleString('es-MX', { minimumFractionDigits: 2 })}` : (row.monto_cumplido !== undefined ? `$${Number(row.monto_cumplido).toLocaleString('es-MX', { minimumFractionDigits: 2 })}` : '')}</td>
                                        <td>{row.saldoSolucionado !== undefined ? `$${Number(row.saldoSolucionado).toLocaleString('es-MX', { minimumFractionDigits: 2 })}` : (row.saldo_solucionado !== undefined ? `$${Number(row.saldo_solucionado).toLocaleString('es-MX', { minimumFractionDigits: 2 })}` : '')}</td>
                                        <td>{row.segmento || row.nombreSegmento || ''}</td>
                                        <td>{row.horaEntrada || row.hora_entrada || ''}</td>
                                        <td>{row.horaSalida || row.hora_salida || ''}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <style>{`
            .scrollbar-gray::-webkit-scrollbar {
                height: 8px;
                width: 8px;
                background: #f5f5f5;
            }
            .scrollbar-gray::-webkit-scrollbar-thumb {
                background: #b0b0b0;
                border-radius: 4px;
            }
            .scrollbar-gray::-webkit-scrollbar-thumb:hover {
                background: #888;
            }
        `}</style>
        </div>
    );
};
export default ModalMetasContent;