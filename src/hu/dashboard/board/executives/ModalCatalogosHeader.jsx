import React from "react";
import { IconCatalogos } from "./IconesEjecutives";
import ConsorcioLogo from "../../../../assets/logo_coorin_5.svg";

const ModalCatalogosHeader = ({ onClose }) => {
    return (
        <div style={{ 
            display: "flex", 
            alignItems: "center", 
            marginBottom: "1.5rem",
            borderBottom: "2px solid var(--color-jerarquia1)",
            paddingBottom: "1.5rem",
            paddingTop: "1rem",
            minHeight: "80px",
            position: "relative"
        }}>

            {/* Título a la izquierda */}
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                <IconCatalogos 
                    className="size-6" 
                    style={{ color: "var(--color-jerarquia3)" }}
                />
                <div>
                    <h2 className="text-xl font-bold text-[var(--color-jerarquia3)] mb-1 flex justify-start">
                        Catálogos - Coorin
                    </h2>
                </div>
            </div>

            {/* Logo del Consorcio Jurídico al centro */}
            <div style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: "0.5rem",
                position: "absolute",
                left: "50%",
                transform: "translateX(-50%)"
            }}>
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
            
            {/* Botón cerrar a la derecha */}
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

export default ModalCatalogosHeader;