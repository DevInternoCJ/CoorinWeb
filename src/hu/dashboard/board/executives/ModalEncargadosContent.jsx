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

const ModalEncargadosContent = () => {
    const [selectedEncargado, setSelectedEncargado] = useState("ALDF");
    const [cartera, setCartera] = useState("Aherm");
    const [producto, setProducto] = useState("--Sin Producto--");
    const [encargado, setEncargado] = useState("");
    const [expandedNodes, setExpandedNodes] = useState({ "ALDF": true, "RAFM": true });

    const toggleExpanded = (value) => {
        setExpandedNodes(prev => ({
            ...prev,
            [value]: !prev[value]
        }));
    };

    const encargadoOptions = [
        { value: "ALDF", label: "ALDF - Alan De La O Flores", level: 1, isManager: true },
        { value: "JMPR", label: "JMPR - Juan Manuel Pérez Rodríguez", level: 2, isManager: false, parent: "ALDF" },
        { value: "MAGS", label: "MAGS - María Alejandra González Sánchez", level: 2, isManager: false, parent: "ALDF" },
        { value: "RAFM", label: "RAFM - Roberto Andrés Fernández Martín", level: 1, isManager: true },
        { value: "LEVA", label: "LEVA - Leticia Esperanza Vargas Aguilar", level: 2, isManager: false, parent: "RAFM" },
        { value: "JCHL", label: "JCHL - José Carlos Hernández López", level: 2, isManager: false, parent: "RAFM" },
        { value: "AMRT", label: "AMRT - Ana María Ramírez Torres", level: 3, isManager: false, parent: "JCHL" },
        { value: "DAFV", label: "DAFV - Daniel Antonio Flores Vázquez", level: 3, isManager: false, parent: "LEVA" }
    ];

    // Función para obtener encargados visibles según el estado de expansión
    const getVisibleEncargados = () => {
        let result = [];
        
        encargadoOptions.forEach(encargado => {
            if (encargado.level === 1) {
                result.push(encargado);
                if (expandedNodes[encargado.value]) {
                    const subordinates = encargadoOptions.filter(sub => sub.parent === encargado.value);
                    result.push(...subordinates);
                    
                    subordinates.forEach(sub => {
                        if (expandedNodes[sub.value]) {
                            const subSubordinates = encargadoOptions.filter(subsub => subsub.parent === sub.value);
                            result.push(...subSubordinates);
                        }
                    });
                }
            }
        });
        
        return result;
    };

    return (
        <div style={{
            display: "flex",
            width: "100%",
            height: "100%",
            gap: "1rem"
        }}>
            {/* Columna izquierda - Ramificación (movida desde donde estaba el logo) */}
            <div style={{
                width: "300px", // w-72 equivalent
                display: "flex",
                flexDirection: "column"
            }}>
                {/* Ramificación de Encargados */}
                <div style={{
                    backgroundColor: "white",
                    borderRadius: "0.5rem",
                    padding: "0.75rem",
                    boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
                    border: "1px solid var(--color-jerarquia1)",
                    display: "flex",
                    flexDirection: "column",
                    flex: 1,
                    maxHeight: "404px",
                    overflowY: "auto"
                }}>
                    <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
                        {getVisibleEncargados().map((encargado) => {
                            const hasSubordinates = encargadoOptions.some(sub => sub.parent === encargado.value);
                            const isExpanded = expandedNodes[encargado.value];
                            
                            return (
                                <div
                                    key={encargado.value}
                                    style={{
                                        padding: "0.5rem",
                                        borderRadius: "0.25rem",
                                        cursor: "pointer",
                                        transition: "colors 0.2s",
                                        border: "1px solid",
                                        marginLeft: `${(encargado.level - 1) * 16}px`,
                                        borderLeft: encargado.level > 1 ? `3px solid var(--color-jerarquia${encargado.level})` : 'none',
                                        backgroundColor: selectedEncargado === encargado.value 
                                            ? 'var(--color-jerarquia1)' 
                                            : 'rgb(249 250 251)',
                                        borderColor: selectedEncargado === encargado.value 
                                            ? 'var(--color-jerarquia2)' 
                                            : 'rgb(229 231 235)',
                                        color: selectedEncargado === encargado.value ? 'white' : 'inherit'
                                    }}
                                    className={selectedEncargado !== encargado.value ? 'hover-bg-gray-100' : ''}
                                    onClick={() => setSelectedEncargado(encargado.value)}
                                >
                                    {/* Indicador de jerarquía */}
                                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                                        {/* Botón de expand/collapse para managers con subordinados */}
                                        {hasSubordinates && (
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    toggleExpanded(encargado.value);
                                                }}
                                                style={{
                                                    fontSize: "0.75rem",
                                                    fontWeight: "bold",
                                                    color: "var(--color-jerarquia3)",
                                                    transition: "colors 0.2s",
                                                    background: "none",
                                                    border: "none",
                                                    cursor: "pointer"
                                                }}
                                                className="hover-text-jerarquia4"
                                            >
                                                {isExpanded ? '▼' : '▶'}
                                            </button>
                                        )}
                                        
                                        {encargado.level > 1 && (
                                            <span style={{
                                                fontSize: "0.75rem",
                                                opacity: 0.6
                                            }}>
                                                {'└─'.repeat(encargado.level - 1)}
                                            </span>
                                        )}
                                        {encargado.isManager && (
                                            <span style={{
                                                fontSize: "0.75rem",
                                                fontWeight: "bold",
                                                color: "var(--color-jerarquia3)"
                                            }}>
                                                👑
                                            </span>
                                        )}
                                        <div style={{ flex: 1 }}>
                                            <div style={{
                                                fontSize: "0.75rem",
                                                fontWeight: "600",
                                                color: encargado.isManager ? "var(--color-jerarquia3)" : "inherit"
                                            }}>
                                                {encargado.value}
                                            </div>
                                            <div style={{
                                                fontSize: "0.75rem",
                                                opacity: 0.9
                                            }}>
                                                {encargado.label.split(' - ')[1]}
                                            </div>
                                            {encargado.level > 1 && (
                                                <div style={{
                                                    fontSize: "0.75rem",
                                                    opacity: 0.6,
                                                    fontStyle: "italic"
                                                }}>
                                                    Reporta a: {encargado.parent}
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

            {/* Campos del lado derecho */}
            <div style={{
                width: "300px",
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
            }}>
                {/* Logo */}
                    <div style={{ 
                        display: "flex", 
                        alignItems: "center", 
                        justifyContent: "center",
                        padding: "1rem",
                    }}>
                    <img 
                        src={ConsorcioLogo} 
                        alt="Logo Consorcio" 
                        style={{ 
                            width: "70px", 
                            height: "auto" 
                        }} 
                    />
                </div>

                {/* Cartera */}
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <label style={{
                        fontSize: "0.875rem",
                        fontWeight: "500",
                        marginBottom: "0.5rem",
                        color: "var(--color-jerarquia3)"
                    }}>
                        Cartera
                    </label>
                    <div style={{ position: "relative" }}>
                        <select
                            value={cartera}
                            onChange={(e) => setCartera(e.target.value)}
                            className="font-semibold text-[var(--color-jerarquia4)] bg-white border border-black rounded px-2 py-1 appearance-none"
                            style={{ fontSize: "14px", width: "100%", cursor: "pointer" }}
                        >
                            <option value="Aherm">Aherm</option>
                            <option value="American Express">American Express</option>
                            <option value="HSBC">HSBC</option>
                        </select>
                        <DropdownArrow />
                    </div>
                </div>

                {/* Producto */}
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <label style={{
                        fontSize: "0.875rem",
                        fontWeight: "500",
                        marginBottom: "0.5rem",
                        color: "var(--color-jerarquia3)"
                    }}>
                        Producto
                    </label>
                    <div style={{ position: "relative" }}>
                        <select
                            value={producto}
                            onChange={(e) => setProducto(e.target.value)}
                            className="font-semibold text-[var(--color-jerarquia4)] bg-white border border-black rounded px-2 py-1 appearance-none"
                            style={{ fontSize: "14px", width: "100%", cursor: "pointer" }}
                        >
                            <option value="--Sin Producto--">--Sin Producto--</option>
                            <option value="Amex">Amex</option>
                            <option value="Visa">Visa</option>
                            <option value="Mastercard">Mastercard</option>
                        </select>
                        <DropdownArrow />
                    </div>
                </div>

                {/* Encargado */}
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <label style={{
                        fontSize: "0.875rem",
                        fontWeight: "500",
                        marginBottom: "0.5rem",
                        color: "var(--color-jerarquia3)"
                    }}>
                        Encargado
                    </label>
                    <div style={{ position: "relative" }}>
                        <select
                            value={encargado}
                            onChange={(e) => setEncargado(e.target.value)}
                            className="font-semibold text-[var(--color-jerarquia4)] bg-white border border-black rounded px-2 py-1 appearance-none"
                            style={{ fontSize: "14px", width: "100%", cursor: "pointer" }}
                        >
                            <option value="">Seleccionar...</option>
                            <option value="ALDF">ALDF - Alan De La O Flores</option>
                            <option value="RAFM">RAFM - Roberto Andrés Fernández Martín</option>
                            <option value="JMPR">JMPR - Juan Manuel Pérez Rodríguez</option>
                        </select>
                        <DropdownArrow />
                    </div>
                </div>

                {/* Botón Cambiar */}
                <div style={{
                    marginTop: "1rem"
                }}>
                    <button
                        style={{
                            backgroundColor: "var(--color-jerarquia2)",
                            color: "white",
                            border: "none",
                            borderRadius: "0.375rem",
                            padding: "0.75rem 1.5rem",
                            fontSize: "0.875rem",
                            fontWeight: "600",
                            cursor: "pointer",
                            width: "100%",
                            transition: "background-color 0.2s"
                        }}
                        onMouseOver={(e) => e.target.style.backgroundColor = "var(--color-jerarquia3)"}
                        onMouseOut={(e) => e.target.style.backgroundColor = "var(--color-jerarquia2)"}
                    >
                        Cambiar
                    </button>
                </div>
            </div>

            <style>{`
                .hover-bg-gray-100:hover {
                    background-color: rgb(243 244 246) !important;
                }
                .hover-text-jerarquia4:hover {
                    color: var(--color-jerarquia4) !important;
                }
                /* Estilos para el scrollbar del panel de ramificación */
                div[style*="overflowY: auto"]::-webkit-scrollbar {
                    width: 8px;
                }
                div[style*="overflowY: auto"]::-webkit-scrollbar-track {
                    background: #f5f5f5;
                    border-radius: 4px;
                }
                div[style*="overflowY: auto"]::-webkit-scrollbar-thumb {
                    background: #b0b0b0;
                    border-radius: 4px;
                }
                div[style*="overflowY: auto"]::-webkit-scrollbar-thumb:hover {
                    background: #888;
                }
            `}</style>
        </div>
    );
};

export default ModalEncargadosContent;