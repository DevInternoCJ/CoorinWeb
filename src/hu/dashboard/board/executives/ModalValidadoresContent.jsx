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

const ModalValidadoresContent = () => {
    const [selectedValidador, setSelectedValidador] = useState("ALDF");
    const [cartera, setCartera] = useState("American Express");
    const [producto, setProducto] = useState("Amex");
    const [arrepentimientos, setArrepentimientos] = useState(false);
    const [expandedNodes, setExpandedNodes] = useState({ "ALDF": true, "RAFM": true });

    const toggleExpanded = (value) => {
        setExpandedNodes(prev => ({
            ...prev,
            [value]: !prev[value]
        }));
    };

    const validadorOptions = [
        { value: "ALDF", label: "ALDF - Alan De La O Flores", level: 1, isManager: true },
        { value: "JMPR", label: "JMPR - Juan Manuel Pérez Rodríguez", level: 2, isManager: false, parent: "ALDF" },
        { value: "MAGS", label: "MAGS - María Alejandra González Sánchez", level: 2, isManager: false, parent: "ALDF" },
        { value: "RAFM", label: "RAFM - Roberto Andrés Fernández Martín", level: 1, isManager: true },
        { value: "LEVA", label: "LEVA - Leticia Esperanza Vargas Aguilar", level: 2, isManager: false, parent: "RAFM" },
        { value: "JCHL", label: "JCHL - José Carlos Hernández López", level: 2, isManager: false, parent: "RAFM" },
        { value: "AMRT", label: "AMRT - Ana María Ramírez Torres", level: 3, isManager: false, parent: "JCHL" },
        { value: "DAFV", label: "DAFV - Daniel Antonio Flores Vázquez", level: 3, isManager: false, parent: "LEVA" }
    ];

    // Función para obtener validadores visibles según el estado de expansión
    const getVisibleValidadores = () => {
        let result = [];
        
        validadorOptions.forEach(validador => {
            if (validador.level === 1) {
                result.push(validador);
                if (expandedNodes[validador.value]) {
                    const subordinates = validadorOptions.filter(sub => sub.parent === validador.value);
                    result.push(...subordinates);
                    
                    subordinates.forEach(sub => {
                        if (expandedNodes[sub.value]) {
                            const subSubordinates = validadorOptions.filter(subsub => subsub.parent === sub.value);
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
                width: "288px", // w-72 equivalent
                display: "flex",
                flexDirection: "column"
            }}>
                {/* Ramificación de Validadores */}
                <div style={{
                    backgroundColor: "white",
                    borderRadius: "0.5rem",
                    padding: "0.75rem",
                    boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
                    border: "1px solid var(--color-jerarquia1)",
                    display: "flex",
                    flexDirection: "column",
                    flex: 1,
                    maxHeight: "400px",
                    overflowY: "auto"
                }}>
                    <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
                        {getVisibleValidadores().map((validador) => {
                            const hasSubordinates = validadorOptions.some(sub => sub.parent === validador.value);
                            const isExpanded = expandedNodes[validador.value];
                            
                            return (
                                <div
                                    key={validador.value}
                                    style={{
                                        padding: "0.5rem",
                                        borderRadius: "0.25rem",
                                        cursor: "pointer",
                                        transition: "colors 0.2s",
                                        border: "1px solid",
                                        marginLeft: `${(validador.level - 1) * 16}px`,
                                        borderLeft: validador.level > 1 ? `3px solid var(--color-jerarquia${validador.level})` : 'none',
                                        backgroundColor: selectedValidador === validador.value 
                                            ? 'var(--color-jerarquia1)' 
                                            : 'rgb(249 250 251)',
                                        borderColor: selectedValidador === validador.value 
                                            ? 'var(--color-jerarquia2)' 
                                            : 'rgb(229 231 235)',
                                        color: selectedValidador === validador.value ? 'white' : 'inherit'
                                    }}
                                    className={selectedValidador !== validador.value ? 'hover-bg-gray-100' : ''}
                                    onClick={() => setSelectedValidador(validador.value)}
                                >
                                    {/* Indicador de jerarquía */}
                                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                                        {/* Botón de expand/collapse para managers con subordinados */}
                                        {hasSubordinates && (
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    toggleExpanded(validador.value);
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
                                        
                                        {validador.level > 1 && (
                                            <span style={{
                                                fontSize: "0.75rem",
                                                opacity: 0.6
                                            }}>
                                                {'└─'.repeat(validador.level - 1)}
                                            </span>
                                        )}
                                        {validador.isManager && (
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
                                                color: validador.isManager ? "var(--color-jerarquia3)" : "inherit"
                                            }}>
                                                {validador.value}
                                            </div>
                                            <div style={{
                                                fontSize: "0.75rem",
                                                opacity: 0.9
                                            }}>
                                                {validador.label.split(' - ')[1]}
                                            </div>
                                            {validador.level > 1 && (
                                                <div style={{
                                                    fontSize: "0.75rem",
                                                    opacity: 0.6,
                                                    fontStyle: "italic"
                                                }}>
                                                    Reporta a: {validador.parent}
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
                gap: "1rem"
            }}>
                {/* Logo del Consorcio Jurídico movido aquí arriba */}
                <div style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "white",
                    padding: "1rem",
                }}>
                    <img 
                        src={ConsorcioLogo} 
                        alt="Consorcio Jurídico" 
                        style={{ 
                            height: "70px", 
                            width: "auto",
                            objectFit: "contain"
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
                    <input
                        type="text"
                        value={cartera}
                        onChange={(e) => setCartera(e.target.value)}
                        className="font-semibold text-[var(--color-jerarquia4)] bg-white border border-black rounded px-2 py-1"
                        style={{ fontSize: "14px", width: "100%" }}
                    />
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
                            <option value="Amex">American Express</option>
                        </select>
                        <DropdownArrow />
                    </div>
                </div>

                {/* Checkbox Arrepentimientos */}
                <div style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    justifyContent: "center"
                }}>
                    <input
                        type="checkbox"
                        id="arrepentimientos"
                        checked={arrepentimientos}
                        onChange={(e) => setArrepentimientos(e.target.checked)}
                        style={{
                            width: "1rem",
                            height: "1rem",
                            accentColor: "var(--color-jerarquia1)"
                        }}
                    />
                    <label 
                        htmlFor="arrepentimientos" 
                        style={{
                            fontSize: "0.875rem",
                            fontWeight: "500",
                            cursor: "pointer",
                            color: "var(--color-jerarquia3)"
                        }}
                    >
                        Arrepentimientos
                    </label>
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

export default ModalValidadoresContent;