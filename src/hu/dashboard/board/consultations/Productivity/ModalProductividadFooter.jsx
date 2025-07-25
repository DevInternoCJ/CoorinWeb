import React from "react";

const ModalProductividadFooter = () => {
    return (
        <div style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: "1.5rem",
            paddingTop: "1rem",
            borderTop: "1px solid var(--color-border)"
        }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                <div style={{
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    backgroundColor: "var(--color-success)"
                }}></div>                <span style={{
                    fontSize: "0.875rem",
                    color: "#000000"
                }}>
                    Datos actualizados hace 5 minutos
                </span>
            </div>
            
            <div style={{ display: "flex", gap: "0.75rem" }}>
                <button
                    style={{
                        padding: "0.5rem 1rem",
                        backgroundColor: "var(--color-bg-secondary)",
                        border: "1px solid var(--color-border)",
                        borderRadius: "0.375rem",
                        color: "#000000",
                        fontSize: "0.875rem",
                        cursor: "pointer",
                        transition: "all 0.2s",
                        fontWeight: "500"
                    }}
                    onMouseEnter={(e) => {
                        e.target.style.backgroundColor = "var(--color-hover-bg)";
                        e.target.style.transform = "translateY(-1px)";
                    }}
                    onMouseLeave={(e) => {
                        e.target.style.backgroundColor = "var(--color-bg-secondary)";
                        e.target.style.transform = "translateY(0)";
                    }}
                >
                    📊 Exportar Datos
                </button>
                
                <button
                    style={{
                        padding: "0.5rem 1rem",
                        backgroundColor: "var(--color-jerarquia1)",
                        border: "none",
                        borderRadius: "0.375rem",
                        color: "var(--color-base-200)",
                        fontSize: "0.875rem",
                        cursor: "pointer",
                        transition: "all 0.2s",
                        fontWeight: "500"
                    }}
                    onMouseEnter={(e) => {
                        e.target.style.transform = "translateY(-1px)";
                        e.target.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.15)";
                    }}
                    onMouseLeave={(e) => {
                        e.target.style.transform = "translateY(0)";
                        e.target.style.boxShadow = "none";
                    }}
                >
                    🔄 Actualizar
                </button>
            </div>
        </div>
    );
};

export default ModalProductividadFooter;
