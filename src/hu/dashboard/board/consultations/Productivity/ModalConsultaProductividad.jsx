import React from "react";
import ModalProductividadHeader from "./ModalProductividadHeader";
import ModalProductividadContent from "./ModalProductividadContent";
import ModalProductividadFooter from "./ModalProductividadFooter";
import ConsorcioLogo from "../../../../../assets/ConsorcioLetras_OLD.png";

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

const ModalConsultaProductividad = ({ onClose }) => {
    return (
        <div className="modal-xl-container" style={{ maxWidth: "98vw", overflowX: "hidden" }}>
            <ModalProductividadHeader onClose={onClose} />
            
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
                
                {/* Columna derecha - Controles de Indicadores */}
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
                            Indicadores
                        </span>
                        
                        <div className="relative">
                            <select
                                className="w-32 font-semibold text-[var(--color-jerarquia4)] bg-white border border-black rounded px-2 py-1 appearance-none"
                                style={{ fontSize: "14px" }}
                            >
                                <option value="sesiones">Sesiones</option>
                                <option value="contactos">Contactos</option>
                                <option value="negociaciones">Negociaciones</option>
                            </select>
                            <DropdownArrow />
                        </div>
                        
                        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                            <label style={{ 
                                display: "flex", 
                                alignItems: "center", 
                                gap: "0.25rem",
                                fontSize: "14px",
                                color: "var(--color-jerarquia4)"
                            }}>
                                <input 
                                    type="radio" 
                                    name="timeFilter" 
                                    value="dia" 
                                    defaultChecked 
                                    style={{ margin: 0 }}
                                />
                                Día
                            </label>
                            
                            <label style={{ 
                                display: "flex", 
                                alignItems: "center", 
                                gap: "0.25rem",
                                fontSize: "14px",
                                color: "var(--color-jerarquia4)"
                            }}>
                                <input 
                                    type="radio" 
                                    name="timeFilter" 
                                    value="hora" 
                                    style={{ margin: 0 }}
                                />
                                Hora
                            </label>
                        </div>
                    </div>
                </div>
            </div>

            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "1rem",
                    overflowY: "auto",
                    width: "100%",
                    minHeight: "400px",
                    maxHeight: "60vh",
                    padding: "1rem 0"
                }}
                className="modal-scroll-gray"
            >
                <ModalProductividadContent />
            </div>
            <div style={{ width: "100%", overflowX: "auto" }}>
                <ModalProductividadFooter />
            </div>
            <style>{`
                .modal-scroll-gray::-webkit-scrollbar {
                    height: 8px;
                    width: 8px;
                    background: #f5f5f5;
                }
                .modal-scroll-gray::-webkit-scrollbar-thumb {
                    background: #b0b0b0;
                    border-radius: 4px;
                }
                .modal-scroll-gray::-webkit-scrollbar-thumb:hover {
                    background: #888;
                }
            `}</style>
        </div>
    );
};

export default ModalConsultaProductividad;
