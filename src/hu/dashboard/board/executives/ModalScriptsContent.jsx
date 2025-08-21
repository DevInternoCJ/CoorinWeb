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

const ModalScriptsContent = () => {
    const [selectedCartera, setSelectedCartera] = useState("American Express");
    const [selectedProducto, setSelectedProducto] = useState("Amex");
    const [selectedScript, setSelectedScript] = useState("-- Nuevo --");
    const [scriptName, setScriptName] = useState("");
    const [scriptDescription, setScriptDescription] = useState("");
    const [showPreview, setShowPreview] = useState(false);

    // Datos de ejemplo para los selects
    const carteras = ["American Express", "Visa", "MasterCard", "Bancomer"];
    const productos = ["Amex", "Visa Classic", "MasterCard Gold", "Bancomer Premium"];
    const scriptsExistentes = ["-- Nuevo --", "Script Básico", "Script Avanzado", "Script Personalizado"];

    // Datos de ejemplo para la tabla de ejecutivos
    const ejecutivosData = [
        {
            nombreEjecutivo: 'Alan De La O Flores',
            idCuenta: '340100000000000',
            nombreDeudor: 'Tony Stark',
            rfc: 'TSTA851021CX3',
            numeroCliente: '',
            saldo: '69383.3'
        }
    ];

    // Datos de ejemplo para la tabla inferior (script data)
    const scriptData = [
        {
            patchdate: '23/05/2017',
            idCuenta: '376276080741008',
            customerId: '572918607095MXN',
            name: '',
            birthdate: '19491105',
            loanProductCode: 'OP',
            recovered: 'QLAC'
        },
    ];

    const handleColor = () => {
        // Funcionalidad para el botón Color
        console.log("Aplicar color al texto");
    };

    const handleLimpiar = () => {
        setScriptName("");
        setScriptDescription("");
    };

    const handleResaltar = () => {
        // Funcionalidad para resaltar texto
        console.log("Resaltar texto seleccionado");
    };

    const togglePreview = () => {
        setShowPreview(!showPreview);
    };

    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            width: "100%",
            height: "100%",
            gap: "1rem"
        }}>
            {/* Sección de edición de texto */}
            <div style={{
                display: "flex",
                gap: "1rem",
                flex: 1,
                minHeight: "300px"
            }}>
                {/* Panel izquierdo - Controles y Dropdowns */}
                <div style={{
                    width: "300px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "1rem"
                }}>
                    {/* Logos */}
                    <div style={{ 
                        display: "flex", 
                        alignItems: "center", 
                        justifyContent: "center",
                        padding: "1rem",
                    }}>
                        <img 
                            src={ConsorcioLogo} 
                            alt="Consorcio Jurídico" 
                            style={{ height: "70px", width: "auto"  }}
                        />
                    </div>

                    {/* Selects */}
                    <div style={{ 
                        display: "flex", 
                        flexDirection: "column", 
                        gap: "1rem",
                        padding: "1rem",
                        backgroundColor: "#f8f9fa",
                        borderRadius: "8px",
                        border: "1px solid var(--color-jerarquia1)"
                    }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                            <label style={{
                                fontSize: "0.875rem",
                                fontWeight: "500",
                                color: "var(--color-jerarquia3)",
                                minWidth: "60px",
                                flexShrink: 0
                            }}>
                                Cartera:
                            </label>
                            <div style={{ position: "relative", flex: 1 }}>
                                <select
                                    value={selectedCartera}
                                    onChange={(e) => setSelectedCartera(e.target.value)}
                                    className="font-semibold text-[var(--color-jerarquia4)] bg-white border border-black rounded px-2 py-1 appearance-none"
                                    style={{ fontSize: "14px", width: "100%", cursor: "pointer" }}
                                >
                                    {carteras.map(cartera => (
                                        <option key={cartera} value={cartera}>{cartera}</option>
                                    ))}
                                </select>
                                <DropdownArrow />
                            </div>
                        </div>

                        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                            <label style={{
                                fontSize: "0.875rem",
                                fontWeight: "500",
                                color: "var(--color-jerarquia3)",
                                minWidth: "60px",
                                flexShrink: 0
                            }}>
                                Producto:
                            </label>
                            <div style={{ position: "relative", flex: 1 }}>
                                <select
                                    value={selectedProducto}
                                    onChange={(e) => setSelectedProducto(e.target.value)}
                                    className="font-semibold text-[var(--color-jerarquia4)] bg-white border border-black rounded px-2 py-1 appearance-none"
                                    style={{ fontSize: "14px", width: "100%", cursor: "pointer" }}
                                >
                                    {productos.map(producto => (
                                        <option key={producto} value={producto}>{producto}</option>
                                    ))}
                                </select>
                                <DropdownArrow />
                            </div>
                        </div>

                        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                            <label style={{
                                fontSize: "0.875rem",
                                fontWeight: "500",
                                color: "var(--color-jerarquia3)",
                                minWidth: "60px",
                                flexShrink: 0
                            }}>
                                Script:
                            </label>
                            <div style={{ position: "relative", flex: 1 }}>
                                <select
                                    value={selectedScript}
                                    onChange={(e) => setSelectedScript(e.target.value)}
                                    className="font-semibold text-[var(--color-jerarquia4)] bg-white border border-black rounded px-2 py-1 appearance-none"
                                    style={{ fontSize: "14px", width: "100%", cursor: "pointer" }}
                                >
                                    {scriptsExistentes.map(script => (
                                        <option key={script} value={script}>{script}</option>
                                    ))}
                                </select>
                                <DropdownArrow />
                            </div>
                        </div>
                    </div>

                    {/* Panel de botones de control */}
                    <div style={{ 
                        display: "flex", 
                        flexDirection: "column", 
                        gap: "0.75rem",
                        padding: "1rem",
                        backgroundColor: "#2d3748",
                        borderRadius: "8px",
                        border: "1px solid var(--color-jerarquia1)"
                    }}>
                        {/* Botones */}
                        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                            <button
                                onClick={handleResaltar}
                                style={{
                                    padding: "0.5rem 0.75rem",
                                    backgroundColor: "#e5e7eb",
                                    border: "1px solid #d1d5db",
                                    borderRadius: "4px",
                                    fontSize: "0.75rem",
                                    cursor: "pointer",
                                    color: "#374151",
                                    fontWeight: "500",
                                    width: "100%"
                                }}
                            >
                                Resaltar
                            </button>
                            <button
                                onClick={handleColor}
                                style={{
                                    padding: "0.5rem 0.75rem",
                                    backgroundColor: "#10b981",
                                    border: "1px solid #059669",
                                    borderRadius: "4px",
                                    fontSize: "0.75rem",
                                    cursor: "pointer",
                                    color: "white",
                                    fontWeight: "500",
                                    width: "100%"
                                }}
                            >
                                Color
                            </button>
                            <button
                                onClick={handleLimpiar}
                                style={{
                                    padding: "0.5rem 0.75rem",
                                    backgroundColor: "#e5e7eb",
                                    border: "1px solid #d1d5db",
                                    borderRadius: "4px",
                                    fontSize: "0.75rem",
                                    cursor: "pointer",
                                    color: "#374151",
                                    fontWeight: "500",
                                    width: "100%"
                                }}
                            >
                                Limpiar
                            </button>
                        </div>

                        {/* Checkbox Vista Previa */}
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem", marginTop: "0.5rem" }}>
                            <input
                                type="checkbox"
                                id="vista-previa"
                                checked={showPreview}
                                onChange={togglePreview}
                                style={{ margin: 0 }}
                            />
                            <label htmlFor="vista-previa" style={{ fontSize: "0.75rem", color: "#cbd5e0" }}>
                                Vista Previa
                            </label>
                        </div>
                    </div>
                </div>

                {/* Panel derecho - Editor */}
                <div style={{
                    flex: 1,
                    border: "1px solid var(--color-jerarquia1)",
                    borderRadius: "8px",
                    overflow: "hidden",
                    display: "flex",
                    flexDirection: "column"
                }}>

                    {/* Header del editor */}
                    <div style={{
                        backgroundColor: "#4a5568",
                        color: "white",
                        padding: "0.5rem 1rem",
                        fontSize: "0.875rem",
                        fontWeight: "500"
                    }}>
                        Edición y diseño de texto
                    </div>

                    {/* Área principal de escritura del script */}
                    <div style={{
                        flex: 1,
                        padding: "1rem",
                        backgroundColor: "#2d3748",
                        display: "flex",
                        flexDirection: "column",
                        gap: "1rem"
                    }}>
                        {/* Campo Nombre del Script */}
                        <div>
                            <label style={{ 
                                display: "block", 
                                fontSize: "0.875rem", 
                                color: "#cbd5e0", 
                                marginBottom: "0.5rem",
                                fontWeight: "500"
                            }}>
                                Nombre
                            </label>
                            <input
                                type="text"
                                value={scriptName}
                                onChange={(e) => setScriptName(e.target.value)}
                                style={{
                                    width: "100%",
                                    padding: "0.75rem",
                                    border: "1px solid #4a5568",
                                    borderRadius: "6px",
                                    fontSize: "1rem",
                                    backgroundColor: "#4a5568",
                                    color: "#e2e8f0"
                                }}
                                placeholder="Nombre del script"
                            />
                        </div>

                        {/* Campo Descripción/Script */}
                        <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
                            <label style={{ 
                                display: "block", 
                                fontSize: "0.875rem", 
                                color: "#cbd5e0", 
                                marginBottom: "0.5rem",
                                fontWeight: "500"
                            }}>
                                Descripción del Script
                            </label>
                            <textarea
                                value={scriptDescription}
                                onChange={(e) => setScriptDescription(e.target.value)}
                                style={{
                                    width: "100%",
                                    flex: 1,
                                    padding: "0.75rem",
                                    border: "1px solid #4a5568",
                                    borderRadius: "6px",
                                    fontSize: "1rem",
                                    minHeight: "300px",
                                    resize: "vertical",
                                    backgroundColor: "#4a5568",
                                    color: "#e2e8f0",
                                    fontFamily: "monospace"
                                }}
                                placeholder="Escriba el contenido del script aquí..."
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Sección de tablas */}
            <div style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.5rem"
            }}>
                {/* Tabla superior - Ejecutivos */}
                <div style={{
                    border: "1px solid var(--color-jerarquia1)",
                    borderRadius: "8px",
                    overflow: "hidden"
                }}>
                    <div style={{
                        overflowX: "auto",
                        overflowY: "auto",
                        maxHeight: "120px"
                    }}
                    className="scrollbar-gray">
                        <table style={{ width: "100%", fontSize: "0.75rem" }}>
                            <thead style={{ position: "sticky", top: 0, backgroundColor: "#4a5568", color: "white" }}>
                                <tr>
                                    <th style={{ padding: "0.5rem", textAlign: "left" }}>
                                        NombreEjecutivo
                                    </th>
                                    <th style={{ padding: "0.5rem", textAlign: "left" }}>
                                        idCuenta
                                    </th>
                                    <th style={{ padding: "0.5rem", textAlign: "left" }}>
                                        NombreDeudor
                                    </th>
                                    <th style={{ padding: "0.5rem", textAlign: "left" }}>
                                        RFC
                                    </th>
                                    <th style={{ padding: "0.5rem", textAlign: "left" }}>
                                        NúmeroCliente
                                    </th>
                                    <th style={{ padding: "0.5rem", textAlign: "left" }}>
                                        Saldo
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {ejecutivosData.map((item, index) => (
                                    <tr key={index} style={{ backgroundColor: index % 2 === 0 ? "white" : "#f8f9fa" }}>
                                        <td style={{ padding: "0.5rem", borderBottom: "1px solid #e2e8f0", color: "#374151" }}>
                                            {item.nombreEjecutivo}
                                        </td>
                                        <td style={{ padding: "0.5rem", borderBottom: "1px solid #e2e8f0", color: "#374151" }}>
                                            {item.idCuenta}
                                        </td>
                                        <td style={{ padding: "0.5rem", borderBottom: "1px solid #e2e8f0", color: "#374151" }}>
                                            {item.nombreDeudor}
                                        </td>
                                        <td style={{ padding: "0.5rem", borderBottom: "1px solid #e2e8f0", color: "#374151" }}>
                                            {item.rfc}
                                        </td>
                                        <td style={{ padding: "0.5rem", borderBottom: "1px solid #e2e8f0", color: "#374151" }}>
                                            {item.numeroCliente}
                                        </td>
                                        <td style={{ padding: "0.5rem", borderBottom: "1px solid #e2e8f0", color: "#374151" }}>
                                            {item.saldo}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Tabla inferior - Script Data */}
                <div style={{
                    border: "1px solid var(--color-jerarquia1)",
                    borderRadius: "8px",
                    overflow: "hidden"
                }}>
                    <div style={{
                        overflowX: "auto",
                        overflowY: "auto",
                        maxHeight: "120px"
                    }}
                    className="scrollbar-gray">
                        <table style={{ width: "100%", fontSize: "0.75rem" }}>
                            <thead style={{ position: "sticky", top: 0, backgroundColor: "#4a5568", color: "white" }}>
                                <tr>
                                    <th style={{ padding: "0.5rem", textAlign: "left" }}>patchdate</th>
                                    <th style={{ padding: "0.5rem", textAlign: "left" }}>idCuenta</th>
                                    <th style={{ padding: "0.5rem", textAlign: "left" }}>customerId</th>
                                    <th style={{ padding: "0.5rem", textAlign: "left" }}>name</th>
                                    <th style={{ padding: "0.5rem", textAlign: "left" }}>birthdate</th>
                                    <th style={{ padding: "0.5rem", textAlign: "left" }}>loan_productcode</th>
                                    <th style={{ padding: "0.5rem", textAlign: "left" }}>recovered</th>
                                </tr>
                            </thead>
                            <tbody>
                                {scriptData.map((item, index) => (
                                    <tr key={index} style={{ backgroundColor: index % 2 === 0 ? "white" : "#f8f9fa" }}>
                                        <td style={{ padding: "0.5rem", borderBottom: "1px solid #e2e8f0", color: "#374151" }}>
                                            {item.patchdate}
                                        </td>
                                        <td style={{ padding: "0.5rem", borderBottom: "1px solid #e2e8f0", color: "#374151" }}>
                                            {item.idCuenta}
                                        </td>
                                        <td style={{ padding: "0.5rem", borderBottom: "1px solid #e2e8f0", color: "#374151" }}>
                                            {item.customerId}
                                        </td>
                                        <td style={{ padding: "0.5rem", borderBottom: "1px solid #e2e8f0", color: "#374151" }}>
                                            {item.name}
                                        </td>
                                        <td style={{ padding: "0.5rem", borderBottom: "1px solid #e2e8f0", color: "#374151" }}>
                                            {item.birthdate}
                                        </td>
                                        <td style={{ padding: "0.5rem", borderBottom: "1px solid #e2e8f0", color: "#374151" }}>
                                            {item.loanProductCode}
                                        </td>
                                        <td style={{ padding: "0.5rem", borderBottom: "1px solid #e2e8f0", color: "#374151" }}>
                                            {item.recovered}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModalScriptsContent;