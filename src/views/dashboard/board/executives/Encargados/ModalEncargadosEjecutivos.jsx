import React, { useState, useRef } from "react";
import GlobalModal from "../../../../../components/Modal/GlobalModal";
import ModalEncargadosHeader from "../Encargados/ModalEncargadosHeader";
import ModalEncargadosContent from "./Encargados/ModalEncargadosContent";
import ModalEncargadosFooter from "./Encargados/ModalEncargadosFooter";

const ModalEncargadosEjecutivos = ({ onClose }) => {
    const [shakeAnimation, setShakeAnimation] = useState(false);
    const modalRef = useRef(null);

    const handleBackdropClick = (e) => {
        if (modalRef.current && !modalRef.current.contains(e.target)) {
            // Activar animación de shake en lugar de cerrar
            setShakeAnimation(true);
            setTimeout(() => setShakeAnimation(false), 500);
        }
    };

    return (
        <GlobalModal isOpen onClose={onClose} onBackdropClick={handleBackdropClick} title="Encargados de ejecutivos" mode="content" showHeader={false} showCloseButton={false} closeOnBackdropClick={false}>
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
        </GlobalModal>
    );
};

export default ModalEncargadosEjecutivos;
