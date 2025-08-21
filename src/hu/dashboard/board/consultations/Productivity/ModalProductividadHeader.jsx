import React from "react";
import { IconProductividad } from "../IconesConsultations";

const ModalProductividadHeader = ({ onClose }) => {
    return (
        <div className="flex items-center mb-6 border-b-2 border-[var(--color-jerarquia1)] pb-4 w-full">
            <div className="flex items-center gap-3">
                <IconProductividad 
                    className="modal-title-icon"
                    style={{ color: "var(--color-jerarquia3)" }}
                />
                <h2 className="modal-title">
                    Productividad en Línea - Coorin
                </h2>
            </div>
            <div className="ml-auto">
                <button
                    onClick={onClose}
                    className="modal-btn modal-btn-close"
                    aria-label="Cerrar"
                >
                    &times;
                </button>
            </div>
        </div>
    );
};

export default ModalProductividadHeader;