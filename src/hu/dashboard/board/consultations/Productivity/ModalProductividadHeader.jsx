import React from "react";
import { IconProductividad } from "../IconesConsultations";

const ModalProductividadHeader = ({ onClose }) => {
    return (
        <div style={{ 
            display: "flex", 
            justifyContent: "space-between", 
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
                <div>
                    <h2 className="text-xl font-bold text-[var(--color-jerarquia3)] mb-1 flex justify-start">
                        Productividad en Linea - Coorin
                    </h2>
                </div>
            </div>
            <button
                onClick={onClose}
                style={{
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                    padding: "0.5rem",
                    borderRadius: "0.375rem",
                    transition: "background-color 0.2s",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = "var(--color-hover-bg)"}
                onMouseLeave={(e) => e.target.style.backgroundColor = "transparent"}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    style={{ color: "#000000" }}
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                    />
                </svg>
            </button>
        </div>
        </div>
    );
};

export default ModalProductividadHeader;
