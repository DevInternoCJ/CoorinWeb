import React, { useRef, useState, useEffect } from "react";
import DarkList from "./DarkList";
import Regrest from "./Regrest";
import Payments from "./information/Payments";
import ReportingPayments from "./information/ReportingPayments";
import Wrongs from "./information/Wrongs";
import Addresses from "./information/Addresses";
import Emails from "./information/Emails";
import Searches from "./information/Searches";
import Offers from "./information/Offers";
import Comments from "./information/Comments";
import VGP from "./information/VGP";

const ModalBase = ({ onClose, selectedOption = "Lista Negra" }) => {
    const [bounce, setBounce] = useState(false);
    const modalRef = useRef(null);

    // Efecto para manejar la tecla Escape
    useEffect(() => {
        const handler = (e) => {
            if (e.key === "Escape") {
                setBounce(true);
                setTimeout(() => setBounce(false), 500);
            }
        };
        window.addEventListener("keydown", handler);
        return () => window.removeEventListener("keydown", handler);
    }, []);

    const handleBackdropClick = () => {
        setBounce(true);
        setTimeout(() => setBounce(false), 500);
    };
    // Mapeo de componentes para cada opción del sidebar
    const componentsMap = {
        "Lista Negra": <DarkList />,
        "Arrepentimientos": <Regrest />,
        "Pagos": <Payments />,
        "Pagos reportados": <ReportingPayments />,
        "Datos Erroneos": <Wrongs />,
        "Domicilios": <Addresses />,
        "Correos": <Emails />,
        "Búsquedas": <Searches />,
        "Ofrecimientos": <Offers />,
        "Comentarios": <Comments />,
        "VGP": <VGP />
    };

    return (
        <div className="modal-blur-bg">
            <div className="modal-overlay" onClick={handleBackdropClick} />
            <div
                ref={modalRef}
                className={`modal-content modal-xl-container${bounce ? " animate-bounce-modal" : ""}`}
                onClick={e => e.stopPropagation()}
                style={{
                    maxWidth: "920px",
                    minWidth: "690px",
                    height: "633px",
                    display: "flex",
                    flexDirection: "column",
                    position: "relative"
                }}
            >
                {/* Header simplificado sin dropdown */}
                <div style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "1.5rem",
                    borderBottom: "1px solid #e0e0e0",
                    paddingBottom: "1rem"
                }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <img src="/public/logo_coorin_7.svg" alt="Logo Coorin" style={{ height: 36, marginRight: 8 }} />
                        <h2 className="modal-title">
                            {selectedOption}
                        </h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="modal-btn modal-btn-close ml-4"
                        aria-label="Cerrar"
                    >
                        &times;
                    </button>
                </div>

                {/* Content - mostrando el componente correspondiente */}
                <div style={{ flex: 1, overflow: "auto", width: '100%' }}>
                    {componentsMap[selectedOption] || (
                        <div style={{ 
                            display: 'flex', 
                            justifyContent: 'center', 
                            alignItems: 'center', 
                            height: '100%',
                            color: '#666',
                            fontSize: '1.1rem'
                        }}>
                            Componente para "{selectedOption}" no disponible aún
                        </div>
                    )}
                </div>
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
            `}</style>
        </div>
    );
};

export default ModalBase;
