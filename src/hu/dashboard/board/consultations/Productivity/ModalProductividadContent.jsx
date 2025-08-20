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
        { value: "LEVA", label: "LEVA - Leticia Esperanza Vargas Aguilar", level: 2, isManager: false, parent: "RAFM" },
        { value: "JCHL", label: "JCHL - José Carlos Hernández López", level: 2, isManager: false, parent: "RAFM" },
        { value: "AMRT", label: "AMRT - Ana María Ramírez Torres", level: 3, isManager: false, parent: "JCHL" },
        { value: "DAFV", label: "DAFV - Daniel Antonio Flores Vázquez", level: 3, isManager: false, parent: "LEVA" }
    ];

    return (
        <div className="flex gap-4 h-full">
            {/* Columna izquierda - Dropdown de Ejecutivos/Ramificación */}
            <div className="w-72 bg-white rounded-lg p-3 shadow border border-[var(--color-jerarquia1)] flex flex-col">
                
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
                                        : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
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
                                            🧑🏻‍💻
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
                    <span className="text-xs font-semibold pl-1 mr-4" style={{ color: "var(--color-jerarquia2)" }}>Ejecutivos - 1</span>
                </div>

                {/* Tabla con scroll */}
                <div
                    style={{
                        overflowX: "auto",
                        overflowY: "auto",
                        maxHeight: "31vh",
                        height: "100%",
                        scrollbarColor: "#b0b0b0 #f5f5f5",
                        scrollbarWidth: "thin",
                        flex: 1
                    }}
                    className="scrollbar-gray"
                >
                    <table className="text-xs mb-2 text-black" style={{ minWidth: "890px", width: "max-content" }}>
                        <thead style={{ position: "sticky", top: 0, zIndex: 2, background: "var(--color-background-secondary)" }}>
                            <tr className="bg-[var(--color-background-secondary)] text-white">
                                <th className="px-2 py-1 text-center border-r border-[var(--color-jerarquia1)] rounded-tl-md">Extensión</th>
                                <th className="px-2 py-1 text-center border-r border-[var(--color-jerarquia1)]">Ingreso</th>
                                <th className="px-2 py-1 text-center border-r border-[var(--color-jerarquia1)]">PrimerGestión</th>
                                <th className="px-2 py-1 text-center border-r border-[var(--color-jerarquia1)]">Modo</th>
                                <th className="px-2 py-1 text-center rounded-tr-md">TiempoEnModo</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="px-2 py-1 border-b border-[var(--color-jerarquia1)] text-center font-semibold">0</td>
                                <td className="px-2 py-1 border-b border-[var(--color-jerarquia1)] text-center">09:14 a. m.</td>
                                <td className="px-2 py-1 border-b border-[var(--color-jerarquia1)] text-center">01:29 p. m.</td>
                                <td className="px-2 py-1 border-b border-[var(--color-jerarquia1)] text-center">Consulta</td>
                                <td className="px-2 py-1 border-b border-[var(--color-jerarquia1)] text-center">3:59:52</td>
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