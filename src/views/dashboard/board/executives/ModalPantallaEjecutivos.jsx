import React, { useState, useRef } from "react";
import GlobalModal from "../../../../components/Modal/GlobalModal";
import ModalPantallaHeader from "./ModalPantallaHeader";
import ModalPantallaContent from "./ModalPantallaContent";
import ModalPantallaFooter from "./ModalPantallaFooter";

const ModalPantallaEjecutivos = ({ onClose }) => {
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
        <GlobalModal isOpen onClose={onClose} onBackdropClick={handleBackdropClick} title="Pantalla de ejecutivos" mode="content" showHeader={false} showCloseButton={false} closeOnBackdropClick={false}>
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
                <div className="modal-xl-container" style={{ width: "70vw", maxWidth: "70vw", overflowX: "hidden" }}>
                    <ModalPantallaHeader onClose={onClose} />
                    
                    <div style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "0",
                        height: "calc(100% - 80px)", // Altura ajustada para mostrar el footer
                        overflow: "hidden"
                    }}>
                        {/* Contenido principal con los campos */}
                        <div style={{
                            display: "flex",
                            justifyContent: "center",
                            width: "100%",
                            flex: 1,
                            overflow: "hidden"
                        }}>
                            <ModalPantallaContent />
                        </div>

                        {/* Footer con mensaje informativo - siempre visible */}
                        <div style={{
                            padding: "0.5rem 0",
                            backgroundColor: "#f9fafb",
                            borderTop: "1px solid #e5e7eb",
                            borderRadius: "0 0 8px 8px",
                            flexShrink: 0
                        }}>
                            <ModalPantallaFooter />
                        </div>
                    </div>
                </div>
            </div>
        </GlobalModal>
    );
};

export default ModalPantallaEjecutivos;
