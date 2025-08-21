import React from "react";
import ModalProductividadHeader from "./ModalProductividadHeader";
import ModalProductividadContent from "./ModalProductividadContent";
import ModalProductividadFooter from "./ModalProductividadFooter";
import ConsorcioLogo from "../../../../../assets/logo_coorin_5.svg";

// Flecha tipo chevron moderna usando clase global
const DropdownArrow = () => (
    <span className="modal-dropdown-arrow">
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
                        <span className="modal-span-1">Indicadores</span>
                        <div className="relative">
                            <select
                                className="modal-dropdown-select appearance-none w-32 font-semibold"
                            >
                                <option value="sesiones">Sesiones</option>
                                <option value="contactos">Contactos</option>
                                <option value="negociaciones">Negociaciones</option>
                            </select>
                            <DropdownArrow />
                        </div>
                        <div className="flex items-center gap-2">
                            <label className="flex items-center gap-1 text-[var(--color-jerarquia4)] text-sm font-medium">
                                <input 
                                    type="radio" 
                                    name="timeFilter" 
                                    value="dia" 
                                    defaultChecked 
                                    className="modal-radio"
                                />
                                Día
                            </label>
                            <label className="flex items-center gap-1 text-[var(--color-jerarquia4)] text-sm font-medium">
                                <input 
                                    type="radio" 
                                    name="timeFilter" 
                                    value="hora" 
                                    className="modal-radio"
                                />
                                Hora
                            </label>
                        </div>
                    </div>
                </div>
            </div>

            <div
                className="flex flex-col gap-4 scrollbar-gray"
                style={{
                    overflowY: "auto",
                    width: "100%",
                    minHeight: "400px",
                    maxHeight: "60vh",
                    padding: "1rem 0"
                }}
            >
                <ModalProductividadContent />
            </div>
            <div style={{ width: "100%", overflowX: "auto" }}>
                <ModalProductividadFooter />
            </div>
            {/* El scroll personalizado ahora se maneja solo con la clase global scrollbar-gray */}
        </div>
    );
};

export default ModalConsultaProductividad;