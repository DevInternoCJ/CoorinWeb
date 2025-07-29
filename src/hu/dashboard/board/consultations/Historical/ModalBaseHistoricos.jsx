import React, { useState, useEffect, useRef } from "react";

const ModalBaseHistoricos = ({ open, children }) => {
    const [bounce, setBounce] = useState(false);
    const modalRef = useRef(null);

    // Siempre define los hooks antes de cualquier return o condicional
    useEffect(() => {
        if (open) {
            setBounce(true);
            const timer = setTimeout(() => setBounce(false), 200);
            return () => clearTimeout(timer);
        }
    }, [open]);

    if (!open) return null;

    const handleBackdropClick = (e) => {
        if (modalRef.current && !modalRef.current.contains(e.target)) {
            // No cerramos el modal al hacer clic en el backdrop
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
                className="scrollbar-gray"
            >
                {children}
            </div>
            <style>{`
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
            `}</style>
        </div>
    );
};

export default ModalBaseHistoricos;
