import React, { useRef, useState, useEffect } from "react";

const ModalBaseCuentas = ({ open, children }) => {
    const [bounce, setBounce] = useState(false);
    const modalRef = useRef(null);

    // Siempre define los hooks antes de cualquier return o condicional
    useEffect(() => {
        if (!open) return;
        const handler = (e) => {
            if (e.key === "Escape") {
                setBounce(true);
                setTimeout(() => setBounce(false), 500);
            }
        };
        window.addEventListener("keydown", handler);
        return () => window.removeEventListener("keydown", handler);
    }, [open]);

    if (!open) return null;

    const handleBackdropClick = () => {
        setBounce(true);
        setTimeout(() => setBounce(false), 500);
    };

    return (
        <div className="modal-blur-bg">
            <div className="modal-overlay" onClick={handleBackdropClick} />
            <div
                ref={modalRef}
                className={`modal-content${bounce ? " animate-bounce-modal" : ""}`}
                onClick={e => e.stopPropagation()}
            >
                {children}
            </div>
            <style>{`
                @keyframes bounce-modal {
                    0% { transform: scale(1); }
                    20% { transform: scale(1.05, 0.95); }
                    40% { transform: scale(0.95, 1.05); }
                    60% { transform: scale(1.03, 0.97); }
                    80% { transform: scale(0.97, 1.03); }
                    100% { transform: scale(1); }
                }
                .animate-bounce-modal {
                    animation: bounce-modal 0.5s;
                }
                .modal-scroll-gray::-webkit-scrollbar {
                    width: 8px;
                    height: 8px;
                    background: var(--color-surface-secondary);
                }
                .modal-scroll-gray::-webkit-scrollbar-thumb {
                    background: var(--color-border);
                    border-radius: 4px;
                }
                .modal-scroll-gray::-webkit-scrollbar-thumb:hover {
                    background: var(--color-text-muted);
                }
                .modal-scroll-gray {
                    scrollbar-color: var(--color-border) var(--color-surface-secondary);
                    scrollbar-width: thin;
                }
            `}</style>
        </div>
    );
};

export default ModalBaseCuentas;
