import React, { useState, useEffect, useRef } from "react";
import ModalEncargadosHeader from "../Encargados/ModalEncargadosHeader";
import ModalEncargadosContent from "./Encargados/ModalEncargadosContent";
import ModalEncargadosFooter from "./Encargados/ModalEncargadosFooter";

const ModalEncargadosEjecutivos = ({ onClose }) => {
    const [bounce, setBounce] = useState(false);
    const [shakeAnimation, setShakeAnimation] = useState(false);
    const modalRef = useRef(null);

    // Siempre define los hooks antes de cualquier return o condicional
    useEffect(() => {
        setBounce(true);
        const timer = setTimeout(() => setBounce(false), 200);
        return () => clearTimeout(timer);
    }, []);

    const handleBackdropClick = (e) => {
        if (modalRef.current && !modalRef.current.contains(e.target)) {
            // Activar animación de shake en lugar de cerrar
            setShakeAnimation(true);
            setTimeout(() => setShakeAnimation(false), 500);
        }
    };

    return (
        <div
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                backgroundColor: "rgba(0, 0, 0, 0.6)",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                zIndex: 1000,
                backdropFilter: "blur(5px)",
            }}
            onClick={handleBackdropClick}
        >
            <div
                ref={modalRef}
                style={{
                    backgroundColor: "white",
                    borderRadius: "12px",
                    padding: "1.5rem",
                    maxWidth: "95vw",
                    maxHeight: "90vh",
                    overflow: "auto",
                    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
                    transform: bounce ? "scale(1.02)" : "scale(1)",
                    transition: "transform 0.2s ease-out",
                }}
                className={`scrollbar-gray${shakeAnimation ? " animate-shake-modal" : ""}`}
            >
                <div className="modal-xl-container" style={{ maxWidth: "800px", minWidth: "600px", height: "550px" }}>
                    <ModalEncargadosHeader onClose={onClose} />
                    
                    <div style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "1rem",
                        height: "calc(100% - 80px)", // Altura ajustada para mostrar el footer
                        overflow: "hidden"
                    }}>
                        {/* Contenido principal con filtros */}
                        <div style={{
                            display: "flex",
                            justifyContent: "center",
                            width: "100%",
                            flex: 1,
                            overflow: "hidden"
                        }}>
                            <ModalEncargadosContent />
                        </div>

                        {/* Footer con mensaje informativo - siempre visible */}
                        <div style={{
                            padding: "0.75rem 1rem",
                            backgroundColor: "#f9fafb",
                            borderTop: "1px solid #e5e7eb",
                            borderRadius: "0 0 8px 8px",
                            flexShrink: 0
                        }}>
                            <ModalEncargadosFooter />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModalEncargadosEjecutivos;