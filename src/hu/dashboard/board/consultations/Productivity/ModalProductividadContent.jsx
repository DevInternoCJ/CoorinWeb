import React, { useState } from "react";
import { IconProductividad } from "../IconesConsultations";

const DropdownArrow = () => (
    <span
        style={{
            pointerEvents: "none",
            position: "absolute",
            right: "0.75rem",
            top: "50%",
            transform: "translateY(-50%)",
            fontSize: "1.15rem",
            color: "#222",
            display: "flex",
            alignItems: "center"
        }}
    >
        <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
            <path d="M6 8l4 4 4-4" stroke="#222" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    </span>
);

const ModalProductividadContent = () => {
    const [selectedExecutive, setSelectedExecutive] = useState("ALDF");
    const [expandedNodes, setExpandedNodes] = useState({});

    const toggleExpanded = (executiveValue) => {
        setExpandedNodes(prev => ({
            ...prev,
            [executiveValue]: !prev[executiveValue]
        }));
    };

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
            <div className="productividad-branch" style={{overflowX: 'auto', overflowY: 'auto', maxHeight: '56vh', width: '18rem'}}>
                <div className="space-y-1">
                    {getVisibleExecutives().map((executive) => {
                        const hasSubordinates = executiveOptions.some(sub => sub.parent === executive.value);
                        const isExpanded = expandedNodes[executive.value];
                        
                        return (
                            <div
                                key={executive.value}
                                className={`p-2 rounded cursor-pointer transition-colors border ${
                                    selectedExecutive === executive.value
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

            {/* Columna derecha - Tabla de datos */}
            <div className="flex-1 bg-white rounded-lg p-3 shadow border border-[var(--color-jerarquia1)] flex flex-col" style={{ minWidth: 0 }}>
                {/* Fila de filtros con label a la izquierda, selects centrados */}
                <div className="flex items-center mb-2 w-full">
                    <span className="modal-span-1 pl-1 mr-4">Ejecutivos - 1</span>
                </div>

                {/* Tabla con scroll */}
                <div
                    style={{
                        overflowX: "auto",
                        overflowY: "auto",
                        maxHeight: "31vh",
                        height: "100%",
                        flex: 1
                    }}
                    className="scrollbar-gray"
                >
                    <table className="modal-table mb-2">
                        <thead>
                            <tr>
                                <th>Extensión</th>
                                <th>Ingreso</th>
                                <th>PrimerGestión</th>
                                <th>Modo</th>
                                <th>TiempoEnModo</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="font-semibold">0</td>
                                <td>09:14 a. m.</td>
                                <td>01:29 p. m.</td>
                                <td>Consulta</td>
                                <td>3:59:52</td>
                            </tr>
                        </tbody>
                    </table>
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

export default ModalProductividadContent;