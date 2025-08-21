import React, { useState } from "react";
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
            <path d="M6 8l4 4 4-4" stroke="#2b463c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    </span>
);

const ModalMetasContent = () => {
    const [selectedExecutive, setSelectedExecutive] = useState("ALDF");
    const [expandedNodes, setExpandedNodes] = useState({ "ALDF": true, "RAFM": true });

    const toggleExpanded = (value) => {
        setExpandedNodes(prev => ({
            ...prev,
            [value]: !prev[value]
        }));
    };

    // Función para obtener ejecutivos visibles según el estado de expansión
    const getVisibleExecutives = () => {
        let result = [];
        
        executiveOptions.forEach(executive => {
            if (executive.level === 1) {
                result.push(executive);
                if (expandedNodes[executive.value]) {
                    const subordinates = executiveOptions.filter(sub => sub.parent === executive.value);
                    result.push(...subordinates);
                    
                    subordinates.forEach(sub => {
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
        <div>
            {/* Contenido principal con ramificación y tabla */}
            <div className="flex gap-4 px-4" style={{ height: "60vh" }}>
                {/* Columna izquierda - Logo y Ramificación de Ejecutivos */}
                <div className="w-72 flex flex-col gap-3">
                    {/* Logo del Consorcio Jurídico centrado arriba de la ramificación */}
                    <div className="flex justify-center items-center bg-white rounded-lg p-3 ">
                        <img 
                            src={ConsorcioLogo} 
                            alt="Consorcio Jurídico" 
                            style={{ 
                                height: "65px", 
                                width: "auto",
                                objectFit: "contain"
                            }}
                        />
                    </div>

                    {/* Ramificación de Ejecutivos */}
                    <div className="bg-white rounded-lg p-3 shadow border border-[var(--color-jerarquia1)] flex flex-col flex-1">
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
                        <table className="w-full text-sm" style={{ minWidth: "1200px" }}>
                            <thead style={{ position: "sticky", top: 0, zIndex: 2 }}>
                                <tr className="bg-[var(--color-background-secondary)] text-white">
                                    <th className="px-2 py-2 text-left border-r border-[var(--color-jerarquia1)] rounded-tl-md whitespace-nowrap" style={{ minWidth: "80px" }}>
                                        <input type="checkbox" className="mr-2" />
                                        Cambiar
                                    </th>
                                    <th className="px-2 py-2 text-left border-r border-[var(--color-jerarquia1)] whitespace-nowrap" style={{ minWidth: "120px" }}>Ejecutivo</th>
                                    <th className="px-2 py-2 text-left border-r border-[var(--color-jerarquia1)] whitespace-nowrap" style={{ minWidth: "80px" }}>Usuario</th>
                                    <th className="px-2 py-2 text-left border-r border-[var(--color-jerarquia1)] whitespace-nowrap" style={{ minWidth: "70px" }}>Cuentas</th>
                                    <th className="px-2 py-2 text-left border-r border-[var(--color-jerarquia1)] whitespace-nowrap" style={{ minWidth: "70px" }}>Titulares</th>
                                    <th className="px-2 py-2 text-left border-r border-[var(--color-jerarquia1)] whitespace-nowrap" style={{ minWidth: "100px" }}>Negociaciones</th>
                                    <th className="px-2 py-2 text-left border-r border-[var(--color-jerarquia1)] whitespace-nowrap" style={{ minWidth: "100px" }}>Cumplimientos</th>
                                    <th className="px-2 py-2 text-left border-r border-[var(--color-jerarquia1)] whitespace-nowrap" style={{ minWidth: "110px" }}>Monto Cumplido</th>
                                    <th className="px-2 py-2 text-left border-r border-[var(--color-jerarquia1)] whitespace-nowrap" style={{ minWidth: "120px" }}>Saldo Solucionado</th>
                                    <th className="px-2 py-2 text-left border-r border-[var(--color-jerarquia1)] whitespace-nowrap" style={{ minWidth: "80px" }}>Segmento</th>
                                    <th className="px-2 py-2 text-left border-r border-[var(--color-jerarquia1)] whitespace-nowrap" style={{ minWidth: "100px" }}>Hora Entrada</th>
                                    <th className="px-2 py-2 text-left rounded-tr-md whitespace-nowrap" style={{ minWidth: "90px" }}>Hora Salida</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* Datos de ejemplo */}
                                {Array.from({ length: 20 }).map((_, i) => (
                                    <tr key={i} className="hover:bg-gray-50">
                                        <td className="px-2 py-2 border-b border-[var(--color-jerarquia1)]" style={{ color: "#000000" }}>
                                            <input type="checkbox" />
                                        </td>
                                        <td className="px-2 py-2 border-b border-[var(--color-jerarquia1)]" style={{ color: "#000000" }}>
                                            {selectedExecutive} - {executiveOptions.find(exec => exec.value === selectedExecutive)?.label.split(' - ')[1] || "Ejecutivo"}
                                        </td>
                                        <td className="px-2 py-2 border-b border-[var(--color-jerarquia1)]" style={{ color: "#000000" }}>ALDF{i + 1}</td>
                                        <td className="px-2 py-2 border-b border-[var(--color-jerarquia1)]" style={{ color: "#000000" }}>{Math.floor(Math.random() * 100)}</td>
                                        <td className="px-2 py-2 border-b border-[var(--color-jerarquia1)]" style={{ color: "#000000" }}>{Math.floor(Math.random() * 50)}</td>
                                        <td className="px-2 py-2 border-b border-[var(--color-jerarquia1)]" style={{ color: "#000000" }}>{Math.floor(Math.random() * 30)}</td>
                                        <td className="px-2 py-2 border-b border-[var(--color-jerarquia1)]" style={{ color: "#000000" }}>{Math.floor(Math.random() * 20)}</td>
                                        <td className="px-2 py-2 border-b border-[var(--color-jerarquia1)]" style={{ color: "#000000" }}>
                                            ${(Math.random() * 10000).toFixed(2)}
                                        </td>
                                        <td className="px-2 py-2 border-b border-[var(--color-jerarquia1)]" style={{ color: "#000000" }}>
                                            ${(Math.random() * 5000).toFixed(2)}
                                        </td>
                                        <td className="px-2 py-2 border-b border-[var(--color-jerarquia1)]" style={{ color: "#000000" }}>Segmento {i % 3 + 1}</td>
                                        <td className="px-2 py-2 border-b border-[var(--color-jerarquia1)]" style={{ color: "#000000" }}>00:00</td>
                                        <td className="px-2 py-2 border-b border-[var(--color-jerarquia1)]" style={{ color: "#000000" }}>00:00</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
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