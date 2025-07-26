import React from "react";
import { IconProductividad } from "../IconesConsultations";

const ModalProductividadHeader = ({ onClose }) => {
    return (
        <div style={{ 
            display: "flex", 
            alignItems: "center", 
            marginBottom: "1.5rem",
            borderBottom: "2px solid var(--color-jerarquia1)",
            paddingBottom: "1rem"
        }}>

            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                <IconProductividad 
                    className="size-6" 
                    style={{ color: "var(--color-jerarquia3)" }}
                />
                <div>
                    <h2 className="text-xl font-bold text-[var(--color-jerarquia3)] mb-1 flex justify-start">
                        Productividad en Linea - Coorin
                    </h2>
                </div>
            </div>
            
            <div style={{ marginLeft: "auto" }}>
                <button
                    onClick={onClose}
                    className="text-[var(--color-jerarquia3)] hover:text-red-600 transition rounded-full p-1"
                    style={{ fontSize: "1.5rem", lineHeight: 1 }}
                    aria-label="Cerrar"
                >
                    &times;
                </button>
            </div>
        </div>
    );
};

export default ModalProductividadHeader;
