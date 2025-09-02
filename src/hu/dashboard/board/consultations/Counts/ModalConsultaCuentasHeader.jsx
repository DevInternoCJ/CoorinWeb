import React from "react";
import { IconCuentas } from "../IconesConsultations";

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

const ModalConsultaCuentasHeader = ({ onClose }) => (
    <div className="flex items-center gap-4 mb-2 w-full">
        {/* Título alineado a la izquierda */}
        <h2 className="modal-title">
            <IconCuentas className="modal-title-icon" />
            Consulta cuentas - Coorin
        </h2>
        {/* Elementos centrados en el modal */}
        <div className="flex-1 flex flex-row items-center justify-center">
            <div className="flex items-center gap-8">
                <span className="modal-span-1">Cartera</span>
                <span className="modal-span-2">American Express</span>
                <span className="modal-span-1 ml-8">Producto</span>
                <div className="relative">
                    <select className="modal-dropdown-select appearance-none">
                        <option>Amex</option>
                    </select>
                    <DropdownArrow />
                </div>
                <span className="modal-span-1 ml-8">Consulta</span>
                <div className="relative">
                    <select className="modal-dropdown-select appearance-none">
                        <option value=""> </option>
                    </select>
                    <DropdownArrow />
                </div>
            </div>
        </div>
        {/* Botón de cierre */}
        <button
            onClick={onClose}
            className="modal-btn modal-btn-close ml-4"
            aria-label="Cerrar"
        >
            &times;
        </button>
    </div>
);

export default ModalConsultaCuentasHeader;