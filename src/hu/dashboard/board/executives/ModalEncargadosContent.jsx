import React, { useState, useEffect } from "react";
import { obetenerDropdownsEncargados } from '../../../../services/LokiServices';
import ConsorcioLogo from "../../../../assets/logo_coorin_5.svg";
import equivalenciasCartera from "../../../../utils/equivalenciasCartera";
import equivalenciasProducto from "../../../../utils/equivalenciasProducto";
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
    // State and logic hooks
    const [cartera, setCartera] = React.useState("");
    const [producto, setProducto] = React.useState("");
    const [carteras, setCarteras] = React.useState([]);
    const [productos, setProductos] = React.useState([]);
    const [encargados, setEncargados] = React.useState([]);
    const [selectedEncargado, setSelectedEncargado] = React.useState(null);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(null);
    const [encargadoOptions, setEncargadoOptions] = React.useState([]);
    const [expandedNodes, setExpandedNodes] = React.useState({});
    const [selectedExecutive, setSelectedExecutive] = useState("ALDF");

    // Fetch encargados and set initial state
    React.useEffect(() => {
        setLoading(true);
        obetenerDropdownsEncargados()
            .then(data => {
                setEncargados(data);
                // Get unique carteras and productos
                const uniqueCarteras = Array.from(new Set(data.map(item => item.idCartera)));
                setCarteras(uniqueCarteras);
                setCartera(uniqueCarteras[0] || "");
                const productosFiltrados = Array.from(new Set(data.filter(item => item.idCartera === (uniqueCarteras[0] || "")).map(item => item.idProducto)));
                setProductos(productosFiltrados);
                setProducto(productosFiltrados[0] || "");
                setSelectedEncargado(
                    data.find(item => item.idCartera === (uniqueCarteras[0] || "") && item.idProducto === (productosFiltrados[0] || ""))?.idEjecutivo || null
                );
                // Build encargadoOptions for tree
                const options = data.map(item => ({
                    value: item.idEjecutivo,
                    label: `${item.idEjecutivo} - ${item.nombreEjecutivo}`,
                    parent: item.idJefe,
                    level: item.nivel,
                    isManager: item.nivel === 1
                }));
                setEncargadoOptions(options);
            })
            .catch(err => {
                setError("Error al cargar encargados");
            })
            .finally(() => setLoading(false));
    }, []);

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

            {/* Columna derecha - Campos y logo */}
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
                            onChange={e => {
                                setCartera(e.target.value);
                                // Al cambiar cartera, filtrar productos disponibles (solo idProducto)
                                const productosFiltrados = Array.from(new Set(encargados.filter(item => item.idCartera === e.target.value).map(item => item.idProducto)));
                                setProductos(productosFiltrados);
                                setProducto(productosFiltrados[0] || "");
                                // Reset encargado seleccionado
                                const encargadosFiltrados = encargados.filter(item => item.idCartera === e.target.value && item.idProducto === (productosFiltrados[0] || ""));
                                setSelectedEncargado(encargadosFiltrados[0]?.idEjecutivo || null);
                            }}
                            className="font-semibold text-[var(--color-jerarquia4)] bg-white border border-black rounded px-2 py-1 appearance-none"
                            style={{ fontSize: "14px", width: "100%", cursor: "pointer" }}
                        >
                            {carteras.map(c => (
                                <option key={c} value={c}>{equivalenciasCartera[c] || c}</option>
                            ))}
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
                            onChange={e => {
                                setProducto(e.target.value);
                                // Reset encargado seleccionado al cambiar producto
                                const encargadosFiltrados = encargados.filter(item => item.idCartera === cartera && item.idProducto === e.target.value);
                                setSelectedEncargado(encargadosFiltrados[0]?.idEjecutivo || null);
                            }}
                            className="font-semibold text-[var(--color-jerarquia4)] bg-white border border-black rounded px-2 py-1 appearance-none"
                            style={{ fontSize: "14px", width: "100%", cursor: "pointer" }}
                        >
                            {productos.map(p => (
                                <option key={p} value={p}>{equivalenciasProducto[p] || p}</option>
                            ))}
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
                        {loading ? (
                            <div>Cargando encargados...</div>
                        ) : error ? (
                            <div style={{color:'red'}}>{error}</div>
                        ) : (
                            <select
                                value={selectedEncargado || ""}
                                onChange={e => setSelectedEncargado(e.target.value)}
                                className="font-semibold text-[var(--color-jerarquia4)] bg-white border border-black rounded px-2 py-1 appearance-none"
                                style={{ fontSize: "14px", width: "100%", cursor: "pointer" }}
                            >
                                <option value="">Seleccionar...</option>
                                {encargados.map(item => (
                                    <option key={item.idEjecutivo} value={item.idEjecutivo}>
                                        {item.nombreEjecutivo}
                                    </option>
                                ))}
                            </select>
                        )}
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