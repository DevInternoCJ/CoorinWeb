import React from "react";
import { IconGenerales } from "../IconesConsultations";

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

const ModalConsultaGeneralesHeader = ({ onClose }) => (
    <div className="flex items-center gap-4 mb-2 w-full">
        {/* Título alineado a la izquierda */}
        <h2 className="text-xl font-bold text-[var(--color-jerarquia3)] mb-1 flex justify-start items-center gap-2">
            <IconGenerales className="size-6" />
            Consulta generales - Coorin
        </h2>
        {/* Elementos centrados en el modal */}
        <div className="flex-1 flex flex-row items-center justify-center">
            <div className="flex items-center gap-8">
                <div className="relative">
                </div>
            </div>
        </div>
        {/* Botón de cierre */}
        <button
            onClick={onClose}
            className="ml-4 text-[var(--color-jerarquia3)] hover:text-red-600 transition rounded-full p-1"
            style={{ fontSize: "1.5rem", lineHeight: 1 }}
            aria-label="Cerrar"
        >
            &times;
        </button>
    </div>
);

export default ModalConsultaGeneralesHeader;
