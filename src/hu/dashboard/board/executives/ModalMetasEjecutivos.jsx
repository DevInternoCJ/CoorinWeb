import React, { useState, useEffect, useRef } from "react";
import ModalMetasHeader from "./ModalMetasHeader";
import ModalMetasContent from "./ModalMetasContent";
import ModalMetasFooter from "./ModalMetasFooter";

const ModalMetasEjecutivos = ({ onClose }) => {
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
                    maxWidth: "80vw",
                    maxHeight: "90vh",
                    overflow: "hidden",
                    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
                    transform: bounce ? "scale(1.02)" : "scale(1)",
                    transition: "transform 0.2s ease-out",
                }}
                className={shakeAnimation ? " animate-shake-modal" : ""}
            >
                <div className="modal-xl-container" style={{ maxWidth: "70vw", overflowX: "hidden" }}>
                    <ModalMetasHeader onClose={onClose} />
                    
                    <div 
                        style={{
                            maxHeight: "calc(85vh - 12rem)",
                            overflowY: "auto",
                            overflowX: "hidden",
                            padding: "0 1rem"
                        }}
                        className="modal-scroll-gray"
                    >
                        <ModalMetasContent />
                    </div>
                    
                    <ModalMetasFooter />
                    
                    <style>{`
                        @keyframes shake-modal {
                            0% { transform: scale(1); }
                            20% { transform: scale(1.05, 0.95); }
                            40% { transform: scale(0.95, 1.05); }
                            60% { transform: scale(1.03, 0.97); }
                            80% { transform: scale(0.97, 1.03); }
                            100% { transform: scale(1); }
                        }
                        .animate-shake-modal {
                            animation: shake-modal 0.5s;
                        }
                        .scrollbar-gray::-webkit-scrollbar {
                            height: 8px;
                            width: 8px;
                            background: #f5f5f5;
                        }
                        .scrollbar-gray::-webkit-scrollbar-thumb {
                            background: #b0b0b0;
                            border-radius: 4px;
                        }
                        .scrollbar-gray::-webkit-scrollbar-thumb:hover {
                            background: #888;
                        }
                        .modal-scroll-gray::-webkit-scrollbar {
                            width: 8px;
                            background: #f5f5f5;
                        }
                        .modal-scroll-gray::-webkit-scrollbar-thumb {
                            background: #b0b0b0;
                            border-radius: 4px;
                        }
                        .modal-scroll-gray::-webkit-scrollbar-thumb:hover {
                            background: #888;
                        }
                        /* Estilo para filas con checkbox activo */
                        .modal-table tr.row-selected {
                            background: #9dc5bc !important;
                        }
                        .modal-table tr.row-selected:hover {
                            background: #8bb5b0 !important;
                        }
                        .modal-table tr.row-selected td {
                            color: #2b463c !important;
                        }
                    `}</style>
                </div>
            </div>
        </div>
    );
};

export default ModalMetasEjecutivos;