import React, { useState } from "react";
import ModalConsultaGeneralesHeader from "./ModalConsultaGeneralesHeader";
import ModalConsultaGeneralesFiltros from "./ModalConsultaGeneralesFiltros";
import ModalConsultaGeneralesColumnas from "./ModalConsultaGeneralesColumnas";
import ModalConsultaGeneralesFooter from "./ModalConsultaGeneralesFooter";
import ConsorcioLogo from "../../../../../assets/logo_coorin_5.svg";

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

const ModalConsultaGenerales = ({ onClose }) => {
    const [consultaEnabled, setConsultaEnabled] = useState(false);
    
    return (
        <div className="modal-xl-container" style={{ maxWidth: "98vw", overflowX: "hidden" }}>
            <ModalConsultaGeneralesHeader onClose={onClose} />
            
            {/* Row superior con 2 columnas alineadas con las de abajo */}
            <div className="flex gap-4 mb-4 px-4">
                {/* Columna izquierda - Logo del Consorcio Jurídico */}
                <div className="w-72 flex justify-center items-center">
                    <img 
                        src={ConsorcioLogo} 
                        alt="Consorcio Jurídico" 
                        style={{ 
                            height: "50px", 
                            width: "auto",
                            objectFit: "contain"
                        }}
                    />
                </div>
                
                {/* Columna derecha - Controles de Cartera, Producto y Consulta */}
                <div className="flex-1 flex justify-center items-center">
                    <div style={{ 
                        display: "flex", 
                        alignItems: "center", 
                        gap: "1rem" 
                    }}>
                        <span style={{ 
                            fontSize: "14px", 
                            fontWeight: "600", 
                            color: "var(--color-jerarquia4)" 
                        }}>
                            Cartera
                        </span>
                        
                        <div className="relative">
                            <select
                                className="w-36 font-semibold text-[var(--color-jerarquia4)] bg-white border border-black rounded px-2 py-1 appearance-none"
                                style={{ fontSize: "14px" }}
                            >
                                <option value="american_express">American Express</option>
                                <option value="hsbc">HSBC</option>
                                <option value="santander">Santander</option>
                            </select>
                            <DropdownArrow />
                        </div>
                        
                        <span style={{ 
                            fontSize: "14px", 
                            fontWeight: "600", 
                            color: "var(--color-jerarquia4)" 
                        }}>
                            Concepto
                        </span>
                        
                        <div className="relative">
                            <select
                                className="w-32 font-semibold text-[var(--color-jerarquia4)] bg-white border border-black rounded px-2 py-1 appearance-none"
                                style={{ fontSize: "14px" }}
                            >
                                <option value="telefonos">Teléfonos</option>
                                <option value="correos">Correos</option>
                                <option value="direcciones">Direcciones</option>
                            </select>
                            <DropdownArrow />
                        </div>
                        
                        <div className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                id="consulta-checkbox"
                                checked={consultaEnabled}
                                onChange={(e) => setConsultaEnabled(e.target.checked)}
                                className="w-4 h-4 accent-[var(--color-jerarquia3)]"
                            />
                            <span style={{ 
                                fontSize: "14px", 
                                fontWeight: "600", 
                                color: "var(--color-jerarquia4)" 
                            }}>
                                Consulta
                            </span>
                        </div>
                        
                        <div className="relative">
                            <select
                                className={`w-36 font-semibold bg-white border border-black rounded px-2 py-1 appearance-none ${
                                    consultaEnabled 
                                        ? "text-[var(--color-jerarquia4)]" 
                                        : "text-gray-400 cursor-not-allowed"
                                }`}
                                style={{ fontSize: "14px" }}
                                disabled={!consultaEnabled}
                            >
                                <option value="todas">- Todas -</option>
                                <option value="activas">Activas</option>
                                <option value="inactivas">Inactivas</option>
                            </select>
                            {consultaEnabled && <DropdownArrow />}
                        </div>
                    </div>
                </div>
            </div>
            <div
                style={{
                    display: "flex",
                    flexDirection: "row",
                    gap: "1rem",
                    overflowX: "auto",
                    width: "100%",
                    minHeight: "1px",
                    alignItems: "stretch"
                }}
                className="scrollbar-gray"
            >
                <div style={{ minWidth: 0, flex: 1, display: "flex", flexDirection: "column" }}>
                    <ModalConsultaGeneralesFiltros />
                </div>
                <div style={{ minWidth: 0, flex: "0 0 450px", maxWidth: "450px", display: "flex", flexDirection: "column" }}>
                    <ModalConsultaGeneralesColumnas />
                </div>
            </div>
            <div style={{ width: "100%", overflowX: "auto" }}>
                <ModalConsultaGeneralesFooter />
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

export default ModalConsultaGenerales;