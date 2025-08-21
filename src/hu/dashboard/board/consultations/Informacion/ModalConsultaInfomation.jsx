import React from "react";
import { IconGenerales } from "../IconesConsultations";

const ModalConsultaInformation = ({ onClose }) => {
    return (
        <div>
            <div style={{ 
                display: "flex", 
                alignItems: "center", 
                marginBottom: "1.5rem",
                borderBottom: "2px solid var(--color-jerarquia1)",
                paddingBottom: "1rem"
            }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                    <IconGenerales 
                        className="size-6" 
                        style={{ color: "var(--color-jerarquia3)" }}
                    />
                    <div>
                        <h2 className="text-xl font-bold text-[var(--color-jerarquia3)] mb-1 flex justify-start">
                            Información - Coorin
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
            <div>
                <p className="text-gray-700 text-base mb-2">
                    Aquí puedes mostrar información relevante, instrucciones o detalles adicionales para el usuario.
                </p>
                <ul className="list-disc pl-5 text-gray-600 text-sm">
                    <li>Detalle 1 de la información.</li>
                    <li>Detalle 2 de la información.</li>
                    <li>Detalle 3 de la información.</li>
                </ul>
            </div>
        </div>
    );
};

export default ModalConsultaInformation;