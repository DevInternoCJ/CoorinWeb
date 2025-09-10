import React, { useState } from "react";
import ConsorcioLogo from "../../../../../assets/logo_coorin_5.svg";

const ModalConsultaHistoricosFiltros = ({ onIndividualChange }) => {
    const [isIndividual, setIsIndividual] = useState();
    const [idCuenta, setIdCuenta] = useState("");
    const [checkedItems, setCheckedItems] = useState({
        cuenta: true,
        gestiones: false,
        visitas: false,
        negociaciones: false,
        accionamientos: false,
        pagos: false
    });
    const [periodo, setPeriodo] = useState(true);
    const [fechaDesde, setFechaDesde] = useState("25/07/2025");
    const [fechaHasta, setFechaHasta] = useState("25/07/2025");

    const handleCheckboxChange = (item) => {
        setCheckedItems(prev => ({
            ...prev,
            [item]: !prev[item]
        }));
    };

    const handleBuscar = () => {
        console.log("Buscando cuenta:", idCuenta);
        // Aquí iría la lógica de búsqueda
    };

    const handleIndividualChange = (value) => {
        setIsIndividual(value);
        if (onIndividualChange) {
            onIndividualChange(value);
        }
    };

    return (
        <div style={{ 
            minWidth: "400px", 
            paddingRight: "1rem"
        }}>
            {/* Logo del Consorcio */}
            <div style={{ 
                display: "flex", 
                justifyContent: "center", 
                marginBottom: "2rem" 
            }}>
                <img 
                    src={ConsorcioLogo} 
                    alt="Consorcio Jurídico" 
                    style={{ 
                        height: "60px",
                        objectFit: "contain"
                    }} 
                />
            </div>

            {/* Sección Cartera */}
            <div style={{ marginBottom: "2.5rem" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "1rem" }}>
                    <label className="modal-span-1">
                        Cartera:
                    </label>
                    <span className="modal-span-2">
                        American Express
                    </span>
                </div>
            </div>

            {/* Radio buttons Individual/Archivo */}
            <div style={{ marginBottom: "1.5rem" }}>
                <div style={{ display: "flex", gap: "2rem", justifyContent: "center" }}>
                    <label style={{ display: "flex", alignItems: "center", gap: "0.5rem", cursor: "pointer" }}>
                        <input
                            type="radio"
                            name="tipo"
                            checked={isIndividual}
                            onChange={() => handleIndividualChange(true)}
                            className="modal-radio"
                        />
                        <span className="modal-span-2">Individual</span>
                    </label>
                    <label style={{ display: "flex", alignItems: "center", gap: "0.5rem", cursor: "pointer" }}>
                        <input
                            type="radio"
                            name="tipo"
                            checked={!isIndividual}
                            onChange={() => handleIndividualChange(false)}
                            className="modal-radio"
                        />
                        <span className="modal-span-2">Archivo</span>
                    </label>
                </div>
            </div>

            {/* Checkboxes de tipos de consulta */}
            <div style={{ marginBottom: "1.5rem" }}>
                <div style={{ 
                    display: "flex", 
                    gap: "1rem", 
                    flexWrap: "wrap",
                    justifyContent: isIndividual ? "center" : "flex-start"
                }}>
                    {Object.entries(checkedItems).map(([key, checked]) => (
                        <label key={key} style={{ display: "flex", alignItems: "center", gap: "0.5rem", cursor: "pointer" }}>
                            <input
                                type="checkbox"
                                checked={checked}
                                onChange={() => handleCheckboxChange(key)}
                                className="modal-checkbox"
                            />
                            <span className="modal-span-2 capitalize">
                                {key === "accionamientos" ? "Accionamientos" : key}
                            </span>
                        </label>
                    ))}
                </div>
            </div>

            {/* Período */}
            <div style={{ marginBottom: "1.5rem" }}>
                <div style={{ 
                    display: "flex", 
                    gap: "1rem", 
                    alignItems: "center",
                    justifyContent: isIndividual ? "center" : "flex-start"
                }}>
                    {/* Checkbox Período */}
                    <div style={{ minWidth: "80px" }}>
                        <label style={{ display: "flex", alignItems: "center", gap: "0.5rem", cursor: "pointer" }}>
                            <input
                                type="checkbox"
                                checked={periodo}
                                onChange={() => setPeriodo(!periodo)}
                                className="modal-checkbox"
                            />
                            <span className="modal-span-1">Período</span>
                        </label>
                    </div>
                    
                    {/* Campos de fecha */}
                    {periodo && (
                        <>
                            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                                <label className="modal-span-2 whitespace-nowrap">Desde:</label>
                                <input
                                    type="date"
                                    value={fechaDesde.split('/').reverse().join('-')}
                                    onChange={(e) => setFechaDesde(e.target.value.split('-').reverse().join('/'))}
                                    className="w-32 px-2 py-1 text-sm bg-white border border-black rounded focus:outline-none focus:border-[var(--color-jerarquia3)] cursor-pointer calendar-input"
                                    style={{ 
                                        fontSize: "14px",
                                        color: "#000000",
                                        colorScheme: "light"
                                    }}
                                />
                            </div>
                            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                                <label className="modal-span-2 whitespace-nowrap">Hasta:</label>
                                <input
                                    type="date"
                                    value={fechaHasta.split('/').reverse().join('-')}
                                    onChange={(e) => setFechaHasta(e.target.value.split('-').reverse().join('/'))}
                                    className="w-32 px-2 py-1 text-sm bg-white border border-black rounded focus:outline-none focus:border-[var(--color-jerarquia3)] cursor-pointer calendar-input"
                                    style={{ 
                                        fontSize: "14px",
                                        color: "#000000",
                                        colorScheme: "light"
                                    }}
                                />
                            </div>
                        </>
                    )}
                </div>
            </div>

            {/* Campo de cuenta individual */}
            {isIndividual && (
                <div style={{ marginBottom: "1.5rem" }}>
                    <div style={{ 
                        display: "flex", 
                        gap: "1rem", 
                        alignItems: "center",
                        justifyContent: "center"
                    }}>
                        <label className="modal-span-1 whitespace-nowrap">
                            Cuenta:
                        </label>
                        <input
                            type="text"
                            value={idCuenta}
                            onChange={(e) => setIdCuenta(e.target.value)}
                            placeholder="Ingrese el número de cuenta"
                            style={{
                                flex: 1,
                                padding: "0.5rem",
                                border: "2px solid #d1d5db",
                                borderRadius: "0.5rem",
                                fontSize: "0.875rem",
                                minWidth: "610px"
                            }}
                        />
                        <button
                            onClick={handleBuscar}
                            className="modal-btn modal-btn-primary"
                            style={{ whiteSpace: "nowrap" }}
                        >
                            Buscar
                        </button>
                    </div>
                </div>
            )}

            {/* Botón Seleccione para modo Archivo */}
            {!isIndividual && (
                <div style={{ marginBottom: "1.5rem" }}>
                    <div style={{ display: "flex", gap: "1rem", alignItems: "center", justifyContent: "flex-end" }}>
                        <button
                            onClick={() => console.log("Seleccionar archivo...")}
                            className="modal-btn modal-btn-primary"
                            style={{ whiteSpace: "nowrap" }}
                        >
                            Seleccione
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ModalConsultaHistoricosFiltros;